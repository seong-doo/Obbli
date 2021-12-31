import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { adv } from "./adv";
import { org_review } from "./org_review";
import { person_review } from "./person_review";

@Entity()
export class org {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  user_id: string;

  @Column()
  pw_hash: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  since: number;

  @Column()
  headcount: number;

  @OneToMany(() => org_review, (org_review) => org_review.org)
  org_review: org_review[];

  @OneToMany(() => person_review, (person_review) => person_review.person)
  person_review: person_review[];

  @OneToMany(() => adv, (adv) => adv.org)
  adv: adv[];
}
