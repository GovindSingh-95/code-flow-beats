
import { useState, useEffect, useRef } from "react";
import { useMusic } from "@/providers/MusicProvider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic } from "lucide-react";

// Sample lyrics data structure with timestamps
type LyricLine = {
  text: string;
  time: number; // in seconds
};

// Demo lyrics for presentation
const demoLyrics: Record<string, LyricLine[]> = {
  "1": [
    { text: "Working late into the night", time: 5 },
    { text: "Code in front of me, shining bright", time: 10 },
    { text: "Algorithms dancing in my mind", time: 15 },
    { text: "Debugging errors I need to find", time: 20 },
    { text: "Late Night Coding, feels so right", time: 25 },
    { text: "Creating worlds with just keystrokes", time: 30 },
    { text: "Building systems line by line", time: 35 },
    { text: "Watch the patterns all align", time: 40 },
    { text: "Late Night Coding, in the zone", time: 45 },
    { text: "Coffee brewing, headphones on", time: 50 },
    { text: "This is where I feel at home", time: 55 },
    { text: "As my code begins to flow", time: 60 },
    { text: "Late Night Coding, feels so right", time: 65 },
    { text: "Creating worlds with just keystrokes", time: 70 },
    { text: "Building systems line by line", time: 75 },
    { text: "Watch the patterns all align", time: 80 },
  ],
  "2": [
    { text: "Lost in the syntax of the mind", time: 5 },
    { text: "Debugging errors hard to find", time: 10 },
    { text: "Trance-like state as I compile", time: 15 },
    { text: "Solving puzzles all the while", time: 20 },
    { text: "Debugging Trance, a state of flow", time: 25 },
    { text: "Where logic rules and variables glow", time: 30 },
    { text: "Deep in concentration's hold", time: 35 },
    { text: "As the solution starts to unfold", time: 40 },
    { text: "Debugging Trance, lost track of time", time: 45 },
    { text: "Each bug fixed is a victory sign", time: 50 },
    { text: "The satisfaction when tests pass", time: 55 },
    { text: "Coding magic, working at last", time: 60 },
  ],
};

export function LyricsDisplay() {
  const { currentTrack, progress, isPlaying } = useMusic();
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [showLyrics, setShowLyrics] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Get current playback time in seconds
  const currentTime = currentTrack ? (progress / 100) * currentTrack.duration : 0;

  // Load lyrics for current track
  useEffect(() => {
    if (!currentTrack) return;
    
    // In a real app, we'd fetch lyrics from an API
    // For demo purposes, we're using our sample data
    const trackLyrics = demoLyrics[currentTrack.id] || [];
    setLyrics(trackLyrics);
    setCurrentLyricIndex(0);
  }, [currentTrack]);

  // Update current lyric based on playback time
  useEffect(() => {
    if (!lyrics.length || !isPlaying) return;
    
    // Find the current lyric based on timestamp
    let newIndex = lyrics.findIndex(line => line.time > currentTime);
    if (newIndex === -1) {
      newIndex = lyrics.length - 1;
    } else if (newIndex > 0) {
      newIndex = newIndex - 1;
    }
    
    if (newIndex !== currentLyricIndex) {
      setCurrentLyricIndex(newIndex);
    }
  }, [currentTime, lyrics, isPlaying, currentLyricIndex]);

  // Auto-scroll to current lyric
  useEffect(() => {
    if (!showLyrics || !scrollRef.current) return;
    
    const activeLyric = document.getElementById(`lyric-${currentLyricIndex}`);
    if (activeLyric) {
      activeLyric.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [currentLyricIndex, showLyrics]);

  if (!currentTrack || !showLyrics) {
    return (
      <div className="flex flex-col items-center justify-center h-48 bg-black/10 backdrop-blur-sm rounded-lg">
        <Mic size={24} className="text-muted-foreground mb-2" />
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowLyrics(true)}
          className="animate-pulse"
        >
          Show Lyrics
        </Button>
      </div>
    );
  }

  if (lyrics.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-black/10 backdrop-blur-sm rounded-lg">
        <p className="text-muted-foreground">No lyrics available</p>
      </div>
    );
  }

  return (
    <div className="relative h-64 overflow-hidden">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setShowLyrics(false)}
        className="absolute top-2 right-2 z-10"
      >
        Hide
      </Button>
      
      <ScrollArea ref={scrollRef} className="h-full bg-black/10 backdrop-blur-sm rounded-lg p-4">
        <div className="py-8 space-y-8">
          {lyrics.map((line, index) => (
            <div 
              key={index}
              id={`lyric-${index}`}
              className={`text-center transition-all duration-300 ${
                index === currentLyricIndex 
                  ? "text-xl font-bold text-primary" 
                  : "text-base text-muted-foreground"
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
