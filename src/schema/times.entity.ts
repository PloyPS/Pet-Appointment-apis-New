import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('times', { schema: 'pet-appointment' })
export class Times {
  @PrimaryGeneratedColumn()
  id: number | null;

  @Column('varchar', { name: 'date', nullable: true, length: 255 })
  date: string | null;

  @Column('time', { name: 'time', nullable: true })
  time: string | null;

  @Column('tinyint', { name: 'is_active', nullable: true })
  is_active: number | null;

  @Column('tinyint', { name: 'is_delete', nullable: true })
  isDelete: number | null;
}
