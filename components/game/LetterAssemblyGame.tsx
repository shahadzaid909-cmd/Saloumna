'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../../utils/sound';

interface Props {
  config: { targetWord: string };
  onComplete: () => void;
}

export default function LetterAssemblyGame({ config, onComplete }: Props) {
  const [scrambled, setScrambled] = useState<{ id: number, char: string }[]>([]);
  const [assembled, setAssembled] = useState<{ id: number, char: string }[]>([]);
  const targetChars = config.targetWord.replace(/\s+/g, '').split('');

  useEffect(() => {
    // Generate scrambled letters
    const rawLetters = targetChars.map((char, index) => ({ id: index, char }));
    
    // Sort randomly
    for (let i = rawLetters.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [rawLetters[i], rawLetters[j]] = [rawLetters[j], rawLetters[i]];
    }

    setScrambled(rawLetters);
    setAssembled([]);
  }, [config.targetWord]);

  useEffect(() => {
    if (assembled.length === targetChars.length) {
      const spelled = assembled.map(a => a.char).join('');
      const targetStr = targetChars.join('');
      if (spelled === targetStr) {
         playSound('success');
         // Delay to show the full word before finishing
         setTimeout(onComplete, 1500);
      } else {
         playSound('error');
         // Auto-reset if spelled wrong
         setTimeout(() => {
           setScrambled(prev => [...prev, ...assembled].sort((a,b) => a.id - b.id)); // simple re-sort
           setAssembled([]);
         }, 800);
      }
    }
  }, [assembled, targetChars, onComplete]);

  const handleTapScrambled = (item: { id: number, char: string }) => {
    playSound('click');
    setScrambled(prev => prev.filter(i => i.id !== item.id));
    setAssembled(prev => [...prev, item]);
  };

  const handleTapAssembled = (item: { id: number, char: string }) => {
    playSound('click');
    setAssembled(prev => prev.filter(i => i.id !== item.id));
    setScrambled(prev => [...prev, item]);
  };

  return (
    <div className="w-full max-w-lg flex flex-col items-center">
      <div className="text-xl font-extrabold text-accent bg-white px-6 py-2 rounded-full mb-6 kid-shadow text-center leading-loose">
         رتّب الحروف لمعرفة اسم الرقصة! 🧩
      </div>

      {/* Target Word Dropzone */}
      <div className="flex gap-2 sm:gap-3 mb-8 min-h-[4rem] items-center justify-center flex-row-reverse" dir="rtl">
        {targetChars.map((_, index) => {
          const matchedItem = assembled[index];
          return (
            <div 
              key={`drop-${index}`} 
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-[15px] flex items-center justify-center text-2xl font-black transition-all ${
                matchedItem 
                  ? 'bg-success text-white kid-shadow border-4 border-white' 
                  : 'bg-white/40 border-4 border-dashed border-primary text-transparent'
              }`}
              onClick={() => matchedItem && handleTapAssembled(matchedItem)}
            >
               {matchedItem ? matchedItem.char : '?'}
            </div>
          );
        })}
      </div>

      {/* Scrambled Letters Pool */}
      <div className="glass-panel p-6 rounded-[30px] border-4 border-white w-full kid-shadow">
        <div className="flex flex-wrap gap-4 justify-center" dir="rtl">
          <AnimatePresence mode="popLayout">
            {scrambled.map(item => (
              <motion.button
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={item.id}
                onClick={() => handleTapScrambled(item)}
                className="w-14 h-14 sm:w-16 sm:h-16 bg-primary text-white text-2xl font-extrabold rounded-[15px] border-4 border-white kid-shadow flex items-center justify-center transition-colors hover:bg-purple-500"
              >
                {item.char}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
