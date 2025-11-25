import { Controller, Post, Body, Request, UseGuards, Get, HttpCode } from '@nestjs/common';
import { ListsService } from './lists.service';
import { AddMovieDto } from './dto/add-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { RemoveMovieDto } from './dto/remove-movie.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('lists')
export class ListsController {
  constructor(private listsService: ListsService) {}

  @Post('add-movie')
  addMovie(@Body() addMovieDto: AddMovieDto, @Request() req) {
    const userId = req.user.id; 
    return this.listsService.addMovieToList(userId, addMovieDto);
  }

  @Get('my-lists')
  getMyLists(@Request() req) {
    const userId = req.user.id;
    return this.listsService.getLists(userId);
  }

  @Post('remove-movie')
  @HttpCode(200)
  removeMovie(@Body() removeMovieDto: RemoveMovieDto, @Request() req) {
    const userId = req.user.id;
    return this.listsService.removeMovieFromList(userId, removeMovieDto);
  }
}