import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { adv } from "./adv";
import { part } from "./part";

@Entity()
export class adv_part {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  //part_uuid connect to part_Table
  @Column()
  number: number;

  @OneToMany(() => part, (part) => part.adv_part)
  part: part[];

  @ManyToOne(() => adv, (adv) => adv.adv_part)
  adv: adv;
}
