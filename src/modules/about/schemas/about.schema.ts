import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Sub-schema for the timeline array
class TimelineItem {
  @Prop({ required: true }) year!: string;
  @Prop({ required: true }) title!: string;
  @Prop({ required: true }) description!: string;
}

@Schema({ timestamps: true })
export class About extends Document {
  @Prop({
    required: true,
    default:
      'Full-stack software engineer specializing in enterprise backend architecture...',
  })
  intro!: string;

  @Prop({
    required: true,
    default: "<p>I'm a full-stack software engineer...</p>",
  })
  longerVersion!: string;

  @Prop({
    type: [String],
    default: ['Node.js & NestJS', 'Laravel', 'React & Angular'],
  })
  skills!: string[];

  @Prop({ type: [TimelineItem], default: [] })
  timeline!: TimelineItem[];
}

export const AboutSchema = SchemaFactory.createForClass(About);
