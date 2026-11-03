import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const newMessage = new this.messageModel(createMessageDto);
    return newMessage.save();
  }

  // NEW: Fetch all messages, newest first
  async findAll(): Promise<Message[]> {
    return this.messageModel.find().sort({ createdAt: -1 }).exec();
  }

  // NEW: Delete a message
  async remove(id: string): Promise<void> {
    const result = await this.messageModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Message not found');
  }

  // NEW: Update read status
  async updateReadStatus(id: string, isRead: boolean): Promise<Message> {
    const updatedMessage = await this.messageModel
      .findByIdAndUpdate(id, { isRead }, { new: true })
      .exec();

    if (!updatedMessage) throw new NotFoundException('Message not found');
    return updatedMessage;
  }
}
