import { Column, Entity } from "typeorm";

@Entity("days", { schema: "pet-appointment" })
export class Days {
  @Column("int", { name: "id", nullable: true })
  id: number | null;

  @Column("varchar", { name: "day", nullable: true, length: 55 })
  day: string | null;

  @Column("tinyint", { name: "is_active", nullable: true })
  isActive: number | null;

  @Column("tinyint", { name: "is_delete", nullable: true })
  isDelete: number | null;
}
