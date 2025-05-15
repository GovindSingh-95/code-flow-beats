
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun, Volume2, WifiOff, BellRing, Clock, Sliders, Palette, MessageCircle } from "lucide-react";
import { MusicEqualizer } from "@/components/MusicEqualizer";
import { SleepTimer } from "@/components/SleepTimer";
import { useToast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  const [breakReminders, setBreakReminders] = useState(true);
  const [breakInterval, setBreakInterval] = useState(60); // minutes
  const [audioQuality, setAudioQuality] = useState("high");

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-4 rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose how VibeWave looks
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Sun size={18} className={theme === 'light' ? "text-primary" : "text-muted-foreground"} />
                  <Select
                    value={theme}
                    onValueChange={(value) => setTheme(value as any)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="monokai">Monokai</SelectItem>
                      <SelectItem value="solarized">Solarized</SelectItem>
                    </SelectContent>
                  </Select>
                  <Moon size={18} className={theme === 'dark' ? "text-primary" : "text-muted-foreground"} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label className="text-base">Data Saver</Label>
                  <p className="text-sm text-muted-foreground">
                    Reduce data usage when streaming
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <WifiOff size={18} className={dataSaver ? "text-primary" : "text-muted-foreground"} />
                  <Switch
                    checked={dataSaver}
                    onCheckedChange={setDataSaver}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Audio Quality</Label>
                  <p className="text-sm text-muted-foreground">
                    Set streaming audio quality
                  </p>
                </div>
                <Select
                  value={audioQuality}
                  onValueChange={setAudioQuality}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (96kbps)</SelectItem>
                    <SelectItem value="medium">Medium (160kbps)</SelectItem>
                    <SelectItem value="high">High (320kbps)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button onClick={handleSave} className="w-full">Save Changes</Button>
          </TabsContent>

          <TabsContent value="audio" className="space-y-4">
            <div className="space-y-4 rounded-md border p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-lg font-medium">Equalizer</Label>
                  <Sliders size={18} className="text-muted-foreground" />
                </div>
                <MusicEqualizer />
              </div>
            </div>
            
            <div className="space-y-4 rounded-md border p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-lg font-medium">Sleep Timer</Label>
                  <Clock size={18} className="text-muted-foreground" />
                </div>
                <SleepTimer />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-4 rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about new music and activities
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <BellRing size={18} className={notifications ? "text-primary" : "text-muted-foreground"} />
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label className="text-base">Break Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminded to take listening breaks
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={18} className={breakReminders ? "text-primary" : "text-muted-foreground"} />
                  <Switch
                    checked={breakReminders}
                    onCheckedChange={setBreakReminders}
                  />
                </div>
              </div>

              {breakReminders && (
                <div className="pt-2">
                  <Label className="mb-2 block">Reminder interval (minutes)</Label>
                  <div className="flex items-center gap-4">
                    <Slider 
                      value={[breakInterval]} 
                      min={15} 
                      max={120} 
                      step={15} 
                      onValueChange={(values) => setBreakInterval(values[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-center font-mono">{breakInterval}</span>
                  </div>
                </div>
              )}
            </div>
            
            <Button onClick={handleSave} className="w-full">Save Changes</Button>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
