import { IsString, IsNotEmpty } from 'class-validator';

export class HomeContentDto {
  @IsString()
  @IsNotEmpty()
  headline!: string;

  @IsString()
  @IsNotEmpty()
  subheadline!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  availableTo!: string;
}
