import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Filling {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 45, unique: true})
    name: string

    @Column({type: 'boolean', default: true})
    available: boolean

    @Column({type: 'decimal', precision: 5, scale: 2, default: 0})
    price: number

    @CreateDateColumn({name: 'created_at'})
    created_at: Date

    @UpdateDateColumn({name: 'updated_at'})
    updated_at: Date
};