"use client"


import React, { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { PerCourse } from "./PerCourse";
import { GlobalWorkerOptions } from "pdfjs-dist";


interface item {
  CourseWork: string;
  essay: string;
  subject: string;
  pdfFile: Uint8Array;
}








GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

interface Item {
  CourseWork: string;
  essay: string;
  subject: string;
  pdfFile: Uint8Array;
}

export default function MyCourseWork() {
  const [file, setFile] = useState<Item[]>([]);
  const [text, setText] = useState<string>("");
  const [num, setNum] = useState<number>(0);

  const fetchDataFromLocalStorage = () => {
    const data = localStorage.getItem("otherData");
    if (data) {
      const coursedataProcess = JSON.parse(data);
      const pdfData = new Uint8Array(
        atob(coursedataProcess.pdfFile)
          .split("")
          .map((char) => char.charCodeAt(0))
      );
      const coursedata = { ...coursedataProcess, pdfFile: pdfData };
      setFile([coursedata]);
    }
  };

  // Fetch data from local storage initially
  useEffect(() => {
    fetchDataFromLocalStorage();

    //for Custom event listener for data updates
    const handleDataUpdate = () => {
      fetchDataFromLocalStorage();
    };

    //for Listen for custom event
    window.addEventListener("dataUpdated", handleDataUpdate);

    return () => {
      window.removeEventListener("dataUpdated", handleDataUpdate);
    };
  }, []);

  //for Processing the PDF data whenever the file state changes
  useEffect(() => {
    if (file.length > 0) {
      const pdfData = file[0].pdfFile;
      extractTextFromPDF(pdfData).then(setText);
      getWordCountFromPDF(pdfData).then(setNum);
    }
  }, [file]);

  return (
    <div>
      {file.length > 0 && (
        <PerCourse item={file[0]} key={file[0].subject} num={num} />
      )}
    </div>
  );
}

export async function extractTextFromPDF(pdfArray: Uint8Array): Promise<string> {
  const pdfDocument = await pdfjsLib.getDocument({ data: pdfArray }).promise;
  let textContent = "";

  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const text = await page.getTextContent();
    text.items.forEach((item: any) => {
      textContent += item.str + " ";
    });
  }
  console.log(textContent);
  return textContent;
}

async function getWordCountFromPDF(pdfArray: Uint8Array): Promise<number> {
  try {
    const clonedPdfArray = pdfArray.slice(0);
    const textContent = await extractTextFromPDF(clonedPdfArray);
    const wordCount = textContent
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    return wordCount;
  } catch (error) {
    console.error("Error processing PDF:", error);
    throw error;
  }
}

// To trigger the update manually after new data is added
export const updateLocalStorage = (newData: any) => {
  localStorage.setItem("otherData", JSON.stringify(newData));

  // Dispatch a custom event to notify the component
  const event = new Event("dataUpdated");
  window.dispatchEvent(event);
};
