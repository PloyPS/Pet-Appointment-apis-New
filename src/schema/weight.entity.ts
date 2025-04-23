import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('weight', { schema: 'pet-appointment' })
export class Weight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'weight', nullable: true, length: 255 })
  weight: string | null;

  @Column('int', { name: 'animalTypeId', nullable: true }) // ลบ length ออก
  animalTypeId: number | null;

  @Column('varchar', { name: 'is_delete', nullable: true, length: 255 })
  isDelete: string | null;
}
