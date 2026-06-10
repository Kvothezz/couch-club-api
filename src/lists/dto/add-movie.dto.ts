import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AddMovieDto {
  @ApiProperty({ description: 'The TMDB ID of the movie', example: 550 })
  @IsInt()
  @IsNotEmpty()
  tmdbId!: number;
  
  @ApiProperty({ description: 'The type of list to add the movie to', example: 'WANT_TO_WATCH' })
  @IsString()
  @IsNotEmpty()
  @IsIn(['WANT_TO_WATCH', 'WATCHED']) 
  listType!: 'WANT_TO_WATCH' | 'WATCHED';
}