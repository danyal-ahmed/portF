import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  techStack: string[];

  // Changed from @IsUrl() so you can pass text like "Android App"
  @IsString()
  @IsOptional()
  githubUrl?: string;

  // Changed from @IsUrl()
  @IsString()
  @IsOptional()
  liveUrl?: string;

  // Added to accept the image URL from your Angular form
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}
