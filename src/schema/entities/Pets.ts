import { Column, Entity } from "typeorm";

@Entity("pets", { schema: "pet-appointment" })
export class Pets {
  @Column("tinyint", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("int", { name: "animalsTypeId", nullable: true })
  animalsTypeId: number | null;

  @Column("varchar", { name: "petBreeds", nullable: true, length: 100 })
  petBreeds: string | null;

  @Column("varchar", { name: "petAge", nullable: true, length: 11 })
  petAge: string | null;

  @Column("int", { name: "petWeightId", nullable: true })
  petWeightId: number | null;

  @Column("int", { name: "createBy", nullable: true })
  createBy: number | null;

  @Column("int", { name: "modifiedBy", nullable: true })
  modifiedBy: number | null;

  @Column("datetime", { name: "createDate", nullable: true })
  createDate: Date | null;

  @Column("timestamp", { name: "modifiedDete", nullable: true })
  modifiedDete: Date | null;

  @Column("tinyint", { name: "isDelete", nullable: true, width: 1 })
  isDelete: boolean | null;
}
