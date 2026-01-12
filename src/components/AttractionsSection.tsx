// Icon URLs from Figma
const imgSvg = "https://www.figma.com/api/mcp/asset/d019b614-e26d-4823-b99b-90fb6ff47588";
const imgSvg1 = "https://www.figma.com/api/mcp/asset/6628c8c9-ca6f-4b04-8681-352a42ada620";
const imgSvg2 = "https://www.figma.com/api/mcp/asset/187ba2c1-60d9-4116-93ac-c26ec70e1100";
const imgSvg3 = "https://www.figma.com/api/mcp/asset/c1439dc8-2114-4bcf-a7ac-73c6632e4c52";
const imgFrame = "https://www.figma.com/api/mcp/asset/20f0e31a-084e-4dc9-9cc0-1e2018ca5d8f";

const attractions = [
  {
    icon: imgSvg,
    title: "o Divine Vibration",
    description: "A Spiritual Saga unfolds",
  },
  {
    icon: imgSvg1,
    title: "Pre Booking Rudraksh",
    description: "Get a special opportunity to own the special rudraksh post Mahashivarathri",
  },
  {
    icon: imgSvg2,
    title: "OMG gets launched",
    description: "The World's 1st AI powered spiritual experience brand gets a mega launch pad",
  },
];

const AttractionsSection = () => {
  return (
    <section className="bg-[#0a0c24] py-12 md:py-20 lg:py-[100px] px-4 md:px-8 lg:px-[100px] relative overflow-hidden">
      {/* Background Frame Image */}
      <div className="absolute h-[891.25px] left-1/2 top-[319.5px] -translate-x-1/2 w-full max-w-[1200px] pointer-events-none">
        <div className="absolute inset-[-11.22%_0_-14.32%_0]">
          <img
            alt=""
            className="block max-w-none w-full h-full object-contain opacity-30"
            src={imgFrame}
          />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col gap-12 md:gap-20 lg:gap-[100px] items-center">
          {/* Heading Section */}
          <div className="flex flex-col items-center uppercase">
            <span
              className="text-[#e53e29] text-base md:text-[18px] font-semibold tracking-[1px] leading-[22.4px] mb-0 text-center"
              style={{ fontFamily: "Jost, sans-serif" }}
            >
              The Special Sacred Seed
            </span>
            <h2
              className="text-white text-2xl md:text-3xl lg:text-[42px] font-bold tracking-[2px] leading-tight md:leading-[50.4px] mt-0 whitespace-nowrap"
              style={{ fontFamily: "Jost, sans-serif" }}
            >
              What Awaits You
            </h2>
          </div>

          {/* Attractions Grid */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-5 items-center justify-between w-full">
            {attractions.map((item, index) => (
              <div
                key={index}
                className={`flex flex-1 flex-col items-center text-center ${
                  index === 0 ? "gap-2" : "gap-3"
                }`}
              >
                {/* Icon */}
                <div className="flex items-center justify-center">
                  <div className="bg-[#db2424] rounded-[12px] w-12 h-12 flex items-center justify-center">
                    <div className="w-6 h-6">
                      <img
                        alt=""
                        className="block max-w-none w-full h-full object-contain"
                        src={item.icon}
                      />
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-1 items-center text-center w-full">
                  <h3
                    className="text-[#f2f2f2] text-base md:text-[18px] font-semibold tracking-[0.36px] leading-[28px] whitespace-nowrap"
                    style={{ fontFamily: "Jost, sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[#a1a1aa] text-sm md:text-[14px] font-normal leading-normal max-w-[276px]"
                    style={{ fontFamily: "Jost, sans-serif" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Call to Action Section */}
          <div className="bg-black/11 flex flex-col gap-4 items-center px-8 md:px-12 lg:px-[60px] py-6 md:py-8 lg:py-[32px] w-full rounded-lg">
            {/* Sparkle Icon */}
            <div className="relative w-10 h-10 shrink-0">
              <img
                alt=""
                className="block max-w-none w-full h-full object-contain"
                src={imgSvg3}
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-3 items-center text-center w-full">
              <h3
                className="text-[#f9b81f] text-xl md:text-2xl lg:text-[24px] font-bold tracking-[0.48px] leading-tight md:leading-[32px]"
                style={{ fontFamily: "Jost, sans-serif" }}
              >
                There are some interesting things waiting for you!
              </h3>
              <p
                className="text-[#a1a1aa] text-sm md:text-base lg:text-[16px] font-normal leading-relaxed md:leading-[24px] max-w-3xl"
                style={{ fontFamily: "Jost, sans-serif" }}
              >
                Make your presence and be part of this unforgettable divine experience. Many more surprises will be revealed at the event!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttractionsSection;
