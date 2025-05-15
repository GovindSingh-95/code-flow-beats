
import Player from "@/components/Player";
import PlaylistCard from "@/components/PlaylistCard";
import Sidebar from "@/components/Sidebar";
import TrackItem from "@/components/TrackItem";
import { Separator } from "@/components/ui/separator";
import { useMusic } from "@/providers/MusicProvider";

const Index = () => {
  const { playlists, currentPlaylist } = useMusic();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1">
        <div className="p-6">
          <h1 className="text-3xl font-semibold font-mono mb-6">Music for Developers</h1>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Featured Playlists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {playlists.map(playlist => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </section>
          
          <Separator className="my-8" />
          
          <section>
            <h2 className="text-xl font-semibold mb-4">
              {currentPlaylist ? 
                `Now Playing: ${currentPlaylist.name}` : 
                "Select a Playlist"
              }
            </h2>
            
            <div className="bg-card rounded-lg shadow-sm">
              {currentPlaylist ? (
                <div className="divide-y divide-border/50">
                  {currentPlaylist.tracks.map(track => (
                    <TrackItem key={track.id} track={track} />
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  <p>Choose a playlist to start listening</p>
                </div>
              )}
            </div>
          </section>
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 p-4 z-10">
          <div className="max-w-6xl mx-auto">
            <Player />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
