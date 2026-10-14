'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../../utils/sound';

interface BuilderGameProps {
  config: {
    target: string;
    items: string[];
  };
  onComplete: () => void;
}

export default function BuilderGame({ config, onComplete }: BuilderGameProps) {
  const [items, setItems] = useState<string[]>(config.items);
  const [basket, setBasket] = useState<string[]>([]);
  const [isWrong, setIsWrong] = useState(false);

  // For MVP: Simple click to add instead of complex drag/drop
  const handleItemClick = (item: string) => {
    playSound('click');
    setItems(items.filter(i => i !== item));
    const newBasket = [...basket, item];
    setBasket(newBasket);

    if (newBasket.length === config.items.length) {
       setTimeout(() => {
         playSound('success');
         onComplete();
       }, 500);
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      <div className="text-center mb-6 w-full">
         <h2 className="text-2xl font-bold text-primary mb-2 shadow-sm rounded-full bg-white py-2 px-4 inline-block">
            اجمع المكونات في: {config.target}
         </h2>
      </div>

      {/* Target Container */}
      <motion.div 
        animate={isWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
        className="w-48 h-48 border-4 border-dashed border-accent bg-white/50 rounded-3xl flex flex-col items-center justify-center p-4 relative mb-8 kid-shadow"
      >
        <span className="text-5xl opacity-40 mb-2">📥</span>
        <span className="text-xl font-bold text-accent">{config.target}</span>
        
        {/* Added Items (Absolute) */}
        <div className="absolute bottom-2 flex justify-center w-full flex-wrap gap-1 px-2">
            {basket.map((b, i) => (
               <motion.span 
                 initial={{ scale: 0 }} 
                 animate={{ scale: 1 }} 
                 key={i} 
                 className="bg-primary text-white text-xs px-2 py-1 rounded-full font-bold shadow-md"
               >
                 {b}
               </motion.span>
            ))}
        </div>
      </motion.div>

      {/* Item Pool */}
      <div className="flex flex-wrap gap-3 justify-center w-full h-32">
        <AnimatePresence>
          {items.map((item) => (
            <motion.button
              key={item}
              layoutId={item}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleItemClick(item)}
              className="bg-white border-4 border-primary text-primary px-4 py-2 rounded-2xl font-bold text-lg kid-shadow"
            >
              {item}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
