
import { useMusic } from "@/providers/MusicProvider";
import { Playlist } from "@/types";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface FeaturedBannerProps {
  playlist: Playlist;
}

export default function FeaturedBanner({ playlist }: FeaturedBannerProps) {
  const { setCurrentPlaylist, setCurrentTrack } = useMusic();
  
  const handlePlay = () => {
    setCurrentPlaylist(playlist);
    if (playlist.tracks.length > 0) {
      setCurrentTrack(playlist.tracks[0]);
    }
  };
  
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
      <div className="relative z-10 flex p-6">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden shadow-lg mr-4 flex-shrink-0">
          <img 
            src={playlist.coverUrl || '/placeholder.svg'} 
            alt={playlist.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium mb-1">Featured Playlist</span>
          <h3 className="text-xl md:text-2xl font-bold mb-1">{playlist.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{playlist.description}</p>
          <div className="flex items-center gap-3">
            <Button className="rounded-full" onClick={handlePlay}>
              <Play className="h-4 w-4 mr-1" /> Play
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
