import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop([String])
  techStack!: string[];

  @Prop()
  githubUrl?: string;

  @Prop()
  liveUrl?: string;

  @Prop()
  imageUrl?: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
