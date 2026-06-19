function normalizeText(text = "") {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .toUpperCase();
}

function toNumber(value) {
  if (value == null) return null;

  const normalized = String(value)
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");

  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function findDate(text) {
  const match = text.match(/COLETADO EM:\s*(\d{2}\/\d{2}\/\d{4})/i);

  if (!match) {
    return new Date().toISOString().slice(0, 10);
  }

  const [day, month, year] = match[1].split("/");
  return `${year}-${month}-${day}`;
}

function cleanMarkers(markers) {
  return Object.fromEntries(
    Object.entries(markers).filter(([, value]) => value !== null && value !== undefined)
  );
}

function getBlocks(text) {
  return text
    .split("ESPACO ENTRE OS MEMOS")
    .map(block => block.trim())
    .filter(Boolean);
}

function getFirstResult(block, unitPattern) {
  const regex = new RegExp(
    `COLETADO EM:[\\s\\S]{0,180}?([0-9]+(?:[\\.,][0-9]+)?)\\s*${unitPattern}`,
    "i"
  );

  const match = block.match(regex);
  return match ? toNumber(match[1]) : null;
}

function findBlockValue(text, matcher, unitPattern) {
  const blocks = getBlocks(text);

  for (const block of blocks) {
    if (!matcher(block)) continue;

    const value = getFirstResult(block, unitPattern);
    if (value !== null) return value;
  }

  return null;
}

function extractHemogram(text) {
  const hemoglobin = text.match(
    /([0-9]+(?:[,.][0-9]+)?)\s*G\/DL\s+HEMOGLOBINA/i
  );

  const hematocrit =
    text.match(/HEMATOCRITO\s+([0-9]+(?:[,.][0-9]+)?)\s*%/i) ||
    text.match(/([0-9]+(?:[,.][0-9]+)?)\s*%\s+37[,.]0\s*-\s*52[,.]4\s*%/i);

  const erythrocytes = text.match(
    /ERITROGRAMA[\s\S]{0,120}?([0-9]+(?:[,.][0-9]+)?)\s*MILHOES\/MM/i
  );

  const leukocytes = text.match(
    /LEUCOGRAMA[\s\S]{0,120}?([0-9]+(?:[,.][0-9]+)?)\s*MIL\/MM/i
  );

  const platelets = text.match(
    /([0-9]+(?:[,.][0-9]+)?)\s*MIL\/MM[³3]\s+162\s*-\s*425/i
  );

  return {
    hemoglobin: hemoglobin ? toNumber(hemoglobin[1]) : null,
    hematocrit: hematocrit ? toNumber(hematocrit[1]) : null,
    erythrocytes: erythrocytes ? toNumber(erythrocytes[1]) : null,
    leukocytes: leukocytes ? toNumber(leukocytes[1]) : null,
    platelets: platelets ? toNumber(platelets[1]) : null,
  };
}

function getRiskAndAlerts(markers) {
  const alerts = [];
  let riskLevel = "normal";

  const attention = (message) => {
    if (riskLevel === "normal") riskLevel = "attention";
    alerts.push(message);
  };

  const high = (message) => {
    riskLevel = "high";
    alerts.push(message);
  };

  if (markers.hdl < 30) high("HDL muito baixo");
  else if (markers.hdl < 40) attention("HDL abaixo do ideal");

  if (markers.ldl >= 190) high("LDL muito elevado");
  else if (markers.ldl >= 130) attention("LDL acima do ideal");

  if (markers.nonHdl >= 160) high("Colesterol não-HDL elevado");
  else if (markers.nonHdl >= 130) attention("Colesterol não-HDL acima do ideal");

  if (markers.triglycerides >= 200) high("Triglicerídeos elevados");
  else if (markers.triglycerides >= 150) attention("Triglicerídeos acima do ideal");

  if (markers.creatinine >= 1.6) high("Creatinina elevada");
  else if (markers.creatinine > 1.3) attention("Creatinina acima do ideal");

  if (markers.glucose >= 126) high("Glicose em faixa de risco");
  else if (markers.glucose >= 100) attention("Glicose acima do ideal");

  if (markers.hba1c >= 6.5) high("Hemoglobina glicada em faixa de risco");
  else if (markers.hba1c >= 5.7) attention("Hemoglobina glicada acima do ideal");

  if (markers.hematocrit >= 55) high("Hematócrito elevado");
  else if (markers.hematocrit > 52.4) attention("Hematócrito acima do ideal");

  if (markers.hemoglobin >= 18.5) high("Hemoglobina elevada");
  else if (markers.hemoglobin > 17.8) attention("Hemoglobina acima do ideal");

  return { riskLevel, alerts };
}

export function parseExamPdfText(rawText = "") {
  const text = normalizeText(rawText);
  const hemogramMarkers = extractHemogram(text);

  const markers = cleanMarkers({
    creatinine: findBlockValue(
      text,
      block =>
        block.includes("HOMENS : 0,72 A 1,25 MG/DL") ||
        block.includes("HOMENS : 0.72 A 1.25 MG/DL"),
      "(?:MG/DL)"
    ),

    iron: findBlockValue(
      text,
      block =>
        block.includes("HOMENS: 65 A 175 UG/DL") ||
        block.includes("MULHERES: 50 A 170 UG/DL"),
      "(?:UG/DL|µG/DL)"
    ),

    ferritin: findBlockValue(
      text,
      block =>
        block.includes("HOMENS: 21,81 - 274,66 NG/ML") ||
        block.includes("HOMENS: 21.81 - 274.66 NG/ML"),
      "(?:NG/ML)"
    ),

    glucose: findBlockValue(
      text,
      block => block.includes("ENZIMATICO - HEXOQUINASE"),
      "(?:MG/DL)"
    ),

    hdl: findBlockValue(
      text,
      block =>
        block.includes("MAIOR DE 20 ANOS, COM OU SEM JEJUM: >") &&
        block.includes("40 MG/DL"),
      "(?:MG/DL)"
    ),

    nonHdl: findBlockValue(
      text,
      block =>
        block.includes("OTIMO: INFERIOR A 130 MG/DL") &&
        block.includes("MUITO ALTO: MAIOR OU IGUAL A 190 MG/DL"),
      "(?:MG/DL)"
    ),

    vldl: findBlockValue(
      text,
      block => block.includes("FORMULA DE MARTIN"),
      "(?:MG/DL)"
    ),

    ldl: findBlockValue(
      text,
      block => block.includes("CALCULO DE MARTIN/HOPKINS"),
      "(?:MG/DL)"
    ),

    triglycerides: findBlockValue(
      text,
      block => block.includes("DESEJAVEL: ABAIXO DE 150 MG/DL"),
      "(?:MG/DL)"
    ),

    vitaminB12: findBlockValue(
      text,
      block => block.includes("187-883 PG/ML"),
      "(?:PG/ML)"
    ),

    vitaminD: findBlockValue(
      text,
      block =>
        block.includes("IDEAL: 30 A 60 NG/ML") ||
        block.includes("RISCO DE INTOXICACAO"),
      "(?:NG/ML)"
    ),

    hba1c: findBlockValue(
      text,
      block => block.includes("GLICOSE MEDIA ESTIMADA") && block.includes("HPLC"),
      "(?:%)"
    ),

    ...hemogramMarkers,
  });

  const { riskLevel, alerts } = getRiskAndAlerts(markers);

  return {
    examDate: findDate(text),
    markers,
    riskLevel,
    alerts,
  };
}