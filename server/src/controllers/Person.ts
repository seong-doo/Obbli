import "reflect-metadata";
import { IsNull, Not, getConnection } from "typeorm";
import { Application, Person, Skill } from "../entity";
import { signToken, verifyToken, hashPassword } from "../Util";

interface TokenInfo {
  uuid: string;
  user_id: string;
  created_at: Date;
}

const SignIn = {
  post: async (req, res) => {
    const { user_id, pw } = req.body;
    // TODO: check types

    if (!user_id || !pw) {
      return res.status(400).json({});
    }

    // TODO: hash pw
    const row = await Person.findOne({ user_id: user_id, pw_hash: pw, deleted_at: IsNull() });
    console.log(row);
    if (!row) { return res.status(400).send(); }
    const { uuid, created_at } = row;
    const data = { uuid, user_id: row.user_id, created_at, permission: 'person' };
    const access_token = signToken(data, "1h");
    const refresh_token = signToken(data, "1d");

    return res
      .cookie("refresh_token", refresh_token, {
        httpOnly: true,
      })
      .status(200)
      .send({
        access_token,
        token_type: 'Bearer',
        expires_in: 3600,
        uuid,
        permission: 'person',
      });
  },
};

const SignUp = {
  post: async (req, res) => {
    // 회원가입
    const { user_id, pw, pw_check, name } = req.body;
    // TODO: check types

    // 빈 입력값 체크
    if (!user_id || !pw || !pw_check || (!name && !name && pw === pw_check)) {
      return res.status(400).json({});
    }

    const duplicateID = await Person.findOne({ user_id });

    if (duplicateID) {
      return res.status(403).json({});
    }

    // TODO: hash pw
    await Person.insert({ user_id, pw_hash: pw, name });

    Person.findOne({ user_id }).then((result) => {
      const { uuid, user_id, created_at } = result;
      const access_token = signToken({ uuid, user_id, created_at }, "1h");
      const refresh_token = signToken({ uuid, user_id, created_at }, "1d");

      return res
        .cookie("refresh_token", refresh_token, {
          httpOnly: true,
        })
        .status(201)
        .json({ access_token: `Bearer ${access_token}` });
    });
  },
};

const SignOut = {
  post: (req, res) => {
    res
      .clearCookie("refresh_token")
      .status(200)
      .json({ message: "success log_out" });
  },
};

const UserInfo = {
  get: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({});
    }


    const person:TokenInfo = verifyToken(req.headers.authorization);
    if(!person){
      return res.status(401).json({})
    }
    const row = await Person.findOne({
      where: { uuid: person.uuid },
      relations: [
        "Skill",
        "Org_review",
        "Application",
        "Application.Position",
        "Person_review",
        'Application.Position.Skill',
        'Application.Position.Advert',
        'Application.Position.Advert.Org',
      ],
    });

    const data = {
      uuid: row.uuid,
      user_id: row.user_id,
      name: row.name,
      professional: row.professional,
      history: row.history,
      skill_name: row?.Skill?.name,
      Application: row.Application.map(each => ({
        org_uuid: each.Position.Advert.Org?.uuid,
        org_name: each.Position.Advert.Org?.name,
        skill_name: each.Position.Skill.name,
        created_at: each.created_at,
        received_at: each.received_at,
        hired_at: each.hired_at,
        active_until: each.Position.Advert.active_until,
        event_at: each.Position.Advert.event_at,
        reviewed: row.Org_review.some(review => (review.person_uuid === row.uuid && review.org_uuid === each.Position.Advert.Org?.uuid)),
      })),
      Person_review: row.Person_review,
      Org_review: row.Org_review,
    }

    if (!row) {
      return res.status(404).json({});
    }

    return res
      .status(200)
      .send(data);
      // .json({ name, professional, history, skill, uuid: person });
  },

  patch: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({});
    }

    const person:TokenInfo = verifyToken(req.headers.authorization);
    const targetData = { ...req.body };

    if (req.body.user_id || !person) {
      return res.status(401).json({});
    }

    Object.entries(targetData).forEach((el) => {
      if (el[1] === undefined) {
        delete targetData[el[0]];
      }
    });

    // TODO: use subquery from API
    const { skill_name } = targetData;
    delete targetData.skill_name;

    let setter = Object.entries(targetData)
      .map(([k, v]) => `${k} = '${v}'`)
      .join(",");
    console.log(req.body);

    if (skill_name !== undefined) {
      setter += `, skill_uuid = (SELECT uuid from skill where name = '${skill_name}')`;
    }
    const raw = `UPDATE person set ${setter} where uuid = '${person.uuid}'`;

    const result = await Person.query(raw);

    // TODO: use one DB call for update and select?
    const row = await Person.findOne({
      where: { uuid: person.uuid },
      select: ["uuid", "history", "professional", "name"],
      relations: ["Skill"],
    });

    if (!row) {
      return res.status(401).json({});
    }
    //유저정보 수정하기
    else {
      return res.status(200).send({
        history: row.history,
        professional: row.professional,
        name: row.name,
        skill: row.Skill.name,
        uuid: person.uuid,
      });
    }
  },

  delete: async (req, res) => {
    //유저정보 삭제하기

    if (!req.headers.authorization) { return res.status(401).send(); }

    const person:TokenInfo = verifyToken(req.headers.authorization);

    if(!person) { return res.status(401).send(); }

    const invalid = await Person.findOne({ uuid: person.uuid });

    if (!invalid) { return res.status(404).send(); }
    await Person.getRepository().softDelete({ uuid: person.uuid });
    return res.clearCookie("refresh_token").status(204).send();
  },
};

export async function checkApplication(req, res) {
  const token = verifyToken(req.headers.authorization);
  if (!token?.uuid) { return res.status(401).send(); }
  const rows = await Application.createQueryBuilder('application')
    .select()
    .innerJoin('Position', 'position', 'application.position_uuid = position.uuid')
    .innerJoin('Advert', 'advert', 'position.advert_uuid = advert.uuid')
    .where(
      'Application.person_uuid = :person_uuid and Advert.uuid = :advert_uuid',
      { person_uuid: token.uuid, advert_uuid: req.params.advert_uuid }
    )
    .execute();

  return res.status(200).send({ applied: (rows.length ? true : false) });
}

export { SignIn, SignUp, SignOut, UserInfo };
