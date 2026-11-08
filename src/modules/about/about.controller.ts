import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutDto } from './dto/about.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust your path

@Controller('about-content')
export class AboutController {
  constructor(private readonly aboutContentService: AboutService) {}

  @Get()
  getContent() {
    return this.aboutContentService.getContent();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateContent(@Body() dto: AboutDto) {
    return this.aboutContentService.updateContent(dto);
  }
}
