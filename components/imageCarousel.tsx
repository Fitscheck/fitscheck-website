"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: { src: string; alt?: string }[];
  width?: number | string;
  height?: number | string;
  autoPlayInterval?: number;
}

const ImageCarousel: React.FC<CarouselProps> = ({
  images,
  width = "100%",
  height = '500px',
  autoPlayInterval = 3000,
}) => {
  const [[current, direction], setState] = useState<[number, number]>([0, 0]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [current, images.length, autoPlayInterval]);

  const paginate = (newDirection: number) => {
    setState(([prev, _]) => [
      (prev + newDirection + images.length) % images.length,
      newDirection,
    ]);
  };
  

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
  };

  return (
    <div className="relative overflow-hidden rounded-xl " style={{width, height }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 w-full h-full rounded-xl"
        >
          <Image
            src={images[current].src}
            alt={images[current].alt || ''}
            fill
            className="rounded-xl object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current ? 'scale-125 bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setState([idx, idx > current ? 1 : -1])}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;