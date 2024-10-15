import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CommentsCreateDto } from './dto/comments-create.dto';
import { User } from '../users/entities/users.entity';
import { Comment } from './entity/comments.entity';
import { CommentsUpdateDto } from './dto/comments-update.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createComment(commentCreateDto: CommentsCreateDto, author: User) {
    try {
      const comment = this.commentRepository.create({
        author,
        ...commentCreateDto,
      });
      return this.commentRepository.save(comment);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async updateComment(id: number, commentUpdateDto: CommentsUpdateDto) {
    await this.commentRepository.update(id, commentUpdateDto);
    const updateComment = this.commentRepository.findOne({
      where: { id },
    });

    if (!updateComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return updateComment;
  }

  async deleteComment(id: number) {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  async getAllComments() {
    return await this.commentRepository.find({
      relations: ['author', 'volunteer', 'volunteer.user'],
    });
  }


  async getComment(id: number) {
    return await this.commentRepository.findOne({
      where: { id },
      relations: ['author', 'volunteer', 'volunteer.user'],
    });
  }

  async getCommentsByVolunteerId(userId: number): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: { volunteer: { id: userId } },
      relations: ['author', 'volunteer'],
    });
  }

}
