import { Controller, Post, Body, Request, UseGuards, Get, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ListsService } from './lists.service';
import { AddMovieDto } from './dto/add-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { RemoveMovieDto } from './dto/remove-movie.dto';

@ApiTags('Lists')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('lists')
export class ListsController {
  constructor(private listsService: ListsService) {}

  @ApiOperation({ summary: 'Add a movie to a list (WANT_TO_WATCH or WATCHED)' })
  @Post('add-movie')
  addMovie(@Body() addMovieDto: AddMovieDto, @Request() req) {
    const userId = req.user.id;
    return this.listsService.addMovieToList(userId, addMovieDto);
  }

  @ApiOperation({ summary: 'Retrieve lists and movies for the authenticated user' })
  @Get('my-lists')
  getMyLists(@Request() req) {
    const userId = req.user.id;
    return this.listsService.getLists(userId);
  }

  @ApiOperation({ summary: 'Remove a movie from a list' })
  @Post('remove-movie')
  @HttpCode(200)
  removeMovie(@Body() removeMovieDto: RemoveMovieDto, @Request() req) {
    const userId = req.user.id;
    return this.listsService.removeMovieFromList(userId, removeMovieDto);
  }
}
