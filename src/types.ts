
export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  genre?: string;
  mood?: "chill" | "focus" | "workout" | "energetic" | "relaxed";
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  tracks: Track[];
  category: "debugging" | "focus" | "lateNight" | "default" | "chill" | "workout";
}

export interface UserStats {
  topGenres: { name: string; count: number }[];
  topArtists: { name: string; count: number }[];
  listeningTime: { day: string; minutes: number }[];
  recentlyPlayed: Track[];
  likedTracks: Track[];
}
