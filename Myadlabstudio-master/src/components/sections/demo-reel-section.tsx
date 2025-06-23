"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const demos = [
  { src: 'https://placehold.co/1600x900.png', hint: 'product video' },
  { src: 'https://placehold.co/1600x900.png', hint: 'cosmetics ad' },
  { src: 'https://placehold.co/1600x900.png', hint: 'tech promo' },
  { src: 'https://placehold.co/1600x900.png', hint: 'fashion film' },
  { src: 'https://placehold.co/1600x900.png', hint: 'food commercial' },
  { src: 'https://placehold.co/1600x900.png', hint: 'app showcase' },
];

export default function DemoReelSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.toggleAttribute('data-zoomed', entry.isIntersecting);
        });
      },
      {
        root: scrollContainer,
        rootMargin: '0px -45% 0px -45%',
        threshold: 0,
      }
    );

    itemsRef.current.forEach((item) => {
      if (item) io.observe(item);
    });

    return () => {
      itemsRef.current.forEach((item) => {
        if (item) io.unobserve(item);
      });
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex-shrink-0 w-1/4 snap-center"></div> {/* Spacer */}
        {demos.map((demo, index) => (
          <div
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className="flex-shrink-0 w-1/2 snap-center transition-transform duration-500 ease-in-out data-[zoomed]:scale-105"
          >
            <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={demo.src}
                alt={`Demo Ad ${index + 1}`}
                width={1600}
                height={900}
                data-ai-hint={demo.hint}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
        <div className="flex-shrink-0 w-1/4 snap-center"></div> {/* Spacer */}
      </div>
    </section>
  );
}
