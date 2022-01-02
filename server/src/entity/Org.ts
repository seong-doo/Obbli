import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Advert } from "./Advert";
import { Org_review } from "./Org_review";
import { Person_review } from "./Person_review";

@Entity()
export class Org {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  user_id: string;

  @Column()
  pw_hash: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('datetime')
  since: Date;

  @Column()
  headcount: number;

  @Column()
  created_at: Date;

  @OneToMany(() => Org_review, (Org_review) => Org_review.Org)
  Org_review: Org_review[];

  @OneToMany(() => Person_review, (Person_review) => Person_review.Person)
  Person_review: Person_review[];

  @OneToMany(() => Advert, (Advert) => Advert.Org)
  Advert: Advert[];
}
