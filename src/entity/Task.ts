import { Entity, Generated, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Generated("uuid")
    taskId: string

    @Column()
    title: string

    @Column()
    description: string

    @Column({ type: 'timestamp', nullable: true })
    doneTime: Date;    
    
    @CreateDateColumn({ type: 'timestamp' })
    notificationTime: Date
    
    @Column({ default: false })
    isCompleted: boolean

    @Column()
    userId: string

    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({ name: "userId" })
    user: User;

}
