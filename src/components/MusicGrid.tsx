
import { useNavigate } from "react-router-dom";
import { useMusic } from "@/providers/MusicProvider";
import { Playlist } from "@/types";

interface MusicGridProps {
  playlists: Playlist[];
}

export default function MusicGrid({ playlists }: MusicGridProps) {
  const navigate = useNavigate();
  const { setCurrentPlaylist } = useMusic();
  
  const handlePlaylistClick = (playlist: Playlist) => {
    setCurrentPlaylist(playlist);
    navigate(`/playlist/${playlist.id}`);
  };
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {playlists.map(playlist => (
        <div 
          key={playlist.id}
          className="cursor-pointer group"
          onClick={() => handlePlaylistClick(playlist)}
        >
          <div className="aspect-square bg-secondary rounded-md overflow-hidden mb-2 relative">
            <img 
              src={playlist.coverUrl || '/placeholder.svg'} 
              alt={playlist.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 ml-1">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
          </div>
          <h3 className="font-medium truncate">{playlist.name}</h3>
          <p className="text-xs text-muted-foreground">{playlist.description.substring(0, 30)}{playlist.description.length > 30 ? '...' : ''}</p>
        </div>
      ))}
    </div>
  );
}
