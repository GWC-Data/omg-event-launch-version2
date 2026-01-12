// Icon URLs from Figma
const imgBackgroundBorder = "https://www.figma.com/api/mcp/asset/1dc9c709-f5d6-4b46-a694-83ca35d4a4e7";
const imgSvg = "https://www.figma.com/api/mcp/asset/fa4b071d-cb28-4e15-9848-cd944279e384";
const imgSvg1 = "https://www.figma.com/api/mcp/asset/52b910c6-e88e-401a-9960-512f1c2115e0";
const imgSvg2 = "https://www.figma.com/api/mcp/asset/dfacfe97-a4c0-4ffa-bb10-6ff9b8e90f44";
const imgSvg3 = "https://www.figma.com/api/mcp/asset/22450975-14b0-4087-a233-41fea2e7c0b0";

const Footer = () => {
  return (
    <footer className="flex flex-col items-start relative w-full">
      {/* Top Banner with Quote */}
      <div className="border border-[rgba(249,184,31,0.3)] h-[98px] relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#e32c26]" />
        {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            alt=""
            className="absolute h-[99.08%] left-[-9.44%] max-w-none top-[0.46%] w-[118.89%] object-cover opacity-30"
            src={imgBackgroundBorder}
          />
        </div> */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <p
            className="text-white text-lg md:text-xl lg:text-[20px] font-medium italic text-center leading-[32px] max-w-[1050px]"
            style={{ fontFamily: "Jost, sans-serif" }}
          >
            <span>&quot;You will be assigned a dedicated time during this pooja to receive </span>
            <span className="text-[#f9b81f]">Lord Shiva&apos;s blessings</span>
            <span> directly&quot;</span>
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-[#0c0e29] flex flex-col gap-6 md:gap-8 items-center pb-8 md:pb-10 lg:pb-[40px] pt-12 md:pt-16 lg:pt-[60px] px-4 md:px-8 lg:px-[100px] w-full">
        {/* Three Columns */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-[131px] items-start justify-center w-full max-w-7xl">
          {/* Brand Column */}
          <div className="flex flex-col gap-3.5 text-white w-full md:w-auto md:max-w-[408.4px]">
            <h3
              className="text-white text-xl md:text-2xl lg:text-[24px] font-bold tracking-[0.48px] leading-[32px]"
              style={{ fontFamily: "Jost, sans-serif" }}
            >
              Maha Yagam 2026
            </h3>
            <div
              className="text-white text-sm md:text-[14px] font-normal leading-[20px]"
              style={{ fontFamily: "Jost, sans-serif" }}
            >
              <p className="mb-0">
                Experience the divine. Transform your life. A once-in-a-lifetime
              </p>
              <p>spiritual gathering.</p>
            </div>
          </div>

          {/* Event Details Column */}
          <div className="flex flex-col gap-4 w-full md:w-auto md:max-w-[160px]">
            <h4
              className="text-white text-base md:text-lg lg:text-[18px] font-semibold tracking-[0.36px] leading-[28px]"
              style={{ fontFamily: "Jost, sans-serif" }}
            >
              Event Details
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <div className="relative w-4 h-4 shrink-0">
                  <img
                    alt=""
                    className="block max-w-none w-full h-full object-contain"
                    src={imgSvg}
                  />
                </div>
                <span
                  className="text-white text-sm md:text-base lg:text-[16px] font-normal leading-[24px]"
                  style={{ fontFamily: "Jost, sans-serif" }}
                >
                  February 26, 2026
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="relative w-4 h-4 shrink-0">
                  <img
                    alt=""
                    className="block max-w-none w-full h-full object-contain"
                    src={imgSvg1}
                  />
                </div>
                <span
                  className="text-white text-sm md:text-base lg:text-[16px] font-normal leading-[24px]"
                  style={{ fontFamily: "Jost, sans-serif" }}
                >
                  Hotel Hills, Hosur
                </span>
              </div>
            </div>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-4 w-full md:w-auto md:max-w-[211px]">
            <h4
              className="text-white text-base md:text-lg lg:text-[18px] font-semibold tracking-[0.36px] leading-[28px]"
              style={{ fontFamily: "Jost, sans-serif" }}
            >
              Contact Us
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <div className="relative w-4 h-4 shrink-0">
                  <img
                    alt=""
                    className="block max-w-none w-full h-full object-contain"
                    src={imgSvg2}
                  />
                </div>
                <span
                  className="text-white text-sm md:text-base lg:text-[16px] font-normal leading-[24px]"
                  style={{ fontFamily: "Jost, sans-serif" }}
                >
                  +91 98765 43210
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="relative w-4 h-4 shrink-0">
                  <img
                    alt=""
                    className="block max-w-none w-full h-full object-contain"
                    src={imgSvg3}
                  />
                </div>
                <span
                  className="text-white text-sm md:text-base lg:text-[16px] font-normal leading-[24px]"
                  style={{ fontFamily: "Jost, sans-serif" }}
                >
                  info@shivaratri2025.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-white/10 h-[77px] relative w-full flex flex-col items-center justify-center pt-8">
          <p
            className="text-white text-sm md:text-[14px] font-normal leading-[20px] text-center"
            style={{ fontFamily: "Jost, sans-serif" }}
          >
            © 2026 Maha Yagam Divine Experience. All rights reserved.
          </p>
          <p
            className="text-white/50 text-xs md:text-[12px] font-normal leading-[16px] text-center mt-2"
            style={{ fontFamily: "Jost, Noto Sans Devanagari, sans-serif" }}
          >
            ॐ नमः शिवाय • Om Namah Shivaya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
