export type RewardType = 'badge' | 'title' | 'effect';

export interface ShopItem {
  id: string;
  name: string;
  type: RewardType;
  price: number;
  icon: string; // Emoji
  description?: string;
  effectValue?: string; // Config for celebration
}

export const shopItems: ShopItem[] = [
  // Badges
  { id: 'badge-kabsa', name: 'خبير الكبسة', type: 'badge', price: 150, icon: '🥘', description: 'يُظهر أنك خبير في المطبخ السعودي' },
  { id: 'badge-camel', name: 'فطين الإبل', type: 'badge', price: 200, icon: '🐪', description: 'لمن يعرف أسرار الصحراء' },
  { id: 'badge-dance', name: 'بطل العرضة', type: 'badge', price: 300, icon: '🕺', description: 'لعشاق التراث الفني' },
  { id: 'badge-star', name: 'نجم المغامرة', type: 'badge', price: 500, icon: '🌟', description: 'أعلى وسام للمستكشفين' },
  
  // Titles
  { id: 'title-explorer', name: 'مستكشف المملكة', type: 'title', price: 100, icon: '🚩', description: 'لقب للمبتدئين في الرحلة' },
  { id: 'title-heritage', name: 'خبير التراث', type: 'title', price: 400, icon: '📚', description: 'لمن أتقن معرفة المناطق' },
  { id: 'title-legend', name: 'الأسطورة السعودية', type: 'title', price: 1000, icon: '🏆', description: 'اللقب الأسمى في اللعبة' },

  // Celebration Effects
  { id: 'effect-confetti', name: 'احتفال القصاصات', type: 'effect', price: 200, icon: '🎉', effectValue: 'confetti', description: 'ألوان متطايرة عند الفوز' },
  { id: 'effect-stars', name: 'مطر النجوم', type: 'effect', price: 500, icon: '✨', effectValue: 'stars', description: 'نجوم مضيئة تملأ الشاشة' },
  { id: 'effect-balloons', name: 'بالونات الفرح', type: 'effect', price: 800, icon: '🎈', effectValue: 'balloons', description: 'بالونات صاعدة للاحتفال' },
];
