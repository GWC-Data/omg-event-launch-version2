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
      <div className="relative">
        {/* Background Video - Fixed but only visible in this container */}
        <div className="fixed top-0 left-0 right-0 h-screen z-0">
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

        <nav
          className={`fixed top-0 left-0 right-0 z-40 px-10 transition-all duration-300
    ${scrolled ? "bg-white shadow-md backdrop-blur-md" : "bg-transparent"}
  `}
        >
          <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-2.5">
            <div className="flex items-center justify-between gap-2 sm:gap-3 lg:gap-4 relative">
              {/* Logo Section - Compact but complete */}
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 z-10">
                <Link
                  to="https://omgofficial.com/"
                  target="_blank"
                  className="flex items-center gap-1.5 sm:gap-2 min-w-0"
                >
                  <img
                    src={logo}
                    alt="Oh My God"
                    className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-semibold leading-tight tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#FF9933B2] truncate">
                      Oh My God • OMG
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-medium leading-tight tracking-[0.15em] sm:tracking-[0.18em] uppercase text-secondary/70 truncate">
                      Yours Spiritually
                    </p>
                    <p className="font-display text-xs sm:text-sm  text-primary leading-tight truncate">
                      Maha Yagam 2026
                    </p>
                  </div>
                </Link>
              </div>

              {/* Navigation Links - Centered */}
              <div
                className={`hidden md:flex items-center gap-3 lg:gap-4 xl:gap-5 text-sm font-medium flex-shrink-0 absolute left-1/2 -translate-x-1/2 transition-colors duration-300
    ${scrolled ? "text-primary" : "text-white"}
  `}
              >
                <button
                  onClick={() => scrollToSection("overview")}
                  className="hover:text-primary transition-colors whitespace-nowrap"
                >
                  Overview
                </button>
                <button
                  onClick={() => scrollToSection("why-participate")}
                  className="hover:text-primary transition-colors whitespace-nowrap"
                >
                  Why Participate
                </button>
                <button
                  onClick={() => scrollToSection("rudraksha")}
                  className="hover:text-primary transition-colors whitespace-nowrap"
                >
                  Rudraksha
                </button>
                <button
                  onClick={() => scrollToSection("event-details")}
                  className="hover:text-primary transition-colors whitespace-nowrap"
                >
                  Event Details
                </button>
              </div>

              {/* Action Button - Register only */}
              <div
                className={`flex items-center gap-1 sm:gap-1.5 flex-shrink-0 ml-auto z-10  ${
                  scrolled ? "text-primary" : "text-white"
                }`}
              >
                {/* <ThemeToggle /> */}

                <Button
                  variant="ghost"
                  size="sm"
                  className="
      bg-transparent
    hover:bg-transparent

    hover:text-white/70
    transition-colors
    px-4 h-8 md:h-9"
                  onClick={() => setIsRegistrationOpen(true)}
                >
                  Register
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white bg-[linear-gradient(115.78deg,#FF9933_0%,#FFB84D_40%,#DC2626_100%)]    hover:bg-transparent    hover:text-white/70  hover:bg-[linear-gradient(115.78deg,#FF9933_0%,#FFB84D_40%,#DC2626_100%)] transition-colors
    px-4 h-8 md:h-9 rounded-[5px]
  "
                  onClick={() => setIsBookingOpen(true)}
                >
                  Pre-Book
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-16 relative z-10">
          {/* Hero */}
          <section id="overview">
            <HeroSection
              onRegisterClick={() => setIsRegistrationOpen(true)}
              onPreBookClick={() => setIsBookingOpen(true)}
            />
          </section>

          {/* Stats Section */}
          <StatsSection />
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
