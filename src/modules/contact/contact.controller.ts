import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // Public endpoint: Allow max 3 requests per 60 seconds (60,000 ms)
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async submitMessage(@Body() createContactDto: CreateContactDto) {
    const result = await this.contactService.create(createContactDto);
    return {
      message: 'Your message has been sent successfully.',
      id: result._id,
    };
  }

  // Admin endpoint: Protected by JWT
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMessages() {
    return this.contactService.findAll();
  }

  // Admin endpoint: Protected by JWT
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/read')
  async markRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }
}
