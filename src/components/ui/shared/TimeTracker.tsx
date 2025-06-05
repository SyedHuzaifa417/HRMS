import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const WORK_DURATION = 8 * 60 * 60; // 8 hours in seconds
const BREAK_DURATION = 60 * 60; // 1 hour in seconds

interface LogState {
  start: string | null;
  break: string | null;
  end: string | null;
}

export default function TimeTracker() {
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [timerState, setTimerState] = useState("idle");
  const [log, setLog] = useState<LogState>({
    start: null,
    break: null,
    end: null,
  });
  const [breakTaken, setBreakTaken] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getCurrentDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const formatted = date.toLocaleDateString("en-US", options);

    const day = date.getDate();
    const suffix = getOrdinalSuffix(day);
    return formatted.replace(String(day), `${day}${suffix}`);
  };

  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const canTakeBreak = (): boolean => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 13;
  };

  const canEndWork = (): boolean => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 16;
  };

  useEffect(() => {
    if (timerState === "running") {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            setTimerState("ended");
            const endTime = new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            setLog((prevLog) => ({
              ...prevLog,
              end: endTime,
            }));
            console.log("Work ended at:", endTime);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState]);

  const handleStart = () => {
    if (timerState === "idle") {
      const now = new Date();
      const startTime =  now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const startIsoTime = now.toISOString();
      setLog((prevLog) => ({
        ...prevLog,
        start: startTime,
      }));
      console.log("Work started at:", startIsoTime);
    }
    setTimerState("running");
  };

  const handleBreak = () => {
    if (!canTakeBreak()) {
      alert("You can only take a break after 1 PM");
      return;
    }
  
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  
    setTimeLeft((prev) => Math.max(0, prev - BREAK_DURATION));
  
    const breakStartTime = new Date();
    const breakEndTime = new Date(breakStartTime.getTime() + BREAK_DURATION * 1000);
  
    const displayTime = `${breakStartTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} to ${breakEndTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  
    const isoStartBreak = breakStartTime.toISOString();
    const isoEndBreak = breakEndTime.toISOString();
  
    setLog((prevLog) => ({
      ...prevLog,
      break: displayTime,
    }));
    console.log("Break taken (ISO):", `${isoStartBreak} to ${isoEndBreak}`);
  
    setBreakTaken(true);
    setTimerState("paused");
  };  

  const handleEnd = () => {
    if (!canEndWork()) {
      alert("You can only end work after 4 PM");
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimerState("ended");
    const now = new Date()
    const endTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endIsoTime=now.toISOString()
    setLog((prevLog) => ({
      ...prevLog,
      end: endTime,
    }));
    console.log("Work ended at:", endIsoTime);
  };

  const formatDuration = (secs: number): string => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);

    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  const renderBars = () => {
    const totalBars = 40;
    const activeBars = Math.floor((timeLeft / WORK_DURATION) * totalBars);

    return (
      <div className="relative w-52 h-52 flex items-center justify-center">
        {/* Outer circle */}
        <div className="absolute w-full h-full rounded-full border-2 border-gray-400"></div>

        {Array.from({ length: totalBars }).map((_, i) => {
          const angle = (360 / totalBars) * i - 90;
          const radian = (angle * Math.PI) / 180;
          const radius = 72;

          const x = radius * Math.cos(radian);
          const y = radius * Math.sin(radian);

          return (
            <div
              key={i}
              className={`absolute w-2 h-6 rounded-xs  ${
                i < activeBars ? "bg-[#717171]" : "bg-[#AAA7A7]"
              }`}
              style={{
                left: `calc(50% + ${x}px - 4px)`,
                top: `calc(50% + ${y}px - 24px)`,
                transform: `rotate(${angle + 90}deg)`,
                transformOrigin: "center bottom",
              }}
            />
          );
        })}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-medium text-charcoal">
            {formatDuration(timeLeft)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-3xl bg-gray-soft p-3 w-full h-full flex flex-col gap-5">
      <div className="flex items-center gap-4 max-sm:flex-col mt-2">
        <h2 className=" text-xl font-semibold">Time Tracker</h2>
        <div className="flex space-x-2 text-sm">
          <Button
            className="bg-[#6D6B6B] hover:bg-gray-600 text-white px-6 py-1 rounded-full cursor-pointer disabled:bg-[#8D8B8B] disabled:cursor-not-allowed"
            onClick={handleStart}
            disabled={timerState === "running" || timerState === "ended"}
          >
            Start
          </Button>

          <Button
            className="bg-[#6D6B6B] hover:bg-gray-600 text-white px-6 py-1 rounded-full cursor-pointer disabled:bg-[#8D8B8B] disabled:cursor-not-allowed"
            onClick={handleBreak}
            disabled={timerState !== "running" || breakTaken}
          >
            Break
          </Button>

          <Button
            className="bg-[#6D6B6B] hover:bg-gray-600 text-white px-6 py-1 rounded-full cursor-pointer disabled:bg-[#8D8B8B] disabled:cursor-not-allowed"
            onClick={handleEnd}
            disabled={timerState === "ended" || timerState === "idle"}
          >
            End
          </Button>
        </div>
      </div>

      <div className="flex items-start gap-4 justify-evenly w-full min-w-[383px] max-sm:flex-col max-sm:items-center max-sm:min-w-max">
        {renderBars()}
        <div className="max-sm:w-max">
          <div className="text-lg mb-2 max-w-40 max-sm:max-w-72">
            {getCurrentDate()}
          </div>

          <div className="space-y-2 text-base max-sm:flex-1 max-sm:justify-between">
            <div>
              <div className="font-medium">Start:</div>
              <div className="lowercase">{log.start || "--"}</div>
            </div>

            <div>
              <div className="font-medium">Break:</div>
              <div className="lowercase">{log.break || "--"}</div>
            </div>

            <div>
              <div className="font-medium">End:</div>
              <div className="lowercase">{log.end || "--"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
