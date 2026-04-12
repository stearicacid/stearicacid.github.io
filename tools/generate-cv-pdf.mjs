import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const outputPath = resolve("public", "Rin_Sato_CV.pdf");
mkdirSync(dirname(outputPath), { recursive: true });

const pageWidth = 595;
const pageHeight = 842;
const marginLeft = 52;
const marginRight = 52;
const marginTop = 790;
const marginBottom = 56;
const contentWidth = pageWidth - marginLeft - marginRight;
const sectionGapBefore = 16;
const sectionGapAfter = 14;

const pages = [[]];
const pageAnnotations = [[]];
let currentPage = 0;
let currentY = marginTop;
let hasSectionStarted = false;

function startNewPage() {
  pages.push([]);
  pageAnnotations.push([]);
  currentPage += 1;
  currentY = marginTop;
}

function ensureSpace(heightNeeded) {
  if (currentY - heightNeeded < marginBottom) {
    startNewPage();
  }
}

function escapePdfText(text) {
  return text.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function textWidthEstimate(text, fontSize) {
  return text.length * fontSize * 0.52;
}

function wrapText(text, fontSize, maxWidth) {
  const words = text.trim().split(/\s+/);
  if (words.length === 0 || !text.trim()) {
    return [""];
  }

  const wrapped = [];
  let line = words[0];
  for (let i = 1; i < words.length; i += 1) {
    const candidate = `${line} ${words[i]}`;
    if (textWidthEstimate(candidate, fontSize) <= maxWidth) {
      line = candidate;
    } else {
      wrapped.push(line);
      line = words[i];
    }
  }
  wrapped.push(line);
  return wrapped;
}

function pushTextLine(text, x, y, size, bold, color) {
  const font = bold ? "F2" : "F1";
  const [r, g, b] = color;
  pages[currentPage].push(
    `BT /${font} ${size} Tf ${r} ${g} ${b} rg 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdfText(text)}) Tj ET`
  );
}

function addParagraph(text, options = {}) {
  const {
    size = 11,
    bold = false,
    x = marginLeft,
    lineHeight = size * 1.45,
    after = 7,
    color = [0, 0, 0],
  } = options;

  const maxWidth = contentWidth - (x - marginLeft);
  const lines = wrapText(text, size, maxWidth);

  for (const line of lines) {
    ensureSpace(lineHeight);
    pushTextLine(line, x, currentY, size, bold, color);
    currentY -= lineHeight;
  }
  currentY -= after;
}

function addSectionTitle(title) {
  if (hasSectionStarted) {
    ensureSpace(sectionGapBefore);
    currentY -= sectionGapBefore;
  }

  ensureSpace(26);
  addParagraph(title, {
    size: 14,
    bold: true,
    after: 4,
    color: [0.13, 0.18, 0.3],
  });

  ensureSpace(8);
  const lineY = currentY + 5;
  pages[currentPage].push(`0.8 w 0.82 0.85 0.9 RG ${marginLeft} ${lineY.toFixed(2)} m ${pageWidth - marginRight} ${lineY.toFixed(2)} l S`);
  currentY -= sectionGapAfter;
  hasSectionStarted = true;
}

function addBullet(text, options = {}) {
  const { size = 11, indent = 16, after = 7 } = options;
  const bulletPrefix = "- ";
  const x = marginLeft + indent;
  const firstLineWidth = contentWidth - indent;
  const continuationWidth = contentWidth - indent - 12;

  const firstWrap = wrapText(`${bulletPrefix}${text}`, size, firstLineWidth);
  for (let i = 0; i < firstWrap.length; i += 1) {
    const line = i === 0 ? firstWrap[i] : wrapText(firstWrap[i], size, continuationWidth)[0];
    ensureSpace(size * 1.55);
    pushTextLine(line, x, currentY, size, false, [0, 0, 0]);
    currentY -= size * 1.55;
  }
  currentY -= after;
}

function addLinkedBullet(text, linkText, url, options = {}) {
  const { size = 11, indent = 16, after = 7 } = options;
  const bulletPrefix = "- ";
  const x = marginLeft + indent;
  const firstLineWidth = contentWidth - indent;

  const firstWrap = wrapText(`${bulletPrefix}${text}`, size, firstLineWidth);
  for (let i = 0; i < firstWrap.length; i += 1) {
    const line = firstWrap[i];
    const pageBefore = currentPage;
    ensureSpace(size * 1.55);
    pushTextLine(line, x, currentY, size, false, [0, 0, 0]);

    if (i === 0) {
      const linkStartIndex = line.indexOf(linkText);
      if (linkStartIndex >= 0) {
        const linkX = x + textWidthEstimate(line.slice(0, linkStartIndex), size);
        const linkWidth = textWidthEstimate(linkText, size);
        const linkRect = {
          x1: linkX,
          y1: currentY - size * 0.25,
          x2: linkX + linkWidth,
          y2: currentY + size * 0.95,
          url,
        };
        pageAnnotations[pageBefore].push(linkRect);
      }
    }

    currentY -= size * 1.55;
  }
  currentY -= after;
}

function addCompactItem(title, detailLines) {
  addParagraph(title, { size: 11.5, bold: true, after: 4, color: [0.08, 0.08, 0.1] });
  for (const line of detailLines) {
    addParagraph(line, { size: 10.8, x: marginLeft + 14, after: 3, color: [0.12, 0.12, 0.12] });
  }
  currentY -= 10;
}

addParagraph("Rin Sato", { size: 26, bold: true, after: 14, color: [0.08, 0.1, 0.15] });

pages[currentPage].push(`1 w 0.25 0.29 0.38 RG ${marginLeft} ${(currentY + 4).toFixed(2)} m ${pageWidth - marginRight} ${(currentY + 4).toFixed(2)} l S`);
currentY -= 20;

addSectionTitle("About");
addParagraph(
  "Graduate student in music information retrieval and audio machine learning, with a focus on automatic music transcription and representation learning.",
  { size: 11, after: 4 }
);
addBullet("Research interests: Automatic Music Transcription, audio generative models, and Music Information Retrieval.");

addSectionTitle("General Information");
addBullet("Location: Tokyo, Japan");
addBullet("Email: rin_sato@akane.waseda.jp");
addLinkedBullet("Web: stearicacid.github.io", "stearicacid.github.io", "https://stearicacid.github.io/");
addBullet("Language: Japanese (native) and English (CEFR level: B2)");

addSectionTitle("Education");
addCompactItem("Master of Engineering, Waseda University (2026.4 - current)", [
  "Graduate School of Advanced Science and Engineering",
  "Advisor: Prof. Shigeo Morishima",
]);
addCompactItem("Bachelor of Engineering, Waseda University (2022.4 - 2026.3)", [
  "Department of Applied Physics",
  "Advisor: Prof. Shigeo Morishima",
]);
addCompactItem("United World College Red Cross Nordic (2019.7 - 2021.5)", [
  "International Baccalaureate Diploma",
]);
addCompactItem("Shonan High School (2018.4 - 2022.3)", []);

addSectionTitle("Awards");
addBullet("Student Encouragement Award, IPSJ 88th National Convention, Mar 8, 2026.");
addBullet("Student Encouragement Award, 145th Music Information Science Research Meeting (Best New Direction), Mar 2, 2026.");

addSectionTitle("Publications");
addBullet("Sato, R., Tanaka, K., Morishima, S. Timbre-Based Pretraining with Pseudo-Labels for Multi-Instrument Automatic Music Transcription. ICASSP 2026.");
addBullet("Sato, R., Tanaka, K., Yagi, H., Takamichi, S., Morishima, S. A study on analysis methods for representation formation in music foundation models. 145th Music Information Science Research Meeting, 2026 (domestic, first author).");
addBullet("Sato, R., Tanaka, K., Morishima, S. Improving Multi-Instrument Automatic Music Transcription via Pseudo-Label Pretraining in a Learned Timbre Latent Space. IPSJ 88th National Convention, 2026 (domestic, first author).");
addBullet("Yagi, H., Takamichi, S., Sato, R., Tanaka, K., Morishima, S. Relationship between acoustic features and latent pitch spiral in music foundation models. 145th Music Information Science Research Meeting, 2026 (domestic, co-author).");

addSectionTitle("Working Experience");
addCompactItem("Software Engineer, Metadata Incorporated (2025.8 - current)", [
  "Developed a new ChatBrid feature where an LLM evaluates responses generated through RAG pipelines.",
  "Validated fine-tuning approaches for domain-specialized LLMs and conducted prompt engineering for production use.",
  "Performed RAG quality verification and implemented features with React, Ruby on Rails, Elasticsearch, Kubernetes, and Docker.",
]);
addCompactItem("Software and Hardware Engineer, Enecloud Incorporated (2025.1 - 2025.8)", [
  "Developed CRM frontend features using React and TypeScript.",
  "Contributed to hardware development for electric-power measurement products.",
]);
addCompactItem("Teaching Assistant, Research Seminar on Applied Physics, Waseda University (2026.4 - current)", [
  "Supported undergraduate students through research processes across three semesters.",
  "Mentored two students in image-generation model development and evaluation.",
  "Led students in presenting their research outcomes to faculty members.",
]);

addSectionTitle("Competences");
addBullet("Machine Learning: automatic music transcription, music information retrieval, representation learning, and experiment design.");
addBullet("LLM Engineering: RAG evaluation, prompt engineering, and fine-tuning validation for domain-specific applications.");
addBullet("Software Development: React, TypeScript, Ruby on Rails, Elasticsearch, Kubernetes, Docker, and Git.");


addParagraph("Last updated date: April 12, 2026", { size: 11, after: 0 });

const contentStreams = pages.map((ops) => `${ops.join("\n")}\n`);

const objects = [];
const pageCount = pages.length;
const firstPageObjectId = 3;
const firstContentObjectId = firstPageObjectId + pageCount;
const fontRegularObjectId = firstContentObjectId + pageCount;
const fontBoldObjectId = fontRegularObjectId + 1;
const firstAnnotationObjectId = fontBoldObjectId + 1;

objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";

const pageRefs = [];
for (let i = 0; i < pageCount; i += 1) {
  pageRefs.push(`${firstPageObjectId + i} 0 R`);
}
objects[2] = `<< /Type /Pages /Count ${pageCount} /Kids [${pageRefs.join(" ")}] >>`;

const annotationObjectIdsByPage = pageAnnotations.map(() => []);
let annotationObjectId = firstAnnotationObjectId;
for (let i = 0; i < pageCount; i += 1) {
  for (const annotation of pageAnnotations[i]) {
    const currentAnnotationId = annotationObjectId;
    annotationObjectIdsByPage[i].push(currentAnnotationId);
    objects[currentAnnotationId] = `<< /Type /Annot /Subtype /Link /Rect [${annotation.x1.toFixed(2)} ${annotation.y1.toFixed(2)} ${annotation.x2.toFixed(2)} ${annotation.y2.toFixed(2)}] /Border [0 0 0] /A << /S /URI /URI (${escapePdfText(annotation.url)}) >> >>`;
    annotationObjectId += 1;
  }
}

for (let i = 0; i < pageCount; i += 1) {
  const pageObjectId = firstPageObjectId + i;
  const contentObjectId = firstContentObjectId + i;
  const annotations = annotationObjectIdsByPage[i];
  const annotsField = annotations.length > 0 ? ` /Annots [${annotations.map((id) => `${id} 0 R`).join(" ")}]` : "";
  objects[pageObjectId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontRegularObjectId} 0 R /F2 ${fontBoldObjectId} 0 R >> >> /Contents ${contentObjectId} 0 R${annotsField} >>`;
  const stream = contentStreams[i];
  objects[contentObjectId] = `<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}endstream`;
}

objects[fontRegularObjectId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
objects[fontBoldObjectId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

let pdf = "%PDF-1.4\n";
const offsets = [0];
for (let i = 1; i < objects.length; i += 1) {
  offsets[i] = Buffer.byteLength(pdf, "utf8");
  pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
}

const xrefOffset = Buffer.byteLength(pdf, "utf8");
pdf += `xref\n0 ${objects.length}\n`;
pdf += "0000000000 65535 f \n";
for (let i = 1; i < objects.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

writeFileSync(outputPath, pdf, "utf8");
console.log(`Generated ${outputPath}`);
