import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_entity", { schema: "pet-appointment" })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "username", length: 100 })
  username: string;

  @Column("varchar", { name: "password", length: 20 })
  password: string;

  @Column("varchar", { name: "firstname", length: 100 })
  firstname: string;

  @Column("varchar", { name: "lastname", length: 100 })
  lastname: string;

  @Column("varchar", { name: "phone", length: 100 })
  phone: string;

  @Column("int", { name: "createBy" })
  createBy: number;

  @Column("varchar", { name: "modifiedBy", length: 255 })
  modifiedBy: string;

  @Column("int", { name: "isDelete", default: () => "'0'" })
  isDelete: number;

  @Column("timestamp", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column("timestamp", {
    name: "modifiedDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedDate: Date;
}
