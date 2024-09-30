export class CreateMessageDto {
  readonly chatId: number;
  readonly senderId: number;
  readonly content: string;
}
