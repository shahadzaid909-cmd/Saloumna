'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../../utils/sound';

interface MatchingGameProps {
  config: {
    pairs: string[];
  };
  onComplete: () => void;
}

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MatchingGame({ config, onComplete }: MatchingGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const defaultCards: Card[] = [...config.pairs, ...config.pairs]
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({ id: index, content, isFlipped: false, isMatched: false }));
    setCards(defaultCards);
  }, [config]);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;
    
    playSound('click');
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      const match1 = newCards[newFlipped[0]];
      const match2 = newCards[newFlipped[1]];

      if (match1.content === match2.content) {
        // Matched
        setTimeout(() => {
           playSound('success');
           setCards(prev => {
             const matched = [...prev];
             matched[newFlipped[0]].isMatched = true;
             matched[newFlipped[1]].isMatched = true;
             return matched;
           });
           setFlippedIndices([]);
           setIsLocked(false);
           
           // Check if all matched
           if (newCards.every(c => c.isMatched || newFlipped.includes(c.id))) {
              setTimeout(onComplete, 500);
           }
        }, 500);
      } else {
        // Not matched
        setTimeout(() => {
           playSound('error');
           setCards(prev => {
             const unflip = [...prev];
             unflip[newFlipped[0]].isFlipped = false;
             unflip[newFlipped[1]].isFlipped = false;
             return unflip;
           });
           setFlippedIndices([]);
           setIsLocked(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      <div className="text-center mb-4 w-full">
         <h2 className="text-2xl font-bold text-accent bg-white py-1 px-4 rounded-full inline-block">
            طابق الأشكال! 🧩
         </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full p-4">
        {cards.map((card, index) => (
           <div 
             key={card.id} 
             onClick={() => handleCardClick(index)}
             className="w-full h-24 relative perspective cursor-pointer"
           >
              <motion.div
                initial={false}
                animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="w-full h-full preserve-3d"
                 style={{ transformStyle: 'preserve-3d' }}
              >
                 {/* Front (Hidden state) */}
                 <div className="absolute inset-0 bg-primary rounded-2xl flex items-center justify-center border-4 border-white kid-shadow backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                    <span className="text-4xl opacity-50">?</span>
                 </div>
                 
                 {/* Back (Revealed state) */}
                 <div 
                   className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center border-4 border-accent shadow-md text-sm font-bold text-primary text-center px-2 backface-hidden" 
                   style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                 >
                    {card.content}
                 </div>
              </motion.div>
           </div>
        ))}
      </div>
    </div>
  );
}
