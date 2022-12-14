import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    ManyToMany,
    JoinTable
} from "typeorm";
import { Section } from "./Section";
import { Filling } from "./Filling";
import { ProductType } from "./ProductType";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 55})
    name: string

    @Column({type: 'decimal', precision: 5, scale: 2, default: 0})
    price: number

    @Column({type: "boolean",default: true})
    available: boolean

    @Column({type: 'text', nullable: true})
    image: string

    @ManyToOne(() => ProductType, (productType) => productType.products) @JoinColumn()
    product_type: ProductType

    @ManyToOne(() => Section, (section) => section.products) @JoinColumn()
    section: Section

    @ManyToMany(() => Filling) @JoinTable()
    fillings: Filling[]

    @CreateDateColumn({name: 'created_at'})
    created_at: Date

    @UpdateDateColumn({name: 'updated_at'})
    updated_at: Date
};