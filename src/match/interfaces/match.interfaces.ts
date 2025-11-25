export interface MatchData {
  directMatches: number[];
  affinityScore: number;
}

export interface MatchSession {
  creatorUserId: string;
  status: 'pending' | 'completed';
  result: MatchData | null;
}