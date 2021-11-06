import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ManufacturerType } from "common";

@Entity()
export class Manufacturer extends BaseEntity implements ManufacturerType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
