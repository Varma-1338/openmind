'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Trophy, Award } from 'lucide-react';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { useUser } from '@/firebase';

type LeaderboardEntry = {
    id: string;
    userName: string;
    points: number;
}

export default function LeaderboardPage() {
    const firestore = useFirestore();
    const auth = useAuth();
    const router = useRouter();
    const { user, isUserLoading } = useUser();

    const curiosityPointsRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'curiosity_points'), orderBy('points', 'desc'));
    }, [firestore]);

    const { data: leaderboardData, isLoading: isLeaderboardLoading } = useCollection<LeaderboardEntry>(curiosityPointsRef);
    
    const userPointsDocRef = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return collection(firestore, 'curiosity_points');
    }, [firestore, user]);
    
    const { data: userPointsData } = useCollection<{ points: number }>(userPointsDocRef);
    const userPoints = userPointsData?.find(d => d.id === user?.uid)?.points ?? 0;

    const handleSignOut = async () => {
        if (auth) {
            await signOut(auth);
            router.push('/auth');
        }
    };
    
    const handleHomeClick = () => {
        router.push('/');
    }

    if (isUserLoading || isLeaderboardLoading) {
        return <LoadingSpinner />;
    }

    const getRankSuffix = (rank: number) => {
        if (rank > 10 && rank < 20) return 'th';
        const lastDigit = rank % 10;
        switch (lastDigit) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    const getTrophy = (rank: number) => {
        switch(rank) {
            case 1: return <Trophy className="text-yellow-500 fill-yellow-400" />;
            case 2: return <Trophy className="text-gray-400 fill-gray-300" />;
            case 3: return <Trophy className="text-orange-600 fill-orange-500" />;
            default: return <Award className="text-muted-foreground" />;
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header points={userPoints} onSignOut={handleSignOut} onHomeClick={handleHomeClick} onHistoryClick={() => router.push('/')} />
            <main className="flex-1 p-4 md:p-8">
                <div className="mx-auto max-w-2xl space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-3xl font-bold font-headline">
                                <Trophy className="h-8 w-8 text-primary" />
                                Curiosity Leaderboard
                            </CardTitle>
                            <CardDescription>See who has the highest curiosity points! Keep learning to climb the ranks.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           {leaderboardData ? (
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px]">Rank</TableHead>
                                        <TableHead>Learner</TableHead>
                                        <TableHead className="text-right">Points</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {leaderboardData.map((entry, index) => (
                                        <TableRow key={entry.id} className={entry.id === user?.uid ? 'bg-primary/10' : ''}>
                                            <TableCell className="font-bold text-lg flex items-center gap-2">
                                                {getTrophy(index + 1)}
                                                <span>
                                                    {index + 1}{getRankSuffix(index + 1)}
                                                </span>
                                            </TableCell>
                                            <TableCell>{entry.userName} {entry.id === user?.uid ? '(You)' : ''}</TableCell>
                                            <TableCell className="text-right font-bold">{entry.points}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                             </Table>
                           ) : (
                            <p>Leaderboard data is not available yet.</p>
                           )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
