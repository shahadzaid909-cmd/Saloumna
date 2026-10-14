import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { regionsData } from '../data/regions';

interface GameState {
  coins: number;
  unlockedRegions: string[];
  completedRegions: string[];
  hasSeenIntro: boolean;
  inventory: string[];
  equippedItems: {
    badge: string | null;
    title: string | null;
    effect: string | null;
  };
  addCoins: (amount: number) => void;
  setHasSeenIntro: () => void;
  completeRegion: (regionId: string) => void;
  purchaseItem: (itemId: string, price: number) => boolean;
  equipItem: (itemId: string, type: 'badge' | 'title' | 'effect') => void;
  resetProgress: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      coins: 200,
      unlockedRegions: regionsData.filter(r => r.isUnlockedByDefault).map(r => r.id),
      completedRegions: [],
      hasSeenIntro: false,
      inventory: [],
      equippedItems: { badge: null, title: null, effect: null },

      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
      setHasSeenIntro: () => set({ hasSeenIntro: true }),

      completeRegion: (regionId) => {
        const state = get();
        if (state.completedRegions.includes(regionId)) return;
        const newCompleted = [...state.completedRegions, regionId];
        const currentIndex = regionsData.findIndex(r => r.id === regionId);
        const newUnlocked = [...state.unlockedRegions];
        if (currentIndex !== -1 && currentIndex + 1 < regionsData.length) {
          const nextRegionId = regionsData[currentIndex + 1].id;
          if (!newUnlocked.includes(nextRegionId)) newUnlocked.push(nextRegionId);
        }
        set({ completedRegions: newCompleted, unlockedRegions: newUnlocked });
      },

      purchaseItem: (itemId, price) => {
        const state = get();
        if (state.coins < price) return false;
        if (state.inventory.includes(itemId)) return true;
        set({ coins: state.coins - price, inventory: [...state.inventory, itemId] });
        return true;
      },

      equipItem: (itemId, type) => {
        set((state) => ({
          equippedItems: { ...state.equippedItems, [type]: itemId }
        }));
      },

      resetProgress: () => set({
        coins: 200,
        unlockedRegions: regionsData.filter(r => r.isUnlockedByDefault).map(r => r.id),
        completedRegions: [],
        hasSeenIntro: false,
        inventory: [],
        equippedItems: { badge: null, title: null, effect: null }
      })
    }),
    { name: 'saloumna-progress-storage-v4' }
  )
);
