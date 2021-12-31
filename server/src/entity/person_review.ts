import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { person } from "./person";
import { org } from "./org";

@Entity()
export class person_review {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  //org_uuid connect org_Table
  @Column()
  rating: number;
  @Column()
  comment: string;

  @ManyToOne(() => person, (person) => person.person_review)
  person: person;

  @ManyToOne(() => org, (org) => org.person_review)
  org: org;
}
