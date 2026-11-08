import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About } from './schemas/about.schema';
import { AboutDto } from './dto/about.dto';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(About.name)
    private aboutContentModel: Model<About>,
  ) {}

  async getContent(): Promise<About> {
    let content = await this.aboutContentModel.findOne().exec();
    if (!content) {
      content = await this.aboutContentModel.create({});
    }
    return content;
  }

  async updateContent(dto: AboutDto): Promise<About> {
    const content = await this.getContent();

    const updatedContent = await this.aboutContentModel
      .findOneAndUpdate({ _id: content._id }, dto, { new: true })
      .exec();

    if (!updatedContent) {
      throw new NotFoundException('About content failed to update.');
    }

    return updatedContent;
  }
}
