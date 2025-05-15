import { createContext, useContext, useState } from "react";
import { Playlist, Track, UserStats } from "@/types";

// Sample data
const sampleTracks: Track[] = [
  {
    id: "1",
    title: "Late Night Coding",
    artist: "CodeBeats",
    duration: 183,
    coverUrl: "/placeholder.svg",
    audioUrl: "https://example.com/audio1.mp3",
    genre: "Electronic",
    mood: "focus"
  },
  {
    id: "2",
    title: "Debugging Trance",
    artist: "DevSound",
    duration: 242,
    coverUrl: "/placeholder.svg",
    audioUrl: "https://example.com/audio2.mp3",
    genre: "Ambient",
    mood: "focus"
  },
  {
    id: "3",
    title: "Algorithm Flow",
    artist: "ByteMaster",
    duration: 195,
    coverUrl: "/placeholder.svg",
    audioUrl: "https://example.com/audio3.mp3",
    genre: "Electronic",
    mood: "energetic"
  },
  {
    id: "4",
    title: "Syntax Error",
    artist: "Exception",
    duration: 221,
    coverUrl: "/placeholder.svg",
    audioUrl: "https://example.com/audio4.mp3",
    genre: "Rock",
    mood: "energetic"
  },
  {
    id: "5",
    title: "Recursive Beat",
    artist: "StackOverflow",
    duration: 198,
    coverUrl: "/placeholder.svg",
    audioUrl: "https://example.com/audio5.mp3",
    genre: "Jazz",
    mood: "relaxed"
  },
  {
    id: "6",
    title: "Morning Code",
    artist: "ByteMaster",
    duration: 210,
    coverUrl: "/placeholder.svg",
    audioUrl: "https://example.com/audio6.mp3",
    genre: "Lo-fi",
    mood: "chill"
  },
  {
    id: "7",
    title: "Weekend Refactor",
    artist: "CodeBeats",
    duration: 225,
    coverUrl: "/placeholder.svg",
    audioUrl: "https://example.com/audio7.mp3",
    genre: "Electronic",
    mood: "chill"
  },
  {
    id: "8",
    title: "Compile & Run",
    artist: "DevSound",
    duration: 187,
    coverUrl: "/placeholder.svg",
    audioUrl: "https://example.com/audio8.mp3",
    genre: "Techno",
    mood: "workout"
  },
  {
    id: "9",
    title: "Function Loop",
    artist: "Exception",
    duration: 245,
    coverUrl: "/placeholder.svg",
    audioUrl: "https://example.com/audio9.mp3",
    genre: "House",
    mood: "workout"
  },
  {
    id: "10",
    title: "Async Dreams",
    artist: "StackOverflow",
    duration: 233,
    coverUrl: "/placeholder.svg",
    audioUrl: "https://example.com/audio10.mp3",
    genre: "Ambient",
    mood: "relaxed"
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
  {
    id: "4",
    name: "Chill Coding",
    description: "Relaxed beats for casual programming",
    coverUrl: "/placeholder.svg",
    tracks: sampleTracks.slice(5, 8),
    category: "chill"
  },
  {
    id: "5",
    name: "Code Workout",
    description: "Energetic tracks for programming sprints",
    coverUrl: "/placeholder.svg",
    tracks: sampleTracks.slice(7, 10),
    category: "workout"
  }
];

// Sample user stats
const sampleUserStats: UserStats = {
  topGenres: [
    { name: "Electronic", count: 35 },
    { name: "Ambient", count: 28 },
    { name: "Lo-fi", count: 20 },
    { name: "Techno", count: 15 },
    { name: "Jazz", count: 12 },
  ],
  topArtists: [
    { name: "ByteMaster", count: 42 },
    { name: "CodeBeats", count: 36 },
    { name: "DevSound", count: 31 },
    { name: "Exception", count: 25 },
    { name: "StackOverflow", count: 18 },
  ],
  listeningTime: [
    { day: "Mon", minutes: 120 },
    { day: "Tue", minutes: 95 },
    { day: "Wed", minutes: 145 },
    { day: "Thu", minutes: 110 },
    { day: "Fri", minutes: 85 },
    { day: "Sat", minutes: 160 },
    { day: "Sun", minutes: 130 },
  ],
  recentlyPlayed: sampleTracks.slice(0, 5),
  likedTracks: sampleTracks.slice(2, 4),
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
  userStats: UserStats;
  toggleLikeTrack: (trackId: string) => void;
  isTrackLiked: (trackId: string) => boolean;
  getDailyMixes: () => Playlist[];
  getRecommendedTracks: (trackId?: string) => Track[];
  getMoodPlaylists: (mood: string) => Playlist[];
  continueListening: Track[];
  setContinueListening: (track: Track) => void;
  sampleTracks: Track[]; // Exposing sampleTracks
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ 
  children 
}: { 
  children: React.ReactNode | ((props: { sampleTracks: Track[], playlists: Playlist[] }) => React.ReactNode) 
}) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>(samplePlaylists);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [userStats, setUserStats] = useState<UserStats>(sampleUserStats);
  const [continueListening, setContinueListeningState] = useState<Track[]>([]);

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
      
      // Add to continue listening
      setContinueListening(currentPlaylist.tracks[currentIndex + 1]);
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
      
      // Add to continue listening
      setContinueListening(currentPlaylist.tracks[currentIndex - 1]);
    }
  };
  
  const setContinueListening = (track: Track) => {
    // Add to beginning of array if not already there, removing duplicates
    setContinueListeningState(prev => {
      const filtered = prev.filter(t => t.id !== track.id);
      return [track, ...filtered].slice(0, 10); // Keep only 10 most recent
    });
  };
  
  const toggleLikeTrack = (trackId: string) => {
    setUserStats(prev => {
      const isLiked = prev.likedTracks.some(track => track.id === trackId);
      const track = sampleTracks.find(track => track.id === trackId);
      
      if (!track) return prev;
      
      if (isLiked) {
        // Remove from liked tracks
        return {
          ...prev,
          likedTracks: prev.likedTracks.filter(track => track.id !== trackId)
        };
      } else {
        // Add to liked tracks
        return {
          ...prev,
          likedTracks: [...prev.likedTracks, track]
        };
      }
    });
  };
  
  const isTrackLiked = (trackId: string) => {
    return userStats.likedTracks.some(track => track.id === trackId);
  };
  
  // Generate daily mixes based on user's listening habits
  const getDailyMixes = () => {
    // Simple implementation that creates mixes based on track genres
    const genres = [...new Set(sampleTracks.map(track => track.genre))].filter(Boolean);
    
    return genres.slice(0, 3).map((genre, index) => {
      const genreTracks = sampleTracks.filter(track => track.genre === genre);
      
      return {
        id: `daily-mix-${index + 1}`,
        name: `Daily Mix ${index + 1}`,
        description: `Based on your listening to ${genre} music`,
        coverUrl: "/placeholder.svg",
        tracks: genreTracks.slice(0, 5),
        category: "default" as const
      };
    });
  };
  
  // Get recommended tracks based on a track or user's history
  const getRecommendedTracks = (trackId?: string) => {
    if (trackId) {
      // Get recommendations based on specific track
      const track = sampleTracks.find(t => t.id === trackId);
      if (track) {
        return sampleTracks
          .filter(t => t.id !== trackId && (t.genre === track.genre || t.artist === track.artist))
          .slice(0, 5);
      }
    }
    
    // Default recommendations based on user's top genres
    const topGenre = userStats.topGenres[0]?.name;
    return sampleTracks.filter(track => track.genre === topGenre).slice(0, 5);
  };
  
  // Get playlists by mood
  const getMoodPlaylists = (mood: string) => {
    const moodTracks = sampleTracks.filter(track => track.mood === mood);
    
    // If we have enough tracks of this mood, create a playlist
    if (moodTracks.length >= 3) {
      return [{
        id: `mood-${mood}`,
        name: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Vibes`,
        description: `Tracks to match your ${mood} mood`,
        coverUrl: "/placeholder.svg",
        tracks: moodTracks,
        category: mood as any
      }];
    }
    
    return [];
  };

  const contextValue = {
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
    setVolume,
    userStats,
    toggleLikeTrack,
    isTrackLiked,
    getDailyMixes,
    getRecommendedTracks,
    getMoodPlaylists,
    continueListening,
    setContinueListening,
    sampleTracks // Exposing sampleTracks
  };

  return (
    <MusicContext.Provider value={contextValue}>
      {typeof children === "function" 
        ? children({sampleTracks, playlists}) 
        : children}
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
