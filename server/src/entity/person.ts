import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { org_review } from "./org_review";
import { person_review } from "./person_review";
import { application } from "./application";
import { part } from "./part";

@Entity()
export class person {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  user_id: string;

  @Column()
  pw_hash: string;

  @Column()
  realname: string;

  @Column()
  professional: boolean;

  @Column()
  //part_uuid connect to part_Table
  @Column()
  history: string;

  @Column()
  email: string;

  @Column()
  cellular: string;

  @OneToMany(() => org_review, (org_review) => org_review.person)
  org_review: org_review[];

  @OneToMany(() => person_review, (person_review) => person_review.person)
  person_review: person_review[];

  @OneToMany(() => application, (application) => application.person)
  application: application[];

  @ManyToOne(() => part, (part) => part.person)
  part: part;
}
