import { Column, Entity } from "typeorm";

@Entity("month", { schema: "pet-appointment" })
export class Month {
  @Column("int", { name: "id", nullable: true })
  id: number | null;

  @Column("varchar", { name: "month", nullable: true, length: 55 })
  month: string | null;

  @Column("tinyint", { name: "is_active", nullable: true })
  isActive: number | null;

  @Column("tinyint", { name: "is_delete", nullable: true })
  isDelete: number | null;
}
