import { Entity, Generated ,PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from "typeorm"
import { Task } from "./Task"
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Generated("uuid")
    userId: string

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    async generateJWT(): Promise<string> {
        const payload = { id: this.userId };
        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: process.env.JWT_EXPIRE };

        return jwt.sign(payload, secret, options);
    }

    async checkPassword(password: string): Promise<boolean> {
        return bcrypt.compareSync(password, this.password);
    }

    

}
