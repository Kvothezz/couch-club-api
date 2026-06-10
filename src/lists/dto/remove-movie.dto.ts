import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class RemoveMovieDto {
  @ApiProperty({ description: 'The TMDB ID of the movie', example: 550 })
  @IsInt()
  @IsNotEmpty()
  tmdbId!: number;

  @ApiProperty({ description: 'The type of list to remove the movie from', example: 'WANT_TO_WATCH' })  
  @IsString()
  @IsNotEmpty()
  @IsIn(['WANT_TO_WATCH', 'WATCHED'])
  listType!: 'WANT_TO_WATCH' | 'WATCHED';
}