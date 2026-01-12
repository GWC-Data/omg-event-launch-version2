import swastikaIcon  from "../assets/swastika.svg";// Icon URLs from Figma
const imgCandle59234691 = "https://www.figma.com/api/mcp/asset/b3645f75-31c2-459b-b02f-1d9a49fbb42c";
const imgSwastika = "https://www.figma.com/api/mcp/asset/6ffcdede-ba44-431d-9286-54ba759cf856";
const imgNotoPrayerBeads = "https://www.figma.com/api/mcp/asset/65ecbd2c-bb67-4fdc-8b5c-4a13145522ac";
const imgTrident = "https://www.figma.com/api/mcp/asset/ac8d6f01-fd6d-44fc-bd01-38224086db56";

const highlights = [
  {
    icon: imgCandle59234691,
    title: "Pooja of All Poojas",
    description: "A once in a lifetime opportunity to witness the longest non stop pooja ever performed.",
  },
  {
    icon: swastikaIcon,
    title: "Divine Vibrations",
    description: "Experience the transformative power of 1 million chants of lord Shivas name by 25 devoted purohits, turning negativity into positivity.",
  },
  {
    icon: imgNotoPrayerBeads,
    title: "The Sacred Seed",
    description: "100,000 Rudraksha beads elevated through mantric purification, each infused with Lord Shiva's name a million times.",
  },
  {
    icon: imgTrident,
    title: "Historic Moment",
    description: "Join a massive spiritual gathering and be part of a Guinness World Record attempt.",
  },
];

const EventHighlights = () => {
  return (
    <section className="bg-[#f7f7f7] py-12 md:py-20 lg:py-[100px] px-4 md:px-8 lg:px-[100px] relative">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 md:gap-16 lg:gap-[60px]">
          {/* Heading Section */}
          <div className="flex flex-col items-start uppercase">
            <span
              className="text-[#e53e29] text-base md:text-[18px] font-semibold tracking-[1px] leading-[22.4px] mb-0"
              style={{ fontFamily: "Jost, sans-serif" }}
            >
              Why
            </span>
            <h2
              className="text-[#1c1c1c] text-2xl md:text-3xl lg:text-[42px] font-bold tracking-[2px] leading-tight md:leading-[50.4px] mt-0"
              style={{ fontFamily: "Jost, sans-serif" }}
            >
              You Should Be There
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-[20px] w-full">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-white flex flex-1 flex-col gap-6 md:gap-[30px] items-start p-4 md:p-6 min-h-0 shadow-sm"
              >
                {/* Icon */}
                <div className="relative w-12 h-12 md:w-[60px] md:h-[60px] shrink-0">
                  <img
                    alt=""
                    className="block max-w-none w-full h-full object-contain"
                    src={item.icon}
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-2 md:gap-3 w-full">
                  <h3
                    className="text-[#1c1c1c] text-lg md:text-[17px] font-semibold leading-tight md:leading-[33.6px]"
                    style={{ fontFamily: "Jost, sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[#6e6e74] text-sm md:text-[12px] font-normal leading-relaxed md:leading-normal"
                    style={{ fontFamily: "Jost, sans-serif" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHighlights;
