import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { Petition } from "./petition.entity";
import { CreatePetitionDto } from "./dtos/create-petition.dto";
import {TypeHelp} from "../announcement/type-help.enum";
import {Announcement} from "../announcement/announcement.entity";

export interface FindPetitionOptions {
    query: string;
    types?: TypeHelp[];
    sortOrder?: 'ASC' | 'DESC';
    limit: number;
    offset: number;
    isUrgent?: boolean;
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
            .leftJoinAndSelect('petition.user', 'user')

        if (options.query && options.query.trim() !== '') {
            qb.andWhere('announcement.description ILIKE :query', {
                query: `%${options.query}%`,
            });
        }

        // filter by type help
        if (options.types && options.types.length > 0) {
            qb.andWhere('announcement.type_help IN (:...types)', {
                types: options.types,
            });
        }

        // filter by urgency
        if (options.isUrgent !== undefined) {
            qb.andWhere('announcement.is_urgent = :isUrgent', {
                isUrgent: options.isUrgent,
            });
        }

        const sortOrder =
            options.sortOrder && ['ASC', 'DESC'].includes(options.sortOrder)
                ? options.sortOrder
                : 'DESC';

        qb.orderBy('announcement.date_posted', sortOrder)
            .take(options.limit)
            .skip(options.offset);

        return qb.getMany();
    }
}
