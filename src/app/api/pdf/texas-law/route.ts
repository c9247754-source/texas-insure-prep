import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { getAccess } from "@/lib/access";
import { TEXAS_LAW_CHEAT_SHEET } from "@/data/texas-law-guide";

export async function GET() {
  const access = await getAccess();
  if (!access.pdf) {
    return NextResponse.json(
      { error: "Purchase the Texas Law cheat sheet to download the PDF." },
      { status: 403 },
    );
  }

  const sheet = TEXAS_LAW_CHEAT_SHEET;
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const margin = 50;
  const pageWidth = 612;
  const pageHeight = 792;
  const maxWidth = pageWidth - margin * 2;
  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  function ensureSpace(needed: number) {
    if (y - needed < margin) {
      page = pdf.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
  }

  function wrap(text: string, size: number, bold = false): string[] {
    const f = bold ? fontBold : font;
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (f.widthOfTextAtSize(test, size) > maxWidth) {
        if (line) lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  function drawLines(lines: string[], size: number, bold = false, gap = 3) {
    const f = bold ? fontBold : font;
    for (const line of lines) {
      ensureSpace(size + gap + 2);
      page.drawText(line, {
        x: margin,
        y: y - size,
        size,
        font: f,
        color: rgb(0.12, 0.16, 0.22),
      });
      y -= size + gap;
    }
  }

  drawLines(wrap("Texas Insure Prep", 10, true), 10, true, 4);
  y -= 4;
  drawLines(wrap(sheet.title, 16, true), 16, true, 6);
  y -= 6;
  drawLines(wrap(sheet.subtitle, 10), 10, false, 4);
  y -= 10;

  for (const section of sheet.sections) {
    ensureSpace(40);
    y -= 6;
    drawLines(wrap(section.heading, 12, true), 12, true, 5);
    y -= 4;
    for (const bullet of section.bullets) {
      const lines = wrap(`• ${bullet}`, 10);
      drawLines(lines, 10, false, 3);
      y -= 2;
    }
  }

  y -= 12;
  drawLines(
    wrap(
      "Educational only. Not affiliated with TDI or Pearson VUE. Confirm current rules on official sites.",
      8,
    ),
    8,
    false,
    2,
  );

  const bytes = await pdf.save();
  return new NextResponse(Buffer.from(bytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="texas-law-cheat-sheet.pdf"',
      "Cache-Control": "private, no-store",
    },
  });
}
