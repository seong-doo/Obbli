import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { org } from "./org";
import { person } from "./person";

@Entity()
export class org_review {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  //org_uuid connect org_Table
  @Column()
  //user_uuid connect to user_Table
  @Column()
  rating: number;
  @Column()
  comment: string;

  @ManyToOne(() => person, (person) => person.org_review)
  person: person;

  @ManyToOne(() => org, (org) => org.org_review)
  org: org;
}
