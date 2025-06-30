import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users', { schema: 'pet-appointment' })
export class Users {
  @Column('varchar', { name: 'username', nullable: true, length: 255 })
  username: string | null;

  @Column('varchar', { name: 'password', nullable: true, length: 55 })
  password: string | null;

  @Column('varchar', { name: 'firstname', nullable: true, length: 255 })
  firstname: string | null;

  @Column('varchar', { name: 'lastname', nullable: true, length: 255 })
  lastname: string | null;

  @Column('varchar', { name: 'phone', nullable: true, length: 11 })
  phone: string | null;

  @Column('tinyint', {
    name: 'role',
    nullable: true,
    width: 1,
    default: () => '0',
  })
  role: boolean | null;

  @Column('tinyint', { name: 'createBy', nullable: true })
  createBy: number | null;

  @Column('tinyint', { name: 'modifiedBy', nullable: true })
  modifiedBy: number | null;

  @Column('datetime', { name: 'modifiedDate', nullable: true })
  modifiedDate: Date | null;

  @Column('tinyint', { name: 'is_delete', nullable: true, width: 1 })
  isDelete: boolean | null;

  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('timestamp', {
    name: 'createDate',
    default: () => "'current_timestamp(6)'",
  })
  createDate: Date;
}
