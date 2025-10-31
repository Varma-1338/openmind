export type LeaderboardEntry = {
  rank: number;
  name: string;
  streak: number;
};

export const leaderboardData: Omit<LeaderboardEntry, "rank">[] = [
  { name: 'CuriousGeorge', streak: 145 },
  { name: 'LearnMachine', streak: 132 },
  { name: 'You', streak: 0 },
  { name: 'InfoSeeker', streak: 118 },
  { name: 'QuestMaster', streak: 105 },
  { name: 'DeepDive', streak: 98 },
  { name: 'Synapse', streak: 85 },
];
