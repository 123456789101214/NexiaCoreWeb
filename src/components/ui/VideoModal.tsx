"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
}

// Helper function to extract YouTube ID
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function VideoModal({ 
  isOpen, 
  onClose,
  videoSrc = "https://youtu.be/cZjGMCCm6zQ?si=IRHuUAnm33h3Sjzg" 
}: VideoModalProps) {

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasError, setHasError] = useState(false);

  // 🔥 Smart Detection: Check if the link is a YouTube URL
  const youtubeId = useMemo(() => getYouTubeId(videoSrc), [videoSrc]);
  const isYouTube = !!youtubeId;

  // ━━━ UX: Lock background scroll & AutoPlay ━━━
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setHasError(false); 
      
      // Auto-play logic only for HTML5 Video
      if (!isYouTube) {
        setTimeout(() => {
          if (videoRef.current) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => setIsPlaying(true))
                .catch((err) => {
                  console.warn("Autoplay prevented or source error:", err);
                  setIsPlaying(false);
                });
            }
          }
        }, 500);
      }
    } else {
      document.body.style.overflow = "unset";
      if (videoRef.current && !isYouTube) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen, isYouTube]);

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
      if (e.key === " " && isOpen && !hasError && !isYouTube) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPlaying, hasError, isYouTube, onClose]); // Added onClose to dependencies

  // ━━━ HTML5 VIDEO LOGIC (Only runs if NOT YouTube) ━━━
  const togglePlay = () => {
    if (isYouTube) return; // YouTube iframe handles its own play/pause
    
    if (videoRef.current && !hasError) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch((err) => {
              console.error("Video playback failed:", err);
              setIsPlaying(false);
              setHasError(true);
            });
        }
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current && !isYouTube) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isYouTube) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      
      if (isFinite(total) && total > 0) {
        setProgress((current / total) * 100);
        setDuration(formatTime(total));
      }
      setCurrentTime(formatTime(current));
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && !hasError && !isYouTube) {
      const totalDuration = videoRef.current.duration;
      if (!isFinite(totalDuration) || totalDuration === 0) return;

      const bar = e.currentTarget;
      const rect = bar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      
      videoRef.current.currentTime = pos * totalDuration;
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
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleMouseMove = () => {
    if (isYouTube) return;
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying && !hasError) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  const handleVideoError = () => {
    if (!isYouTube) {
      console.error("Failed to load video source.");
      setHasError(true);
      setIsPlaying(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-6">
          
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md cursor-pointer"
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
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-50 p-2.5 bg-black/50 hover:bg-red-600 text-white rounded-full backdrop-blur-md transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            {hasError && !isYouTube && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-white flex-col gap-3 z-10">
                <p className="text-lg font-medium">Video cannot be played</p>
                <p className="text-sm text-slate-400">Please make sure you are using a valid .mp4 link.</p>
              </div>
            )}

            {/* 🔥 Smart Render: Render iframe if YouTube, otherwise render HTML5 video */}
            {isYouTube ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover cursor-pointer"
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                onError={handleVideoError}
              />
            )}

            {/* Only show custom controls if it's NOT a YouTube video */}
            {!isYouTube && (
              <>
                <AnimatePresence>
                  {!isPlaying && !hasError && (
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
                  {showControls && !hasError && (
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
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}