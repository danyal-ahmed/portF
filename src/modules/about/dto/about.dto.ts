import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class TimelineItemDto {
  @IsString() @IsNotEmpty() year!: string;
  @IsString() @IsNotEmpty() title!: string;
  @IsString() @IsNotEmpty() description!: string;
}

export class AboutDto {
  @IsString() @IsNotEmpty() intro!: string;
  @IsString() @IsNotEmpty() longerVersion!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimelineItemDto)
  @IsOptional()
  timeline?: TimelineItemDto[];
}
