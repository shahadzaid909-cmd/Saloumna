'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { regionsData } from '../../../data/regions';
import { useGameStore } from '../../../store/gameStore';
import TopBar from '../../../components/ui/TopBar';
import MiniGameEngine from '../../../components/game/MiniGameEngine';
import SaloumDialog from '../../../components/ui/SaloumDialog';
import { playSound } from '../../../utils/sound';
import CelebrationEffect from '../../../components/ui/CelebrationEffect';

type ViewState = 'intro' | 'hint' | 'game' | 'fact' | 'completion';

export default function RegionPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addCoins, unlockedRegions, completeRegion } = useGameStore();
  const [view, setView] = useState<ViewState>('intro');
  const [earnedCoins, setEarnedCoins] = useState(0);

  const region = regionsData.find(r => r.id === id);

  if (!region) {
    return <div className="p-8 text-center bg-background min-h-screen">المنطقة غير موجودة :(</div>;
  }

  if (!unlockedRegions.includes(region.id)) {
    return (
      <div className="p-8 text-center bg-background min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-error">
          <h2 className="text-2xl font-bold text-error mb-4">مقفلة!</h2>
          <button onClick={() => router.push('/map')} className="bg-primary text-white px-4 py-2 rounded-full font-bold">رجوع</button>
        </div>
      </div>
    );
  }

  const handleGameComplete = () => {
    // Random reward
    const rewardCoins = Math.floor(Math.random() * 41) + 30; // 30-70
    setEarnedCoins(rewardCoins);
    addCoins(rewardCoins);
    playSound('success');
    setView('fact');
  };

  const finishRegion = () => {
    completeRegion(region.id);
    playSound('unlock');
    setView('completion');
  };

  return (
    <div className={`flex flex-col min-h-screen bg-background relative overflow-hidden theme-${region.theme || 'default'}`}>
      <TopBar />
      <CelebrationEffect />
      
      <button 
        onClick={() => { playSound('click'); router.push('/map'); }}
        className="absolute top-4 right-4 z-50 bg-white p-2 text-primary rounded-full kid-shadow transition-transform active:translate-y-1"
      >
         <ArrowLeft size={24} className="rotate-180" />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center p-6 mt-16 pb-20">
        
        <h1 className="text-5xl font-extrabold text-primary mb-6 capitalize drop-shadow-sm">
          {region.name}
        </h1>

        <AnimatePresence mode="wait">
          {view === 'intro' && (
            <motion.div 
               key="intro"
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="w-full flex justify-center"
            >
               <SaloumDialog 
                 text={`أهلاً بك في منطقة ${region.name}!\nهل أنت مستعد لنبدأ ألعابنا؟`} 
                 actionButtonLabel="مستعد!" 
                 onActionClick={() => { playSound('click'); setView('hint'); }} 
                 pose="talking"
               />
            </motion.div>
          )}

          {view === 'hint' && (
            <motion.div 
               key="hint"
               initial={{ x: 100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: -100, opacity: 0 }}
               className="w-full flex justify-center"
            >
               <SaloumDialog 
                 text="في هذه اللعبة، أسرع بإكمال التحدي لتجمع العملات!" 
                 actionButtonLabel="العب الآن!" 
                 onActionClick={() => { playSound('click'); setView('game'); }} 
                 pose="pointing"
               />
            </motion.div>
          )}

          {view === 'game' && (
            <motion.div 
              key="game"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full flex justify-center"
            >
              <MiniGameEngine region={region} onComplete={handleGameComplete} />
            </motion.div>
          )}

          {view === 'fact' && (
            <motion.div 
               key="fact"
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -50, opacity: 0 }}
               className="w-full flex justify-center"
            >
               <SaloumDialog 
                 text={`هل تعلم؟ 🤔\n\n${region.gamePayload.educationalFact}`} 
                 actionButtonLabel="رائع!" 
                 onActionClick={() => { playSound('click'); finishRegion(); }} 
                 pose="thinking"
               />
            </motion.div>
          )}

          {view === 'completion' && (
            <motion.div 
               key="completion"
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="w-full flex justify-center"
            >
               <SaloumDialog 
                 text={`مذهل! 🎉\nلقد أكملت ألعاب المنطقة وحصلت على ${earnedCoins} عملة!\nهيا بنا نكتشف منطقة أخرى في المملكة! 🚀`} 
                 actionButtonLabel="العودة للخريطة" 
                 onActionClick={() => { playSound('click'); router.push('/map'); }} 
                 pose="celebrating"
               />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
