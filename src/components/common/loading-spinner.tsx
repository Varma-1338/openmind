"use client";

import { Logo } from "@/components/common/icons";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <div className="absolute h-full w-full animate-spin-slow rounded-full border-4 border-dashed border-primary"></div>
        <div className="absolute h-24 w-24 animate-spin-reverse-slow rounded-full border-4 border-solid border-accent"></div>
        <p className="text-sm font-semibold tracking-widest">Loading...</p>
      </div>
       <div className="absolute bottom-4 left-4">
        <Logo className="h-6 w-6 text-muted-foreground/50" />
      </div>
    </div>
  );
}
