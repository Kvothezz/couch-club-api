import { Controller, Post, Request, UseGuards, Param, HttpException, HttpStatus, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MatchService } from './match.service';
import { MatchSession } from './interfaces/match.interfaces';

@UseGuards(AuthGuard('jwt')) 
@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Post('create')
  async createSession(@Request() req) {
    const creatorUserId = req.user.id;
    const sessionCode = this.matchService.createSession(creatorUserId);
    
    return { sessionCode };
  }

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

  @Get('status/:code')
  async getSessionStatus(@Param('code') code: string):Promise <MatchSession> {
    try {
      return this.matchService.getSessionStatus(code.toUpperCase());
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}