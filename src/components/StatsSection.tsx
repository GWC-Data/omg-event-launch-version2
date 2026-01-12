import React from "react";

const StatsSection = () => {
  // Icon URLs from Figma
  const clockIcon = "https://www.figma.com/api/mcp/asset/501922a1-a867-4a0c-9886-80a76a90d671";
  const prayerBeadsIcon = "https://www.figma.com/api/mcp/asset/a8f9b6b4-c7a9-41f5-b1bb-a119a4641f65";
  const swastikaIcon = "https://www.figma.com/api/mcp/asset/69dae2b0-7b93-4eeb-ab8d-bb2ce6c59f31";
  const shivaTilakIcon = "https://www.figma.com/api/mcp/asset/5dd09d8c-16e4-451b-99cf-99e185787905";

  const stats = [
    {
      value: "34",
      label: "Non stop hours",
      icon: clockIcon,
    },
    {
      value: "100,000",
      label: "Rudraksha",
      icon: prayerBeadsIcon,
    },
    {
      value: "25",
      label: "Purohits",
      icon: swastikaIcon,
    },
    {
      value: "1 Million",
      label: "Chants of Shiva",
      icon: shivaTilakIcon,
    },
  ];

  return (
    <section className="bg-white  py-4 px-4 md:px-8 lg:px-[150px] shadow-[0px_20.298px_62.72px_0px_rgba(210,208,225,0.17),0px_10.852px_33.533px_0px_rgba(210,208,225,0.14),0px_6.084px_18.798px_0px_rgba(210,208,225,0.12),0px_3.231px_9.984px_0px_rgba(210,208,225,0.1),0px_1.344px_4.154px_0px_rgba(210,208,225,0.07)]">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 sm:gap-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 items-center justify-center px-4 sm:px-8 md:px-[60px] py-4 sm:py-[21px] flex-1"
          >
            <div className="flex flex-col font-semibold justify-center leading-normal text-[#e32c26] text-2xl sm:text-3xl md:text-[34px] text-center whitespace-nowrap" style={{ fontFamily: 'Jost, sans-serif' }}>
              <p>{stat.value}</p>
            </div>
            <div className="flex gap-2 sm:gap-3 items-center justify-center">
              <div className="relative shrink-0 w-5 h-5 sm:w-[22px] sm:h-[22px]">
                <img
                  alt={stat.label}
                  className="block max-w-none w-full h-full object-contain"
                  src={stat.icon}
                />
              </div>
              <div className="flex flex-col font-medium justify-center leading-normal text-[#404040] text-sm sm:text-base md:text-[18px] text-center whitespace-nowrap" style={{ fontFamily: 'Jost, sans-serif' }}>
                <p>{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;

