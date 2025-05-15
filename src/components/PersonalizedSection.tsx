
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Playlist, Track } from "@/types";

interface PersonalizedSectionProps {
  title: string;
  description?: string;
  playlists?: Playlist[];
  tracks?: Track[];
  type: "playlist" | "track" | "mix";
}

export default function PersonalizedSection({ 
  title, 
  description, 
  playlists = [], 
  tracks = [], 
  type 
}: PersonalizedSectionProps) {
  const navigate = useNavigate();
  
  const handlePlaylistClick = (playlist: Playlist) => {
    navigate(`/playlist/${playlist.id}`);
  };
  
  return (
    <section className="px-6 py-4">
      <div className="flex justify-between items-baseline mb-4">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {(playlists.length > 0 || tracks.length > 0) && (
          <button className="text-sm text-primary">See all</button>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {type === "playlist" && playlists.map(playlist => (
          <Card 
            key={playlist.id}
            className="overflow-hidden hover:bg-secondary/50 transition-colors cursor-pointer"
            onClick={() => handlePlaylistClick(playlist)}
          >
            <CardContent className="p-4">
              <div className="aspect-square bg-secondary rounded-md mb-3 overflow-hidden">
                <img 
                  src={playlist.coverUrl || '/placeholder.svg'} 
                  alt={playlist.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium truncate">{playlist.name}</h3>
              <p className="text-xs text-muted-foreground">{playlist.tracks.length} tracks</p>
            </CardContent>
          </Card>
        ))}
        
        {type === "track" && tracks.map(track => (
          <Card 
            key={track.id}
            className="overflow-hidden hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <CardContent className="p-4">
              <div className="aspect-square bg-secondary rounded-md mb-3 overflow-hidden">
                <img 
                  src={track.coverUrl || '/placeholder.svg'} 
                  alt={track.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium truncate">{track.title}</h3>
              <p className="text-xs text-muted-foreground">{track.artist}</p>
            </CardContent>
          </Card>
        ))}
        
        {type === "mix" && playlists.map(playlist => (
          <Card 
            key={playlist.id}
            className="overflow-hidden relative group cursor-pointer"
            onClick={() => handlePlaylistClick(playlist)}
          >
            <CardContent className="p-4">
              <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                <div className="grid grid-cols-2 h-full">
                  {playlist.tracks.slice(0, 4).map((track, i) => (
                    <div key={track.id} className="overflow-hidden">
                      <img 
                        src={track.coverUrl || '/placeholder.svg'} 
                        alt={track.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                  <div className="bg-primary rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="font-medium truncate">{playlist.name}</h3>
              <p className="text-xs text-muted-foreground">Mix • Based on your listening</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
