import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import {
  person,
  org,
  org_review,
  person_review,
  part,
  adv_part,
  adv,
  application,
} from "./entity";

const data = require("../data");

function convert(rows, columns) {
  return rows.map((item) => {
    return Object.fromEntries(item.map((v, i) => [columns[i], v]));
  });
}

const person_data = convert(data.person, [
  "user_id",
  "pw_hash",
  "realname",
  "professional",
  "prat_uuid",
  "history",
  "email",
  "cellular",
]);
const org_data = convert(data.org, [
  "user_id",
  "pw_hash",
  "name",
  "description",
  "since",
  "headcount",
]);
const person_review_data = convert(data.person_review, [
  "org_uuid",
  "person_uuid",
  "raiting",
  "comment",
]);
const org_review_data = convert(data.org_review, [
  "org_uuid",
  "person_uuid",
  "raiting",
  "comment",
]);
const part_data = convert(data.part, ["name"]);
const adv_part_data = convert(data.adv_part, [
  "adv_uuid",
  "part_uuid",
  "number",
]);
const adv_data = convert(data.adv, ["org_uuid", "content"]);
const application_data = convert(data.application, [
  "person_uuid",
  "adv_uuid",
  "part_uuid",
  "reviewed_at",
  "hired_at",
]);

getConnectionOptions().then(async (config) => {
  Object.assign(config, { dropSchema: true, synchronize: true });
  Object.assign(config, {
    entities: [
      person,
      org,
      org_review,
      person_review,
      part,
      adv_part,
      adv,
      application,
    ],
  });
  const conn = await createConnection(config);
  await conn
    .createQueryBuilder()
    .insert()
    .into(person)
    .values(person_data)
    .execute();

  await conn.createQueryBuilder().insert().into(org).values(org_data).execute();

  await conn
    .createQueryBuilder()
    .insert()
    .into(person_review)
    .values(person_review_data)
    .execute();

  await conn
    .createQueryBuilder()
    .insert()
    .into(org_review)
    .values(org_review_data)
    .execute();

  await conn
    .createQueryBuilder()
    .insert()
    .into(part)
    .values(part_data)
    .execute();

  await conn
    .createQueryBuilder()
    .insert()
    .into(adv_part)
    .values(adv_part_data)
    .execute();

  await conn.createQueryBuilder().insert().into(adv).values(adv_data).execute();

  await conn
    .createQueryBuilder()
    .insert()
    .into(application)
    .values(application_data)
    .execute();
});
