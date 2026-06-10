import { Controller, Post, Body, Request, UseGuards, Get, HttpCode } from '@nestjs/common';
import { ListsService } from './lists.service';
import { AddMovieDto } from './dto/add-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { RemoveMovieDto } from './dto/remove-movie.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Lists')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('lists')
export class ListsController {
  constructor(private listsService: ListsService) {}

  @Post('add-movie')
  @ApiOperation({ summary: 'Add a movie to a list' })
  @ApiResponse({ status: 201, description: 'The movie has been successfully added to the list.' })
  addMovie(@Body() addMovieDto: AddMovieDto, @Request() req) {
    const userId = req.user.id;
    return this.listsService.addMovieToList(userId, addMovieDto);
  }

  @Get('my-lists')
  @ApiOperation({ summary: 'Get all lists for the current user' })
  @ApiResponse({ status: 200, description: 'Return all lists for the user.' })
  getMyLists(@Request() req) {
    const userId = req.user.id;
    return this.listsService.getLists(userId);
  }

  @Post('remove-movie')
  @HttpCode(200)
  @ApiOperation({ summary: 'Remove a movie from a list' })
  @ApiResponse({ status: 200, description: 'The movie has been successfully removed from the list.' })
  removeMovie(@Body() removeMovieDto: RemoveMovieDto, @Request() req) {
    const userId = req.user.id;
    return this.listsService.removeMovieFromList(userId, removeMovieDto);
  }
}
