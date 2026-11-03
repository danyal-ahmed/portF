import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  content!: string;

  @Prop({ default: false })
  isRead!: boolean; // This will help you track unread messages in the admin panel
}

export const MessageSchema = SchemaFactory.createForClass(Message);
