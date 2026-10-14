'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import SaudiMap from '../../components/map/SaudiMap';
import TopBar from '../../components/ui/TopBar';
import SaloumDialog from '../../components/ui/SaloumDialog';
import { playSound } from '../../utils/sound';
import { useGameStore } from '../../store/gameStore';
import { regionsData } from '../../data/regions';

export default function MapPage() {
  const router = useRouter();
  const completedRegions = useGameStore(state => state.completedRegions);
  const isAllCompleted = completedRegions.length === regionsData.length;

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      <TopBar />
      
      <button 
        onClick={() => { playSound('click'); router.push('/'); }}
        className="absolute top-4 right-4 z-50 bg-white p-2 text-primary rounded-full kid-shadow transition-transform active:kid-shadow-active active:translate-y-1"
      >
         <ArrowLeft size={24} className="rotate-180" />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center p-4 mt-16 pb-10">
        <motion.div
           initial={{ y: -20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="text-center mb-4"
        >
          <h1 className="text-4xl font-extrabold text-primary mb-2">استكشف السعودية!</h1>
          <p className="text-lg text-accent font-semibold">اختر منطقة لتبدأ رحلتك</p>
        </motion.div>

        <SaudiMap />
      </div>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => { playSound('click'); router.push('/shop'); }}
        className="fixed bottom-6 left-6 z-50 bg-accent text-white p-4 rounded-full kid-shadow flex items-center gap-2 border-4 border-white group"
      >
        <ShoppingBag size={32} />
        <span className="hidden group-hover:block font-black text-xl ml-2">متجر سلوم</span>
      </motion.button>

      <AnimatePresence>
        {isAllCompleted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          >
             <SaloumDialog 
               text="مذهل! 🌟\nلقد زرت جميع مناطق المملكة 🇸🇦\nوأصبحت خبيراً في التراث السعودي!\nأنا فخور بك 👏"
               actionButtonLabel="إعادة الرحلة"
               onActionClick={() => { 
                 playSound('success'); 
                 useGameStore.getState().resetProgress(); 
               }}
               pose="celebrating"
             />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
