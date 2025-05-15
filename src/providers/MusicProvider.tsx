
import { createContext, useContext, useState } from "react";

// Types for our music player
type Track = {
  id: string;
  title: string;
  artist: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
};

type Playlist = {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  tracks: Track[];
  category: "debugging" | "focus" | "lateNight" | "default";
};

type MusicContextType = {
  currentTrack: Track | null;
  setCurrentTrack: (track: Track | null) => void;
  isPlaying: boolean;
  togglePlayPause: () => void;
  playlists: Playlist[];
  addPlaylist: (playlist: Playlist) => void;
  currentPlaylist: Playlist | null;
  setCurrentPlaylist: (playlist: Playlist | null) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  progress: number;
  setProgress: (progress: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
};

// Sample data
const sampleTracks: Track[] = [
  {
    id: "1",
    title: "Late Night Coding",
    artist: "CodeBeats",
    duration: 183,
    coverUrl: "/placeholder.svg",
    audioUrl: "https://example.com/audio1.mp3"
  },
  {
    id: "2",
    title: "Debugging Trance",
    artist: "DevSound",
    duration: 242,
    coverUrl: "/placeholder.svg",
    audioUrl: "https://example.com/audio2.mp3"
  },
  {
    id: "3",
    title: "Algorithm Flow",
    artist: "ByteMaster",
    duration: 195,
    coverUrl: "/placeholder.svg",
    audioUrl: "https://example.com/audio3.mp3"
  },
  {
    id: "4",
    title: "Syntax Error",
    artist: "Exception",
    duration: 221,
    coverUrl: "/placeholder.svg",
    audioUrl: "https://example.com/audio4.mp3"
  },
  {
    id: "5",
    title: "Recursive Beat",
    artist: "StackOverflow",
    duration: 198,
    coverUrl: "/placeholder.svg",
    audioUrl: "https://example.com/audio5.mp3"
  },
];

const samplePlaylists: Playlist[] = [
  {
    id: "1",
    name: "Debugging Mode",
    description: "For those bug hunting sessions",
    coverUrl: "/placeholder.svg",
    tracks: sampleTracks.slice(0, 3),
    category: "debugging"
  },
  {
    id: "2",
    name: "Focus Flow",
    description: "Stay in the zone with these tracks",
    coverUrl: "/placeholder.svg",
    tracks: sampleTracks.slice(2, 5),
    category: "focus"
  },
  {
    id: "3",
    name: "Late Night Dev",
    description: "Perfect for coding after hours",
    coverUrl: "/placeholder.svg",
    tracks: sampleTracks.slice(1, 4),
    category: "lateNight"
  },
];

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>(samplePlaylists);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const addPlaylist = (playlist: Playlist) => {
    setPlaylists(prev => [...prev, playlist]);
  };

  const nextTrack = () => {
    if (!currentTrack || !currentPlaylist) return;
    
    const currentIndex = currentPlaylist.tracks.findIndex(
      track => track.id === currentTrack.id
    );
    
    if (currentIndex < currentPlaylist.tracks.length - 1) {
      setCurrentTrack(currentPlaylist.tracks[currentIndex + 1]);
      setProgress(0);
    }
  };

  const prevTrack = () => {
    if (!currentTrack || !currentPlaylist) return;
    
    const currentIndex = currentPlaylist.tracks.findIndex(
      track => track.id === currentTrack.id
    );
    
    if (currentIndex > 0) {
      setCurrentTrack(currentPlaylist.tracks[currentIndex - 1]);
      setProgress(0);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        isPlaying,
        togglePlayPause,
        playlists,
        addPlaylist,
        currentPlaylist,
        setCurrentPlaylist,
        nextTrack,
        prevTrack,
        progress,
        setProgress,
        volume,
        setVolume
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  
  return context;
};
