import { useRef, useEffect } from "react";
import shivaVideo from "@/assets/shive-2.mp4";
import { Button } from "@/components/ui/button";
import { Sparkles, Calendar, MapPin } from "lucide-react";

interface HeroSectionProps {
  onRegisterClick: () => void;
  onPreBookClick: () => void;
}

const HeroSection = ({ onRegisterClick, onPreBookClick }: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className="relative -mt-20 md:pt-20 overflow-hidden min-h-screen">
      {/* Background video */}
      {/* <div className="absolute inset-0 -mt-20 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[90%_center] md:object-center"
        >
          <source src={shivaVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#000000bf]" />
        <div className="absolute inset-y-0 right-[-10%] w-[55%] bg-divine-gradient opacity-[0.18] blur-3xl" />
      </div> */}

      <div className="container mx-auto px-20 relative z-10 mt-20">
        <div className="max-w-4xl">
          <div>
            <div className="inline-flex items-center bg-transparent gap-2 rounded-full bg-card/80 backdrop-blur-sm px-3 py-1.5 text-xs md:text-sm font-medium text-white shadow-card mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sparkles w-4 h-4 text-yellow-500"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                <path d="M20 3v4"></path>
                <path d="M22 5h-4"></path>
                <path d="M4 17v2"></path>
                <path d="M5 18H3"></path>
              </svg>
              <span className="uppercase tracking-[0.2em]">
                Guinness World Record Attempt
              </span>
            </div>
            <h1 className="text-[52px] font-normal leading-normal text-[#FFF] mb-1" style={{ fontFamily: 'Jost, sans-serif' }}>
              Maha Yagam 2026
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-xl font-medium text-gold mb-8">
              The world's longest non stop pooja
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mb-8">
              <button
                onClick={onRegisterClick}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 hover:bg-red-700 text-white font-semibold hover:shadow-lg hover:scale-105 border-0 h-14 px-10 text-lg w-full sm:w-auto"
              >
                Register for Free
              </button>
              <button
                onClick={onPreBookClick}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-red-600 text-white hover:bg-red-600/10 hover:shadow-lg h-14  px-10 text-lg w-full sm:w-auto bg-black/40 backdrop-blur"
              >
                Pre-Book Blessed Rudraksha
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
