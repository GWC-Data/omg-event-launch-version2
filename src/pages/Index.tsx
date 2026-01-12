import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import VideoSection from "@/components/VideoSection";
import RudrakshaShowcase from "@/components/RudrakshaShowcase";
import WhyParticipateSection from "@/components/WhyParticipateSection";
import EventHighlights from "@/components/EventHighlights";
import RegistrationForm from "@/components/RegistrationForm";
import RudrakshaBooking from "@/components/RudrakshaBooking/RudrakshaBooking";
import CelebritySection from "@/components/CelebritySection";
import AttractionsSection from "@/components/AttractionsSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/site-logo.png";
import { Link } from "react-router-dom";

const Index = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl dark:bg-background/90">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-2.5">
          <div className="flex items-center justify-between gap-2 sm:gap-3 lg:gap-4">
            {/* Logo Section - Compact but complete */}
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
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
                  <p className="text-[10px] sm:text-xs font-semibold leading-tight tracking-[0.15em] sm:tracking-[0.2em] uppercase text-primary/70 truncate">
                    Oh My God • OMG
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-medium leading-tight tracking-[0.15em] sm:tracking-[0.18em] uppercase text-secondary/70 truncate">
                    Yours Spiritually
                  </p>
                  <p className="font-display text-xs sm:text-sm font-semibold text-foreground leading-tight truncate">
                    Maha Yagam 2026
                  </p>
                </div>
              </Link>
            </div>

            {/* Navigation Links - Responsive */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-5 text-sm font-medium text-muted-foreground flex-shrink-0">
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

            {/* Action Buttons - All visible */}
            <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:text-primary hover:bg-primary/5 px-3 h-8 md:h-9"
                onClick={() => setIsRegistrationOpen(true)}
              >
                Register
              </Button>
              <Button
                variant="divine"
                size="sm"
                className="px-3 h-8 md:h-9"
                onClick={() => setIsBookingOpen(true)}
              >
                Pre-Book
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero */}
        <section id="overview">
          <HeroSection
            onRegisterClick={() => setIsRegistrationOpen(true)}
            onPreBookClick={() => setIsBookingOpen(true)}
          />
        </section>

        {/* Countdown + Video band - Elegant integrated design */}
        <section className="bg-gradient-to-b from-background via-cosmic-blue/30 to-background py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl -z-10" />
                <CountdownTimer />
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 rounded-3xl -z-10" />
                <VideoSection />
              </div>
            </div>
          </div>
        </section>

        {/* Rudraksha Showcase with Image & Price */}
        <section id="rudraksha" className="bg-cosmic-blue/50">
          <RudrakshaShowcase onPreBookClick={() => setIsBookingOpen(true)} />
        </section>

        {/* Why Participate */}
        <section id="why-participate" className="bg-background">
          <WhyParticipateSection />
        </section>

        {/* Event Highlights */}
        <section
          id="event-details"
          className="bg-gradient-to-b from-background via-cosmic-blue/40 to-background"
        >
          <EventHighlights />
        </section>

        {/* Attractions */}
        <section className="bg-background">
          <AttractionsSection />
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-24 bg-gradient-to-b from-primary/5 via-white to-secondary/5 dark:from-primary/10 dark:via-background dark:to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-card/70 border border-gold/30 text-gold text-xs uppercase tracking-[0.25em] mb-6">
              Join The Movement
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Be Part of <span className="gold-text-gradient">History</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-base md:text-lg">
              Don&apos;t miss this once-in-a-lifetime divine opportunity.
              Register now and receive Lord Shiva&apos;s eternal blessings.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                variant="divine"
                size="xl"
                onClick={() => setIsRegistrationOpen(true)}
                className="animate-glow-pulse"
              >
                Register for Free
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => setIsBookingOpen(true)}
                className="border-gold/40 text-gold hover:bg-gold/5 hover:border-gold/60 hover:text-gold-dark"
              >
                Pre-Book Blessed Rudraksha
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

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
