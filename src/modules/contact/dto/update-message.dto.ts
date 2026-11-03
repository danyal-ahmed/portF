import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto.js';

export class UpdateContactDto extends PartialType(CreateMessageDto) {}
