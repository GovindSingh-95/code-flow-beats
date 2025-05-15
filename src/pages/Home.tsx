
import { useState, useEffect } from "react";
import { useMusic } from "@/providers/MusicProvider";
import { Card, CardContent } from "@/components/ui/card";
import CategorySection from "@/components/CategorySection";
import FeaturedBanner from "@/components/FeaturedBanner";
import MiniPlayer from "@/components/MiniPlayer";
import MainLayout from "@/components/layouts/MainLayout";
import { Playlist } from "@/types";
import PersonalizedSection from "@/components/PersonalizedSection";

export default function Home() {
  const { 
    playlists, 
    currentTrack, 
    getDailyMixes, 
    continueListening,
    userStats
  } = useMusic();
  const [featuredPlaylist, setFeaturedPlaylist] = useState<Playlist | null>(null);

  // Simulate featured content selection
  useEffect(() => {
    if (playlists.length > 0) {
      setFeaturedPlaylist(playlists[Math.floor(Math.random() * playlists.length)]);
    }
  }, [playlists]);

  const categories = [
    { id: "trending", title: "Trending Now", playlists: playlists.slice(0, 2) },
    { id: "focus", title: "Focus", playlists: playlists.filter(p => p.category === 'focus') },
    { id: "mood", title: "Late Night Coding", playlists: playlists.filter(p => p.category === 'lateNight') }
  ];

  // Get daily mixes
  const dailyMixes = getDailyMixes();

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <MainLayout>
      <div className="pb-24"> {/* Extra padding for mini-player */}
        <div className="px-6 pt-6 pb-4">
          <h1 className="text-3xl font-semibold mb-1">{getGreeting()}</h1>
          <p className="text-muted-foreground">Discover music to code by</p>
        </div>

        {featuredPlaylist && (
          <div className="px-6 py-4">
            <FeaturedBanner playlist={featuredPlaylist} />
          </div>
        )}

        {/* Continue Listening Section */}
        {continueListening.length > 0 && (
          <PersonalizedSection 
            title="Continue Listening" 
            tracks={continueListening} 
            type="track" 
          />
        )}

        {/* Daily Mixes */}
        <PersonalizedSection 
          title="Daily Mixes"
          description="Personalized playlists based on your listening" 
          playlists={dailyMixes} 
          type="mix" 
        />

        {/* Recently Played Section */}
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userStats.recentlyPlayed.slice(0, 4).map(track => (
              <Card key={track.id} className="overflow-hidden hover:bg-secondary/50 transition-colors cursor-pointer">
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
          </div>
        </div>

        {/* Made For You - Top Picks */}
        <PersonalizedSection
          title="Top Picks For You"
          description="Based on your recent listening" 
          tracks={userStats.topArtists.slice(0, 2).flatMap(artist => 
            sampleTracks.filter(track => track.artist === artist.name).slice(0, 2)
          )}
          type="track"
        />

        {categories.map(category => (
          <CategorySection 
            key={category.id}
            title={category.title} 
            playlists={category.playlists} 
          />
        ))}
      </div>
      
      {currentTrack && <MiniPlayer />}
    </MainLayout>
  );
}
