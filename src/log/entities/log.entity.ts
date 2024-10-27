import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Log{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventType: string;

    @Column()
    productId: number;

    @Column({nullable: true})
    productName: string;

    @CreateDateColumn()
    timestamp: Date;

}