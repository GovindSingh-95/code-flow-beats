
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
  collaborators?: UserProfile[];
  comments?: Comment[];
  likes?: number;
  isCollaborative?: boolean;
  createdBy?: string;
}

export interface UserStats {
  topGenres: { name: string; count: number }[];
  topArtists: { name: string; count: number }[];
  listeningTime: { day: string; minutes: number }[];
  recentlyPlayed: Track[];
  likedTracks: Track[];
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio?: string;
  followers?: UserProfile[];
  following?: UserProfile[];
  currentlyPlaying?: Track;
  recentActivity?: UserActivity[];
  isFollowing?: boolean;
}

export interface UserActivity {
  id: string;
  userId: string;
  activityType: "listening" | "liked" | "created" | "followed" | "commented";
  timestamp: number;
  track?: Track;
  playlist?: Playlist;
  targetUserId?: string;
  comment?: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  timestamp: number;
  likes: number;
}
