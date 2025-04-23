import { Column, Entity } from "typeorm";

@Entity("animalsType", { schema: "pet-appointment" })
export class AnimalsType {
  @Column("int", { name: "id", nullable: true })
  id: number | null;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("int", { name: "is_delete", nullable: true })
  isDelete: number | null;
}
