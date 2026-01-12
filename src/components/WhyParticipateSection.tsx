import { ReelsPlayer, type ReelData } from "./ReelItem";
import { Button } from "@/components/ui/button";

// Sample video data for the reels
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

interface WhyParticipateSectionProps {
  onRegisterClick?: () => void;
  onPreBookClick?: () => void;
}

const WhyParticipateSection = ({
  onRegisterClick,
  onPreBookClick,
}: WhyParticipateSectionProps) => {
  // Icon URL from Figma
  const liveDarshanIcon = "https://www.figma.com/api/mcp/asset/e888d089-3434-4fb6-bcf7-baf2a1bf2134";

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-[#f7f7f7]">
      <div className="container mx-auto px-4 md:px-8 lg:px-[100px] max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div className="flex-1 flex flex-col gap-10">
            {/* Badge and Heading */}
            <div className="flex flex-col items-start">
              <span
                className="inline-block px-4 py-1.5 rounded-full bg-transparent text-[#e53e29] text-[18px] font-semibold uppercase tracking-[1px] mb-4"
                style={{ fontFamily: "Jost, sans-serif" }}
              >
                Our Sacred Mission
              </span>
              <h2
                className="text-[42px] font-bold text-[#1c1c1c] tracking-[2px] leading-[50.4px] mb-0"
                style={{ fontFamily: "Jost, sans-serif" }}
              >
                Why Maha Yagam?
              </h2>
            </div>

            {/* Description Text */}
            <div
              className="text-[#a1a1aa] text-[16px] leading-[31px] max-w-[752px]"
              style={{ fontFamily: "Jost, sans-serif" }}
            >
              <p>
                In an age of turmoil and uncertainty, humanity turns to the divine for strength and upliftment. Maha Yagam 2026 is our humble offering to Lord Shiva — the longest non stop pooja ever performed on Earth. On the auspicious night of Maha Shivarathri, Oh My God (OMG) launches its first grand spiritual event. For 34 continuous hours, 25 devoted purohits will chant the sacred Rudhram 1 million times, sanctifying 100,000 Rudraksha beads with mantric energy. We believe that when 100,000 sacred mantras are chanted over 100,000 Rudraksha beads by devoted Pandithars, it creates a powerful vortex of divine energy that can heal, protect, and transform lives.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onRegisterClick}
                className="bg-[#e32c26] hover:bg-[#e32c26]/90 text-white text-[18px] font-semibold h-[56px] px-8 rounded-md shadow-[0px_14px_45px_0px_rgba(255,153,51,0.3)]"
                style={{ fontFamily: "Jost, sans-serif" }}
              >
                Register for Free
              </Button>
              <Button
                onClick={onPreBookClick}
                variant="outline"
                className="border-[#e32c26] text-[#e32c26] hover:bg-[#e32c26]/5 hover:text-[#e32c26] text-[18px] font-medium h-[56px] px-8 rounded-md backdrop-blur-sm"
                style={{ fontFamily: "Jost, sans-serif" }}
              >
                Pre-Book Blessed Rudraksha
              </Button>
            </div>
          </div>

          {/* Right Column - Video Reel */}
          <div className="relative w-full lg:w-[340px] flex-shrink-0">
            {/* Live Darshan & Reels Badge */}
            <div className="absolute -top-[22px] left-1/2 lg:left-[77px] lg:translate-x-0 -translate-x-1/2 z-20 bg-[#e32c26] border border-white/20 h-[38px] px-4 flex items-center gap-2 rounded-md">
              <div className="w-4 h-4">
                <img
                  alt=""
                  className="block max-w-none w-full h-full"
                  src={liveDarshanIcon}
                />
              </div>
              <span
                className="text-white text-[14px] font-semibold whitespace-nowrap"
                style={{ fontFamily: "Jost, sans-serif" }}
              >
                Live Darshan & Reels
              </span>
            </div>

            {/* Video Reel Container */}
            <div className="relative">
              {/* Gradient blur effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[rgba(255,153,51,0.4)] via-[rgba(255,153,51,0.4)] to-[rgba(255,153,51,0.4)] blur-[20px] opacity-40 rounded-[24px]" />
              
              {/* Reels Player */}
              <div className="relative">
                <ReelsPlayer videos={reelVideos} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyParticipateSection;
