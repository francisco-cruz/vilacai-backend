import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductType {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 45})
    type: string

    @OneToMany(() => Product, (product) => product.section)
    products: Product[]

    @ManyToOne(() => Product, (product) => product.types) @JoinColumn()
    product: Product

    @CreateDateColumn({name: 'created_at'})
    created_at: Date

    @UpdateDateColumn({name: 'updated_at'})
    updated_at: Date
}