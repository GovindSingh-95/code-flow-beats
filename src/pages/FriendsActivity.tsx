
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocial } from "@/providers/SocialProvider";
import { useMusic } from "@/providers/MusicProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, UserCheck, Search } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import FriendsActivityFeed from "@/components/FriendsActivityFeed";
import MiniPlayer from "@/components/MiniPlayer";

export default function FriendsActivity() {
  const navigate = useNavigate();
  const { users, followUser, unfollowUser } = useSocial();
  const { currentTrack } = useMusic();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredUsers = users.filter(user => 
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleFollowToggle = (userId: string, isFollowing: boolean) => {
    if (isFollowing) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };
  
  return (
    <MainLayout>
      <div className="pb-24">
        <div className="px-6 pt-6">
          <h1 className="text-2xl font-semibold mb-6">Friends Activity</h1>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search for friends..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid gap-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium">Following</h2>
                </div>
                <div className="space-y-4">
                  {filteredUsers.filter(user => user.isFollowing).length > 0 ? (
                    filteredUsers
                      .filter(user => user.isFollowing)
                      .map(user => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div 
                            className="flex items-center space-x-3 flex-1 cursor-pointer" 
                            onClick={() => navigate(`/user/${user.id}`)}
                          >
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
                            variant="outline"
                            size="sm"
                            onClick={() => handleFollowToggle(user.id, true)}
                          >
                            <UserCheck size={16} className="mr-1" />
                            Following
                          </Button>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8">
                      <Users className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No followed users found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-medium mb-4">Activity Feed</h2>
                <FriendsActivityFeed />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-medium mb-4">Suggested Friends</h2>
                <div className="space-y-4">
                  {filteredUsers.filter(user => !user.isFollowing).length > 0 ? (
                    filteredUsers
                      .filter(user => !user.isFollowing)
                      .map(user => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div 
                            className="flex items-center space-x-3 flex-1 cursor-pointer" 
                            onClick={() => navigate(`/user/${user.id}`)}
                          >
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
                            onClick={() => handleFollowToggle(user.id, false)}
                          >
                            <UserPlus size={16} className="mr-1" />
                            Follow
                          </Button>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No suggested users found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {currentTrack && <MiniPlayer />}
    </MainLayout>
  );
}
