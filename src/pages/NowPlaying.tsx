
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMusic } from "@/providers/MusicProvider";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  ChevronDown, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  Heart 
} from "lucide-react";
import { Waveform } from "@/components/Waveform";

export default function NowPlaying() {
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

  const [liked, setLiked] = useState(false);
  const [shuffleActive, setShuffleActive] = useState(false);
  const [repeatActive, setRepeatActive] = useState(false);
  const navigate = useNavigate();

  // Redirect if no track is selected
  useEffect(() => {
    if (!currentTrack) {
      navigate("/home");
    }
  }, [currentTrack, navigate]);

  if (!currentTrack) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTime = formatTime((progress / 100) * (currentTrack.duration || 0));
  const totalTime = formatTime(currentTrack.duration || 0);

  return (
    <div className="fixed inset-0 bg-background flex flex-col z-50">
      {/* Header */}
      <div className="p-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronDown size={24} />
        </Button>
        <div className="flex-1 text-center">
          <h1 className="text-sm font-medium">Now Playing</h1>
        </div>
        <div className="w-10"></div> {/* Balance space */}
      </div>

      {/* Album Art and Track Info */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
        <div className="w-64 h-64 md:w-80 md:h-80 bg-black rounded-lg overflow-hidden shadow-lg mb-8">
          <img 
            src={currentTrack.coverUrl || "/placeholder.svg"} 
            alt={currentTrack.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full max-w-lg">
          <div className="flex items-center justify-between mb-1">
            <div className="flex-1">
              <h2 className="text-2xl font-bold truncate">{currentTrack.title}</h2>
              <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className={liked ? "text-primary" : "text-muted-foreground"}
              onClick={() => setLiked(!liked)}
            >
              <Heart size={24} fill={liked ? "currentColor" : "none"} />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="relative">
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

            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{currentTime}</span>
              <span>{totalTime}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon"
              className={shuffleActive ? "text-primary" : ""}
              onClick={() => setShuffleActive(!shuffleActive)}
            >
              <Shuffle size={20} />
            </Button>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={prevTrack}>
                <SkipBack size={24} />
              </Button>
              
              <Button 
                size="icon" 
                variant="default" 
                className="h-14 w-14 rounded-full" 
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
              </Button>
              
              <Button variant="ghost" size="icon" onClick={nextTrack}>
                <SkipForward size={24} />
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              className={repeatActive ? "text-primary" : ""}
              onClick={() => setRepeatActive(!repeatActive)}
            >
              <Repeat size={20} />
            </Button>
          </div>
          
          {/* Volume Control */}
          <div className="mt-8 flex items-center space-x-4">
            <Volume2 size={16} className="text-muted-foreground" />
            <Slider 
              value={[volume * 100]} 
              max={100} 
              onValueChange={values => setVolume(values[0] / 100)}
              className="flex-1" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
