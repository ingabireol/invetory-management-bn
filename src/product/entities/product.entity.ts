import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'product'})
export class Product {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column({unique: true})
    name: string;

    @Column({nullable: false})
    quantity: number;

    @Column({nullable: false})
    category: String

}
