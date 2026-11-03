import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust path if needed

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // PUBLIC: Anyone can submit a message
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.contactService.create(createMessageDto);
  }

  // PROTECTED: Only Admin can view messages
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  // PROTECTED: Only Admin can delete messages
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }

  // PROTECTED: Only Admin can mark as read/unread
  @UseGuards(JwtAuthGuard)
  @Patch(':id/read')
  updateReadStatus(@Param('id') id: string, @Body('isRead') isRead: boolean) {
    return this.contactService.updateReadStatus(id, isRead);
  }
}
