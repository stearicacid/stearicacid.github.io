// src/data.ts
export const profile = {
  name: "Rin Sato",
  title: "Underraduate Student",
  affiliation: "Waseda University, Morishima Lab",
  email: "your.name@example.com",
  interests: [
    "Automatic Music Transcription (multi-instrument)",
    "Audio generative models (VAE, diffusion, transformers)",
    "Timbre representation and latent space analysis",
    "Domain-specific LLMs",
  ],
  links: [
    { label: "GitHub", url: "https://github.com/yourname" },
    { label: "Google Scholar", url: "https://scholar.google.com/..." },
    { label: "X (Twitter)", url: "https://x.com/..." },
  ],
};

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  links?: { label: string; url: string }[];
};

export const publications: Publication[] = [
  {
    title: "Timbre-based Pseudo-label Pretraining for Multi-instrument AMT",
    authors: "R. Sato, et al.",
    venue: "ICASSP",
    year: 2026,
    links: [
      { label: "PDF", url: "#" },
      { label: "Code", url: "#" },
    ],
  },
];
