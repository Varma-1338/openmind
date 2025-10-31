export type LeaderboardEntry = {
  rank: number;
  name: string;
  points: number;
  isUser?: boolean;
};

// This file is used to generate a mock leaderboard.
export const leaderboardData: Omit<LeaderboardEntry, 'rank'>[] = [
  { name: 'Surendra', points: 1250 },
  { name: 'LearnerTwo', points: 950 },
];
