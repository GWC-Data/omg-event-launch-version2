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
    <section className="relative pt-15 md:pt-20 overflow-hidden min-h-screen">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
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
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-sm px-3 py-1.5 border border-primary/30 text-xs md:text-sm font-medium text-primary shadow-card mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-sparkles w-4 h-4 text-secondary"
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
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] leading-tight md:leading-[1.1] text-white mb-6">
              Maha Yagam 2026:
              <span className="block gold-text-gradient mt-2">
                The world's longest non stop pooja
              </span>
            </h1>
            <p className="text-sm md:text-base font-medium tracking-[0.18em] uppercase text-secondary mb-4">
            25 Pandithars • 1 Million Chants • 1,00,000 Rudraksh
            </p>
            <p className="text-base md:text-lg text-white/90 max-w-xl leading-relaxed mb-6">
              On Maha Shivarathri, Oh My God (OMG) presents Maha Yagam — a{" "}
              <span className="text-gold font-semibold">34 hour</span> non stop
              pooja where{" "}
              <span className="text-gold font-semibold">25 pandithars</span> chant
              Rudhram 3400 times, echoing Lord Shiva's name 1 million times
              while <span className="text-gold font-semibold">1,00,000</span>{" "}
              sacred Rudraksh beads are prayed upon. Register free to join this
              epic celebration of devotion and unity.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-card/90 backdrop-blur-sm px-3 py-1 border border-primary/30 text-xs md:text-sm shadow-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-calendar w-4 h-4 text-primary"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                <span className="font-medium text-foreground">
                  February 15th, 2026
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-card/90 backdrop-blur-sm px-3 py-1 border border-primary/30 text-xs md:text-sm shadow-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-map-pin w-4 h-4 text-secondary"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="font-medium text-foreground">
                  Hotel Hills, Hosur
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mb-8">
              <button 
                onClick={onRegisterClick}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-divine-gradient text-primary-foreground font-semibold hover:shadow-glow hover:scale-105 border-0 h-14 rounded-lg px-10 text-lg w-full sm:w-auto shadow-divine"
              >
                Register for Free
              </button>
              <button 
                onClick={onPreBookClick}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-2 border-gold text-white/90 dark:text-white hover:bg-gold/10 hover:shadow-divine h-14 rounded-lg px-10 text-lg w-full sm:w-auto bg-gold/30 backdrop-blur"
              >
                Pre-Book Blessed Rudraksha
              </button>
            </div>
            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-black/30 dark:bg-card/30 backdrop-blur-md border border-white/20 dark:border-border shadow-card">
              <div className="inline-flex flex-col">
                <span className="text-xs md:text-sm text-white/80 dark:text-muted-foreground">
                  Non stop hours
                </span>
                <span className="font-semibold text-lg md:text-xl text-white dark:text-foreground">
                  34
                </span>
              </div>
              <span className="h-12 w-px bg-white/20 dark:bg-border"></span>
              <div className="inline-flex flex-col text-center">
                <span className="text-xs md:text-sm text-white/80 dark:text-muted-foreground">
                Pandithars
                </span>
                <span className="font-semibold text-lg md:text-xl text-white dark:text-foreground">
                  25
                </span>
              </div>
              <span className="h-12 w-px bg-white/20 dark:bg-border"></span>
              <div className="inline-flex flex-col text-right">
                <span className="text-xs md:text-sm text-white/80 dark:text-muted-foreground">
                  Chants of Shiva
                </span>
                <span className="font-semibold text-lg md:text-xl text-white dark:text-foreground">
                  1 Million
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
