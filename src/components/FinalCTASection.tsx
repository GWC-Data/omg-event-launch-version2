import { Button } from "@/components/ui/button";

interface FinalCTASectionProps {
  onRegisterClick?: () => void;
  onPreBookClick?: () => void;
}

const FinalCTASection = ({
  onRegisterClick,
  onPreBookClick,
}: FinalCTASectionProps) => {
  return (
    <section className="px-4 md:px-8 lg:px-[100px] py-12 md:py-16 lg:py-[60px] relative">
      <div className="bg-gradient-to-r from-[#ebf6ff] to-[#fae0e3] flex flex-col gap-8 md:gap-10 items-center justify-center overflow-hidden px-8 md:px-12 lg:px-[140px] py-12 md:py-16 lg:py-[80px] rounded-2xl max-w-[1240px] mx-auto">
        {/* Text Content */}
        <div className="flex flex-col gap-2.5 items-center justify-center text-center max-w-[920px]">
          <h2
            className="text-[#e32c26] text-2xl md:text-3xl lg:text-[32px] font-semibold leading-normal"
            style={{ fontFamily: "Jost, sans-serif" }}
          >
            Be Part of History
          </h2>
          <div
            className="text-[#737373] text-sm md:text-base lg:text-[16px] font-medium leading-normal"
            style={{ fontFamily: "Jost, sans-serif" }}
          >
            <p className="mb-0">
              Don&apos;t miss this once-in-a-lifetime divine opportunity. Register now and receive
            </p>
            <p>Lord Shiva&apos;s eternal blessings.</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 items-center justify-center max-w-[920px] w-full">
          <Button
            onClick={onRegisterClick}
            className="bg-[#e32c26] hover:bg-[#e32c26]/90 text-white text-base md:text-lg lg:text-[18px] font-semibold h-12 md:h-14 lg:h-[56px] px-6 md:px-8 rounded-md shadow-[0px_14px_45px_0px_rgba(255,153,51,0.3)] w-full sm:w-auto min-w-[221.83px]"
            style={{ fontFamily: "Jost, sans-serif" }}
          >
            Register for Free
          </Button>
          <Button
            onClick={onPreBookClick}
            variant="outline"
            className="border border-[rgba(227,44,38,0.4)] text-[#e32c26] hover:bg-[#e32c26]/5 hover:text-[#e32c26] text-base md:text-lg lg:text-[18px] font-medium h-12 md:h-14 lg:h-[56px] px-6 md:px-8 rounded-md w-full sm:w-auto min-w-[325.52px]"
            style={{ fontFamily: "Jost, sans-serif" }}
          >
            Pre-Book Blessed Rudraksha
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;

