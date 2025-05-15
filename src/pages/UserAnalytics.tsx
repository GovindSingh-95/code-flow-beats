
import { useMusic } from "@/providers/MusicProvider";
import MainLayout from "@/components/layouts/MainLayout";
import MiniPlayer from "@/components/MiniPlayer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function UserAnalytics() {
  const { userStats, currentTrack } = useMusic();
  
  // Colors for charts
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];
  
  return (
    <MainLayout>
      <div className="pb-24 p-6">
        <h1 className="text-3xl font-semibold mb-6">Your Listening Stats</h1>
        
        {/* Weekly Listening Time */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Listening Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userStats.listeningTime}>
                  <XAxis dataKey="day" />
                  <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value: number) => [`${value} minutes`, 'Listening time']}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Bar dataKey="minutes" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Top Genres */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Top Genres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userStats.topGenres}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {userStats.topGenres.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string) => [`${value} tracks`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Top Artists */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Top Artists</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={userStats.topArtists}>
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip 
                      formatter={(value: number) => [`${value} plays`, 'Play count']}
                    />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Listening Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Listening Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span>Total listening this week</span>
                <span className="font-medium">
                  {userStats.listeningTime.reduce((sum, day) => sum + day.minutes, 0)} minutes
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span>Most active day</span>
                <span className="font-medium">
                  {userStats.listeningTime.reduce((max, day) => max.minutes > day.minutes ? max : day).day}
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span>Favorite genre</span>
                <span className="font-medium">
                  {userStats.topGenres[0]?.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Favorite artist</span>
                <span className="font-medium">
                  {userStats.topArtists[0]?.name}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {currentTrack && <MiniPlayer />}
    </MainLayout>
  );
}
