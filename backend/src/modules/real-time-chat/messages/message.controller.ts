import {Controller, Get, Param, Query} from "@nestjs/common";
import {MessagesService} from "./messages.service";
import { Message } from "./message.entity";

@Controller('api/messages')
export class MessageController {
    constructor(private readonly messagesService: MessagesService) {}

    @Get(':chatId')
    async getMessagesByChatId(
        @Param('chatId') chatId: number,
        @Query('skip') skip: number = 0,
        @Query('take') take: number = 20,
    ) : Promise<Message[]> {
        return this.messagesService.findByChatId(chatId, skip, take);
    }
}