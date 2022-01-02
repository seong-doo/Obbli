import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Advert } from "./Advert";
import { Application } from "./Application";
import { Skill } from "./Skill";

@Entity()
export class Position {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  advert_uuid: string;

  @Column()
  skill_uuid: string;

  @Column()
  number: number;

  @OneToMany(() => Application, (Application) => Application.Position)
  Application: Application;

  @ManyToOne(type => Advert)
  @JoinColumn({ name: 'advert_uuid' })
  Advert: Advert;

  @ManyToOne(type => Skill)
  @JoinColumn({ name: 'skill_uuid' })
  Skill: Skill;
}
