// import { Button } from "@/components/ui/button";
// import imgBackground from "../assets/rudraksha-video.mp4";
// // Icon URLs from Figma
// const imgSvg =
//   "https://www.figma.com/api/mcp/asset/31bfb635-0a12-47fe-8f6d-23ad418bae7f";
// const imgSvg1 =
//   "https://www.figma.com/api/mcp/asset/f8299a09-44fb-4dc9-93d9-ae5e7ad5bb77";
// const imgImageBackground =
//   "https://www.figma.com/api/mcp/asset/3256004d-a4cf-473e-bfeb-362db13c8552";
// // const imgBackground =
// //   "https://www.figma.com/api/mcp/asset/3b8d83de-1111-42ae-93bc-6fa71b8726ab";

// interface RudrakshaShowcaseProps {
//   onPreBookClick: () => void;
// }

// const RudrakshaShowcase = ({ onPreBookClick }: RudrakshaShowcaseProps) => {
//   return (
//     <section className="relative overflow-hidden min-h-[714px] flex items-center">
//       {/* Background Images */}
//       <div className="absolute h-[614px] left-1/2 top-[100px] -translate-x-1/2 w-full max-w-[1440px]">
//         <div className="absolute inset-0 bg-[#e32c26]" />
//         <div className="absolute inset-0 overflow-hidden">
//           <img
//             alt=""
//             className="absolute h-[98.62%] left-[0.57%] max-w-none top-[1.38%] w-[98.85%] object-cover"
//             src={imgImageBackground}
//           />
//         </div>
//       </div>

//       <div className="absolute h-[714px] left-1/2 ml-8 top-0 -translate-x-1/2 w-full max-w-[1350px]">
//         <div className="absolute inset-0 bg-white mix-blend-saturation" />
//         <div className="absolute inset-0 overflow-hidden">
//           <video
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="absolute h-[127.31%] left-[-1.93%] max-w-none top-[-10.14%] w-[119.7%] object-cover"
//             src={imgBackground}
//           />
//         </div>
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage:
//               "linear-gradient(180deg, rgba(17, 20, 58, 0) 68.269%, rgba(0, 0, 0, 1) 100%), linear-gradient(90deg, rgba(28, 28, 28, 1) 0%, rgba(28, 28, 28, 0) 100%)",
//           }}
//         />
//       </div>

//       {/* Content */}
//       <div className="container mx-auto px-4 md:px-8 lg:px-[100px] max-w-7xl relative z-20 py-20">
//         <div className="flex flex-col lg:flex-row gap-12 lg:gap-[186px] items-center justify-center">
//           {/* Left Column - Text Content */}
//           <div className="flex-1 flex flex-col gap-9 max-w-[481px]">
//             {/* Badge and Heading */}
//             <div className="flex flex-col items-start uppercase">
//               <span
//                 className="text-[#e53e29] text-[18px] font-semibold tracking-[1px] mb-0"
//                 style={{ fontFamily: "Jost, sans-serif" }}
//               >
//                 The Special Sacred Seed
//               </span>
//               <h2
//                 className="text-white text-[42px] font-bold tracking-[2px] leading-[50.4px] mt-0"
//                 style={{ fontFamily: "Jost, sans-serif" }}
//               >
//                 The Rudraksh Recharged
//               </h2>
//             </div>

//             {/* Why This Rudraksh is Unique Section */}
//             <div className="flex flex-col gap-6">
//               <h3
//                 className="text-white text-[18px] font-semibold tracking-[0.36px]"
//                 style={{ fontFamily: "Jost, sans-serif" }}
//               >
//                 Why This Rudraksh is Unique
//               </h3>
//               <ul className="flex flex-col gap-3 list-disc list-inside">
//                 <li
//                   className="text-[12px] leading-[22.75px]"
//                   style={{ fontFamily: "Jost, sans-serif" }}
//                 >
//                   <span className="font-semibold text-[#f9b81f]">
//                     1 Million Chants:
//                   </span>
//                   <span className="font-normal text-white/90">
//                     {" "}
//                     Each bead carries the vibration of Lord Shiva's name
//                     repeated a million times.
//                   </span>
//                 </li>
//                 <li
//                   className="text-[12px] leading-[22.75px]"
//                   style={{ fontFamily: "Jost, sans-serif" }}
//                 >
//                   <span className="font-semibold text-[#f9b81f]">
//                     Sanctified by 25 Purohits
//                   </span>
//                   <span className="font-semibold">:</span>
//                   <span className="font-normal text-white/90">
//                     {" "}
//                     A collective offering of devotion and discipline.
//                   </span>
//                 </li>
//                 <li
//                   className="text-[12px] leading-[22.75px]"
//                   style={{ fontFamily: "Jost, sans-serif" }}
//                 >
//                   <span className="font-semibold text-[#f9b81f]">
//                     34 Hours of Non-Stop Prayer:
//                   </span>
//                   <span className="font-normal text-white/90">
//                     {" "}
//                     A rare, uninterrupted spiritual energy flow.
//                   </span>
//                 </li>
//                 <li
//                   className="text-[12px] leading-[22.75px]"
//                   style={{ fontFamily: "Jost, sans-serif" }}
//                 >
//                   <span className="font-semibold text-[#f9b81f]">
//                     Rudhram 3300 Times:
//                   </span>
//                   <span className="font-normal text-white/90">
//                     {" "}
//                     Deep purification through the most powerful Shiva mantra.
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Right Column - Price Card */}
//           <div className="flex-shrink-0 w-full lg:w-auto">
//             <div className="bg-black/10 backdrop-blur-sm flex flex-col gap-8 px-[60px] py-10 rounded-2xl border border-white/10">
//               {/* Price Section */}
//               <div className="flex flex-col items-center justify-center pb-8 border-b border-[#e32c26]">
//                 <p
//                   className="text-[#e7e7e7] text-[12px] font-medium text-center tracking-[2.16px] uppercase mb-2.5"
//                   style={{ fontFamily: "Jost, sans-serif" }}
//                 >
//                   Pre-booking Price
//                 </p>
//                 <div className="flex gap-2 items-end justify-center">
//                   <span
//                     className="text-white text-[56.8px] font-bold tracking-[-1.5px] leading-[60px]"
//                     style={{ fontFamily: "Jost, sans-serif" }}
//                   >
//                     ₹999
//                   </span>
//                   <span
//                     className="text-[#e7e7e7] text-[16px] font-normal h-6"
//                     style={{ fontFamily: "Jost, sans-serif" }}
//                   >
//                     /each
//                   </span>
//                 </div>
//               </div>

//               {/* Features */}
//               <div className="flex flex-col gap-3">
//                 <div className="flex gap-3 items-center">
//                   <div className="backdrop-blur-[2px] bg-[rgba(28,28,34,0.5)] border border-[#2f2f37] w-10 h-10 flex items-center justify-center shrink-0">
//                     <div className="w-5 h-5">
//                       <img
//                         alt=""
//                         className="block max-w-none w-full h-full"
//                         src={imgSvg}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex flex-col gap-0.5 flex-1">
//                     <h4
//                       className="text-white/90 text-[16px] font-semibold tracking-[0.32px]"
//                       style={{ fontFamily: "Jost, sans-serif" }}
//                     >
//                       34-Hour Continuous Chanting
//                     </h4>
//                     <p
//                       className="text-[#a1a1aa] text-[12px] font-normal"
//                       style={{ fontFamily: "Jost, sans-serif" }}
//                     >
//                       Non-stop sacred mantras by 25 Pandithars
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex gap-3 items-center">
//                   <div className="backdrop-blur-[2px] bg-[rgba(28,28,34,0.5)] border border-[#2f2f37] w-10 h-10 flex items-center justify-center shrink-0">
//                     <div className="w-5 h-5">
//                       <img
//                         alt=""
//                         className="block max-w-none w-full h-full"
//                         src={imgSvg1}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex flex-col gap-0.5 flex-1">
//                     <h4
//                       className="text-white/90 text-[16px] font-semibold tracking-[0.32px]"
//                       style={{ fontFamily: "Jost, sans-serif" }}
//                     >
//                       1 Million chants of lord Shiva's name
//                     </h4>
//                     <p
//                       className="text-[#a1a1aa] text-[12px] font-normal"
//                       style={{ fontFamily: "Jost, sans-serif" }}
//                     >
//                       3400 times Shri Rudhram Chants
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* CTA */}
//               <div className="flex flex-col gap-3 items-center">
//                 <Button
//                   onClick={onPreBookClick}
//                   className="bg-[#e32c26] hover:bg-[#e32c26]/90 text-white text-[14px] font-semibold h-[44px] w-full rounded-md shadow-[0px_14px_45px_0px_rgba(255,153,51,0.3)]"
//                   style={{ fontFamily: "Jost, sans-serif" }}
//                 >
//                   Pre-Book Now
//                 </Button>
//                 <p
//                   className="text-[#a1a1aa] text-[12px] font-normal text-center"
//                   style={{ fontFamily: "Jost, sans-serif" }}
//                 >
//                   Limited quantity available • Secure your blessing today
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RudrakshaShowcase;

import { Button } from "@/components/ui/button";
import imgBackground from "../assets/rudraksha-video.mp4";

const imgSvg = "https://www.figma.com/api/mcp/asset/31bfb635-0a12-47fe-8f6d-23ad418bae7f";
const imgSvg1 = "https://www.figma.com/api/mcp/asset/f8299a09-44fb-4dc9-93d9-ae5e7ad5bb77";
const imgImageBackground = "https://www.figma.com/api/mcp/asset/3256004d-a4cf-473e-bfeb-362db13c8552";

interface RudrakshaShowcaseProps {
  onPreBookClick: () => void;
}

const RudrakshaShowcase = ({ onPreBookClick }: RudrakshaShowcaseProps) => {
  return (
    <section className="relative overflow-hidden min-h-[700px] lg:min-h-[714px] flex items-center font-['Jost',sans-serif]">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* Red Base Layer */}
        <div className="absolute h-[614px] left-1/2 top-[100px] -translate-x-1/2 w-full max-w-[1440px]">
          <div className="absolute inset-0 bg-[#e32c26]" />
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              className="absolute h-full w-full object-cover opacity-50 lg:opacity-100"
              src={imgImageBackground}
            />
          </div>
        </div>

        {/* Video Overlay Layer */}
        <div className="absolute inset-0 lg:left-1/2 lg:-translate-x-1/2 lg:ml-8 w-full max-w-[1350px] h-full lg:h-[714px]">
          <div className="absolute inset-0 bg-white mix-blend-saturation z-10" />
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute min-h-full min-w-full object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              src={imgBackground}
            />
          </div>
          {/* Gradients */}
          <div
            className="absolute inset-0 z-20"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(17, 20, 58, 0) 60%, rgba(0, 0, 0, 1) 100%), linear-gradient(90deg, rgba(28, 28, 28, 1) 0%, rgba(28, 28, 28, 0) 100%)",
            }}
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-6 md:px-8 lg:px-[100px] max-w-7xl relative z-30 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[120px] xl:gap-[186px] items-center">
          
          {/* Left Column - Text Content */}
          <div className="flex-1 flex flex-col gap-6 md:gap-9 max-w-[481px] text-left">
            <div className="flex flex-col items-start uppercase">
              <span className="text-[#e53e29] text-base md:text-[18px] font-semibold tracking-[1px]">
                The Special Sacred Seed
              </span>
              <h2 className="text-white text-3xl md:text-[42px] font-bold tracking-[2px] leading-tight md:leading-[50.4px]">
                The Rudraksh Recharged
              </h2>
            </div>

            <div className="flex flex-col gap-4 md:gap-6">
              <h3 className="text-white text-lg font-semibold tracking-[0.36px]">
                Why This Rudraksh is Unique
              </h3>
              <ul className="flex flex-col gap-3 list-disc list-inside text-white/90">
                <li className="text-xs md:text-[13px] leading-relaxed">
                  <span className="font-semibold text-[#f9b81f]">1 Million Chants: </span>
                  Each bead carries the vibration of Lord Shiva's name repeated a million times.
                </li>
                <li className="text-xs md:text-[13px] leading-relaxed">
                  <span className="font-semibold text-[#f9b81f]">Sanctified by 25 Purohits: </span>
                  A collective offering of devotion and discipline.
                </li>
                <li className="text-xs md:text-[13px] leading-relaxed">
                  <span className="font-semibold text-[#f9b81f]">34 Hours of Non-Stop Prayer: </span>
                  A rare, uninterrupted spiritual energy flow.
                </li>
                <li className="text-xs md:text-[13px] leading-relaxed">
                  <span className="font-semibold text-[#f9b81f]">Rudhram 3300 Times: </span>
                  Deep purification through the most powerful Shiva mantra.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Price Card */}
          <div className="w-full sm:w-auto min-w-[320px] md:min-w-[400px]">
            <div className="bg-black/40 backdrop-blur-md flex flex-col gap-6 md:gap-8 px-8 md:px-[60px] py-10 rounded-2xl border border-white/10">
              {/* Price Section */}
              <div className="flex flex-col items-center justify-center pb-6 md:pb-8 border-b border-[#e32c26]">
                <p className="text-[#e7e7e7] text-[12px] font-medium tracking-[2.16px] uppercase mb-2">
                  Pre-booking Price
                </p>
                <div className="flex gap-2 items-end">
                  <span className="text-white text-4xl md:text-[56.8px] font-bold tracking-[-1.5px] leading-none">
                    ₹999
                  </span>
                  <span className="text-[#e7e7e7] text-base font-normal">/each</span>
                </div>
              </div>

              {/* Features List */}
              <div className="flex flex-col gap-5">
                {[
                  {
                    icon: imgSvg,
                    title: "34-Hour Continuous Chanting",
                    desc: "Non-stop sacred mantras by 25 Pandithars",
                  },
                  {
                    icon: imgSvg1,
                    title: "1 Million chants of lord Shiva's name",
                    desc: "3400 times Shri Rudhram Chants",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="backdrop-blur-[2px] bg-[rgba(28,28,34,0.5)] border border-[#2f2f37] w-10 h-10 flex items-center justify-center shrink-0">
                      <img src={item.icon} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-white/90 text-[14px] md:text-[16px] font-semibold">
                        {item.title}
                      </h4>
                      <p className="text-[#a1a1aa] text-[11px] md:text-[12px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="flex flex-col gap-3 items-center">
                <Button
                  onClick={onPreBookClick}
                  className="bg-[#e32c26] hover:bg-[#c0241f] text-white text-[14px] font-semibold h-[48px] w-full rounded-md shadow-lg transition-all"
                >
                  Pre-Book Now
                </Button>
                <p className="text-[#a1a1aa] text-[11px] md:text-[12px] text-center">
                  Limited quantity available • Secure your blessing today
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default RudrakshaShowcase;