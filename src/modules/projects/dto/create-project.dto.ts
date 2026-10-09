import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsUrl,
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

  @IsUrl()
  @IsOptional()
  githubUrl?: string;

  @IsUrl()
  @IsOptional()
  liveUrl?: string;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}
