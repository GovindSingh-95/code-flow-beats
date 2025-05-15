
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMusic } from "@/providers/MusicProvider";
import { useSocial } from "@/providers/SocialProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Users } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MainLayout from "@/components/layouts/MainLayout";
import MiniPlayer from "@/components/MiniPlayer";
import { Playlist } from "@/types";

export default function CollaborativePlaylists() {
  const navigate = useNavigate();
  const { playlists, addPlaylist, currentTrack } = useMusic();
  const { users } = useSocial();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    description: ""
  });

  const collaborativePlaylists = playlists.filter(p => p.isCollaborative);

  const handleCreatePlaylist = () => {
    if (newPlaylist.name.trim()) {
      const playlist: Playlist = {
        id: `playlist-${Date.now()}`,
        name: newPlaylist.name.trim(),
        description: newPlaylist.description.trim() || "Collaborative playlist",
        coverUrl: "/placeholder.svg",
        tracks: [],
        category: "default",
        isCollaborative: true,
        collaborators: [
          users.filter(user => user.isFollowing)[0], // Add one collaborator for demo
        ]
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
          <h1 className="text-2xl font-semibold">Collaborative Playlists</h1>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" /> New Collaborative
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create collaborative playlist</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="playlist-name">Name</Label>
                  <Input 
                    id="playlist-name" 
                    value={newPlaylist.name}
                    onChange={e => setNewPlaylist({...newPlaylist, name: e.target.value})}
                    placeholder="My Collaborative Playlist"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="playlist-description">Description</Label>
                  <Input 
                    id="playlist-description"
                    value={newPlaylist.description}
                    onChange={e => setNewPlaylist({...newPlaylist, description: e.target.value})}
                    placeholder="Describe your collaborative playlist"
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
        
        {collaborativePlaylists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {collaborativePlaylists.map(playlist => (
              <Card 
                key={playlist.id} 
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              >
                <div className="aspect-square bg-secondary">
                  <img 
                    src={playlist.coverUrl || '/placeholder.svg'} 
                    alt={playlist.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{playlist.name}</h3>
                    <div className="bg-primary/10 p-1 rounded-md">
                      <Users size={16} className="text-primary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{playlist.description}</p>
                  
                  {playlist.collaborators && playlist.collaborators.length > 0 && (
                    <div className="mt-3 flex -space-x-2">
                      {playlist.collaborators.map((user, index) => (
                        <Avatar key={user.id} className="w-6 h-6 border-2 border-background">
                          <AvatarImage src={user.avatarUrl} alt={user.displayName} />
                          <AvatarFallback>{user.displayName.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-medium mb-2">No collaborative playlists yet</h2>
            <p className="text-muted-foreground mb-4">Create one and invite your friends to contribute</p>
            <Button onClick={() => setIsDialogOpen(true)}>Create Collaborative Playlist</Button>
          </div>
        )}
      </div>
      
      {currentTrack && <MiniPlayer />}
    </MainLayout>
  );
}

// Missing import from earlier component
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
