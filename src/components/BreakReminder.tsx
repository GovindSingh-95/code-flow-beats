
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

type BreakReminderProps = {
  enabled: boolean;
  interval: number; // in minutes
}

export function BreakReminder({ enabled, interval }: BreakReminderProps) {
  const [lastReminderTime, setLastReminderTime] = useState(Date.now());

  useEffect(() => {
    if (!enabled) return;
    
    const checkInterval = window.setInterval(() => {
      const now = Date.now();
      const timeSinceLastReminder = (now - lastReminderTime) / (1000 * 60); // in minutes
      
      if (timeSinceLastReminder >= interval) {
        toast({
          title: "Take a Break",
          description: "Listen to something different or rest your ears for a while",
          duration: 10000,
        });
        setLastReminderTime(now);
      }
    }, 60000); // Check every minute
    
    return () => {
      clearInterval(checkInterval);
    };
  }, [enabled, interval, lastReminderTime]);
  
  // This is a utility component that doesn't render anything
  return null;
}
