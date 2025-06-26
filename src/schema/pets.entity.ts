import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnimalsType } from './animalTypes.entity';
import { Weight } from './weight.entity';
import { UserEntity } from './users.entity';

@Entity('pets', { schema: 'pet-appointment' })
export class Pets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'userId', nullable: true })
  userId: number | null;

  @Column('varchar', { name: 'name', nullable: true, length: 100 })
  name: string | null;

  @Column('int', { name: 'animalsTypeId', nullable: true })
  animalsTypeId: number | null;

  @Column('varchar', { name: 'petBreeds', nullable: true, length: 100 })
  petBreeds: string | null;

  @Column('varchar', { name: 'petAge', nullable: true, length: 11 })
  petAge: string | null;

  @Column('int', { name: 'petWeightId', nullable: true })
  petWeightId: number | null;

  @Column('int', { name: 'createBy', nullable: true })
  createBy: number | null;

  @Column('int', { name: 'modifiedBy', nullable: true })
  modifiedBy: number | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date | null;

  @Column('timestamp', { name: 'modifiedDete', nullable: true })
  modifiedDete: Date | null;

  @Column('tinyint', { name: 'isDelete', nullable: true, width: 1 })
  isDelete: boolean | null;

  @ManyToOne(() => UserEntity, (user) => user.pets)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => AnimalsType)
  @JoinColumn({ name: 'animalsTypeId' })
  animalsType: AnimalsType;

  @ManyToOne(() => Weight)
  @JoinColumn({ name: 'petWeightId' })
  petWeight: Weight;
}
