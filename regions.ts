export type GameType = 'builder' | 'letter_assembly' | 'matching';

export interface GamePayload {
  gameType: GameType;
  gameConfig: any;
  educationalFact: string;
}

export interface Region {
  id: string;
  name: string;
  dance: string;
  dish: string;
  proverb: string;
  unlockCost: number;
  isUnlockedByDefault: boolean;
  theme: string;
  color: string;
  gamePayload: GamePayload;
}

export const regionsData: Region[] = [
  {
    id: "riyadh",
    name: "الرياض",
    dance: "العرضة النجدية",
    dish: "الكبسة",
    proverb: "ما ينغزا به",
    unlockCost: 0,
    isUnlockedByDefault: true,
    theme: "najdi-geometry",
    color: "#F9A826",
    gamePayload: {
      gameType: "builder",
      gameConfig: { target: "قدر الكبسة", items: ["أرز", "لحم", "بهارات", "صلصة"] },
      educationalFact: "الكبسة هي الطبق الرئيسي في موائد الرياض والسعودية كافة، وتحضر بعناية من الأرز الطويل واللحم الفاخر."
    }
  },
  {
    id: "mecca",
    name: "مكة المكرمة",
    dance: "المزمار",
    dish: "السليق",
    proverb: "أهل مكة أدرى بشعابها",
    unlockCost: 50,
    isUnlockedByDefault: false,
    theme: "rawashin-wood",
    color: "#4CAF50",
    gamePayload: {
      gameType: "builder",
      gameConfig: { target: "دلة القهوة", items: ["ماء زمزم", "بن محمص", "هيل", "زعفران"] },
      educationalFact: "يشتهر أهل مكة بالكرم الأصيل، وتُقدم القهوة بمزج الهيل والزعفران للضيوف القادمين للحرم."
    }
  },
  {
    id: "medina",
    name: "المدينة المنورة",
    dance: "الخبيتي",
    dish: "الرز المديني",
    proverb: "من بغى الدح ما قال أح",
    unlockCost: 70,
    isUnlockedByDefault: false,
    theme: "rawashin-wood",
    color: "#8BC34A",
    gamePayload: {
      gameType: "builder",
      gameConfig: { target: "سلة التمر", items: ["عجوة", "صفاوي", "عنبر", "مجدول"] },
      educationalFact: "تُعرف المدينة المنورة بأنها عاصمة التمور، وتعتبر 'العجوة' من أشهر وأبرك تمورها تاريخياً."
    }
  },
  {
    id: "eastern-province",
    name: "الشرقية",
    dance: "السامري",
    dish: "الرز الحساوي",
    proverb: "عتيج الصوف ولا جديد البريسم",
    unlockCost: 100,
    isUnlockedByDefault: false,
    theme: "zari-gold",
    color: "#03A9F4",
    gamePayload: {
      gameType: "letter_assembly",
      gameConfig: { targetWord: "السامري" },
      educationalFact: "اعتمد سكان الشرقية على البحر تاريخياً، فاخترعوا أهازيج بحرية وإيقاعات تعينهم في رحلات الغوص وصيد اللؤلؤ."
    }
  },
  {
    id: "al-qassim",
    name: "القصيم",
    dance: "العرضة القصيمية",
    dish: "الكليجا",
    proverb: "يا من شرى له من حلاله علة",
    unlockCost: 120,
    isUnlockedByDefault: false,
    theme: "najdi-geometry",
    color: "#9C27B0",
    gamePayload: {
      gameType: "builder",
      gameConfig: { target: "فرن الكليجا", items: ["دقيق بر", "دبس تمر", "هيل", "قرفة"] },
      educationalFact: "الكليجا هي حلوى تراثية شهيرة بالقصيم وتُخبز في أفران خاصة وتهدى للأقارب في المواسم."
    }
  },
  {
    id: "hail",
    name: "حائل",
    dance: "السامري الحائلي",
    dish: "المقشوش",
    proverb: "عينين برأس",
    unlockCost: 140,
    isUnlockedByDefault: false,
    theme: "sadu-texture",
    color: "#E91E63",
    gamePayload: {
      gameType: "builder",
      gameConfig: { target: "دلة حائل", items: ["بن أشقر", "قرنفل", "زعفران", "هيل"] },
      educationalFact: "تتميز حائل بكرمها الحاتمي، وقهوتها الخاصة تعتبر أيقونة الكرم باستقبال الضيوف في مجالس السدو."
    }
  },
  {
    id: "tabuk",
    name: "تبوك",
    dance: "الدحة",
    dish: "المجللة",
    proverb: "الشتاء وجه ذيب",
    unlockCost: 160,
    isUnlockedByDefault: false,
    theme: "sadu-texture",
    color: "#FF9800",
    gamePayload: {
      gameType: "letter_assembly",
      gameConfig: { targetWord: "الدحة" },
      educationalFact: "الدحة تبوكية الأصل، وهي رقصة حماسية تُمارس بصوت إيقاعي يشبه زئير الأسد لبث الشجاعة."
    }
  },
  {
    id: "northern-borders",
    name: "الحدود الشمالية",
    dance: "الهجيني",
    dish: "الخميعة",
    proverb: "اللي ما يعرف الصقر يشويه",
    unlockCost: 180,
    isUnlockedByDefault: false,
    theme: "sadu-texture",
    color: "#00BCD4",
    gamePayload: {
      gameType: "matching",
      gameConfig: { pairs: ["خيمة", "صقر", "دلة", "نار"] },
      educationalFact: "يعتمد تراث الحدود الشمالية على حياة البادية القاسية، وتشكل الخيمة والصقارة جزءاً أساسياً للصيد والبقاء."
    }
  },
  {
    id: "jizan",
    name: "جازان",
    dance: "العزاوي",
    dish: "المغش",
    proverb: "اللي ما يخاف من الله خاف منه",
    unlockCost: 200,
    isUnlockedByDefault: false,
    theme: "asiri-pattern",
    color: "#F44336",
    gamePayload: {
      gameType: "letter_assembly",
      gameConfig: { targetWord: "العزاوي" },
      educationalFact: "رقصة العزاوي من الفنون السريعة المرنة وتعتمد على إيقاعات رشيقة تناسب الشباب في الأعياد على سواحل جازان."
    }
  },
  {
    id: "najran",
    name: "نجران",
    dance: "الزامل",
    dish: "الرقش",
    proverb: "الصديق وقت الضيق",
    unlockCost: 220,
    isUnlockedByDefault: false,
    theme: "asiri-pattern",
    color: "#795548",
    gamePayload: {
      gameType: "matching",
      gameConfig: { pairs: ["جنبية", "نقش نجراني", "بيت طين", "محراث"] },
      educationalFact: "تشتهر نجران بالخناجر (الجنبية) وصناعة بيوت الطين الفريدة بنقوشها الهندسية التي تحكي قصص الماضي."
    }
  },
  {
    id: "al-bahah",
    name: "الباحة",
    dance: "اللعب الشهري",
    dish: "الدغابيس",
    proverb: "كل يرى الناس بعين طبعه",
    unlockCost: 240,
    isUnlockedByDefault: false,
    theme: "asiri-pattern",
    color: "#607D8B",
    gamePayload: {
      gameType: "letter_assembly",
      gameConfig: { targetWord: "اللعب" },
      educationalFact: "تنتشر في جبال الباحة فنون الإيقاعات الجماعية التي تعكس الطبيعة الجبلية القوية."
    }
  },
  {
    id: "al-jawf",
    name: "الجوف",
    dance: "العرضة",
    dish: "البكيلة",
    proverb: "الجار قبل الدار",
    unlockCost: 260,
    isUnlockedByDefault: false,
    theme: "sadu-texture",
    color: "#3F51B5",
    gamePayload: {
      gameType: "builder",
      gameConfig: { target: "قنينة زجاجية", items: ["زيتون أخضر", "زيتون أسود", "عصرة أولى", "أغصان زيتون"] },
      educationalFact: "الجوف هي سلة الزيتون للمملكة، حيث تنتج أجود أنواع زيت الزيتون في الشرق الأوسط."
    }
  },
  {
    id: "asir",
    name: "عسير",
    dance: "الخطوة",
    dish: "العريكة",
    proverb: "حبل الكذب قصير",
    unlockCost: 280,
    isUnlockedByDefault: false,
    theme: "asiri-pattern",
    color: "#FF5722",
    gamePayload: {
      gameType: "matching",
      gameConfig: { pairs: ["عصابة رأس", "قط عسيري", "فستان تراثي", "عسل يعسوب"] },
      educationalFact: "يتزين أهل عسير بأطواق الورد الملونة (عصابة الرأس) والفنون الجدارية كـ'القط العسيري' العريق."
    }
  }
];
