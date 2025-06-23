"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-20 mix-blend-difference invert">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex justify-between items-center text-white font-code uppercase text-xs tracking-[0.3em]">
          <Link href="/">I'D</Link>
          <Link href="#contact">US</Link>
        </div>
      </div>
    </header>
  );
}
