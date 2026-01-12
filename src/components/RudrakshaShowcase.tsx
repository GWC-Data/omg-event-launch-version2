import rudrakshaImage from "@/assets/rudraksha-divine.jpg";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, Star } from "lucide-react";
import rudrakshaVideo from "@/assets/rudraksha-video.mp4";
import { ReelsPlayer } from "./ReelItem";

interface RudrakshaShowcaseProps {
  onPreBookClick: () => void;
}
interface ReelData {
  id: string;
  type: "video" | "youtube";
  url: string;
  title: string;
  desc: string;
}

const RudrakshaShowcase = ({ onPreBookClick }: RudrakshaShowcaseProps) => {
  // it it's custom video then use the url as the video url and if it's youtube then use the youtube video id only
  const reelVideos: ReelData[] = [
    {
      id: "11",
      type: "youtube",
      url: "vto3Re23qvQ",
      title: "Tirupati Balaji Aarti Darshan",
      desc: " Blessed Morning Live Aarti to Receive Peace, Strength and Blessings",
    },
    {
      id: "1",
      type: "video",
      url: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
      title: "Divine Energy",
      desc: "1,00,000 Mantra Chants Completed",
    },
    {
      id: "2",
      type: "youtube",
      url: "g4hqlgm-5Bs",
      title: "Live Ganga Aarti 🙏🏻🪔",
      desc: "Live Ganga Aarti at Kashi Vishwanath Temple, Varanasi",
    },
    {
      id: "3",
      type: "video",
      url: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
      title: "Jagannath dham",
      desc: "Today Mangal aarti darshan of shree Jagannath 🙏✨ on the Eve of Padma (Lotus)besha 🙏🥺",
    },
    {
      id: "4",
      type: "youtube",
      url: "VRLcConud0o",
      title: "Youtube Integration",
      desc: "Seamless embed support",
    },
  ];

  return (
    <section className="relative overflow-hidden pb-5 pt-2 flex items-center">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={rudrakshaVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/80 dark:bg-black/80 z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 max-w-7xl relative z-20 pt-2 pb-5 md:pt-2 md:pb-5">
        <div className="text-center mb-6 md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-sm px-3 py-1.5 border border-primary/30 text-xs md:text-sm font-medium text-primary shadow-card mb-3">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="uppercase tracking-[0.2em]">
              The Special Sacred Seed
            </span>
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
            The Rudraksh Recharged
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-3 text-base md:text-lg lg:text-xl font-medium">
              <span className="text-gold">25 Pandithars</span>
              <span className="text-white/40">•</span>
              <span className="text-white/90">1 Million Chants</span>
              <span className="text-white/40">•</span>
              <span className="text-gold">34 Non-Stop Hours</span>
              <span className="text-white/40">•</span>
              <span className="gold-text-gradient">Infinite Blessings</span>
            </div>
          </h2>
          <p className="text-gold font-semibold text-sm md:text-base mb-2">
            ✨ A bead transformed into a living vessel of Shiva's energy and
            grace
          </p>
          <p className="text-gold font-semibold text-sm md:text-base mb-2">
            🙏 Pre-book your Special Sacred Rudraksh NOW
          </p>
          <div className="text-white/90 mx-auto text-sm md:text-base leading-relaxed max-w-4xl">
            <p>
              On{" "}
              <span className="text-gold font-semibold">Maha Shivarathri</span>,
              25 pandithars will chant Lord Shiva's name{" "}
              <span className="text-gold font-semibold">1 million times</span>{" "}
              over <span className="text-gold font-semibold">34 hours</span>,
              sanctifying each Rudraksh through{" "}
              <span className="text-gold font-semibold">
                Sri Rudhram recited 3300 times
              </span>
              .
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start relative mt-6 lg:mt-8">
          {/* Reels player section */}
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start lg:sticky lg:top-8">
            <div className="relative w-full max-w-[340px] mx-auto lg:mx-0">
              {/* Background Glow Effect */}
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse-slow pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, hsl(30 100% 60% / 0.4), hsl(0 72% 50% / 0.3), hsl(30 100% 60% / 0.4))",
                }}
              />
              {/* The Reels Component */}
              <div className="relative z-10">
                <ReelsPlayer videos={reelVideos} />
              </div>
              {/* Badge below reels */}
              <div className="absolute -bottom-6 left-0 right-0 flex justify-center z-10">
                <div className="bg-black/40 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/20 px-4 py-2 rounded-full flex items-center gap-2 text-white dark:text-white shadow-card">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className="font-display text-sm font-semibold">
                    Live Darshan & Reels
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details - Card style */}
          <div className="order-1 lg:order-2 space-y-4 w-full">
            {/* Why This Rudraksh is Unique Section */}
            <div className="rounded-2xl bg-black/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/10 shadow-card p-4 md:p-5">
              <h3 className="text-white font-semibold text-base md:text-lg text-center mb-4">
                ✨ Why This Rudraksh is Unique
              </h3>
              <ul className="space-y-3 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-gold text-lg shrink-0 mt-0.5">🔱</span>
                  <p className="text-white/90 text-sm leading-relaxed">
                    <span className="font-semibold text-white">
                      1 Million Chants:
                    </span>{" "}
                    Each bead carries the vibration of Lord Shiva's name
                    repeated a million times.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-lg shrink-0 mt-0.5">🕉️</span>
                  <p className="text-white/90 text-sm leading-relaxed">
                    <span className="font-semibold text-white">
                      Sanctified by 25 Pandithars:
                    </span>{" "}
                    A collective offering of devotion and discipline.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-lg shrink-0 mt-0.5">🌙</span>
                  <p className="text-white/90 text-sm leading-relaxed">
                    <span className="font-semibold text-white">
                      34 Hours of Non-Stop Prayer:
                    </span>{" "}
                    A rare, uninterrupted spiritual energy flow.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-lg shrink-0 mt-0.5">🔔</span>
                  <p className="text-white/90 text-sm leading-relaxed">
                    <span className="font-semibold text-white">
                      Rudhram 3300 Times:
                    </span>{" "}
                    Deep purification through the most powerful Shiva mantra.
                  </p>
                </li>
              </ul>
            </div>

            {/* Price Card */}
            <div className="rounded-2xl bg-black/30 dark:bg-card/30 backdrop-blur-md border border-white/20 dark:border-border shadow-card p-4 md:p-6 space-y-5">
              {/* Price Display - Prominent */}
              <div className="text-center pb-5 border-b border-white/20 dark:border-border">
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-[0.18em] mb-2">
                  Pre-Book Price
                </p>
                <div className="flex items-baseline justify-center gap-2 mb-1">
                  <span className="font-sans text-5xl md:text-6xl font-bold gold-text-gradient tracking-tight">
                    ₹999
                  </span>
                  <span className="text-muted-foreground text-base font-sans">
                    /each
                  </span>
                </div>
                {/* <p className="text-gold font-semibold text-xs">
                  Token advance: ₹251 only
                </p> */}
              </div>

              {/* Features - Clean list */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 dark:bg-card/50 backdrop-blur-sm border border-white/10 dark:border-border flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white/90 font-semibold text-base mb-0.5">
                      34-Hour Continuous Chanting
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Non-stop sacred mantras by 25 Pandithars
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 dark:bg-card/50 backdrop-blur-sm border border-white/10 dark:border-border flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white/90 font-semibold text-base mb-0.5">
                      1 Million chants of lord Shiva's name
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      3400 times Shri Rudhram Chants
                    </p>
                  </div>
                </div>

                {/* <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 dark:bg-card/50 backdrop-blur-sm border border-white/10 dark:border-border flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white/90 font-semibold text-base mb-0.5">
                      100% Refundable
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Cancel anytime before event starts
                    </p>
                  </div>
                </div> */}
              </div>

              {/* CTA */}
              <div className="space-y-2">
                <Button
                  variant="divine"
                  size="lg"
                  className="w-full shadow-divine"
                  onClick={onPreBookClick}
                >
                  Pre-Book Now
                </Button>
                <p className="text-center text-muted-foreground text-xs">
                  Limited quantity available • Secure your blessing today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RudrakshaShowcase;
