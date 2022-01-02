import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Position } from './Position';
import { Org } from './Org';

@Entity()
export class Advert {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  org_uuid: string;

  @Column('datetime')
  created_at: string;

  @Column()
  content: string;

  @OneToMany(() => Position, (Position) => Position.Advert)
  Position: Position[];

  @ManyToOne(() => Org, (Org) => Org.Advert)
  @JoinColumn({ name: 'org_uuid' })
  Org: Org;
}
