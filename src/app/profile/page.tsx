'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Header } from '@/components/layout/header';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { ProfileForm, type ProfileFormData } from '@/components/profile/profile-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userDocRef);

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/auth');
    }
  };
  
  const handleHomeClick = () => {
    router.push('/');
  }

  const handleProfileUpdate = (data: ProfileFormData) => {
    if (!userDocRef) return;
    
    const updatedData = {
        name: data.name,
        age: data.age,
        contact: data.contact,
    };

    updateDocumentNonBlocking(userDocRef, updatedData);

    toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
    });
  };

  if (isUserLoading || (user && isProfileLoading)) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // Redirect to auth page if not logged in
    if (typeof window !== 'undefined') {
        router.push('/auth');
    }
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header streak={0} onSignOut={handleSignOut} onHomeClick={handleHomeClick} />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Management</CardTitle>
                    <CardDescription>View and update your personal information.</CardDescription>
                </CardHeader>
                <CardContent>
                    {userProfile ? (
                        <ProfileForm userProfile={userProfile} onSubmit={handleProfileUpdate} />
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
