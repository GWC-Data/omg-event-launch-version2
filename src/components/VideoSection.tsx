import { Play, Volume2, VolumeX } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <div className="h-full flex flex-col justify-center py-8 md:py-12 px-4 md:px-8">
      <div className="text-center mb-6 md:mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
          Experience The Divine
        </span>
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
          A Glimpse Into{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Sacred Journey
          </span>
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Watch and feel the spiritual energy that awaits you
        </p>
      </div>

      <div className="relative aspect-video rounded-2xl overflow-hidden group">
        {/* Placeholder video - replace with actual promotional video */}
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

        {/* Play Button Overlay - Much more transparent, no white background */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/10 via-transparent to-black/10">
            <button
              onClick={handlePlayPause}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-card/95 hover:bg-card flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
            >
              <Play
                className="w-6 h-6 md:w-8 md:h-8 text-primary ml-1"
                fill="currentColor"
              />
            </button>
          </div>
        )}

        {/* Controls */}
        {isPlaying && (
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePlayPause}
              className="bg-card/90 backdrop-blur-sm hover:bg-card"
            >
              Pause
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleMute}
              className="bg-card/90 backdrop-blur-sm hover:bg-card"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
