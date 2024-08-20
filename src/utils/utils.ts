"use client"

import * as pdfjsLib from "pdfjs-dist";
import { pdfjs } from "react-pdf";
import { GlobalWorkerOptions } from "pdfjs-dist";
// pdfjs.GlobalWorkerOptions.workerSrc = `https:/cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc="https://unpkg.com/pdfjs-dist@2.16/legacy/build/pdf.worker.min.mjs"

// Function to convert Base64 string to Uint8Array

export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}
export function getCurrentDateString() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11, so add 1 for the correct month
  const year = today.getFullYear();

  return `${day} ${month} ${year}`;
}

// Example usage:
const currentDate = getCurrentDateString();
console.log(currentDate); // "19/08/2024"
export async function extractTextFromPDF(pdfArray: Uint8Array): Promise<string> {
  const pdfDocument = await pdfjsLib.getDocument({ data: pdfArray }).promise;
  let textContent = "";

  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const text = await page.getTextContent();
    text.items.forEach((item: any) => {
      textContent += item.str + " ";
    });
    const exreactedScores = extractScoresFromText(textContent);
    console.log(exreactedScores);
    localStorage.setItem("userScores", JSON.stringify(exreactedScores));
  }

  return textContent;
}




interface ScoreDetails {
  overallScore: number | null;
  criteriaA: number | null;
  criteriaB: number | null;
  criteriaC: number | null;
}
export function extractScoresFromText(text: string): ScoreDetails {
  const overallScoreMatch = text.match(/Overall Score:\s*(\d+)/i);
  const criteriaAMatch = text.match(/CriteriaAScore:\s*(\d+\/\d+)/i);
  const criteriaBMatch = text.match(/CriteriaBScore:\s*(\d+\/\d+)/i);
  const criteriaCMatch = text.match(/CriteriaCScore:\s*(\d+\/\d+)/i);
  console.log(
    criteriaCMatch?.at(0),
    criteriaBMatch?.at(0),
    criteriaAMatch?.at(0),
    overallScoreMatch?.at(0)
  );
  return {
    overallScore: overallScoreMatch ? parseInt(overallScoreMatch[1], 10) : null,
    criteriaA: criteriaAMatch ? parseInt(criteriaAMatch[1], 10) : null,
    criteriaB: criteriaBMatch ? parseInt(criteriaBMatch[1], 10) : null,
    criteriaC: criteriaCMatch ? parseInt(criteriaCMatch[1], 10) : null,
  };
}
