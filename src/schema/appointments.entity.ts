import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { Subjects } from './subjects.entity';
import { AnimalsType } from './animalTypes.entity';
@Entity('appointments', { schema: 'pet-appointment' })
export class Appointments {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  // @Column('int', { name: 'username' })
  // userId: number;

  @ManyToOne(() => Subjects, (subject) => subject.appointment)
  @JoinColumn({ name: 'subject' })
  subject: Subjects;

  @ManyToOne(() => AnimalsType, (animalType) => animalType.appointments)
  @JoinColumn({ name: 'animalsType' })
  animalsType: AnimalsType;

  @Column('varchar', { name: 'animalsBreed', nullable: true, length: 255 })
  animalsBreed: string | null;

  @Column('varchar', { name: 'animalsName', nullable: true, length: 255 })
  animalsName: string | null;

  @Column('datetime', { name: 'timeAppointment', nullable: true })
  timeAppointment: Date | null;

  @Column('tinyint', { name: 'status', nullable: true })
  status: number | null;

  @Column('datetime', { name: 'createDate', nullable: true })
  createDate: Date | null;

  @Column('datetime', { name: 'modifiedDate', nullable: true })
  modifiedDate: Date | null;

  @Column('tinyint', { name: 'createBy', nullable: true })
  createBy: number | null;

  @Column('tinyint', { name: 'modifiedBy', nullable: true })
  modifiedBy: number | null;

  @Column('varchar', { name: 'is_delete', nullable: true })
  isDelete: string | null;

  @ManyToOne(() => UserEntity, (user) => user.appointments)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
