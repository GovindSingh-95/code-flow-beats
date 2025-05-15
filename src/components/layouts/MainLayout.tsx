
import { ReactNode } from "react";
import Navigation from "@/components/Navigation";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pb-16">
        {children}
      </main>
      <Navigation />
    </div>
  );
}
