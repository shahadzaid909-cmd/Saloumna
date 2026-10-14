'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { regionsData } from '../../data/regions';
import { useRouter } from 'next/navigation';
import { playSound } from '../../utils/sound';
import svgMapData from '../../data/svgMapData';

export default function SaudiMap() {
  const router = useRouter();
  const { unlockedRegions, completedRegions } = useGameStore();

  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleRegionClick = (id: string) => {
    const isUnlocked = unlockedRegions.includes(id);
    const region = regionsData.find((r) => r.id === id);
    if (!region) return;

    if (isUnlocked) {
      playSound('click');
      router.push(`/region/${id}`);
    } else {
      playSound('error');
    }
  };

  return (
    <div 
      className="relative w-full max-w-2xl mx-auto my-4" 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredRegion(null)}
    >
      <svg 
        viewBox={svgMapData.viewBox} 
        className="w-full h-full drop-shadow-2xl overflow-visible"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <defs>
           <filter id="glow-hover" x="-20%" y="-20%" width="140%" height="140%">
               <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ffffff" floodOpacity="0.8"/>
           </filter>
        </defs>

        {svgMapData.locations.map((loc: any) => {
          const region = regionsData.find(r => r.id === loc.id);
          if (!region) return null;

          const isUnlocked = unlockedRegions.includes(region.id);
          const isCompleted = completedRegions.includes(region.id);
          
          let opacity = isUnlocked ? 1 : 0.35;
          let hoverOpacity = isUnlocked ? 0.9 : 0.6;
          let stroke = isCompleted ? "#4CAF50" : (isUnlocked ? "#FFFFFF" : "rgba(255,255,255,0.4)");

          return (
            <motion.path
              key={loc.id}
              d={loc.path}
              fill={region.color}
              stroke={stroke}
              strokeWidth={isCompleted ? "3" : "2"}
              initial={{ opacity }}
              animate={{ opacity }}
              whileHover={{ 
                scale: 1.02, 
                opacity: hoverOpacity, 
                zIndex: 10,
                filter: isUnlocked ? 'url(#glow-hover)' : 'none'
              }}
              whileTap={isUnlocked ? { scale: 0.98 } : {}}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onClick={() => handleRegionClick(region.id)}
              className={`cursor-pointer transition-all duration-300 origin-center`}
              style={{ transformOrigin: '50% 50%' }}
            />
          );
        })}
      </svg>

      {/* Floating Tooltip */}
      <AnimatePresence>
        {hoveredRegion && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed z-50 pointer-events-none bg-white px-4 py-2 rounded-2xl shadow-xl kid-shadow border-2 border-primary"
            style={{ 
               left: mousePos.x + 20, 
               top: mousePos.y + 20,
               transform: 'translate(-50%, 0)'
            }}
          >
            {(() => {
               const r = regionsData.find(reg => reg.id === hoveredRegion);
               if (!r) return null;
               const isUnlocked = unlockedRegions.includes(r.id);
               const isCompleted = completedRegions.includes(r.id);

               return (
                 <div className="text-center">
                    <h3 className="font-extrabold text-xl text-primary mb-1">{r.name}</h3>
                    {!isUnlocked ? (
                      <div className="flex items-center justify-center gap-2 text-sm font-bold bg-background px-2 py-1 rounded-full">
                        <span>مقفلة</span>
                        <span>🔒</span>
                      </div>
                    ) : isCompleted ? (
                      <div className="text-success font-bold text-sm">مكتملة! ✅</div>
                    ) : (
                      <div className="text-accent font-bold text-sm">اضغط للاستكشاف! 🌟</div>
                    )}
                 </div>
               );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
