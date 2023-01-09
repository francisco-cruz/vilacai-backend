import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text', unique: true})
    file_src: string

    // @OneToOne(() => (Product), (product) => product.image) @JoinColumn()
    // product: Product

    @CreateDateColumn({name: 'created_at'})
    created_at: Date

    @UpdateDateColumn({name: 'updated_at'})
    updated_at: Date
};