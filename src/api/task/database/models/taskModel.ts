import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { UserModel } from "../../../user/database/models/userModel";

@Entity()
export class TaskModel {
    @PrimaryGeneratedColumn('increment')
    readonly id: number

    @Column()
    description: string;

    @Column()
    term: Date;

    @Column()
    userId: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date

    @Column({
        nullable: true
    })
    finishedAt: Date

    @ManyToOne(() => UserModel, (user) => user.tasks)
    user: UserModel
    
    constructor(props: Omit<TaskModel, 'id'>) {
        Object.assign(this, props)
    }
}