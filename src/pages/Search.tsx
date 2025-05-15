
import { useState } from "react";
import { useMusic } from "@/providers/MusicProvider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon, Music, Headphones, Zap, Coffee, Brain } from "lucide-react";
import MusicGrid from "@/components/MusicGrid";
import MainLayout from "@/components/layouts/MainLayout";
import { Track } from "@/types";
import MiniPlayer from "@/components/MiniPlayer";
import { Button } from "@/components/ui/button";
import PersonalizedSection from "@/components/PersonalizedSection";

export default function Search() {
  const { playlists, currentTrack, getMoodPlaylists, getDailyMixes } = useMusic();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
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
      
  // Get mood-filtered playlists
  const moodPlaylists = selectedMood ? getMoodPlaylists(selectedMood) : [];

  // Mood filters
  const moodFilters = [
    { name: "chill", icon: <Coffee size={18} />, color: "bg-blue-500" },
    { name: "focus", icon: <Brain size={18} />, color: "bg-purple-500" },
    { name: "energetic", icon: <Zap size={18} />, color: "bg-orange-500" },
    { name: "workout", icon: <Zap size={18} />, color: "bg-red-500" },
    { name: "relaxed", icon: <Headphones size={18} />, color: "bg-green-500" }
  ];

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
        
        {/* Mood Filters */}
        {!searchQuery && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Explore by Mood</h2>
            <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
              {moodFilters.map(mood => (
                <Button
                  key={mood.name}
                  onClick={() => setSelectedMood(mood.name === selectedMood ? null : mood.name)}
                  className={`flex items-center space-x-2 rounded-full px-4 ${
                    selectedMood === mood.name ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                  }`}
                  variant={selectedMood === mood.name ? "default" : "secondary"}
                >
                  <span>{mood.icon}</span>
                  <span className="capitalize">{mood.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* AI-powered recommendations when no search or filter */}
        {!searchQuery && !selectedMood && (
          <PersonalizedSection
            title="AI-Powered Recommendations"
            description="Curated just for you based on your listening patterns"
            playlists={getDailyMixes()}
            type="mix"
          />
        )}
        
        {/* Show mood-filtered content */}
        {selectedMood && moodPlaylists.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 capitalize">{selectedMood} Vibes</h2>
            <MusicGrid playlists={moodPlaylists} />
          </div>
        )}
        
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
        ) : !selectedMood ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Browse All</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <CategoryBrowseCard title="Focus" color="bg-purple-500" />
              <CategoryBrowseCard title="Chill" color="bg-blue-500" />
              <CategoryBrowseCard title="Energetic" color="bg-orange-500" />
              <CategoryBrowseCard title="Debugging" color="bg-red-500" />
              <CategoryBrowseCard title="Late Night" color="bg-purple-500" />
              <CategoryBrowseCard title="Coding" color="bg-indigo-500" />
            </div>
          </div>
        ) : null}
      </div>
      
      {currentTrack && <MiniPlayer />}
    </MainLayout>
  );
}

// Track search result component
function TrackSearchResult({ track }: { track: Track }) {
  const { 
    setCurrentTrack, 
    currentPlaylist, 
    setCurrentPlaylist, 
    playlists,
    getRecommendedTracks,
    isTrackLiked,
    toggleLikeTrack 
  } = useMusic();
  const [showRecommendations, setShowRecommendations] = useState(false);

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
  
  const recommendedTracks = getRecommendedTracks(track.id);
  const isLiked = isTrackLiked(track.id);

  return (
    <div className="space-y-2">
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
        <button 
          className="p-2 text-muted-foreground hover:text-primary"
          onClick={(e) => {
            e.stopPropagation();
            toggleLikeTrack(track.id);
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill={isLiked ? "currentColor" : "none"} 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={isLiked ? "text-primary" : ""}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <button
          className="p-2 text-muted-foreground hover:text-primary"
          onClick={(e) => {
            e.stopPropagation();
            setShowRecommendations(!showRecommendations);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {showRecommendations ? (
              <><path d="m18 15-6-6-6 6"/></>
            ) : (
              <><path d="m6 9 6 6 6-6"/></>
            )}
          </svg>
        </button>
      </div>
      
      {/* You Might Also Like section */}
      {showRecommendations && recommendedTracks.length > 0 && (
        <div className="ml-10 border-l-2 pl-4 border-secondary mt-2">
          <p className="text-sm font-medium mb-2">You might also like:</p>
          <div className="space-y-2">
            {recommendedTracks.map(recTrack => (
              <div
                key={recTrack.id}
                className="flex items-center p-2 hover:bg-secondary/30 rounded-md cursor-pointer"
                onClick={() => setCurrentTrack(recTrack)}
              >
                <div className="w-8 h-8 bg-secondary rounded-md mr-3 flex-shrink-0">
                  <img 
                    src={recTrack.coverUrl || '/placeholder.svg'} 
                    alt={recTrack.title} 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{recTrack.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{recTrack.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
