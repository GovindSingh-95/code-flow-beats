
import { useMusic } from "@/providers/MusicProvider";
import { cn } from "@/lib/utils";
import { Track } from "@/types";
import { Heart } from "lucide-react";
import { useState } from "react";

interface TrackItemProps {
  track: Track;
  index?: number;
  isActive?: boolean;
}

export default function TrackItem({ track, index, isActive = false }: TrackItemProps) {
  const { setCurrentTrack, currentTrack, isPlaying } = useMusic();
  const [liked, setLiked] = useState(false);

  const handlePlay = () => {
    setCurrentTrack(track);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={cn(
        "flex items-center py-2 px-1 cursor-pointer hover:bg-secondary/30 rounded-md transition-colors",
        isActive ? "bg-secondary/50" : ""
      )}
      onClick={handlePlay}
    >
      {index && (
        <div className="w-8 text-center text-muted-foreground">
          {isActive && isPlaying ? (
            <div className="flex space-x-[2px] items-end justify-center h-4">
              <div className="bg-primary w-1 h-3 animate-pulse-slow"></div>
              <div className="bg-primary w-1 h-2 animate-pulse-slow"></div>
              <div className="bg-primary w-1 h-4 animate-pulse-slow"></div>
            </div>
          ) : (
            <span>{index}</span>
          )}
        </div>
      )}
      <div className="w-10 h-10 bg-secondary rounded-md mr-3">
        <img 
          src={track.coverUrl || '/placeholder.svg'} 
          alt={track.title} 
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(
          "font-medium truncate",
          isActive ? "text-primary" : ""
        )}>{track.title}</p>
        <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
      </div>
      <button 
        className="px-2 text-muted-foreground hover:text-primary"
        onClick={(e) => {
          e.stopPropagation();
          setLiked(!liked);
        }}
      >
        <Heart 
          size={18} 
          fill={liked ? "currentColor" : "none"} 
          className={liked ? "text-primary" : ""}
        />
      </button>
      <div className="text-sm text-muted-foreground px-2">
        {formatTime(track.duration)}
      </div>
    </div>
  );
}
