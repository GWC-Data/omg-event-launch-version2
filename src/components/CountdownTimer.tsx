import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const eventDate = new Date("2026-02-26T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <span className="font-display text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-primary via-primary to-secondary bg-clip-text text-transparent leading-none">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-muted-foreground text-xs md:text-sm mt-2 uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <div className="h-full flex flex-col justify-center py-8 md:py-12 px-4 md:px-8">
      <div className="text-center mb-8 md:mb-12">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
          Event Begins In
        </span>
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
          The Divine Moment{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Awaits
          </span>
        </h2>
      </div>

      <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-6">
        <TimeUnit value={timeLeft.days} label="Days" />
        <div className="flex items-center text-primary/40 text-4xl md:text-5xl font-light self-center pb-8">
          :
        </div>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <div className="flex items-center text-primary/40 text-4xl md:text-5xl font-light self-center pb-8">
          :
        </div>
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <div className="hidden lg:flex items-center text-primary/40 text-5xl font-light self-center pb-8">
          :
        </div>
        <div className="hidden lg:block">
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
