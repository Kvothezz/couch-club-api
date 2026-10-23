import { Controller, Post, Request, UseGuards, Param, HttpException, HttpStatus, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MatchService } from './match.service';
import { MatchSession } from './interfaces/match.interfaces';

@ApiTags('Match')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @ApiOperation({ summary: 'Create a new match session (generates a 6-character code)' })
  @Post('create')
  async createSession(@Request() req) {
    const creatorUserId = req.user.id;
    const sessionCode = this.matchService.createSession(creatorUserId);

    return { sessionCode };
  }

  @ApiOperation({ summary: 'Join an existing match session and compute matching results' })
  @ApiParam({ name: 'code', description: '6-character match session code', example: 'AB12CD' })
  @Post('join/:code')
  async joinSession(@Param('code') code: string, @Request() req) {
    const joinerUserId = req.user.id;

    try {
      const matchResult = await this.matchService.joinSession(joinerUserId, code.toUpperCase());
      return matchResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Get current match session status and result via short polling' })
  @ApiParam({ name: 'code', description: '6-character match session code', example: 'AB12CD' })
  @Get('status/:code')
  async getSessionStatus(@Param('code') code: string): Promise<MatchSession> {
    try {
      return this.matchService.getSessionStatus(code.toUpperCase());
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
