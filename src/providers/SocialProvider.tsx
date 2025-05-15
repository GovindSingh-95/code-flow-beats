
import { createContext, useContext, useState } from "react";
import { Comment, Playlist, Track, UserActivity, UserProfile } from "@/types";
import { toast } from "@/components/ui/use-toast";

// Sample user data
const sampleUsers: UserProfile[] = [
  {
    id: "1",
    username: "byteMaster",
    displayName: "ByteMaster",
    avatarUrl: "/placeholder.svg",
    bio: "Coding to the rhythm of electronic beats",
    isFollowing: true
  },
  {
    id: "2",
    username: "codeBeats",
    displayName: "CodeBeats",
    avatarUrl: "/placeholder.svg",
    bio: "Music producer & full-stack developer",
    isFollowing: true
  },
  {
    id: "3",
    username: "devSound",
    displayName: "DevSound",
    avatarUrl: "/placeholder.svg",
    bio: "Creating ambient soundscapes for focused coding",
    isFollowing: false
  },
  {
    id: "4",
    username: "exception",
    displayName: "Exception",
    avatarUrl: "/placeholder.svg",
    bio: "Catch me if you can",
    isFollowing: false
  },
  {
    id: "5",
    username: "stackOverflow",
    displayName: "StackOverflow",
    avatarUrl: "/placeholder.svg",
    bio: "I've got the answer to your coding questions",
    isFollowing: false
  },
];

// Sample activities
const generateActivities = (users: UserProfile[], tracks: Track[], playlists: Playlist[]): UserActivity[] => {
  const activities: UserActivity[] = [];
  
  // Generate some listening activities
  users.forEach(user => {
    if (tracks.length > 0) {
      activities.push({
        id: `activity-${user.id}-1`,
        userId: user.id,
        activityType: "listening",
        timestamp: Date.now() - Math.floor(Math.random() * 3600000),
        track: tracks[Math.floor(Math.random() * tracks.length)]
      });
    }
  });
  
  // Generate some liked activities
  users.slice(0, 3).forEach(user => {
    if (tracks.length > 0) {
      activities.push({
        id: `activity-${user.id}-2`,
        userId: user.id,
        activityType: "liked",
        timestamp: Date.now() - Math.floor(Math.random() * 86400000),
        track: tracks[Math.floor(Math.random() * tracks.length)]
      });
    }
  });
  
  // Generate some playlist creation activities
  users.slice(0, 2).forEach(user => {
    if (playlists.length > 0) {
      activities.push({
        id: `activity-${user.id}-3`,
        userId: user.id,
        activityType: "created",
        timestamp: Date.now() - Math.floor(Math.random() * 604800000),
        playlist: playlists[Math.floor(Math.random() * playlists.length)]
      });
    }
  });
  
  return activities.sort((a, b) => b.timestamp - a.timestamp);
};

// Sample comments for playlists
const generateComments = (users: UserProfile[]): Comment[] => {
  return [
    {
      id: "comment1",
      userId: users[0].id,
      username: users[0].username,
      avatarUrl: users[0].avatarUrl,
      content: "This playlist is perfect for late night coding sessions!",
      timestamp: Date.now() - 3600000,
      likes: 5
    },
    {
      id: "comment2",
      userId: users[1].id,
      username: users[1].username,
      avatarUrl: users[1].avatarUrl,
      content: "Added this to my favorites. Great selection of tracks!",
      timestamp: Date.now() - 7200000,
      likes: 3
    },
    {
      id: "comment3",
      userId: users[2].id,
      username: users[2].username,
      avatarUrl: users[2].avatarUrl,
      content: "Would love to see more tracks like the third one. Amazing vibes!",
      timestamp: Date.now() - 86400000,
      likes: 8
    }
  ];
};

type SocialContextType = {
  currentUser: UserProfile;
  users: UserProfile[];
  friendsActivity: UserActivity[];
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  getUserById: (userId: string) => UserProfile | undefined;
  addComment: (playlistId: string, content: string) => void;
  getPlaylistComments: (playlistId: string) => Comment[];
  toggleLikePlaylist: (playlistId: string) => void;
  isPlaylistLiked: (playlistId: string) => boolean;
  sharePlaylist: (playlistId: string) => void;
  inviteToCollaborate: (playlistId: string, userId: string) => void;
  likedPlaylists: string[];
};

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider = ({ 
  children,
  tracks = [], 
  playlists = []
}: { 
  children: React.ReactNode;
  tracks?: Track[];
  playlists?: Playlist[];
}) => {
  const [currentUser] = useState<UserProfile>({
    id: "current",
    username: "johnDev",
    displayName: "John Doe",
    avatarUrl: "/placeholder.svg",
    bio: "Music enthusiast and developer",
    following: sampleUsers.filter(user => user.isFollowing)
  });
  
  const [users] = useState<UserProfile[]>(sampleUsers);
  const [friendsActivity, setFriendsActivity] = useState<UserActivity[]>(
    generateActivities(users.filter(user => user.isFollowing), tracks, playlists)
  );
  const [likedPlaylists, setLikedPlaylists] = useState<string[]>([]);
  const [playlistComments, setPlaylistComments] = useState<{[key: string]: Comment[]}>({});
  
  // Initialize some comments for playlists
  useState(() => {
    const commentsMap: {[key: string]: Comment[]} = {};
    playlists.forEach(playlist => {
      if (Math.random() > 0.5) { // Only some playlists have comments
        commentsMap[playlist.id] = generateComments(users);
      }
    });
    setPlaylistComments(commentsMap);
  });

  const followUser = (userId: string) => {
    const targetUser = users.find(user => user.id === userId);
    if (targetUser) {
      targetUser.isFollowing = true;
      toast({
        title: "Success",
        description: `You are now following ${targetUser.displayName}`
      });
      
      // Add new activity for the followed user
      if (tracks.length > 0) {
        const newActivity: UserActivity = {
          id: `activity-${userId}-follow-${Date.now()}`,
          userId,
          activityType: "listening",
          timestamp: Date.now(),
          track: tracks[Math.floor(Math.random() * tracks.length)]
        };
        
        setFriendsActivity(prev => [newActivity, ...prev]);
      }
    }
  };
  
  const unfollowUser = (userId: string) => {
    const targetUser = users.find(user => user.id === userId);
    if (targetUser) {
      targetUser.isFollowing = false;
      toast({
        title: "Success",
        description: `You have unfollowed ${targetUser.displayName}`
      });
      
      // Remove activities from this user
      setFriendsActivity(prev => 
        prev.filter(activity => activity.userId !== userId)
      );
    }
  };
  
  const getUserById = (userId: string) => {
    return users.find(user => user.id === userId);
  };
  
  const addComment = (playlistId: string, content: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      avatarUrl: currentUser.avatarUrl,
      content,
      timestamp: Date.now(),
      likes: 0
    };
    
    setPlaylistComments(prev => ({
      ...prev,
      [playlistId]: [...(prev[playlistId] || []), newComment]
    }));
    
    toast({
      title: "Comment added",
      description: "Your comment has been added to the playlist"
    });
  };
  
  const getPlaylistComments = (playlistId: string) => {
    return playlistComments[playlistId] || [];
  };
  
  const toggleLikePlaylist = (playlistId: string) => {
    setLikedPlaylists(prev => {
      if (prev.includes(playlistId)) {
        toast({
          title: "Unliked",
          description: "Removed from your liked playlists"
        });
        return prev.filter(id => id !== playlistId);
      } else {
        toast({
          title: "Liked!",
          description: "Added to your liked playlists"
        });
        return [...prev, playlistId];
      }
    });
  };
  
  const isPlaylistLiked = (playlistId: string) => {
    return likedPlaylists.includes(playlistId);
  };
  
  const sharePlaylist = (playlistId: string) => {
    // In a real app, this would generate a link or show a sharing dialog
    toast({
      title: "Playlist shared",
      description: "Link copied to clipboard"
    });
  };
  
  const inviteToCollaborate = (playlistId: string, userId: string) => {
    const user = getUserById(userId);
    if (user) {
      toast({
        title: "Invitation sent",
        description: `Invited ${user.displayName} to collaborate`
      });
    }
  };
  
  return (
    <SocialContext.Provider
      value={{
        currentUser,
        users,
        friendsActivity,
        followUser,
        unfollowUser,
        getUserById,
        addComment,
        getPlaylistComments,
        toggleLikePlaylist,
        isPlaylistLiked,
        sharePlaylist,
        inviteToCollaborate,
        likedPlaylists
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  
  if (context === undefined) {
    throw new Error("useSocial must be used within a SocialProvider");
  }
  
  return context;
};
