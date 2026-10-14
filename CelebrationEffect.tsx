'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

export default function CelebrationEffect() {
  const { equippedItems } = useGameStore();
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; char: string }[]>([]);
  
  const effectType = equippedItems.effect;

  useEffect(() => {
    if (!effectType) return;

    // Generate particles
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: 100 + Math.random() * 20, // start below screen
      color: ['#FFD700', '#FF4500', '#1E90FF', '#32CD32', '#FF69B4'][Math.floor(Math.random() * 5)],
      char: effectType === 'effect-confetti' ? '🎊' : effectType === 'effect-stars' ? '✨' : '🎈'
    }));

    setParticles(newParticles);

    // Auto cleanup after 4 seconds
    const timer = setTimeout(() => setParticles([]), 4000);
    return () => clearTimeout(timer);
  }, [effectType]);

  if (!effectType || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[999]">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: '110vh', x: `${p.x}vw`, opacity: 1, scale: 0.5 }}
            animate={{ 
              y: '-20vh', 
              x: `${p.x + (Math.random() * 20 - 10)}vw`,
              rotate: 360,
              scale: [0.5, 1.2, 1],
              opacity: [1, 1, 0]
            }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              ease: "easeOut"
            }}
            style={{ position: 'absolute', fontSize: '2rem' }}
          >
            {p.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
