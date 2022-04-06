import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { TaskModel } from "../../../task/database/models/taskModel";

@Entity()
export class UserModel {
  
  @PrimaryGeneratedColumn('increment')
  readonly id: number 

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  administrator: boolean;

  @OneToMany(() => TaskModel, (task) => task.user) 
  tasks: TaskModel[]

  constructor(props: Omit<UserModel, 'id'>) {
    Object.assign(this, props)
  }
}