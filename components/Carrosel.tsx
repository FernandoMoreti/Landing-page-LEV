'useEffect'
import { useEffect } from 'react';
import gsap from 'gsap';
import { banksPhoto } from '@/app/config/banks';
import Image from 'next/image';

export function InfiniteCarousel() {
  useEffect(() => {
    const items = gsap.utils.toArray(".item");

    const itemWidth = items[0].offsetWidth + 32;

    const totalWidth = (items.length / 2) * itemWidth;

    const tween = gsap.to(".track", {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div className="w-full overflow-hidden py-10">
      <div className="track flex gap-8 w-max">
        {banksPhoto.map((src, index) => (
          <div
            key={index}
            className="item w-87.5 h-55 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg"
          >
            <Image
              src={src}
              alt={`Foto ${index + 1}`}
              width={50}
              height={50}
              className="w-50 h-50 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}