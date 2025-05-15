
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMusic } from "@/providers/MusicProvider";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Play, Pause, Heart } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import TrackItem from "@/components/TrackItem";
import MiniPlayer from "@/components/MiniPlayer";
import { Playlist } from "@/types";

export default function PlaylistDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playlists, setCurrentPlaylist, currentPlaylist, isPlaying, togglePlayPause, setCurrentTrack, currentTrack } = useMusic();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundPlaylist = playlists.find(p => p.id === id);
      if (foundPlaylist) {
        setPlaylist(foundPlaylist);
      } else {
        navigate("/home");
      }
    }
  }, [id, playlists, navigate]);
  
  const handlePlayPause = () => {
    if (!playlist) return;
    
    if (currentPlaylist?.id !== playlist.id) {
      setCurrentPlaylist(playlist);
      if (playlist.tracks.length > 0) {
        setCurrentTrack(playlist.tracks[0]);
      }
    } else {
      togglePlayPause();
    }
  };
  
  if (!playlist) return null;
  
  const isPlaylistPlaying = isPlaying && currentPlaylist?.id === playlist.id;
  
  return (
    <MainLayout>
      <div className="pb-24">
        {/* Header */}
        <div className="relative h-64 bg-gradient-to-b from-primary/30 to-background">
          <div className="absolute top-0 left-0 right-0 p-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft />
            </Button>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 flex">
            <div className="w-32 h-32 rounded-md overflow-hidden shadow-lg mr-4">
              <img 
                src={playlist.coverUrl || '/placeholder.svg'} 
                alt={playlist.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-end">
              <h1 className="text-2xl font-bold mb-1">{playlist.name}</h1>
              <p className="text-sm text-muted-foreground mb-2">{playlist.description}</p>
              <p className="text-sm">{playlist.tracks.length} tracks</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="px-6 py-4 flex items-center gap-3">
          <Button 
            className="rounded-full" 
            onClick={handlePlayPause}
          >
            {isPlaylistPlaying ? (
              <><Pause size={18} className="mr-1" /> Pause</>
            ) : (
              <><Play size={18} className="mr-1 ml-0.5" /> Play</>
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsLiked(!isLiked)}
            className={isLiked ? "text-primary" : ""}
          >
            <Heart size={22} fill={isLiked ? "currentColor" : "transparent"} />
          </Button>
        </div>
        
        {/* Tracks list */}
        <div className="px-6 divide-y divide-border/50">
          {playlist.tracks.length > 0 ? (
            playlist.tracks.map((track, index) => (
              <TrackItem 
                key={track.id} 
                track={track} 
                index={index + 1}
                isActive={currentTrack?.id === track.id}
              />
            ))
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">This playlist is empty</p>
            </div>
          )}
        </div>
      </div>
      
      {currentTrack && <MiniPlayer />}
    </MainLayout>
  );
}
