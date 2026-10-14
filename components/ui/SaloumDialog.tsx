import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SaloumCharacter from './SaloumCharacter';
import { useGameStore } from '../../store/gameStore';
import { shopItems } from '../../data/shopItems';

type SaloumPose = 'talking' | 'pointing' | 'celebrating' | 'thinking';

interface SaloumDialogProps {
  text: string | React.ReactNode;
  actionButtonLabel?: string;
  onActionClick?: () => void;
  pose?: SaloumPose;
}

export default function SaloumDialog({ 
  text, 
  actionButtonLabel, 
  onActionClick,
  pose = 'talking'
}: SaloumDialogProps) {
  const { equippedItems } = useGameStore();

  const activeBadge = shopItems.find(i => i.id === equippedItems.badge);
  const activeTitle = shopItems.find(i => i.id === equippedItems.title);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex flex-col justify-end">
      
      {/* Top part: Saloum Standalone character */}
      <div className="flex justify-start items-end p-4 md:p-10 mb-[-2rem] md:mb-[-4rem]">
        <motion.div
           initial={{ x: -100, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           exit={{ x: -100, opacity: 0 }}
           className="relative"
        >
          <SaloumCharacter pose={pose} size="lg" />
        </motion.div>
      </div>

      {/* Bottom part: Professional Dialogue Panel */}
      <motion.div 
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        exit={{ y: 200 }}
        className="w-full bg-white/95 backdrop-blur-md border-t-8 border-primary p-6 md:p-8 shadow-[0_-10px_50px_rgba(0,0,0,0.2)] pointer-events-auto relative"
      >
        {/* Animated Name Tag with Badge and Title */}
        <div className="absolute -top-12 left-10 flex flex-col items-start gap-1">
          <div className="bg-primary text-white px-8 py-2 rounded-t-2xl font-black text-xl kid-shadow border-x-4 border-t-4 border-white flex items-center gap-3">
            {activeBadge && <span className="text-2xl drop-shadow-sm">{activeBadge.icon}</span>}
            <span>سلوم</span>
          </div>
          {activeTitle && (
            <div className="bg-accent text-white px-4 py-1 rounded-b-xl text-sm font-black kid-shadow-sm border-2 border-white ml-2">
              {activeTitle.name}
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-right font-bold text-gray-800 text-lg md:text-2xl leading-relaxed whitespace-pre-line flex-1">
            {text}
          </div>

          {actionButtonLabel && onActionClick && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onActionClick}
              className="bg-accent text-white font-extrabold text-xl md:text-2xl px-12 py-4 rounded-full kid-shadow transition-colors hover:bg-yellow-400 shrink-0"
            >
              {actionButtonLabel}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
