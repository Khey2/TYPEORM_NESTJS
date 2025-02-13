import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    title: string;

    @Column('numeric',{
        default: 0
    })
    price: number;
    
    @Column({
        type: 'text',
        nullable: true
    })
    description: string


    @Column({
        unique: true,
        type: 'text'
    })
    slug: string

    @Column('int',{
        default: 0
    })
    stock: number;

    @Column({
        type: "text",
        transformer: {
            to: (value: string[]) => JSON.stringify(value), // Convierte el array a JSON antes de almacenarlo
            from: (value: string) => JSON.parse(value) // Convierte el JSON a un array cuando lo recuperas
        }
    })
    sizes: string[]

    @Column('text')
    gender: string;
}
