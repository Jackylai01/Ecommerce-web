export interface RankingResult {
  _id: {
    userId: string;
    mode: string;
  };
  score: number;
}

export class RankingResponse {
  userId!: string;
  name!: string;
  mode!: string;
  score!: number;
}
