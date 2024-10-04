import {
    Column, CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from "../users/entities/users.entity";
import { PetitionTopic } from "./enums/petition-topic.enum";

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
        example: 'Alex',
        description: 'Petition author name',
        type: String,
    })

    @Column({ type: 'varchar', length: 225, nullable: true })
    petitionAuthor: string;

    @Column({
        type: 'enum',
        enum: PetitionTopic,
        default: PetitionTopic.NO_SUBJECT,
    })
    topic: PetitionTopic[];

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
    @Column({ type: 'timestamp', nullable: true })
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

    @ApiProperty({
        example: false,
        description: 'Indicates whether the petition is completed',
        type: Boolean,
    })
    @Column({ type: 'boolean', default: false })
    is_completed: boolean;

    @ApiProperty({
        example: false,
        description: 'Indicates whether the petition is favorite',
        type: Boolean,
    })
    @Column({ type: 'boolean', default: false })
    is_favorite: boolean;

    @Column( { type: 'timestamp', nullable: true })
    deadline: Date;

    @ApiProperty({
        example: 0,
        description: 'Number of signatures for the petition',
        type: Number,
    })
    @Column({ type: 'int', default: 0})
    signatureCount: number;

    @ManyToOne(() => User, (user) => user.petitions)
    author: User;
}