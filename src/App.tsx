
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import { MusicProvider } from "./providers/MusicProvider";
import { SocialProvider } from "./providers/SocialProvider";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import NowPlaying from "./pages/NowPlaying";
import PlaylistDetail from "./pages/PlaylistDetail";
import UserAnalytics from "./pages/UserAnalytics";
import UserProfile from "./pages/UserProfile";
import FriendsActivity from "./pages/FriendsActivity";
import CollaborativePlaylists from "./pages/CollaborativePlaylists";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <MusicProvider>
        {(musicProviderProps) => (
          <SocialProvider 
            tracks={musicProviderProps.sampleTracks} 
            playlists={musicProviderProps.playlists}
          >
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Auth />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/playlist/:id" element={<PlaylistDetail />} />
                  <Route path="/now-playing" element={<NowPlaying />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/analytics" element={<UserAnalytics />} />
                  <Route path="/user/:id" element={<UserProfile />} />
                  <Route path="/friends" element={<FriendsActivity />} />
                  <Route path="/collaborative" element={<CollaborativePlaylists />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/index" element={<Navigate to="/home" replace />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </SocialProvider>
        )}
      </MusicProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
