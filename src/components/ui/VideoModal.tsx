"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
}

export default function VideoModal({ 
  isOpen, 
  onClose,
  videoSrc = "https://www.w3schools.com/html/mov_bbb.mp4" 
}: VideoModalProps) {

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  
  // 🔥 FIX: Use useRef for the timeout instead of the window object
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // ━━━ UX: Lock background scroll ━━━
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => console.log("Autoplay blocked"));
          setIsPlaying(true);
        }
      }, 500);
    } else {
      document.body.style.overflow = "unset";
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // ━━━ UX: Keyboard Controls ━━━
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " " && isOpen) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPlaying]);

  // ━━━ VIDEO LOGIC ━━━
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
      setCurrentTime(formatTime(current));
      if (!isNaN(total)) setDuration(formatTime(total));
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const bar = e.currentTarget;
      const rect = bar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const handleFullscreen = () => {
    if (playerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // 🔥 FIX: Proper handleMouseMove with useRef
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-6">
          
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            ref={playerRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] border border-white/10 z-10 group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(isPlaying ? false : true)}
            onMouseMove={handleMouseMove}
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-50 p-2.5 bg-black/40 hover:bg-red-600 text-white rounded-full backdrop-blur-md transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover cursor-pointer"
              onClick={togglePlay}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
            />

            <AnimatePresence>
              {!isPlaying && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={togglePlay}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-600/90 text-white rounded-full flex items-center justify-center backdrop-blur-md shadow-2xl hover:bg-blue-500 hover:scale-110 transition-all z-20"
                >
                  <Play size={36} className="ml-1.5" fill="currentColor" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.2 }}
                  className="absolute bottom-4 inset-x-4 md:bottom-6 md:inset-x-6 z-30 flex flex-col gap-3 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-medium text-slate-300 w-10 text-right">{currentTime}</span>
                    <div className="relative h-1.5 bg-slate-700/50 rounded-full cursor-pointer flex-1 group/progress" onClick={handleProgressClick}>
                      <div className="absolute left-0 top-0 h-full bg-blue-500 rounded-full transition-all duration-75" style={{ width: `${progress}%` }}>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm opacity-0 group-hover/progress:opacity-100 scale-0 group-hover/progress:scale-100 transition-all" />
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 w-10">{duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-4">
                      <button onClick={togglePlay} className="p-2 text-white hover:text-blue-400 hover:bg-white/10 rounded-full transition-colors">
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                      </button>
                      <button onClick={toggleMute} className="p-2 text-white hover:text-blue-400 hover:bg-white/10 rounded-full transition-colors">
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                    </div>
                    <button onClick={handleFullscreen} className="p-2 text-white hover:text-blue-400 hover:bg-white/10 rounded-full transition-colors">
                      <Maximize size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}