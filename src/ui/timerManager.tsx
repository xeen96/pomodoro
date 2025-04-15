import { useEffect } from "react";
import { useTimer } from "../hooks/useTimer";
import { formatTime } from "../utils/formatTime";

export function TimerManager() {
  const { isRunning, tick, time, mode } = useTimer();

  useEffect(() => {
    const formattedTime = formatTime(time);
    const modeText = mode === "work" ? "💻" : mode === "break" ? "☕" : "🛌🏻";
    document.title = `${modeText} - ${formattedTime}`;
  }, [mode, time]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      console.log("Starting timer");
      timer = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => {
      if (timer) {
        console.log("Clearing timer");
        clearInterval(timer);
      }
    };
  }, [isRunning]);

  return null;
}
