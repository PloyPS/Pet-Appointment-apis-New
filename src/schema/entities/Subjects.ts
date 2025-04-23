import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("subjects", { schema: "pet-appointment" })
export class Subjects {
  @PrimaryGeneratedColumn()
  id: number | null;

  @Column("varchar", { name: "subject", nullable: true, length: 255 })
  subject: string | null;

  @Column("varchar", { name: "is_delete", nullable: true, length: 255 })
  isDelete: string | null;
}
