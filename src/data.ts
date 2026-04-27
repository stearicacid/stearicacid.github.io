// src/data.ts
export const profile = {
  name: "Rin Sato",
  title: "Graduate Student",
  affiliation: "Waseda University, Morishima Lab",
  email: "rin_sato(at)akane.waseda.jp",
  address: "55N406, 3-4-1 Okubo, Shinjuku, Tokyo, 169-0072, Japan (Morishima-Lab.)",
  phone: "+81-3-5286-3510 (Morishima-Lab.)",
  interests: [
    "Automatic Music Transcription",
    "Audio generative models",
    "Music Information Retrieval"
  ],
  links: [
    { label: "GitHub", url: "https://github.com/stearicacid" },
    { label: "X (Twitter)", url: "https://x.com/rin310_" },
  ],
};

export type Publication = {
  category: "International" | "Domestic";
  authorRole: "First" | "Co-author";
  title: string;
  authors: string;
  venue: string;
  month?: string;
  year: number;
  date?: string;
  award?: string;
  links?: { label: string; url: string 
  }[];
};

export type Award = {
  title: string;
  date: string;
};

export const awards: Award[] = [
  {
    title: "情報処理学会 第88回全国大会 学生奨励賞",
    date: "March 8th, 2026",
  },
  {
    title: "第145回音楽情報科学研究発表会 学生奨励賞 Best New Direction部門",
    date: "March 2nd, 2026",
  },
];

export const publications: Publication[] = [
  {
    category: "International",
    authorRole: "First",
    title: "Timbre-Based Pretraining with Pseudo-Labels for Multi-Instrument Automatic Music Transcription",
    authors: "Rin Sato, Keitaro Tanaka, Shigeo Morishima",
    venue: "ICASSP",
    month: "May",
    year: 2026,
    links: [
      { label: "Paper", url: "https://ieeexplore.ieee.org/abstract/document/11464219" },
      { label: "Code", url: "https://github.com/stearicacid/timbre-based-pretraining" },
    ],
  },
  {
    category: "Domestic",
    authorRole: "First",
    title: "音楽基盤モデルの表現形成における学習過程の解析手法の検討",
    authors: "佐藤りん, 田中啓太郎, 八木颯斗, 高道慎之介, 森島繁生",
    venue: "第145回音楽情報科学研究発表会",
    month: "March",
    year: 2026,
    award: "学生奨励賞 Best New Direction部門 ",
  },
  {
    category: "Domestic",
    authorRole: "Co-author",
    title: "音楽基盤モデルにおける音響特徴と内在音高螺旋の関係",
    authors: "八木颯斗, 高道慎之介, 佐藤りん, 田中啓太郎, 森島繁生",
    venue: "第145回音楽情報科学研究発表会",
    month: "March",
    year: 2026,
  },
  {
    category: "Domestic",
    authorRole: "First",
    title: "音色空間に基づく擬似ラベル事前学習による多楽器自動採譜の精度改善",
    authors: "佐藤りん, 田中啓太郎, 森島繁生",
    venue: "情報処理学会第88回全国大会",
    month: "March",
    year: 2026,
    award: "学生奨励賞",
  },
];
