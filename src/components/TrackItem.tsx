
import { useMusic } from "@/providers/MusicProvider";
import { cn } from "@/lib/utils";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  coverUrl: string;
}

interface TrackItemProps {
  track: Track;
}

export default function TrackItem({ track }: TrackItemProps) {
  const { currentTrack, setCurrentTrack, isPlaying, togglePlayPause } = useMusic();
  
  const isActive = currentTrack?.id === track.id;
  
  const handleClick = () => {
    if (isActive) {
      togglePlayPause();
    } else {
      setCurrentTrack(track);
    }
  };
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div 
      className={cn(
        "flex items-center justify-between p-3 rounded-md transition-colors cursor-pointer",
        isActive ? "bg-primary/10" : "hover:bg-muted/50"
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-md flex items-center justify-center",
          isActive && isPlaying ? "bg-primary/20" : "bg-muted"
        )}>
          {isActive && isPlaying ? (
            <div className="flex gap-0.5 items-end">
              <div className="w-1 h-3 bg-primary animate-pulse" />
              <div className="w-1 h-2 bg-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          ) : (
            <span className="text-xs font-mono">{track.id}</span>
          )}
        </div>
        <div>
          <p className={cn(
            "font-medium line-clamp-1",
            isActive && "text-primary"
          )}>{track.title}</p>
          <p className="text-xs text-muted-foreground">{track.artist}</p>
        </div>
      </div>
      <span className="text-xs text-muted-foreground font-mono">
        {formatDuration(track.duration)}
      </span>
    </div>
  );
}
