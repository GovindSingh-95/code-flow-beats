
import { useState, useEffect } from "react";
import { useMusic } from "@/providers/MusicProvider";
import { Card, CardContent } from "@/components/ui/card";
import CategorySection from "@/components/CategorySection";
import MusicGrid from "@/components/MusicGrid";
import FeaturedBanner from "@/components/FeaturedBanner";
import MiniPlayer from "@/components/MiniPlayer";
import MainLayout from "@/components/layouts/MainLayout";
import { Playlist } from "@/types";

export default function Home() {
  const { playlists, currentTrack } = useMusic();
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

  return (
    <MainLayout>
      <div className="pb-24"> {/* Extra padding for mini-player */}
        <div className="px-6 pt-6 pb-4">
          <h1 className="text-3xl font-semibold mb-1">Good evening</h1>
          <p className="text-muted-foreground">Discover music to code by</p>
        </div>

        {featuredPlaylist && (
          <div className="px-6 py-4">
            <FeaturedBanner playlist={featuredPlaylist} />
          </div>
        )}

        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {playlists.slice(0, 4).map(playlist => (
              <Card key={playlist.id} className="overflow-hidden hover:bg-secondary/50 transition-colors cursor-pointer">
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
          </div>
        </div>

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
