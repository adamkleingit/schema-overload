import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { BodyType, CarType } from "common";
import { Manufacturer } from "./Manufacturer";

@Entity()
export class Car extends BaseEntity implements CarType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bodyType: BodyType;

  @ManyToOne(() => Manufacturer, { eager: true })
  manufacturer: Manufacturer;

  @Column()
  manufactureDate: Date;
}
