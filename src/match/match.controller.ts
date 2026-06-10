import { Controller, Post, Request, UseGuards, Param, HttpException, HttpStatus, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MatchService } from './match.service';
import { MatchSession } from './interfaces/match.interfaces';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Matches')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new match session' })
  @ApiResponse({ status: 201, description: 'Return the generated session code.' })
  async createSession(@Request() req) {
    const creatorUserId = req.user.id;
    const sessionCode = this.matchService.createSession(creatorUserId);

    return { sessionCode };
  }

  @Post('join/:code')
  @ApiOperation({ summary: 'Join an existing match session' })
  @ApiResponse({ status: 201, description: 'Return the common movies between the two users.' })
  @ApiResponse({ status: 404, description: 'Session not found or already finished.' })
  async joinSession(@Param('code') code: string, @Request() req) {
    const joinerUserId = req.user.id;

    try {
      const matchResult = await this.matchService.joinSession(joinerUserId, code.toUpperCase());
      return matchResult;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('status/:code')
  @ApiOperation({ summary: 'Get the status of a match session' })
  @ApiResponse({ status: 200, description: 'Return the session details.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async getSessionStatus(@Param('code') code: string): Promise<MatchSession> {
    try {
      return this.matchService.getSessionStatus(code.toUpperCase());
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
