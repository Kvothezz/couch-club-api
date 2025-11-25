import { Injectable, NotFoundException } from '@nestjs/common';
import { ListsService } from 'src/lists/lists.service';

interface MatchData {
  directMatches: number[];
  affinityScore: number;
}

interface Session {
  creatorUserId: string;
  status: 'pending' | 'completed';
  result: MatchData | null;
}

@Injectable()
export class MatchService {

  private sessions = new Map<string, Session>();

  constructor(private listsService: ListsService) {}

  createSession(creatorUserId: string): string {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    this.sessions.set(code, {
      creatorUserId: creatorUserId,
      status: 'pending',
      result: null,
    });

    setTimeout(() => {
      this.sessions.delete(code);
    }, 1000 * 60 * 5);

    return code;
  }

  getSessionStatus(code: string): Session {
    const session = this.sessions.get(code);
    if (!session) {
      throw new NotFoundException('Sessão não encontrada ou expirada.');
    }
    return session;
  }

  async joinSession(joinerUserId: string, code: string) {
    const session = this.sessions.get(code);

    if (!session || session.status === 'completed') {
      throw new NotFoundException('Sessão não encontrada, expirada ou já utilizada.');
    }

    if (session.creatorUserId === joinerUserId) {
      throw new NotFoundException('Você não pode dar match consigo mesmo.');
    }

    const matchResult = await this.calculateMatch(
      session.creatorUserId,
      joinerUserId,
    );


    this.sessions.set(code, {
      ...session,
      status: 'completed',
      result: matchResult,
    });

    return matchResult;
  }

  private async calculateMatch(userId1: string, userId2: string) {
    const listsUser1 = await this.listsService.getLists(userId1);
    const listsUser2 = await this.listsService.getLists(userId2);

    const wantList1 = listsUser1.find(list => list.name === 'WANT_TO_WATCH')?.movies.map(movie => movie.tmdbId) || [];
    const wantList2 = listsUser2.find(list => list.name === 'WANT_TO_WATCH')?.movies.map(movie => movie.tmdbId) || [];

    const watchedList1 = listsUser1.find(list => list.name === 'WATCHED')?.movies.map(movie => movie.tmdbId) || [];
    const watchedList2 = listsUser2.find(list => list.name === 'WATCHED')?.movies.map(movie => movie.tmdbId) || [];
    
    const directMatches = wantList1.filter(tmdbId => wantList2.includes(tmdbId));

    const watchedSet1 = new Set(watchedList1);
    const watchedSet2 = new Set(watchedList2);
    
    const intersection = new Set([...watchedSet1].filter(id => watchedSet2.has(id)));
    const union = new Set([...watchedSet1, ...watchedSet2]);

    let affinityScore = 0;
    if (union.size > 0) {
      affinityScore = intersection.size / union.size;
    }
    
    return {
      directMatches, 
      affinityScore,
    };
  }
}