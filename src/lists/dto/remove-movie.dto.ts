import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class RemoveMovieDto {
  @IsInt()
  @IsNotEmpty()
  tmdbId: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['WANT_TO_WATCH', 'WATCHED'])
  listType: 'WANT_TO_WATCH' | 'WATCHED';
}