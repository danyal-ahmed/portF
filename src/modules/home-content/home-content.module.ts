import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeContentService } from './home-content.service';
import { HomeContentController } from './home-content.controller';
import { HomeContent, HomeContentSchema } from './schemas/home-content.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HomeContent.name, schema: HomeContentSchema },
    ]),
  ],
  controllers: [HomeContentController],
  providers: [HomeContentService],
})
export class HomeContentModule {}
