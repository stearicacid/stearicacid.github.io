// src/data.ts
export const profile = {
  name: "Rin Sato",
  title: "Undergraduate Student",
  affiliation: "Waseda University, Morishima Lab",
  email: "rin_sato(at)akane.waseda.jp",
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
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: string;
  links?: { label: string; url: string }[];
};

export const publications: Publication[] = [
  {
    title: "Timbre-Based Pretraining with Pseudo-Labels for Multi-Instrument Automatic Music Transcription",
    authors: "Rin Sato, Keitaro Tanaka, Shigeo Morishima",
    venue: "ICASSP",
    year: 2026,
    type: "International",
    links: [
      { label: "Code", url: "https://github.com/stearicacid/timbre-based-pretraining" },
    ],
  },
  {
    title: "音楽基盤モデルの表現形成における学習過程の解析手法の検討",
    authors: "佐藤りん, 田中啓太郎, 八木颯斗, 高道慎之介, 森島繁生",
    venue: "第145回MUS研究発表会",
    year: 2026,
    type: "Domestic",
  },
  {
    title: "音楽基盤モデルにおける音響特徴と内在音高螺旋の関係",
    authors: "八木颯斗, 高道慎之介, 佐藤りん, 田中啓太郎, 森島繁生",
    venue: "第145回MUS研究発表会",
    year: 2026,
    type: "Domestic",
  },
  {
    title: "音色空間に基づく擬似ラベル事前学習による多楽器自動採譜の精度改善",
    authors: "佐藤りん, 田中啓太郎, 森島繁生",
    venue: "情報処理学会第88回全国大会",
    year: 2026,
    type: "Domestic",
  },
];
