import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { adv } from "./adv";
import { part } from "./part";
import { person } from "./person";

@Entity()
export class application {
  @PrimaryGeneratedColumn()
  uuid: number;

  @ManyToOne(() => person, (person) => person.application)
  person: person;

  @ManyToOne(() => adv, (adv) => adv.application)
  adv: adv;

  @ManyToOne(() => part, (part) => part.application)
  part: part;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  reviewed_at: number;

  @Column()
  hired_at: number;
}
