import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HomeContent } from './schemas/home-content.schema';
import { HomeContentDto } from './dto/home-content.dto';

@Injectable()
export class HomeContentService {
  constructor(
    @InjectModel(HomeContent.name) private homeContentModel: Model<HomeContent>,
  ) {}

  async getContent(): Promise<HomeContent> {
    let content = await this.homeContentModel.findOne().exec();
    if (!content) {
      // Auto-create default content if database is empty
      content = await this.homeContentModel.create({});
    }
    return content;
  }

  async updateContent(dto: HomeContentDto): Promise<HomeContent> {
    const content = await this.getContent();

    const updatedContent = await this.homeContentModel
      .findOneAndUpdate({ _id: content._id }, dto, { new: true })
      .exec();

    if (!updatedContent) {
      throw new NotFoundException('Home content failed to update.');
    }

    return updatedContent;
  }
}
