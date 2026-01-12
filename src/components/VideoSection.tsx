import { Play, Volume2, VolumeX } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Icon URLs from Figma
  const liveDarshanIcon = "https://www.figma.com/api/mcp/asset/afe80b04-7eb7-44b6-887d-551295d0663e";

  const handlePlayPause = () => {
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

  return (
    <div className="relative w-full">
      {/* Video Container */}
      <div className="relative w-full aspect-[601/400] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.5)] overflow-hidden group">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 z-10" />

        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?w=1920&q=80"
          muted={isMuted}
          loop
          playsInline
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-candles-in-dark-4449-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Play Button Overlay - Centered */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <button
              onClick={handlePlayPause}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[rgba(28,28,34,0.95)] backdrop-blur-[2px] hover:bg-[rgba(28,28,34,1)] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
            >
              <Play
                className="w-6 h-6 sm:w-8 sm:h-8 text-primary ml-1"
                fill="currentColor"
              />
            </button>
          </div>
        )}

        {/* Controls - Show when playing */}
        {isPlaying && (
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePlayPause}
              className="bg-card/90 backdrop-blur-sm hover:bg-secondary"
            >
              Pause
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="bg-card/90 backdrop-blur-sm hover:bg-secondary"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
          </div>
        )}

        {/* Live Darshan & Reels Badge - Top Center */}
        <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 bg-[#e32c26] border border-white/20 h-[32px] sm:h-[38px] px-2 sm:px-4 flex items-center gap-1.5 sm:gap-2 z-30">
          <div className="w-3 h-3 sm:w-4 sm:h-4">
            <img
              alt=""
              className="block max-w-none w-full h-full"
              src={liveDarshanIcon}
            />
          </div>
          <span
            className="text-white text-center text-xs sm:text-sm font-semibold whitespace-nowrap"
            style={{ fontFamily: "Jost, sans-serif" }}
          >
            Live Darshan & Reels
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
