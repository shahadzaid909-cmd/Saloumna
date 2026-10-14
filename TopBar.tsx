'use client';

import { useGameStore } from '../../store/gameStore';
import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';

export default function TopBar() {
  const coins = useGameStore((state) => state.coins);

  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 pointer-events-none">
      <motion.div 
        className="pointer-events-auto bg-white border-4 border-accent rounded-full px-4 py-2 flex items-center gap-2 kid-shadow"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
      >
        <Coins className="text-yellow-500" fill="currentColor" size={24} />
        <span className="font-bold text-xl text-primary">{coins}</span>
      </motion.div>
    </div>
  );
}
