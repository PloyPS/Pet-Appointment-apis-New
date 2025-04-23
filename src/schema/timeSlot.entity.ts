import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('time_slots', { schema: "pet-appointment" })
export class TimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time' })
  time_slot: string;

}
