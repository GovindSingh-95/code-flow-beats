
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useMusic } from "@/providers/MusicProvider";
import { Album, AudioLines, Headphones, Music, Music3, ListPlus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const { playlists } = useMusic();

  // Count playlists by category
  const debuggingCount = playlists.filter(p => p.category === "debugging").length;
  const focusCount = playlists.filter(p => p.category === "focus").length;
  const lateNightCount = playlists.filter(p => p.category === "lateNight").length;

  return (
    <aside className="w-64 border-r border-border flex flex-col h-screen sticky top-0 p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Music3 size={24} className="text-primary" />
          <h1 className="text-xl font-semibold font-mono tracking-tight">ByteRhythm</h1>
        </div>
        <ThemeToggle />
      </div>
      
      <nav className="space-y-1">
        <NavItem icon={<Music />} label="All Music" active />
        <NavItem icon={<Album />} label="Albums" />
        <NavItem icon={<ListPlus />} label="New Playlist" />
        <NavItem icon={<Settings />} label="Settings" />
      </nav>
      
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-2">CODING MODES</h2>
        <nav className="space-y-1">
          <NavItem 
            icon={<AudioLines size={16} />} 
            label="Debugging Mode" 
            badge={debuggingCount}
          />
          <NavItem 
            icon={<Music3 size={16} />} 
            label="Focus Flow" 
            badge={focusCount}
          />
          <NavItem 
            icon={<Headphones size={16} />} 
            label="Late Night Dev" 
            badge={lateNightCount}
          />
        </nav>
      </div>
      
      <div className="mt-auto bg-card p-3 rounded-md text-center">
        <p className="text-xs text-muted-foreground mb-2">Need more coding beats?</p>
        <Button size="sm" className="w-full text-xs">Import Music</Button>
      </div>
    </aside>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: number;
  active?: boolean;
}

function NavItem({ icon, label, badge, active }: NavItemProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-between px-2 py-2 rounded-md text-sm transition-colors",
        active ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted/50 cursor-pointer"
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      {badge !== undefined && (
        <div className="bg-muted rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {badge}
        </div>
      )}
    </div>
  );
}
