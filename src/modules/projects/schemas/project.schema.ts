import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Automatically generates createdAt and updatedAt
export class Project extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  techStack: string[];

  @Prop({ trim: true })
  githubUrl?: string;

  @Prop({ trim: true })
  liveUrl?: string;

  @Prop({ default: false })
  isFeatured: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
