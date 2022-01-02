import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Position } from "./Position";
import { Person } from "./Person";

@Entity()
export class Application {
  // @PrimaryGeneratedColumn('uuid')
  // uuid: string;

  @PrimaryColumn()
  person_uuid: string;

  @PrimaryColumn()
  position_uuid: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  received_at: Date;

  @Column({ nullable: true })
  hired_at: Date;

  @ManyToOne(() => Person, (Person) => Person.Application)
  @JoinColumn({ name: 'person_uuid' })
  Person: Person;

  @ManyToOne(() => Position, (Position) => Position.Application)
  @JoinColumn({ name: 'position_uuid' })
  Position: Position;
}
