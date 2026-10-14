'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../../utils/sound';

interface DragDropGameProps {
  dish: string;
  onComplete: () => void;
}

export default function DragDropGame({ dish, onComplete }: DragDropGameProps) {
  // Simple game: Select the correct 3 ingredients for the current dish
  // For MVP, we mock the logic.
  const [ingredients, setIngredients] = useState([
    { id: '1', name: 'دقيق', correct: true, selected: false },
    { id: '2', name: 'لحم', correct: true, selected: false },
    { id: '3', name: 'سكر', correct: false, selected: false },
    { id: '4', name: 'خضروات', correct: true, selected: false },
    { id: '5', name: 'شوكولاتة', correct: false, selected: false },
  ]);

  const [wrongShake, setWrongShake] = useState(false);

  const handleSelect = (idx: number) => {
    const item = ingredients[idx];
    if (item.selected) return;

    if (item.correct) {
      playSound('success');
      const newIngreds = [...ingredients];
      newIngreds[idx].selected = true;
      setIngredients(newIngreds);

      const allCorrectFound = newIngreds.filter((i) => i.correct).every((i) => i.selected);
      if (allCorrectFound) {
        setTimeout(onComplete, 1000);
      }
    } else {
      playSound('error');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border-4 border-accent w-full max-w-sm">
      <h3 className="text-xl font-bold text-center text-primary mb-4">
        اصنع {dish}! أضف المكونات.
      </h3>
      
      <motion.div 
        animate={wrongShake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap justify-center gap-4 mb-6"
      >
        {ingredients.map((ing, idx) => (
          <motion.button
            key={ing.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(idx)}
            className={`px-4 py-3 rounded-full font-bold text-lg kid-shadow transition-all ${
              ing.selected 
                ? 'bg-success text-white scale-0'  // disappears when selected
                : 'bg-background text-primary'
            }`}
            style={{ display: ing.selected ? 'none' : 'block' }}
          >
            {ing.name}
          </motion.button>
        ))}
      </motion.div>

      <div className="mx-auto w-32 h-32 bg-gray-800 rounded-b-[40px] rounded-t-xl relative flex items-end justify-center pb-4 shadow-inner">
         <div className="absolute top-0 w-36 -ml-2 h-4 bg-gray-900 rounded-full" />
         <span className="text-white font-bold opacity-50">قدر الطبخ</span>
         {ingredients.filter(i => i.selected).map((ing, i) => (
           <motion.div 
             key={ing.id}
             initial={{ y: -100, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="absolute bg-accent text-xs px-2 py-1 rounded-full text-white font-bold"
             style={{ bottom: 20 + i * 15, left: 20 + (i % 2) * 30 }}
           >
             {ing.name}
           </motion.div>
         ))}
      </div>
    </div>
  );
}
