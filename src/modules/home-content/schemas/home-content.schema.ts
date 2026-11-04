import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class HomeContent extends Document {
  @Prop({ required: true, default: 'Danyal Ahmed' })
  headline!: string;

  @Prop({
    required: true,
    default: 'Lead Backend Developer & Full-Stack Engineer',
  })
  subheadline!: string;

  @Prop({
    required: true,
    default: 'Building scalable enterprise SaaS and fintech data pipelines.',
  })
  description!: string;

  @Prop({
    required: true,
    default: 'New Opportunities',
  })
  availableTo!: string;
}

export const HomeContentSchema = SchemaFactory.createForClass(HomeContent);
