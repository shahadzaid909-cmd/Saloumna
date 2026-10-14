'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import SaloumDialog from '../components/ui/SaloumDialog';
import { useGameStore } from '../store/gameStore';
import { playSound } from '../utils/sound';

export default function Home() {
  const router = useRouter();
  const setHasSeenIntro = useGameStore(state => state.setHasSeenIntro);

  const startJourney = () => {
    playSound('click');
    setHasSeenIntro();
    router.push('/map');
  };

  const introText = "مرحبًا! أنا سلوم 👋\nأحب أتعرف على ثقافات مناطق المملكة العربية السعودية 🇸🇦\nهل تساعدني أزور كل منطقة وأتعلم أكلها ورقصاتها وعاداتها؟\nلنبدأ رحلتنا من الرياض! 🚀";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-accent rounded-full opacity-20 blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-primary rounded-full opacity-10 blur-2xl animate-pulse"></div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="text-center z-10 mb-12"
      >
        <h1 className="text-6xl font-extrabold text-primary mb-4 drop-shadow-md tracking-wider">
          سلومنا
        </h1>
      </motion.div>

      <SaloumDialog 
        text={introText} 
        actionButtonLabel="يلا نبدأ!" 
        onActionClick={startJourney} 
        pose="pointing"
      />
    </div>
  );
}
