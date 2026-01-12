// Background image URL from Figma
const imgImage = "https://www.figma.com/api/mcp/asset/504e23d4-7952-451a-99c7-120779fa7672";

const DivineQuoteSection = () => {
  return (
    <section className="bg-[#e32c26] relative w-full   flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          alt=""
          className="absolute h-[99.08%] left-[-9.44%] max-w-none top-[0.46%] w-[118.89%] object-cover opacity-20"
          src={imgImage}
        />
      </div>

      {/* Quote Content */}
      <div className="relative z-10 flex flex-col gap-4 items-center text-center uppercase  p-6 md:px-2">
        <p
          className="text-[#f2f2f2] text-sm md:text-lg lg:text-[25px] font-medium tracking-[0.6px] leading-[32px]"
          style={{ fontFamily: "Jost, sans-serif" }}
        >
          "When devotion meets divine grace, miracles happen."
        </p>
        <p
          className="text-[#f9ea1f] text-base md:text-lg lg:text-[15px] tracking-[1.4px] leading-[20px] h-5"
          style={{ fontFamily: "Jost, sans-serif" }}
        >
          — Ancient Wisdom
        </p>
      </div>
    </section>
  );
};

export default DivineQuoteSection;

