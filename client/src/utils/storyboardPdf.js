import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const COLORS = {
  primary: "#6D28D9",
  secondary: "#7C3AED",
  lightPurple: "#F3E8FF",
  border: "#E9D5FF",
  text: "#1F2937",
  muted: "#6B7280",
  success: "#16A34A",
  warning: "#D97706",
  white: "#FFFFFF",
  light: "#F9FAFB"
};

const PAGE = {
  width: 210,
  height: 297,
  margin: 15
};

const CARD = {
  radius: 3,
  padding: 4
};

const formatText = (value = "") => {
  if (!value) return "-";
  return String(value).trim();
};

const safeArray = (value) => {
  if (Array.isArray(value)) return value;
  return [];
};

const scoreColor = (score) => {
  if (score >= 90) return "#16A34A";
  if (score >= 75) return "#2563EB";
  if (score >= 60) return "#D97706";
  return "#DC2626";
};

const currentTimestamp = () => {
  return new Date().toLocaleString();
};

const loadImage = (url) =>
  new Promise((resolve) => {
    if (!url) {
      resolve(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      try {
        resolve(canvas.toDataURL("image/jpeg", 0.95));
      } catch {
        resolve(null);
      }
    };

    img.onerror = () => resolve(null);

    img.src = url;
  });

const drawRoundedCard = (
  doc,
  x,
  y,
  width,
  height,
  fill = COLORS.white
) => {
  doc.setFillColor(fill);
  doc.setDrawColor(COLORS.border);
  doc.roundedRect(
    x,
    y,
    width,
    height,
    CARD.radius,
    CARD.radius,
    "FD"
  );
};

const drawHeader = (doc) => {
  doc.setFillColor(COLORS.primary);
  doc.rect(
    0,
    0,
    PAGE.width,
    26,
    "F"
  );

  doc.setTextColor(COLORS.white);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(
    "VISIORA",
    PAGE.margin,
    12
  );

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(
    "AI Storyboard Report",
    PAGE.margin,
    19
  );

  doc.setTextColor(COLORS.text);
};

const drawSectionTitle = (
  doc,
  title,
  y
) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(COLORS.primary);

  doc.text(
    title,
    PAGE.margin,
    y
  );

  doc.setTextColor(COLORS.text);
};

const drawStorySummary = (
  doc,
  summary,
  y
) => {
  drawSectionTitle(
    doc,
    "Story Summary",
    y
  );

  const boxY = y + 4;

  drawRoundedCard(
    doc,
    PAGE.margin,
    boxY,
    PAGE.width - PAGE.margin * 2,
    28,
    COLORS.light
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(COLORS.text);

  const lines = doc.splitTextToSize(
    formatText(summary),
    PAGE.width - PAGE.margin * 2 - 8
  );

  doc.text(
    lines,
    PAGE.margin + 4,
    boxY + 7
  );

  return boxY + 34;
};

const drawMetricCards = (
  doc,
  metrics,
  y
) => {
  drawSectionTitle(
    doc,
    "Story Intelligence",
    y
  );

  const startY = y + 6;

  const gap = 4;
  const cardWidth =
    (PAGE.width -
      PAGE.margin * 2 -
      gap * 3) /
    4;

  const cards = [
    {
      label: "Story Score",
      value: metrics.storyScore
    },
    {
      label: "Enhanced",
      value: metrics.enhancedScore
    },
    {
      label: "Improvement",
      value: `${metrics.improvement}%`
    },
    {
      label: "Confidence",
      value: `${metrics.confidence}%`
    }
  ];

  cards.forEach((card, index) => {
    const x =
      PAGE.margin +
      index * (cardWidth + gap);

    drawRoundedCard(
      doc,
      x,
      startY,
      cardWidth,
      24,
      COLORS.white
    );

    doc.setFontSize(8);
    doc.setTextColor(COLORS.muted);

    doc.text(
      card.label,
      x + 3,
      startY + 7
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(14);

    doc.setTextColor(
      scoreColor(
        Number(
          String(card.value)
            .replace("%", "")
        )
      )
    );

    doc.text(
      String(card.value),
      x + 3,
      startY + 17
    );
  });

  doc.setTextColor(COLORS.text);

  return startY + 30;
};
const drawMetricTable = (
  doc,
  storyAnalysis,
  y
) => {
  autoTable(doc, {
    startY: y,

    head: [[
      "Genre",
      "Narrative",
      "Emotion",
      "Consistency"
    ]],

    body: [[
      formatText(storyAnalysis?.genre),
      formatText(storyAnalysis?.narrativeComplexity),
      formatText(storyAnalysis?.emotionalImpact),
      formatText(storyAnalysis?.visualConsistency)
    ]],

    theme: "grid",

    styles: {
      fontSize: 9,
      cellPadding: 3,
      lineColor: COLORS.border,
      lineWidth: 0.2,
      textColor: COLORS.text
    },

    headStyles: {
      fillColor: COLORS.primary,
      textColor: COLORS.white,
      halign: "center",
      fontStyle: "bold"
    },

    bodyStyles: {
      halign: "center",
      fillColor: COLORS.white
    },

    margin: {
      left: PAGE.margin,
      right: PAGE.margin
    }
  });

  return doc.lastAutoTable.finalY + 8;
};

const drawBulletList = (
  doc,
  title,
  items,
  y,
  accentColor = COLORS.success
) => {

  drawSectionTitle(
    doc,
    title,
    y
  );

  const list = safeArray(items);

  const boxY = y + 4;

  const lineHeight = 6;

  const height =
    Math.max(
      24,
      list.length * lineHeight + 8
    );

  drawRoundedCard(
    doc,
    PAGE.margin,
    boxY,
    PAGE.width - PAGE.margin * 2,
    height,
    COLORS.white
  );

  let currentY = boxY + 7;

  if (!list.length) {

    doc.setFontSize(9);

    doc.setTextColor(COLORS.muted);

    doc.text(
      "-",
      PAGE.margin + 5,
      currentY
    );

    return boxY + height + 6;
  }

  list.forEach((item) => {

    doc.setFillColor(accentColor);

    doc.circle(
      PAGE.margin + 5,
      currentY - 1,
      0.8,
      "F"
    );

    doc.setFontSize(9);

    doc.setTextColor(COLORS.text);

    const wrapped = doc.splitTextToSize(
      formatText(item),
      PAGE.width - 38
    );

    doc.text(
      wrapped,
      PAGE.margin + 8,
      currentY
    );

    currentY += wrapped.length * 5 + 2;
  });

  return Math.max(
    currentY + 2,
    boxY + height + 6
  );
};

const drawStrengths = (
  doc,
  storyAnalysis,
  y
) => {

  return drawBulletList(
    doc,
    "Story Strengths",
    storyAnalysis?.strengths,
    y,
    COLORS.success
  );

};

const drawWeaknesses = (
  doc,
  storyAnalysis,
  y
) => {

  return drawBulletList(
    doc,
    "Areas To Improve",
    storyAnalysis?.weaknesses,
    y,
    COLORS.warning
  );

};

const drawSceneImage = async (
  doc,
  imageUrl,
  x,
  y,
  width,
  height
) => {

  const image = await loadImage(imageUrl);

  if (image) {

    doc.addImage(
      image,
      "JPEG",
      x,
      y,
      width,
      height
    );

    return;
  }

  doc.setFillColor(245,245,245);

  doc.rect(
    x,
    y,
    width,
    height,
    "F"
  );

  doc.setDrawColor(220);

  doc.rect(
    x,
    y,
    width,
    height
  );

  doc.setTextColor(COLORS.muted);

  doc.setFontSize(10);

  doc.text(
    "Image unavailable",
    x + 8,
    y + height / 2
  );

  doc.setTextColor(COLORS.text);
};
const drawSceneCard = async (
  doc,
  scene,
  index,
  y
) => {

  drawSectionTitle(
    doc,
    `Scene ${index + 1}`,
    y
  );

  const top = y + 4;

  const cardHeight = 78;

  drawRoundedCard(
    doc,
    PAGE.margin,
    top,
    PAGE.width - PAGE.margin * 2,
    cardHeight,
    COLORS.white
  );

  await drawSceneImage(
    doc,
    scene?.imageUrl,
    PAGE.margin + 4,
    top + 4,
    52,
    52
  );

  const textX = PAGE.margin + 60;

  let textY = top + 8;

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(11);

  doc.setTextColor(COLORS.primary);

  doc.text(
    formatText(scene?.title),
    textX,
    textY
  );

  textY += 6;

  const fields = [
    {
      label: "Visual",
      value: scene?.visual
    },
    {
      label: "Mood",
      value: scene?.mood
    },
    {
      label: "Camera",
      value: scene?.camera
    },
    {
      label: "Lighting",
      value: scene?.lighting
    }
  ];

  fields.forEach((field) => {

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(8);

    doc.setTextColor(COLORS.text);

    doc.text(
      `${field.label}:`,
      textX,
      textY
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    const wrapped = doc.splitTextToSize(
      formatText(field.value),
      115
    );

    doc.text(
      wrapped,
      textX + 18,
      textY
    );

    textY += wrapped.length * 4 + 2;

  });

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "AI Prompt:",
    textX,
    textY
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  const prompt = doc.splitTextToSize(
    formatText(scene?.imagePrompt),
    118
  );

  doc.text(
    prompt,
    textX,
    textY + 5
  );

  return top + cardHeight + 8;

};

const drawFooter = (
  doc,
  pageNumber,
  totalPages
) => {

  const footerY = PAGE.height - 10;

  doc.setDrawColor(
    COLORS.border
  );

  doc.line(
    PAGE.margin,
    footerY - 4,
    PAGE.width - PAGE.margin,
    footerY - 4
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(8);

  doc.setTextColor(
    COLORS.muted
  );

  doc.text(
    "Generated by Visiora AI",
    PAGE.margin,
    footerY
  );

  doc.text(
    currentTimestamp(),
    PAGE.width / 2,
    footerY,
    {
      align: "center"
    }
  );

  doc.text(
    `Page ${pageNumber} of ${totalPages}`,
    PAGE.width - PAGE.margin,
    footerY,
    {
      align: "right"
    }
  );

  doc.setTextColor(
    COLORS.text
  );

};

const generateStoryboardPDF = async ({
  story,
  enhancedStory,
  useEnhanced,
  storyboard,
  storyAnalysis
}) => {

  const doc = new jsPDF({
    unit: "mm",
    format: "a4"
  });

  const finalStory =
    useEnhanced
      ? enhancedStory
      : story;

  const storyScore =
    storyAnalysis?.storyScore ??
    storyAnalysis?.originalScore ??
    0;

  const enhancedScore =
    storyAnalysis?.enhancedStoryScore ??
    storyAnalysis?.enhancedScore ??
    storyScore;

  const confidence =
    storyAnalysis?.confidence ??
    0;

  const improvement =
    Math.max(
      0,
      enhancedScore - storyScore
    );

  drawHeader(doc);

  let y = 34;

  y = drawStorySummary(
    doc,
    finalStory,
    y
  );

  y = drawMetricCards(
    doc,
    {
      storyScore,
      enhancedScore,
      improvement,
      confidence
    },
    y
  );

  y = drawMetricTable(
    doc,
    storyAnalysis,
    y
  );

  y = drawStrengths(
    doc,
    storyAnalysis,
    y
  );

  y = drawWeaknesses(
    doc,
    storyAnalysis,
    y
  );

  const scenes =
    safeArray(storyboard);

  for (
    let i = 0;
    i < Math.min(3, scenes.length);
    i++
  ) {

    y = await drawSceneCard(
      doc,
      scenes[i],
      i,
      y
    );

  }  drawFooter(
    doc,
    1,
    2
  );

  if (scenes.length > 3) {
    doc.addPage();

    drawHeader(doc);

    let secondPageY = 34;

    for (
      let i = 3;
      i < Math.min(6, scenes.length);
      i++
    ) {

      secondPageY =
        await drawSceneCard(
          doc,
          scenes[i],
          i,
          secondPageY
        );

    }

    drawFooter(
      doc,
      2,
      2
    );
  }

  doc.save("Visiora_Storyboard_Report.pdf");

};

export default generateStoryboardPDF;