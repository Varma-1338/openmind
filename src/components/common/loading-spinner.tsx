import { Logo } from "@/components/common/icons";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground">
      <div className="relative flex h-48 w-48 items-center justify-center">
        <div className="absolute h-full w-full animate-spin-slow rounded-full border-8 border-dashed border-primary/50"></div>
        <div className="absolute h-3/4 w-3/4 animate-spin-reverse-slow rounded-full border-4 border-solid border-accent"></div>
        <p className="text-lg font-semibold tracking-widest">Loading...</p>
      </div>
      <div className="absolute bottom-4 left-4">
        <Logo className="h-8 w-8 text-muted-foreground" />
      </div>
    </div>
  );
}
