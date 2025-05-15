
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMusic } from "@/providers/MusicProvider";
import { useToast } from "@/components/ui/use-toast";
import { Clock, Moon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function SleepTimer() {
  const [timerActive, setTimerActive] = useState(false);
  const [timerValue, setTimerValue] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const { togglePlayPause } = useMusic();
  const { toast } = useToast();

  const timerOptions = [
    { value: 5, label: "5m" },
    { value: 15, label: "15m" },
    { value: 30, label: "30m" },
    { value: 45, label: "45m" },
    { value: 60, label: "1h" },
  ];

  useEffect(() => {
    let interval: number | null = null;

    if (timerActive && remainingTime !== null) {
      interval = window.setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime === null || prevTime <= 0) {
            clearInterval(interval!);
            setTimerActive(false);
            togglePlayPause(); // Stop playback
            toast({
              title: "Sleep Timer Finished",
              description: "Playback has been paused as scheduled",
              duration: 5000,
            });
            return null;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, remainingTime, togglePlayPause, toast]);

  const startTimer = (minutes: number) => {
    setTimerValue(minutes);
    setRemainingTime(minutes * 60);
    setTimerActive(true);
    
    toast({
      title: "Sleep Timer Started",
      description: `Music will stop playing in ${minutes} minute${minutes !== 1 ? 's' : ''}`,
      duration: 3000,
    });
  };

  const cancelTimer = () => {
    setTimerActive(false);
    setRemainingTime(null);
    toast({
      title: "Sleep Timer Cancelled",
      description: "Timer has been turned off",
      duration: 3000,
    });
  };

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base">Sleep Timer</Label>
        {timerActive && (
          <div className="flex items-center font-mono text-sm">
            <Clock size={16} className="mr-2 animate-pulse" />
            {formatTime(remainingTime)}
          </div>
        )}
      </div>
      
      <ToggleGroup 
        type="single" 
        value={timerValue?.toString() || ""} 
        onValueChange={(value) => {
          if (value) startTimer(parseInt(value, 10));
        }}
        className="justify-between"
      >
        {timerOptions.map((option) => (
          <ToggleGroupItem 
            key={option.value} 
            value={option.value.toString()}
            disabled={timerActive}
            className="flex-1 text-sm"
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {timerActive && (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center gap-2"
          onClick={cancelTimer}
        >
          <Moon size={16} />
          Cancel Timer
        </Button>
      )}
    </div>
  );
}
