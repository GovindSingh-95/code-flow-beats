
import { useState } from "react";
import { useMusic } from "@/providers/MusicProvider";
import { Plus, ListMusic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MainLayout from "@/components/layouts/MainLayout";
import PlaylistCard from "@/components/PlaylistCard";
import MiniPlayer from "@/components/MiniPlayer";
import { Playlist } from "@/types";

export default function Library() {
  const { playlists, addPlaylist, currentTrack } = useMusic();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    description: ""
  });

  const handleCreatePlaylist = () => {
    if (newPlaylist.name.trim()) {
      const playlist: Playlist = {
        id: `playlist-${Date.now()}`, // Generate a unique ID
        name: newPlaylist.name.trim(),
        description: newPlaylist.description.trim() || "No description",
        coverUrl: "/placeholder.svg",
        tracks: [],
        category: "default"
      };
      
      addPlaylist(playlist);
      setNewPlaylist({ name: "", description: "" });
      setIsDialogOpen(false);
    }
  };

  return (
    <MainLayout>
      <div className="p-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Your Library</h1>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" /> New Playlist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new playlist</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="playlist-name">Name</Label>
                  <Input 
                    id="playlist-name" 
                    value={newPlaylist.name}
                    onChange={e => setNewPlaylist({...newPlaylist, name: e.target.value})}
                    placeholder="My Awesome Playlist"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="playlist-description">Description (optional)</Label>
                  <Input 
                    id="playlist-description"
                    value={newPlaylist.description}
                    onChange={e => setNewPlaylist({...newPlaylist, description: e.target.value})}
                    placeholder="Describe your playlist"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreatePlaylist}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {playlists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <ListMusic className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-medium mb-2">Create your first playlist</h2>
            <p className="text-muted-foreground mb-4">It's easy, we'll help you</p>
            <Button onClick={() => setIsDialogOpen(true)}>Create playlist</Button>
          </div>
        )}
      </div>

      {currentTrack && <MiniPlayer />}
    </MainLayout>
  );
}
