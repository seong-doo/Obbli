import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { adv_part } from "./adv_part";
import { application } from "./application";
import { org } from "./org";

@Entity()
export class adv {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  //part_uuid connect to org_Table
  @Column()
  created_at: number;

  @Column()
  content: string;

  @OneToMany(() => application, (application) => application.adv)
  application: application[];

  @OneToMany(() => adv_part, (adv_part) => adv_part.adv)
  adv_part: adv_part[];

  @ManyToOne(() => org, (org) => org.adv)
  org: org;
}
