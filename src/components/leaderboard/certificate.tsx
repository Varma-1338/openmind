'use client';

import React from 'react';
import { Logo } from '@/components/common/icons';
import { format } from 'date-fns';

type CertificateProps = {
    name: string;
    rank: number;
    points: number;
    date: Date;
};

export const Certificate = React.forwardRef<HTMLDivElement, CertificateProps>(({ name, rank, points, date }, ref) => {
    // This component is rendered off-screen and used for PDF generation
    return (
        <div ref={ref} className="absolute -left-[9999px] top-auto w-[800px] h-[600px] bg-background text-foreground p-8">
            <div className="w-full h-full border-4 border-primary flex flex-col items-center justify-center text-center p-8 bg-card">
                <Logo className="h-16 w-16 text-primary mb-4" />
                <h1 className="text-2xl font-bold uppercase tracking-widest text-accent">
                    Certificate of Achievement
                </h1>
                <p className="text-lg mt-4">
                    This certificate is proudly presented to
                </p>
                <p className="text-5xl font-bold text-primary my-6">
                    {name}
                </p>
                <p className="text-lg">
                    For achieving <span className="font-bold">Rank #{rank}</span> on the Curiosity Leaderboard
                </p>
                <p className="text-lg">
                    with an outstanding score of <span className="font-bold">{points} Curiosity Points</span>.
                </p>

                <div className="mt-auto flex justify-between w-full text-sm">
                    <div>
                        <p className="font-bold border-t border-foreground pt-1">Date</p>
                        <p>{format(date, 'MMMM do, yyyy')}</p>
                    </div>
                    <div>
                        <p className="font-bold border-t border-foreground pt-1">OpenMind Platform</p>
                        <p>Your Personal AI Guide</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

Certificate.displayName = 'Certificate';
