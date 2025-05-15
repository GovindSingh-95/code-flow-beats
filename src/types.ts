
export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  tracks: Track[];
  category: "debugging" | "focus" | "lateNight" | "default";
}
