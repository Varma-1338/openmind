'use client';

import { useFirestore, useCollection, useUser, useAuth, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Header } from '@/components/layout/header';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Trophy, Flame } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type UserProfile = {
  id: string;
  name: string;
  curiosityPoints: number;
  streak: number;
};

export default function LeaderboardPage() {
  const firestore = useFirestore();
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const usersCollectionRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'users'), orderBy('curiosityPoints', 'desc'), limit(10));
  }, [firestore]);

  const { data: users, isLoading } = useCollection<UserProfile>(usersCollectionRef);

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/auth');
    }
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  const rankedUsers = users?.map((user, index) => ({ ...user, rank: index + 1 })) || [];
  const currentUserProfile = users?.find(u => u.id === user?.uid);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        points={currentUserProfile?.curiosityPoints || 0}
        onSignOut={handleSignOut}
        onHomeClick={handleHomeClick}
        onHistoryClick={() => {}}
      />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <Card>
            <CardHeader className="text-center">
              <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
              <CardTitle className="text-4xl font-extrabold font-headline">Leaderboard</CardTitle>
              <CardDescription>See who has the most curiosity points!</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Rank</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rankedUsers.map((u) => (
                      <TableRow key={u.id} className={u.id === user?.uid ? 'bg-primary/10' : ''}>
                        <TableCell className="font-bold text-lg">{u.rank}</TableCell>
                        <TableCell>{u.name} {u.id === user?.uid && '(You)'}</TableCell>
                        <TableCell className="text-right font-semibold">{u.curiosityPoints}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
