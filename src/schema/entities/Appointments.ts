import { Column, Entity } from 'typeorm';

@Entity('appointments', { schema: 'pet-appointment' })
export class Appointments {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('int', { name: 'username' })
  username: number;

  @Column('tinyint', { name: 'subject', nullable: true })
  subject: number | null;

  @Column('tinyint', { name: 'animalsType', nullable: true })
  animalsType: number | null;

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

  @Column('tinyint', { name: 'is_delete', nullable: true })
  isDelete: number | null;
}
