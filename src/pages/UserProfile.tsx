
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSocial } from "@/providers/SocialProvider";
import { useMusic } from "@/providers/MusicProvider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, UserPlus, UserMinus, Music } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import { UserProfile } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MiniPlayer from "@/components/MiniPlayer";

export default function UserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getUserById, followUser, unfollowUser, friendsActivity } = useSocial();
  const { currentTrack, getDailyMixes } = useMusic();
  const [user, setUser] = useState<UserProfile | undefined>();
  const [activeTab, setActiveTab] = useState("playlists");
  
  useEffect(() => {
    if (id) {
      const foundUser = getUserById(id);
      setUser(foundUser);
    }
  }, [id, getUserById]);
  
  if (!user) {
    return <div>User not found</div>;
  }
  
  const userActivities = friendsActivity.filter(activity => activity.userId === user.id);
  
  const handleFollowToggle = () => {
    if (user.isFollowing) {
      unfollowUser(user.id);
      setUser({...user, isFollowing: false});
    } else {
      followUser(user.id);
      setUser({...user, isFollowing: true});
    }
  };
  
  // Get some playlists for this user
  const userPlaylists = getDailyMixes().slice(0, 2);
  
  return (
    <MainLayout>
      <div className="pb-24">
        <div className="relative bg-gradient-to-b from-primary/30 to-background p-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="absolute top-4 left-4">
            <ChevronLeft />
          </Button>
          
          <div className="flex flex-col items-center pt-8">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={user.avatarUrl} alt={user.displayName} />
              <AvatarFallback>{user.displayName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            {user.bio && <p className="mt-2 text-center">{user.bio}</p>}
            
            <Button 
              variant={user.isFollowing ? "outline" : "default"}
              className="mt-4"
              onClick={handleFollowToggle}
            >
              {user.isFollowing ? (
                <>
                  <UserMinus size={16} className="mr-2" />
                  Unfollow
                </>
              ) : (
                <>
                  <UserPlus size={16} className="mr-2" />
                  Follow
                </>
              )}
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="listening">Listening</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="playlists" className="px-6 py-4">
            <h2 className="text-xl font-semibold mb-4">Playlists</h2>
            <div className="grid grid-cols-2 gap-4">
              {userPlaylists.map(playlist => (
                <Card key={playlist.id} className="overflow-hidden cursor-pointer" onClick={() => navigate(`/playlist/${playlist.id}`)}>
                  <div className="aspect-square bg-secondary">
                    <img 
                      src={playlist.coverUrl || '/placeholder.svg'} 
                      alt={playlist.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium">{playlist.name}</h3>
                    <p className="text-xs text-muted-foreground">{playlist.tracks.length} tracks</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="px-6 py-4">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            {userActivities.length > 0 ? (
              <div className="space-y-4">
                {userActivities.map(activity => (
                  <Card key={activity.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 bg-primary/20 p-2 rounded-full">
                          <Music size={18} />
                        </div>
                        <div>
                          {activity.activityType === 'listening' && (
                            <p>Listening to <strong>{activity.track?.title}</strong> by {activity.track?.artist}</p>
                          )}
                          {activity.activityType === 'liked' && (
                            <p>Liked <strong>{activity.track?.title}</strong> by {activity.track?.artist}</p>
                          )}
                          {activity.activityType === 'created' && (
                            <p>Created playlist <strong>{activity.playlist?.name}</strong></p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No recent activity to display
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="listening" className="px-6 py-4">
            <h2 className="text-xl font-semibold mb-4">Listening History</h2>
            <div className="text-center py-8 text-muted-foreground">
              {user.isFollowing ? (
                <p>Follow to see listening history</p>
              ) : (
                <p>No listening history available</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {currentTrack && <MiniPlayer />}
    </MainLayout>
  );
}
