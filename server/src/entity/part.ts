import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { adv_part } from "./adv_part";
import { application } from "./application";
import { person } from "./person";

@Entity()
export class part {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  name: string;

  @OneToMany(() => application, (application) => application.part)
  application: application[];

  @ManyToOne(() => adv_part, (adv_part) => adv_part.part)
  adv_part: adv_part;

  @OneToMany(() => person, (person) => person.part)
  person: person[];
}
