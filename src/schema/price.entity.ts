import { Column, Entity } from 'typeorm';

@Entity('price', { schema: 'pet-appointment' })
export class Price {
  @Column('tinyint', { primary: true, name: 'id' })
  id: number;

  @Column('int', { name: 'weightId', nullable: true }) // เพิ่ม weightId
  weightId: number | null;

  @Column('varchar', { name: 'weight', nullable: true, length: 100 })
  weight: string | null;

  @Column('int', { name: 'animalTypeId', nullable: true })
  animalTypeId: number | null;

  @Column('int', { name: 'subjectId', nullable: true })
  subjectId: number | null;

  @Column('varchar', { name: 'price', nullable: true, length: 10 })
  price: string | null;
}
