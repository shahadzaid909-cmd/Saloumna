'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Coins, Check, Lock } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { shopItems, ShopItem } from '../../data/shopItems';
import { playSound } from '../../utils/sound';
import TopBar from '../../components/ui/TopBar';
import SaloumCharacter from '../../components/ui/SaloumCharacter';

export default function ShopPage() {
  const router = useRouter();
  const { coins, inventory, equippedItems, purchaseItem, equipItem } = useGameStore();
  const [activeCategory, setActiveCategory] = useState<RewardType>('badge');
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

  const filteredItems = shopItems.filter(i => i.type === activeCategory);

  const handleAction = (item: ShopItem) => {
    const isOwned = inventory.includes(item.id);
    if (isOwned) {
      equipItem(item.id, item.type);
      playSound('click');
    } else {
      if (purchaseItem(item.id, item.price)) {
        playSound('unlock');
        equipItem(item.id, item.type);
      } else {
        playSound('error');
      }
    }
  };

  const activeBadge = shopItems.find(i => i.id === equippedItems.badge);
  const activeTitle = shopItems.find(i => i.id === equippedItems.title);

  return (
    <div className="min-h-screen bg-background pb-10">
      <TopBar />
      
      <div className="max-w-6xl mx-auto p-4 sm:p-8 mt-16">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => { playSound('click'); router.push('/map'); }}
            className="bg-white p-3 text-primary rounded-full kid-shadow transition-transform active:translate-y-1"
          >
             <ArrowLeft size={28} className="rotate-180" />
          </button>
          
          <h1 className="text-4xl font-black text-primary drop-shadow-sm">متجر الجوائز 🏆</h1>
          
          <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full kid-shadow border-4 border-accent">
            <Coins className="text-yellow-500" />
            <span className="text-2xl font-black text-gray-800">{coins}</span>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          {(['badge', 'title', 'effect'] as RewardType[]).map(cat => (
            <button
              key={cat}
              onClick={() => { playSound('click'); setActiveCategory(cat); setSelectedItem(null); }}
              className={`px-8 py-3 rounded-full font-black text-xl transition-all kid-shadow ${
                activeCategory === cat ? 'bg-primary text-white scale-110' : 'bg-white text-gray-400'
              }`}
            >
              {cat === 'badge' ? 'أوسمة' : cat === 'title' ? 'ألقاب' : 'تأثيرات'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Preview & Details */}
          <div className="glass-panel rounded-[40px] p-10 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden bg-white/60 text-center">
            <div className="absolute top-4 left-4 bg-primary/10 px-4 py-1 rounded-full text-primary font-bold">ملفك الشخصي</div>
            
            <SaloumCharacter size="lg" className="mb-6" />
            
            {/* Display Active Badge & Title */}
            <div className="flex flex-col items-center gap-2 mb-10">
                <div className="bg-primary text-white px-10 py-3 rounded-2xl font-black text-2xl kid-shadow flex items-center gap-4">
                  <span className="text-3xl">{activeBadge?.icon || '👤'}</span>
                  <span>سلوم</span>
                </div>
                <div className="bg-accent text-white px-6 py-2 rounded-xl text-lg font-black kid-shadow-sm">
                  {activeTitle?.name || 'مغامر ناشئ'}
                </div>
            </div>

            {selectedItem && (
               <motion.div 
                 initial={{ y: 20, opacity: 0 }} 
                 animate={{ y: 0, opacity: 1 }}
                 className="flex flex-col items-center"
               >
                  <div className="text-8xl mb-4 p-6 bg-white rounded-3xl shadow-inner border-4 border-dashed border-gray-100">{selectedItem.icon}</div>
                  <h3 className="text-3xl font-black text-gray-800 mb-2">{selectedItem.name}</h3>
                  <p className="text-gray-500 font-bold mb-6 max-w-xs">{selectedItem.description}</p>
                  
                  <button
                    onClick={() => handleAction(selectedItem)}
                    className={`px-16 py-4 rounded-full font-black text-2xl kid-shadow text-white transition-all ${
                      inventory.includes(selectedItem.id) ? 'bg-success' : (coins >= selectedItem.price ? 'bg-accent' : 'bg-gray-400')
                    }`}
                  >
                    {inventory.includes(selectedItem.id) ? 'تجهيز' : `شراء بـ ${selectedItem.price}`}
                  </button>
               </motion.div>
            )}
            
            {!selectedItem && (
              <p className="text-gray-400 font-bold text-xl italic mt-10">اختر جائزة من القائمة لاستكشافها!</p>
            )}
          </div>

          {/* Right: Item Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 auto-rows-fr">
            {filteredItems.map((item) => {
              const isOwned = inventory.includes(item.id);
              const isEquipped = equippedItems[item.type] === item.id;
              const isSelected = selectedItem?.id === item.id;

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { playSound('click'); setSelectedItem(item); }}
                  className={`relative h-64 md:h-72 rounded-[35px] border-4 cursor-pointer transition-all kid-shadow bg-white flex flex-col items-stretch overflow-hidden group ${
                    isSelected ? 'border-primary ring-4 ring-primary/20 bg-primary/5' : (isEquipped ? 'border-success' : 'border-gray-100')
                  }`}
                >
                  <div className="absolute top-4 inset-x-4 flex justify-between items-center z-10 pointer-events-none">
                    {isEquipped ? (
                      <div className="bg-success text-white p-1.5 rounded-full shadow-md">
                        <Check size={18} strokeWidth={4} />
                      </div>
                    ) : (isOwned ? <div className="bg-success/10 text-success p-1 rounded-full"><Check size={14} /></div> : <div></div>)}
                    {!isOwned && <div className="bg-gray-100 text-gray-400 p-1.5 rounded-full shadow-sm"><Lock size={18} /></div>}
                  </div>
                  
                  <div className="flex-1 flex items-center justify-center p-4 bg-gray-50/50 group-hover:bg-white transition-colors">
                    <div className="text-7xl drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                  </div>

                  <div className="p-4 bg-white border-t-2 border-gray-50 flex flex-col items-center text-center">
                    <h4 className="font-black text-gray-800 text-lg truncate w-full">{item.name}</h4>
                    <div className="h-6 flex items-center justify-center">
                      {!isOwned ? (
                        <div className="flex items-center gap-1.5 text-accent font-black">
                          <Coins size={16} className="text-yellow-500" />
                          <span>{item.price}</span>
                        </div>
                      ) : (
                        <span className={`text-sm font-bold ${isEquipped ? 'text-success' : 'text-gray-400'}`}>
                          {isEquipped ? 'مجهز' : 'مملوك'}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
