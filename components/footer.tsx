import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-noir">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top */}
        <div className="flex flex-col md:flex-row items-center justify-between py-10 border-b border-[#333]">
          <Image
            src="/logo.png"
            alt="LAAE"
            width={120}
            height={40}
            className="h-[30px] w-auto object-contain mb-6 md:mb-0"
            style={{ filter: "brightness(0) invert(1) sepia(1) saturate(0.3) brightness(0.7)" }}
          />
          <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-8 list-none">
            <li>
              <Link href="/products" className="text-[9px] tracking-[0.25em] uppercase text-[#666] hover:text-sandstone transition-colors duration-300">
                Collections
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-[9px] tracking-[0.25em] uppercase text-[#666] hover:text-sandstone transition-colors duration-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-[9px] tracking-[0.25em] uppercase text-[#666] hover:text-sandstone transition-colors duration-300">
                Care
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-[9px] tracking-[0.25em] uppercase text-[#666] hover:text-sandstone transition-colors duration-300">
                Contact
              </Link>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[9px] tracking-[0.25em] uppercase text-[#666] hover:text-sandstone transition-colors duration-300">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8 gap-4">
          <p className="text-[9px] tracking-[0.15em] text-[#444]">
            &copy; 2026 LAAE. All rights reserved.
          </p>
          <p className="font-serif text-[13px] italic text-[#555]">
            Worn with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
