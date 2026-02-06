// src/data.ts
export const profile = {
  name: "Rin Sato",
  title: "Underraduate Student",
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
];
