import {
    Column, CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from "../users/entities/users.entity";

@Entity('petition')
export class Petition {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the petition',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Save the Forests',
        description: 'Title of the petition',
        type: String,
    })
    @Column({ type: 'varchar', length: 225, nullable: false })
    title: string;

    @ApiProperty({
        example: 'Save the Forests',
        description: 'Title of the petition',
        type: String,
    })
    @Column({ type: 'varchar', length: 225, nullable: false })
    petitionNumber: string;

    @ApiProperty({
        example: '2024-09-23T18:30:00.000Z',
        description: 'Date when the petition was created',
        type: Date,
    })
    @CreateDateColumn({ type: 'timestamp' })
    creationDate: Date;

    @ApiProperty({
        example: 'We request the government to take immediate action to save the forests...',
        description: 'Full text of the petition',
        type: String,
    })
    @Column({ type: 'text', nullable: false })
    text: string;

    @ApiProperty({
        example: 'https://example.com/petition/save-the-forests',
        description: 'Link to the petition',
        type: String,
    })
    @Column({ type: 'varchar', length: 500, nullable: false })
    link: string;

    @ApiProperty({
        example: false,
        description: 'Indicates whether the petition has a response',
        type: Boolean,
    })
    @Column({ type: 'boolean', default: false })
    hasResponse: boolean;

    @ApiProperty({
        example: '2024-10-15T12:00:00.000Z',
        description: 'Date when the petition was responded to, optional',
        type: Date,
        required: false,
    })
    @Column({ type: 'timestamp', nullable: true })
    responseDate?: Date;

    @ManyToOne(() => User, (user) => user.petitions)
    author: User;
}