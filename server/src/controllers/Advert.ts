import { off } from "process";
import { Advert, Application, Org, Org_review, Position, Skill } from "../entity";
import { verifyToken } from "../Util";

interface TokenInfo {
  uuid: string;
  user_id: string;
  created_at: Date;
}

const advertList = {
  get: async (req, res): Promise<void> => {
    //게시글 가져오기
    const advertList = await Advert.createQueryBuilder('advert')
      .select(['advert.uuid as uuid', 'title', 'location', 'org.name as org_name', 'active_until'])
      .innerJoin('Org', 'org', 'advert.org_uuid = org.uuid')
      .execute();
    return res.status(200).json(advertList);
  },
};

const Mainadvert = {
  get: async (req, res): Promise<void> => {
    //게시글 선택시 자세한 정보 가져오기
    const uuid: string = req.params.advert_uuid;

    const matching = await Advert.findOne({ uuid });
    if (!matching) {
      return res.status(404).json({});
    }

    const positions = await Advert.createQueryBuilder()
      .select([
        'Advert.uuid as uuid',
        "title",
        "body",
        "skill.name as skill_name",
        "position.uuid as position_uuid",
        "position.quota as quota",
        "active_until",
        "location",
        "event_at",
        "org.name as org_name",
        "org.uuid as org_uuid",
      ])
      .innerJoin("Org", "org", "org.uuid = Advert.org_uuid")
      .innerJoin("Position", "position", "position.advert_uuid = Advert.uuid")
      .innerJoin("Skill", "skill", "skill.uuid = position.skill_uuid")
      .where("Advert.uuid = :uuid", { uuid })
      .execute();

    const reviews = await Org_review.find({
      where: { org_uuid: positions[0].org_uuid },
      select: ["comment", "rating"],
    });

    const data: {
      uuid?: string;
      title?: string;
      body?: string;
      positions?: Array<Object>;
      active_until?: string;
      location?: string;
      event_at?: string;
      org_name?: string;
      reviews?: Array<Object>;
    } = { reviews };

    for (const key of [
      'uuid',
      "title",
      "body",
      "active_until",
      "location",
      "event_at",
      "org_name",
      'org_uuid',
    ]) {
      data[key] = positions[0][key];
    }
    data.positions = positions.map((obj) => ({
      uuid: obj.position_uuid,
      skill_name: obj.skill_name,
      quota: obj.quota,
    }));

    return res.status(200).json(data);
  },

  post: async (req, res): Promise<void> => {
    //게시글 작성하기
    const verifyTarget: TokenInfo = verifyToken(req.headers.authorization);
    const { title, body, active_until, event_at, location, positions } =
      req.body;

    if (
      [title, body, active_until, event_at, location, positions].includes(
        undefined
      )
    ) {
      return res.status(400).send();
    }
    if (!Array.isArray(positions) || positions.length === 0) {
      return res.status(400).send();
    }

    const writerInfo = await Org.findOne(
      { uuid: verifyTarget.uuid },
      { select: ["uuid"] }
    );

    if (!writerInfo) {
      return res.status(400).json({ message: "토큰에 문제가 있습니다." });
    }

    const { uuid: advert_uuid } = await Advert.create({
      org_uuid: writerInfo.uuid,
      title,
      body,
      active_until,
      event_at,
      location,
    }).save();

    // TODO: optimize query
    for (const { skill_name, quota } of positions) {
      const { uuid: skill_uuid } = await Skill.findOne({ name: skill_name });
      await Position.createQueryBuilder()
        .insert()
        .values({ advert_uuid, skill_uuid, quota })
        .execute();
    }

    return res.status(201).json({ uuid: advert_uuid });
  },
  patch: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({});
    }
    const target_uuid: string = req.params.advert_uuid;
    const writerInfo = verifyToken(req.headers.authorization);
    if(!writerInfo){
      return res.status(401).json({})
    }

    const advertwriter = await Advert.findOne({ uuid: target_uuid });
    if (writerInfo.uuid !== advertwriter.org_uuid) {
      return res.status(401).json({});
    } 
    
    const { title, body, active_until, event_at, location } = req.body;
    const data = { title, body, active_until, event_at, location };
    for (const key in data) {
      if (data[key] === undefined) {
        delete data[key];
      }
    }
    
    await Advert.update({ uuid: target_uuid }, data);

    const row = await Advert.findOne({ uuid: target_uuid });
    const {
      uuid: _,
      org_uuid: __,
      created_at: ___,
      ...updatedAdvert
    } = row;
    return res.status(200).json(updatedAdvert);
     
  },
  delete: async (req, res) => {
    //게시글 삭제하기
    if (!req.headers.authorization) {

      return res.status(401).json({});
    }
    const target_uuid: string = req.params.advert_uuid;
    
    const writerInfo:TokenInfo = verifyToken(req.headers.authorization);

    if (!writerInfo) {
      return res.status(401).json({});
    } 

    // const advertautho:object =Advert.findOne({uuid:target_uuid, org_uuid:writerInfo.uuid})
    
    const advert = await Advert.findOne({ uuid: target_uuid });

    if( advert.org_uuid !== writerInfo.uuid ){
      return res.status(401).json({});
    }
    else {
      Advert.delete({ uuid: target_uuid });
      return res.status(204).send();
    }
  },
};

export { advertList, Mainadvert };
