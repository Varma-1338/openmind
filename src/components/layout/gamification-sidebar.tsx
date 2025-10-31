import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { leaderboardData } from "@/lib/mock-data";
import { Trophy, Flame } from "lucide-react";

type GamificationSidebarProps = {
  userStreak: number;
};

export function GamificationSidebar({ userStreak }: GamificationSidebarProps) {
  const updatedLeaderboard = leaderboardData
    .map((user) => (user.name === "You" ? { ...user, streak: userStreak } : user))
    .sort((a, b) => b.streak - a.streak)
    .map((user, index) => ({ ...user, rank: index + 1 }));
  
  const userRank = updatedLeaderboard.find(u => u.name === 'You')?.rank;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline">
          <Trophy className="h-6 w-6 text-primary" />
          Leaderboard
        </CardTitle>
        <CardDescription>See how you rank among other learners!</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Learner</TableHead>
              <TableHead className="text-right">Streak</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {updatedLeaderboard.map((user) => (
              <TableRow key={user.rank} className={user.name === 'You' ? 'bg-primary/10' : ''}>
                <TableCell className="font-medium">{user.rank}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell className="text-right flex justify-end items-center gap-1">
                  {user.streak} <Flame className="h-4 w-4 text-orange-500" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
