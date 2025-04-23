import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('animalsType', { schema: 'pet-appointment' })
export class AnimalsType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('int', { name: 'is_delete', nullable: true })
  isDelete: number | null;
  appointments: any;
}
