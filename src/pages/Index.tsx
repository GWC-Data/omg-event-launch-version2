import { useState, useEffect, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import CountdownTimer from "@/components/CountdownTimer";
import VideoSection from "@/components/VideoSection";
import RudrakshaShowcase from "@/components/RudrakshaShowcase";
import WhyParticipateSection from "@/components/WhyParticipateSection";
import EventHighlights from "@/components/EventHighlights";
import DivineQuoteSection from "@/components/DivineQuoteSection";
import RegistrationForm from "@/components/RegistrationForm";
import RudrakshaBooking from "@/components/RudrakshaBooking/RudrakshaBooking";
import CelebritySection from "@/components/CelebritySection";
import AttractionsSection from "@/components/AttractionsSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/site-logo.png";
import { Link } from "react-router-dom";
import shivaVideo from "@/assets/shive-2.mp4";
const Index = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // change threshold if needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (sectionId: string, updateHash = true) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL hash without triggering scroll
      if (updateHash) {
        window.history.pushState(null, "", `#${sectionId}`);
      }
    }
  };
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);
  // Handle URL parameters and hash on page load
  useEffect(() => {
    const handleInitialLoad = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const openParam = urlParams.get("open");

      if (openParam === "registration") {
        setIsRegistrationOpen(true);
        const hash = window.location.hash;
        const newUrl = hash
          ? `${window.location.pathname}${hash}`
          : window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      } else if (openParam === "booking") {
        scrollToSection("rudraksha");

        // setIsBookingOpen(true);
        // const hash = window.location.hash;
        // const newUrl = hash ? `${window.location.pathname}${hash}` : window.location.pathname;
        // window.history.replaceState({}, "", newUrl);
      }

      // Handle hash navigation (scroll to section)
      const hash = window.location.hash.slice(1); // Remove the '#' symbol
      if (hash) {
        // Small delay to ensure DOM is fully rendered
        setTimeout(() => {
          scrollToSection(hash, false); // Don't update hash again
        }, 100);
      }
    };

    handleInitialLoad();
  }, []);

  // Handle hash changes (browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        scrollToSection(hash, false);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Video Background Container - Only for Nav and Hero */}
      <div className="relative min-h-screen">
        {/* Background Video Container */}
        <div className="fixed top-0 left-0 right-0 h-screen z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-[80%_center] md:object-center"
          >
            <source src={shivaVideo} type="video/mp4" />
          </video>
          {/* Overlays */}
          <div className="absolute inset-0 bg-black/70 md:bg-[#000000bf]" />
          <div className="absolute inset-y-0 right-[-10%] w-[80%] md:w-[55%] bg-divine-gradient opacity-[0.15] md:opacity-[0.18] blur-3xl" />
        </div>

        {/* Responsive Navigation */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? "bg-white/95 shadow-md backdrop-blur-md py-2"
              : "bg-transparent py-3 md:py-5"
          }`}
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-10">
            <div className="flex items-center justify-between gap-2 relative">
              {/* Logo Section */}
              <div className="flex items-center min-w-0 z-10">
                <Link
                  to="https://omgofficial.com/"
                  target="_blank"
                  className="flex items-center gap-2 min-w-0"
                >
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 flex-shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <p
                      className={`text-[9px] sm:text-[10px] font-semibold leading-tight tracking-[0.1em] sm:tracking-[0.2em] uppercase truncate ${
                        scrolled ? "text-orange-600" : "text-[#FF9933B2]"
                      }`}
                    >
                      Oh My God • OMG
                    </p>
                    <p
                      className={`text-[8px] sm:text-[9px] font-medium leading-tight uppercase truncate ${
                        scrolled ? "text-[#293088]" : "text-white/70"
                      }`}
                    >
                      Yours Spiritually
                    </p>
                    <p
                      className={`font-display text-xs sm:text-sm font-bold leading-tight truncate ${
                        scrolled ? "text-[#293088]" : "text-white"
                      }`}
                    >
                      Maha Yagam 2026
                    </p>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation - Hidden on Mobile */}
              <div
                className={`hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2 transition-colors duration-300 ${
                  scrolled ? "text-slate-900" : "text-white"
                }`}
              >
                {[
                  "Overview",
                  "Why Participate",
                  "Rudraksha",
                  "Event Details",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() =>
                      scrollToSection(item.toLowerCase().replace(" ", "-"))
                    }
                    className="hover:text-orange-500 transition-colors whitespace-nowrap"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`hidden sm:inline-flex px-3 h-8 md:h-9 hover:text-orange-500 hover:bg-transparent transition-colors ${
                    scrolled ? "text-slate-900" : "text-white"
                  }`}
                  onClick={() => setIsRegistrationOpen(true)}
                >
                  Register
                </Button>

                <Button
                  size="sm"
                  className="text-white bg-[linear-gradient(115.78deg,#FF9933_0%,#FFB84D_40%,#DC2626_100%)] hover:opacity-90 transition-all px-4 sm:px-6 h-8 md:h-10 rounded-[4px] text-[11px] sm:text-xs font-bold uppercase tracking-wider"
                  onClick={() => setIsBookingOpen(true)}
                >
                  Pre-Book
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="relative z-10 pt-20 md:pt-24">
          <section id="overview" className="w-full">
            <HeroSection
              onRegisterClick={() => setIsRegistrationOpen(true)}
              onPreBookClick={() => setIsBookingOpen(true)}
            />
          </section>

          <section id="stats" className="w-full">
            <StatsSection />
          </section>
        </main>
      </div>

      {/* Rest of content - outside video background */}
      <div className="relative z-10 bg-background">
        <main>
          {/* Countdown + Video band - Elegant integrated design */}
          <section className="bg-white py-20 md:py-28 lg:py-[140px]">
            <div className="container mx-auto px-4 md:px-8 lg:px-[100px] max-w-7xl">
              <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 items-start justify-center">
                <div className="relative w-full lg:w-[601px] flex-shrink-0">
                  <VideoSection />
                </div>
                <div className="relative w-full lg:w-[559px] flex-shrink-0">
                  <CountdownTimer />
                </div>
              </div>
            </div>
          </section>
          <section id="why-participate" className="bg-background">
            <WhyParticipateSection
              onRegisterClick={() => setIsRegistrationOpen(true)}
              onPreBookClick={() => setIsBookingOpen(true)}
            />
          </section>
          {/* Rudraksha Showcase with Image & Price */}
          <section id="rudraksha" className="bg-cosmic-blue/50">
            <RudrakshaShowcase onPreBookClick={() => setIsBookingOpen(true)} />
          </section>

          {/* Why Participate */}

          {/* Event Highlights */}
          <section
            id="event-details"
            className="bg-gradient-to-b from-background via-cosmic-blue/40 to-background"
          >
            <EventHighlights />
          </section>

          {/* Divine Quote Section */}
          <DivineQuoteSection />

          {/* Attractions */}
          <section className="bg-background">
            <AttractionsSection />
          </section>

          {/* Final CTA */}
          <FinalCTASection
            onRegisterClick={() => setIsRegistrationOpen(true)}
            onPreBookClick={() => setIsBookingOpen(true)}
          />
        </main>
        <Footer />
      </div>

      {/* Footer */}

      {/* Modals */}
      <RegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
      <RudrakshaBooking
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
      <ScrollToTop />
    </div>
  );
};

export default Index;
