import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Position } from "./Position";
import { Person } from "./Person";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @OneToMany(() => Position, (Position) => Position.Skill)
  Position: Position[];

  @OneToMany(() => Person, (Person) => Person.Skill)
  Person: Person[];
}
