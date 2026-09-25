import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Post{
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 255})
    title!: string;

    @Column('text')
    content!:string;

    @Column({default: false})
    published!:boolean;    

    @CreateDateColumn()
    createdAt!: Date;    

    @CreateDateColumn()
    updatedAt!: Date;

    @Column()
    userId!: number;

    @ManyToOne(() => User)
    @JoinColumn({name: 'userId'})
    user!: User;
}