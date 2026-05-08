"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  { src: "/images/products/earrings-1.jpg", alt: "Crystal Drop Earrings" },
  { src: "/images/products/bangle-1.jpg", alt: "Arc Bangle" },
  { src: "/images/products/pendant-1.jpg", alt: "Pearl Pendant" },
  { src: "/images/products/necklace-1.jpg", alt: "Serpent Necklace" },
  { src: "/images/products/ring-1.jpg", alt: "Gold Diamond Ring" },
  { src: "/images/products/bracelet-1.jpg", alt: "Gold Chain Bracelet" },
  { src: "/images/products/earrings-2.jpg", alt: "Crystal Stud Earrings" },
  { src: "/images/products/accessories-1.webp", alt: "Precious Accessories" },
];

export default function ProductCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const quantity = slides.length;
  const w = 140;
  const h = 190;
  const translateZ = w + h + 40;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] sm:h-[480px] flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Subtle radial glow behind carousel */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-linen/40 blur-3xl" />
      </div>

      <div
        className="relative"
        style={{
          width: w,
          height: h,
          transformStyle: "preserve-3d",
          animation: isVisible ? `rotating 24s linear infinite` : "none",
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 rounded-xl overflow-hidden border border-sandstone/50 shadow-lg"
            style={{
              transform: `rotateY(${(360 / quantity) * index}deg) translateZ(${translateZ}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <div className="relative w-full h-full bg-linen">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="140px"
              />
              {/* Elegant overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-umber/30 via-transparent to-transparent" />
              {/* Subtle frame border inside */}
              <div className="absolute inset-2 border border-sandstone/20 rounded-lg pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* Decorative ring / ground shadow */}
      <div
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[280px] h-[60px] rounded-[100%] border border-sandstone/10"
        style={{ transform: "translateX(-50%) rotateX(70deg)" }}
      />

      <style jsx>{`
        @keyframes rotating {
          from {
            transform: perspective(1000px) rotateX(-8deg) rotateY(0deg);
          }
          to {
            transform: perspective(1000px) rotateX(-8deg) rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
}
