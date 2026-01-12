import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const eventDate = new Date("2026-02-15T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [daysUntilEvent, setDaysUntilEvent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        setDaysUntilEvent(days);
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

  // Format event date
  const eventDateObj = new Date(eventDate);
  const formattedDate = eventDateObj.toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'long' 
  });

  // Icon URLs from Figma
  const clockIcon = "https://www.figma.com/api/mcp/asset/d7e247ca-dba9-48e0-86fa-a307659b6c95";
  const starIcon = "https://www.figma.com/api/mcp/asset/bb624c5f-3cf0-4fa0-aa09-7a5b61eeec6a";
  const lineIcon = "https://www.figma.com/api/mcp/asset/f739b66f-6145-426f-983d-ce921e631a32";
  const locationIcon = "https://www.figma.com/api/mcp/asset/02351ee4-fdd2-4afa-b7aa-4d529f63bf90";

  return (
    <div className="w-full flex flex-col gap-6 md:gap-10">
      {/* Header */}
      <div className="flex flex-col items-start gap-0">
        <div className="text-[#e53e29] text-base md:text-lg font-semibold uppercase tracking-[1px] mb-0" style={{ fontFamily: 'Jost, sans-serif' }}>
          Event Begins In
        </div>
        <div className="text-[#1c1c1c] text-2xl md:text-3xl lg:text-[34px] font-bold leading-tight md:leading-[50.4px]" style={{ fontFamily: 'Jost, sans-serif' }}>
          The Divine Moment Awaits
        </div>
      </div>

      {/* Countdown Card */}
      <div className="flex flex-col gap-6">
        {/* Main Card */}
        <div className="bg-[#f7f7f7] border border-[#e9e9e9] shadow-[0px_10px_20.5px_0px_rgba(0,0,0,0.12)] overflow-hidden">
          {/* Top Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 px-4 sm:px-6 pt-4 sm:pt-6 pb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-[30px] sm:h-[30px]">
                <img
                  alt="Clock"
                  className="block max-w-none w-full h-full"
                  src={clockIcon}
                />
              </div>
              <div className="text-xl sm:text-2xl md:text-[28px] text-black font-medium whitespace-nowrap" style={{ fontFamily: 'Jost, sans-serif' }}>
                In {daysUntilEvent} days
              </div>
            </div>
            <div className="bg-[#e32c26] px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-center w-full sm:w-auto sm:min-w-[146px]">
              <div className="text-white text-sm sm:text-base font-medium whitespace-nowrap" style={{ fontFamily: 'Jost, sans-serif' }}>
                {formattedDate}
              </div>
            </div>
          </div>

          {/* Countdown Display */}
          <div className="bg-[#293088] px-4 sm:px-6 md:px-8 py-4 sm:py-6">
            <div className="flex gap-2 sm:gap-4 md:gap-6 items-center mb-2 justify-center">
              <div className="flex flex-col">
                <div className="text-white text-2xl sm:text-3xl md:text-[32px] font-bold leading-normal sm:leading-[72px] text-center" style={{ fontFamily: 'Jost, sans-serif' }}>
                  {timeLeft.days.toString().padStart(2, "0")}
                </div>
              </div>
              <div className="text-white text-lg sm:text-xl md:text-[20px] font-medium tracking-[0.7px] uppercase" style={{ fontFamily: 'Jost, sans-serif' }}>
                :
              </div>
              <div className="flex flex-col">
                <div className="text-white text-2xl sm:text-3xl md:text-[32px] font-bold leading-normal sm:leading-[72px] text-center" style={{ fontFamily: 'Jost, sans-serif' }}>
                  {timeLeft.hours.toString().padStart(2, "0")}
                </div>
              </div>
              <div className="text-white text-lg sm:text-xl md:text-[20px] font-medium tracking-[0.7px] uppercase" style={{ fontFamily: 'Jost, sans-serif' }}>
                :
              </div>
              <div className="flex flex-col">
                <div className="text-white text-2xl sm:text-3xl md:text-[32px] font-bold leading-normal sm:leading-[72px] text-center" style={{ fontFamily: 'Jost, sans-serif' }}>
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </div>
              </div>
              <div className="text-white text-lg sm:text-xl md:text-[20px] font-medium tracking-[0.7px] uppercase" style={{ fontFamily: 'Jost, sans-serif' }}>
                :
              </div>
              <div className="flex flex-col">
                <div className="text-white text-2xl sm:text-3xl md:text-[32px] font-bold leading-normal sm:leading-[72px] text-center" style={{ fontFamily: 'Jost, sans-serif' }}>
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-white text-xs sm:text-sm md:text-base font-medium tracking-[0.7px] uppercase" style={{ fontFamily: 'Jost, sans-serif' }}>
              <div className="flex-1 text-center">Days</div>
              <div className="flex-1 text-center">Hours</div>
              <div className="flex-1 text-center">Minutes</div>
              <div className="flex-1 text-center">Seconds</div>
            </div>
          </div>
        </div>

        {/* Decorative Line with Star */}
        <div className="flex items-center justify-center gap-2.5">
          <div className="h-0 flex-1 max-w-[189px] relative">
            <img
              alt=""
              className="block max-w-none w-full h-full"
              src={lineIcon}
            />
          </div>
          <div className="w-[23px] h-[23px]">
            <img
              alt=""
              className="block max-w-none w-full h-full"
              src={starIcon}
            />
          </div>
          <div className="h-0 flex-1 max-w-[189px] relative">
            <img
              alt=""
              className="block max-w-none w-full h-full"
              src={lineIcon}
            />
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <div className="w-4 h-4 sm:w-[18px] sm:h-[18px]">
            <img
              alt="Location"
              className="block max-w-none w-full h-full"
              src={locationIcon}
            />
          </div>
          <div className="text-[#424242] text-base sm:text-lg md:text-[20px] font-medium whitespace-nowrap" style={{ fontFamily: 'Jost, sans-serif' }}>
            Hotel Hills, Hosur
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
