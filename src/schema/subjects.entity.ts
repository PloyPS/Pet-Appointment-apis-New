import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointments } from './appointments.entity';

@Entity('subjects', { schema: 'pet-appointment' })
export class Subjects {
  @PrimaryGeneratedColumn()
  id: number | null;

  @Column('varchar', { name: 'subject', nullable: true, length: 255 })
  subject: string | null;

  @Column('varchar', { name: 'is_delete', nullable: true, length: 255 })
  isDelete: string | null;

  @Column('varchar', { name: 'createBy', nullable: true, length: 11 })
  createBy: string | null;

  @OneToMany(() => Appointments, (appointment) => appointment.subject)
  appointment: Appointments[];
}
