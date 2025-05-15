
import { Playlist } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioLines, Headphones, Music3, Zap, HeartPulse } from "lucide-react";
import { useMusic } from "@/providers/MusicProvider";

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { setCurrentPlaylist, setCurrentTrack } = useMusic();
  
  const handlePlaylistClick = () => {
    setCurrentPlaylist(playlist);
    if (playlist.tracks.length > 0) {
      setCurrentTrack(playlist.tracks[0]);
    }
  };
  
  const getCategoryIcon = () => {
    switch (playlist.category) {
      case "debugging":
        return <AudioLines size={18} />;
      case "focus":
        return <Music3 size={18} />;
      case "lateNight":
        return <Headphones size={18} />;
      case "chill":
        return <HeartPulse size={18} />;
      case "workout":
        return <Zap size={18} />;
      default:
        return <Music3 size={18} />;
    }
  };
  
  return (
    <Card 
      className="transition-all hover:scale-105 cursor-pointer hover:shadow-lg overflow-hidden"
      onClick={handlePlaylistClick}
    >
      <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/30 flex items-center justify-center">
        {getCategoryIcon()}
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-medium">{playlist.name}</CardTitle>
          <div className="rounded-full bg-secondary text-secondary-foreground text-xs px-2 py-1 flex items-center gap-1">
            {getCategoryIcon()}
            <span>{playlist.tracks.length} tracks</span>
          </div>
        </div>
        <CardDescription className="text-xs line-clamp-2">{playlist.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
