
import { useSocial } from "@/providers/SocialProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserActivity } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Music, Heart, Plus, Headphones } from "lucide-react";

export default function FriendsActivityFeed() {
  const { friendsActivity, getUserById } = useSocial();
  
  if (friendsActivity.length === 0) {
    return (
      <div className="text-center py-8">
        <Headphones className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No friend activity yet</p>
        <p className="text-xs text-muted-foreground">Follow friends to see what they're listening to</p>
      </div>
    );
  }

  const renderActivityContent = (activity: UserActivity) => {
    const user = getUserById(activity.userId);
    if (!user) return null;
    
    switch (activity.activityType) {
      case "listening":
        return (
          <div className="flex items-start space-x-3">
            <div className="mt-1">
              <Music size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">{user.displayName}</span> is listening to{' '}
                <span className="font-medium">{activity.track?.title}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.track?.artist}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        );
      case "liked":
        return (
          <div className="flex items-start space-x-3">
            <div className="mt-1">
              <Heart size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">{user.displayName}</span> liked{' '}
                <span className="font-medium">{activity.track?.title}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.track?.artist}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        );
      case "created":
        return (
          <div className="flex items-start space-x-3">
            <div className="mt-1">
              <Plus size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">{user.displayName}</span> created a new playlist{' '}
                <span className="font-medium">{activity.playlist?.name}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {friendsActivity.map((activity) => {
        const user = getUserById(activity.userId);
        if (!user) return null;
        
        return (
          <div key={activity.id} className="flex items-start space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.avatarUrl} alt={user.displayName} />
              <AvatarFallback>{user.displayName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {renderActivityContent(activity)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
