import React, { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

// Define the data structure for your reels
export type ReelData = {
  id: string;
  type: "video" | "youtube";
  url: string; // MP4 url or YouTube ID
  title?: string;
  desc?: string;
};

interface ReelsPlayerProps {
  videos: ReelData[];
}

const ReelItem = ({
  data,
  isActive,
}: {
  data: ReelData;
  isActive: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle Auto-Play/Pause based on scroll position (isActive)
  useEffect(() => {
    if (data.type === "video" && videoRef.current) {
      if (isActive) {
        // Reset time to 0 if you want it to restart every time,
        // or remove this line to resume where left off
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false)); // Auto-play prevented
        }
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive, data.type]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full h-full shrink-0 snap-start snap-always overflow-hidden bg-black dark:bg-black rounded-3xl">
      {data.type === "video" ? (
        <video
          ref={videoRef}
          src={data.url}
          className="w-full h-full object-cover"
          loop
          muted={isMuted} // Browsers require mute for autoplay
          playsInline
          onClick={togglePlay}
        />
      ) : (
        <iframe
          className="w-full h-full pointer-events-none" // pointer-events-none prevents YouTube from hijacking scroll
          src={`https://www.youtube.com/embed/${
            data.url
          }?enablejsapi=1&controls=0&rel=0&loop=1&playlist=${
            data.url
          }&autoplay=${isActive ? 1 : 0}&mute=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      )}

      {/* --- OVERLAYS (Gradients & Text) --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

      {/* Controls (Only for native video) */}
      {data.type === "video" && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 p-2 bg-black/40 dark:bg-black/40 backdrop-blur-md rounded-full text-white dark:text-white hover:bg-black/60 transition"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}

      {/* Info Section */}
      <div className="absolute bottom-6 left-6 right-6 text-white dark:text-white pointer-events-none">
        {data.title && (
          <h3 className="font-bold text-lg drop-shadow-md">{data.title}</h3>
        )}
        {data.desc && (
          <p className="text-sm opacity-90 drop-shadow-md">{data.desc}</p>
        )}
      </div>
    </div>
  );
};

export const ReelsPlayer: React.FC<ReelsPlayerProps> = ({ videos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Logic to detect which video is currently fully in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  return (
    <div className="relative w-full aspect-[9/16] max-h-[600px] bg-gray-900 dark:bg-gray-900 rounded-3xl shadow-card border border-white/20 dark:border-white/20 overflow-hidden">
      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="w-full h-full snap-start snap-always shrink-0"
          >
            <ReelItem data={video} isActive={index === activeIndex} />
          </div>
        ))}
      </div>
    </div>
  );
};


