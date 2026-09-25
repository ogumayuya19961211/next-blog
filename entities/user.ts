import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 255})
    name!: string;

    @Column({length: 255, unique:true})
    email!:string;

    @Column({length: 255})
    password!:string;

    @CreateDateColumn()
    createdAt!: Date;    
}