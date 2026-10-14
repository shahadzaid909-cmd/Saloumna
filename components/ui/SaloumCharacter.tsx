'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  pose?: 'talking' | 'pointing' | 'celebrating' | 'thinking';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function SaloumCharacter({ pose = 'talking', className = '', size = 'md' }: Props) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48 sm:w-64 sm:h-64',
    lg: 'w-64 h-64 sm:w-80 sm:h-80',
    xl: 'w-80 h-80 sm:w-[420px] sm:h-[420px]',
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${sizeClasses[size]} ${className} aspect-square`}>
      {/* Soft Ground Shadow */}
      <div className="absolute bottom-[2%] w-[60%] h-[10%] bg-black/5 blur-xl rounded-[100%] z-0" />

      <div className="relative w-full h-full z-10 flex items-center justify-center overflow-visible">
        {/* Clean Character Image - No filters, no masks, no overlays */}
        <motion.img 
          src={`/assets/saloum/${pose}.png`} 
          alt={`Saloum ${pose}`}
          className="absolute inset-0 w-full h-full object-contain z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      </div>
    </div>
  );
}
