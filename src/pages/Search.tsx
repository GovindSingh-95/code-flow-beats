
import { useState } from "react";
import { useMusic } from "@/providers/MusicProvider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon } from "lucide-react";
import MusicGrid from "@/components/MusicGrid";
import MainLayout from "@/components/layouts/MainLayout";
import { Track } from "@/types";
import MiniPlayer from "@/components/MiniPlayer";

export default function Search() {
  const { playlists, currentTrack } = useMusic();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get all tracks from all playlists
  const allTracks = playlists.flatMap(playlist => playlist.tracks);
  
  // Filter tracks based on search query
  const filteredTracks = searchQuery 
    ? allTracks.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  // Filter playlists based on search query
  const filteredPlaylists = searchQuery
    ? playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <MainLayout>
      <div className="p-6 pb-24">
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="text"
              placeholder="Search songs, artists, playlists..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {searchQuery ? (
          <Tabs defaultValue="songs" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="songs">Songs</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
            </TabsList>
            
            <TabsContent value="songs">
              <h2 className="text-xl font-semibold mb-4">Songs</h2>
              {filteredTracks.length > 0 ? (
                <div className="space-y-2">
                  {filteredTracks.map(track => (
                    <TrackSearchResult key={track.id} track={track} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No songs found</p>
              )}
            </TabsContent>
            
            <TabsContent value="playlists">
              <h2 className="text-xl font-semibold mb-4">Playlists</h2>
              {filteredPlaylists.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <MusicGrid playlists={filteredPlaylists} />
                </div>
              ) : (
                <p className="text-muted-foreground">No playlists found</p>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Browse All</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <CategoryBrowseCard title="Focus" color="bg-green-500" />
              <CategoryBrowseCard title="Chill" color="bg-blue-500" />
              <CategoryBrowseCard title="Energetic" color="bg-orange-500" />
              <CategoryBrowseCard title="Debugging" color="bg-red-500" />
              <CategoryBrowseCard title="Late Night" color="bg-purple-500" />
              <CategoryBrowseCard title="Coding" color="bg-indigo-500" />
            </div>
          </div>
        )}
      </div>
      
      {currentTrack && <MiniPlayer />}
    </MainLayout>
  );
}

// Track search result component
function TrackSearchResult({ track }: { track: Track }) {
  const { setCurrentTrack, currentPlaylist, setCurrentPlaylist, playlists } = useMusic();

  const handlePlay = () => {
    setCurrentTrack(track);
    
    // Find which playlist this track belongs to if not already set
    if (!currentPlaylist) {
      const playlistWithTrack = playlists.find(playlist => 
        playlist.tracks.some(t => t.id === track.id)
      );
      if (playlistWithTrack) {
        setCurrentPlaylist(playlistWithTrack);
      }
    }
  };

  return (
    <div 
      className="flex items-center p-2 hover:bg-secondary/50 rounded-md cursor-pointer"
      onClick={handlePlay}
    >
      <div className="w-10 h-10 bg-secondary rounded-md mr-3 flex-shrink-0">
        <img 
          src={track.coverUrl || '/placeholder.svg'} 
          alt={track.title} 
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{track.title}</p>
        <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
      </div>
    </div>
  );
}

// Category browse card
function CategoryBrowseCard({ title, color }: { title: string, color: string }) {
  return (
    <div className={`${color} rounded-lg p-6 cursor-pointer transition-transform hover:scale-[1.02]`}>
      <h3 className="text-white font-bold text-xl">{title}</h3>
    </div>
  );
}
