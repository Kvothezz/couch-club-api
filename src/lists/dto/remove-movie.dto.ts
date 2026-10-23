import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveMovieDto {
  @ApiProperty({ example: 550, description: 'TMDB movie ID' })
  @IsInt()
  @IsNotEmpty()
  tmdbId!: number;

  @ApiProperty({
    example: 'WANT_TO_WATCH',
    enum: ['WANT_TO_WATCH', 'WATCHED'],
    description: 'Target list name',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['WANT_TO_WATCH', 'WATCHED'])
  listType!: 'WANT_TO_WATCH' | 'WATCHED';
}
