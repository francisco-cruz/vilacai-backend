import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Secao {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 45})
    name: string

    @CreateDateColumn({name: 'create_at'})
    created_at: Date

    @UpdateDateColumn({name: 'updated_at'})
    updated_at: Date
}