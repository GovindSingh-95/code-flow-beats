
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMusic } from "@/providers/MusicProvider";
import { Pause, Play, SkipForward, SkipBack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function MiniPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlayPause, 
    nextTrack, 
    prevTrack,
    progress 
  } = useMusic();
  
  const navigate = useNavigate();
  
  if (!currentTrack) return null;
  
  const handleClick = () => {
    navigate("/now-playing");
  };
  
  return (
    <div 
      className="fixed bottom-16 left-4 right-4 glass rounded-lg p-2 z-20 animate-fade-in"
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div 
          className="w-10 h-10 bg-secondary rounded-md mr-3 flex-shrink-0 overflow-hidden"
        >
          <img 
            src={currentTrack.coverUrl || '/placeholder.svg'} 
            alt={currentTrack.title}
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="flex-1 min-w-0 mr-2">
          <p className="font-medium truncate">{currentTrack.title}</p>
          <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>
        
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={(e) => { 
              e.stopPropagation();
              prevTrack();
            }}
          >
            <SkipBack size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={(e) => { 
              e.stopPropagation();
              togglePlayPause();
            }}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={(e) => { 
              e.stopPropagation();
              nextTrack();
            }}
          >
            <SkipForward size={16} />
          </Button>
        </div>
      </div>
      
      {/* Progress bar */}
      <Slider 
        value={[progress]} 
        min={0}
        max={100}
        className="h-1 mt-1"
        disabled
      />
    </div>
  );
}
