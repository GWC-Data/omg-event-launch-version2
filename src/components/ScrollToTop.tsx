import { useEffect, useState } from "react";

type TrishulIconProps = {
    className?: string;
};

const TrishulIcon = ({ className = "w-8 h-8" }: TrishulIconProps) => (
    <svg
        viewBox="0 0 64 160"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className={className}
    >
        {/* Central Shaft */}
        <path
            d="M32 40 V150"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
        />

        {/* Central Spear (Main Shakti) */}
        <path
            d="M32 6
         C28 18, 28 28, 32 40
         C36 28, 36 18, 32 6 Z"
            fill="currentColor"
        />

        {/* Left Prong */}
        <path
            d="M16 20
         C6 32, 10 52, 26 60
         L24 50
         C14 44, 14 32, 22 26 Z"
            fill="currentColor"
        />

        {/* Right Prong */}
        <path
            d="M48 20
         C58 32, 54 52, 38 60
         L40 50
         C50 44, 50 32, 42 26 Z"
            fill="currentColor"
        />

        {/* Damru (Sacred Knot) */}
        <ellipse cx="32" cy="88" rx="6" ry="4" fill="currentColor" />
        <ellipse cx="32" cy="96" rx="6" ry="4" fill="currentColor" />

        {/* Handle Grip */}
        <rect
            x="28"
            y="120"
            width="8"
            height="24"
            rx="3"
            fill="currentColor"
        />
    </svg>
);

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);
    const [spinning, setSpinning] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.scrollY > 300;
            setVisible(scrolled);

            // Stop spinning when we reach top & button disappears
            if (!scrolled) {
                setSpinning(false);
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        setSpinning(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`
        fixed bottom-6 right-6 z-50
        w-12 h-12 rounded-full
        bg-gold text-black
        border border-gold/40
        flex items-center justify-center
        backdrop-blur
        shadow-[0_0_30px_rgba(212,175,55,0.45)]
        transition-all duration-300
        hover:scale-110
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
            style={{ perspective: "800px" }}
        >
            <div className={spinning ? "spin-y" : ""}>
                <TrishulIcon className="w-8 h-8 text-black" />
            </div>
        </button>
    );
};

export default ScrollToTop;
