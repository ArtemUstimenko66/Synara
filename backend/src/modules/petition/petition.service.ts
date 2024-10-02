import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { Petition } from "./petition.entity";
import { CreatePetitionDto } from "./dtos/create-petition.dto";
import { PetitionTopic } from "./enums/petition-topic.enum";
import { Cron, CronExpression } from "@nestjs/schedule";

export interface FindPetitionOptions {
    query: string;
    topics?: PetitionTopic[];
    title: string;
    sortOrder?: 'ASC' | 'DESC';
    limit: number;
    offset: number;
}

@Injectable()
export class PetitionService {
    constructor(
        @InjectRepository(Petition)
        private petitionRepository: Repository<Petition>,
    ) {}

    async create(
        createPetitionDto: CreatePetitionDto,
        user: User,
    ): Promise<Petition> {
        const petition = this.petitionRepository.create({
            ...createPetitionDto,
            author: user,
        });
        return this.petitionRepository.save(petition);
    }

    async findOne(id: number): Promise<Petition> {
        const petition = await this.petitionRepository.findOne(
            { where: { id },
            });
        if (!petition) {
            throw new BadRequestException(`Petition with id ${id} not found`);
        }
        return petition;
    }

    async findPetitions(
        options: Partial<FindPetitionOptions> = {},
    ): Promise<Petition[]> {
        const qb = this.petitionRepository
            .createQueryBuilder('petition')
            .leftJoinAndSelect('petition.author', 'author')

        if(options.title) {
            qb.andWhere('petition.title ILIKE :title', {
                title: `%{options.title}%`,
            });
        }

        if (options.topics && options.topics.length > 0) {
            qb.andWhere('petition.topic IN (:...topics)', {
                topics: options.topics,
            });
        }

        // const sortOrder =
        //     options.sortOrder && ['ASC', 'DESC'].includes(options.sortOrder)
        //         ? options.sortOrder
        //         : 'DESC';
        //
        // qb.orderBy('announcement.date_posted', sortOrder)
        //     .take(options.limit)
        //     .skip(options.offset);

        return qb.getMany();
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async updatePetitionStatuses() {
        const petitions = await this.petitionRepository.find();

        for(const petition of petitions) {
            await this.updatePetitionStatus(petition.id);
        }
    }

    async updatePetitionStatus(id: number) {
        const petition = await this.petitionRepository.findOne({
            where: { id },
        });
        if (!petition) {
            return;
        }

        const createdAt = petition.creationDate;
        const isCompletedDate = new Date(createdAt);
        isCompletedDate.setMonth(isCompletedDate.getMonth() + 3);

        if(new Date() >= isCompletedDate) {
            petition.isCompleted = true;
            await this.petitionRepository.save(petition);
        }
    }
}
