import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SynaraComment } from './entity/synara-comment.entity';
import { Repository } from 'typeorm';
import { SynaraCommentCreateDto } from './dto/synara-comment-create.dto';
import { User } from '../users/entities/users.entity';
import { SynaraCommentUpdateDto } from './dto/synara-comment-update.dto';

@Injectable()
export class SynaraCommentService {
  constructor(
    @InjectRepository(SynaraComment)
    private readonly commentRepository: Repository<SynaraComment>,
  ) {}
  async create(createDto: SynaraCommentCreateDto, user: User) {
    if (!(createDto.rating >= 0)) {
      throw new BadRequestException('Invalid rating');
    }
    try {
      const synaraCommentToCreate = this.commentRepository.create({
        ...createDto,
        author: user,
      });

      return await this.commentRepository.save(synaraCommentToCreate);
    } catch (e) {
      throw new BadRequestException('incorrect data');
    }
  }

  async getAll(options: { limit?: number } = {}): Promise<SynaraComment[]> {
    const queryBuilder = this.commentRepository.createQueryBuilder('synara-comment')
        .leftJoinAndSelect('synara-comment.author', 'author')

    if (options.limit !== undefined) {
      queryBuilder.take(options.limit);
    }

    return queryBuilder.getMany();
  }


  async update(id: number, updateDto: SynaraCommentUpdateDto) {
    if (updateDto.rating >= 0) {
      await this.commentRepository.update(id, updateDto);
      const result = await this.commentRepository.findOne({ where: { id } });
      if (!result) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }
      return result;
    } else {
      throw new BadRequestException('incorrect rating');
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
