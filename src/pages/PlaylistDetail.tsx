
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMusic } from "@/providers/MusicProvider";
import { useSocial } from "@/providers/SocialProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ChevronLeft, Play, Pause, Heart, Share2, MessageSquare, 
  UserPlus, QrCode, Users, Send
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import MainLayout from "@/components/layouts/MainLayout";
import TrackItem from "@/components/TrackItem";
import MiniPlayer from "@/components/MiniPlayer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Playlist, Track, Comment, UserProfile } from "@/types";
import PersonalizedSection from "@/components/PersonalizedSection";
import { formatDistanceToNow } from "date-fns";

export default function PlaylistDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    playlists, 
    setCurrentPlaylist, 
    currentPlaylist, 
    isPlaying, 
    togglePlayPause, 
    setCurrentTrack, 
    currentTrack,
    getRecommendedTracks,
    addPlaylist
  } = useMusic();
  
  const { 
    isPlaylistLiked, 
    toggleLikePlaylist, 
    sharePlaylist, 
    getPlaylistComments, 
    addComment,
    users,
    inviteToCollaborate
  } = useSocial();
  
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [recommendedTracks, setRecommendedTracks] = useState<Track[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showCollaborators, setShowCollaborators] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundPlaylist = playlists.find(p => p.id === id);
      if (foundPlaylist) {
        setPlaylist(foundPlaylist);
        
        // Get recommended tracks based on the first track of the playlist
        if (foundPlaylist.tracks.length > 0) {
          const recommendations = getRecommendedTracks(foundPlaylist.tracks[0].id);
          setRecommendedTracks(recommendations);
        }
        
        // Get comments for this playlist
        setComments(getPlaylistComments(id));
      } else {
        navigate("/home");
      }
    }
  }, [id, playlists, navigate, getRecommendedTracks, getPlaylistComments]);
  
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
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && playlist) {
      addComment(playlist.id, newComment);
      setComments(getPlaylistComments(playlist.id));
      setNewComment("");
    }
  };
  
  const handleCloneAsCollaborative = () => {
    if (!playlist) return;
    
    const newPlaylist: Playlist = {
      ...playlist,
      id: `playlist-collab-${Date.now()}`,
      name: `${playlist.name} (Collaborative)`,
      isCollaborative: true,
      collaborators: [],
    };
    
    addPlaylist(newPlaylist);
    navigate(`/playlist/${newPlaylist.id}`);
  };
  
  const handleInviteCollaborator = (user: UserProfile) => {
    if (playlist) {
      inviteToCollaborate(playlist.id, user.id);
    }
  };
  
  if (!playlist) return null;
  
  const isPlaylistPlaying = isPlaying && currentPlaylist?.id === playlist.id;
  const liked = isPlaylistLiked(playlist.id);
  
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
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold mb-1">{playlist.name}</h1>
                {playlist.isCollaborative && (
                  <div className="bg-primary/10 p-1 rounded-md">
                    <Users size={16} className="text-primary" />
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{playlist.description}</p>
              <p className="text-sm">{playlist.tracks.length} tracks</p>
              
              {playlist.collaborators && playlist.collaborators.length > 0 && (
                <div className="mt-2 flex items-center space-x-1">
                  <div className="flex -space-x-2">
                    {playlist.collaborators.slice(0, 3).map(user => (
                      <Avatar key={user.id} className="w-5 h-5 border border-background">
                        <AvatarImage src={user.avatarUrl} alt={user.displayName} />
                        <AvatarFallback>{user.displayName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {playlist.collaborators.length} collaborator{playlist.collaborators.length > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="px-6 py-4 flex items-center gap-3 overflow-x-auto scrollbar-none">
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
            onClick={() => toggleLikePlaylist(playlist.id)}
            className={liked ? "text-primary" : ""}
          >
            <Heart size={22} fill={liked ? "currentColor" : "transparent"} />
          </Button>
          
          <DialogTrigger asChild onClick={() => setShowComments(true)}>
            <Button variant="ghost" size="icon">
              <MessageSquare size={22} />
            </Button>
          </DialogTrigger>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowQRCode(true)}
          >
            <QrCode size={22} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => sharePlaylist(playlist.id)}
          >
            <Share2 size={22} />
          </Button>
          
          {!playlist.isCollaborative && (
            <Button 
              variant="outline" 
              className="ml-auto whitespace-nowrap"
              onClick={handleCloneAsCollaborative}
            >
              <Users size={16} className="mr-2" />
              Make Collaborative
            </Button>
          )}
          
          {playlist.isCollaborative && (
            <Button 
              variant="outline" 
              className="ml-auto whitespace-nowrap"
              onClick={() => setShowCollaborators(true)}
            >
              <UserPlus size={16} className="mr-2" />
              Invite Collaborators
            </Button>
          )}
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
        
        {/* You might also like section */}
        {recommendedTracks.length > 0 && (
          <div className="mt-8">
            <PersonalizedSection
              title="You might also like"
              description="Based on this playlist"
              tracks={recommendedTracks}
              type="track"
            />
          </div>
        )}
        
        {/* Comments Dialog */}
        <Dialog open={showComments} onOpenChange={setShowComments}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Comments</DialogTitle>
              <DialogDescription>
                Share your thoughts about this playlist
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[50vh] overflow-y-auto">
              {comments.length > 0 ? (
                <div className="space-y-4 py-2">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.avatarUrl} alt={comment.username} />
                        <AvatarFallback>{comment.username.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.username}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  No comments yet. Be the first to comment!
                </div>
              )}
            </div>
            <Separator className="my-2" />
            <form onSubmit={handleSubmitComment} className="flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={!newComment.trim()}>
                <Send size={16} />
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* QR Code Dialog */}
        <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share via QR Code</DialogTitle>
              <DialogDescription>
                Scan this code to open the playlist
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center p-6">
              <div className="w-48 h-48 bg-white p-2">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://vibewave.app/playlist/${playlist.id}`}
                  alt="QR Code for playlist"
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button onClick={() => sharePlaylist(playlist.id)}>
                <Share2 size={16} className="mr-2" />
                Copy Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Collaborators Dialog */}
        <Dialog open={showCollaborators} onOpenChange={setShowCollaborators}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Invite Collaborators</DialogTitle>
              <DialogDescription>
                Invite friends to add tracks to this playlist
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[50vh] overflow-y-auto space-y-4 py-2">
              {users.filter(user => user.isFollowing).length > 0 ? (
                users.filter(user => user.isFollowing).map(user => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.displayName} />
                        <AvatarFallback>{user.displayName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.displayName}</p>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleInviteCollaborator(user)}
                    >
                      Invite
                    </Button>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  Follow some friends first to collaborate
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {currentTrack && <MiniPlayer />}
    </MainLayout>
  );
}
