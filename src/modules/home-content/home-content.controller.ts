import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { HomeContentService } from './home-content.service';
import { HomeContentDto } from './dto/home-content.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('home-content')
export class HomeContentController {
  constructor(private readonly homeContentService: HomeContentService) {}

  @Get()
  getContent() {
    return this.homeContentService.getContent(); // Public
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateContent(@Body() dto: HomeContentDto) {
    return this.homeContentService.updateContent(dto); // Protected
  }
}
