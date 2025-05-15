
import { useMusic } from "@/providers/MusicProvider";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from "lucide-react";
import { Waveform } from "@/components/Waveform";
import { useEffect, useState } from "react";

export default function Player() {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlayPause, 
    nextTrack,
    prevTrack,
    progress,
    setProgress,
    volume,
    setVolume
  } = useMusic();
  
  const [progressInterval, setProgressInterval] = useState<number | null>(null);

  // Simulate audio progress
  useEffect(() => {
    if (isPlaying && currentTrack) {
      // Clear any existing interval
      if (progressInterval) window.clearInterval(progressInterval);
      
      // Create new progress interval
      const interval = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            // Auto advance to next track when finished
            nextTrack();
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
      
      setProgressInterval(interval);
    } else {
      // Clear interval when paused
      if (progressInterval) {
        window.clearInterval(progressInterval);
        setProgressInterval(null);
      }
    }
    
    // Cleanup interval
    return () => {
      if (progressInterval) window.clearInterval(progressInterval);
    };
  }, [isPlaying, currentTrack, nextTrack, setProgress, progressInterval]);

  if (!currentTrack) {
    return (
      <div className="glass rounded-lg p-4 h-24 flex items-center justify-center text-muted-foreground">
        <p className="text-sm font-mono">No track selected</p>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTime = formatTime((progress / 100) * currentTrack.duration);
  const totalTime = formatTime(currentTrack.duration);

  // Get volume icon based on level
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={18} />;
    if (volume < 0.5) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  return (
    <div className="glass rounded-lg p-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center shrink-0">
          <div className="w-6 h-6">
            {isPlaying ? 
              <div className="w-full h-full animate-pulse-slow">♪</div> : 
              <div>♪</div>
            }
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{currentTrack.title}</p>
          <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
          
          <div className="mt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground w-10">{currentTime}</span>
              <div className="flex-1 relative">
                <Slider 
                  value={[progress]} 
                  max={100} 
                  step={0.1}
                  onValueChange={values => setProgress(values[0])} 
                  className="z-10"
                />
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-4 -mt-px">
                  <Waveform isPlaying={isPlaying} />
                </div>
              </div>
              <span className="text-xs font-mono text-muted-foreground w-10">{totalTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          {getVolumeIcon()}
          <Slider 
            value={[volume * 100]} 
            max={100} 
            onValueChange={values => setVolume(values[0] / 100)}
            className="w-24" 
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={prevTrack}>
            <SkipBack size={18} />
          </Button>
          <Button variant="secondary" size="icon" className="h-10 w-10" onClick={togglePlayPause}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={nextTrack}>
            <SkipForward size={18} />
          </Button>
        </div>
        
        <div className="w-[88px]">
          {/* Balance space for the player */}
        </div>
      </div>
    </div>
  );
}
