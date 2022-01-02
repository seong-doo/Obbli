import { Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Person } from "./Person";
import { Org } from "./Org";

@Entity()
export class Person_review {
  // @PrimaryGeneratedColumn('uuid')
  // uuid: string;
  @PrimaryColumn()
  person_uuid: string;

  @PrimaryColumn()
  org_uuid: string;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(type => Person)
  @JoinColumn({ name: 'person_uuid' })
  Person: Person;

  @ManyToOne(type => Org)
  @JoinColumn({ name: 'org_uuid' })
  Org: Org;
}
