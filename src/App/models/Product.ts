import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany
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

    @Column({type: "integer", default: 1})
    qntdMaxFilling: number

    @Column({type: "boolean",default: true})
    available: boolean

    @Column({type: 'text', nullable: true})
    image: string

    @ManyToMany(() => ProductType) @JoinTable()
    types: ProductType[]

    @ManyToOne(() => Section, (section) => section.products) @JoinColumn()
    section: Section

    @ManyToMany(() => Filling) @JoinTable()
    fillings: Filling[]

    @CreateDateColumn({name: 'created_at'})
    created_at: Date

    @UpdateDateColumn({name: 'updated_at'})
    updated_at: Date
};