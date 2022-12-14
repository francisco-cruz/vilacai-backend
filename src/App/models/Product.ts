import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { Secao } from "./Secao";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 55})
    name: string

    @Column({type: 'decimal', precision: 5, scale: 2, default: 0})
    preco: number

    @Column({type: "boolean",default: true})
    pro_disponivel: boolean

    @Column({type: 'text'})
    pro_imagem: string

    @ManyToOne(type => Secao) @JoinColumn()
    secao: Secao

    @CreateDateColumn({name: 'create_at'})
    created_at: Date

    @UpdateDateColumn({name: 'updated_at'})
    updated_at: Date
};