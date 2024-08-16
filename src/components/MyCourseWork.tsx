"use client"
import { GlobalWorkerOptions } from 'pdfjs-dist';

import React, { useEffect, useState } from 'react'
import * as pdfjsLib from "pdfjs-dist";
import { PerCourse } from './PerCourse';
// Set the workerSrc to the path of the PDF.js worker file
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`



interface item {
  CourseWork: string;
  essay: string;
  subject: string;
  pdfFile: Uint8Array;
}
export default  function MyCourseWork() {
const [file, setfile] = useState<item[]>([]);
const [text,setText]=useState<string>("")
const [num,setNum]=useState<number>(0)
console.log(text);
console.log(file)
    useEffect(() => {
      const data = localStorage.getItem("otherData");
      if (data) {
        const coursedataProcess = JSON.parse(data);
        const pdfData = new Uint8Array(
          atob(coursedataProcess.pdfFile)
            .split("")
            .map((char) => char.charCodeAt(0))
        );
        // console.log(authUserData,pdfData);
        const coursedata = { ...coursedataProcess, pdfFile: pdfData };
        const words =  extractTextFromPDF(pdfData).then((item) => setText(item));
        const number = getWordCountFromPDF(pdfData).then((item) =>
          setNum(item)
        );
  
        setfile([coursedata]);
      }
    }, [file]);

  return (
    <div>{file.map((item)=><PerCourse item={item} key={item.subject}  num={num} />)}</div>
  )
}





async function extractTextFromPDF(pdfArray: Uint8Array): Promise<string> {
  const pdfDocument = await pdfjsLib.getDocument({ data: pdfArray }).promise;
  let textContent = "";

  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const text = await page.getTextContent();
    text.items.forEach((item: any) => {
      textContent += item.str + " ";
    });
  }
console.log(textContent)
  return textContent;
}



async function getWordCountFromPDF(pdfArray: Uint8Array): Promise<number> {
  try {
    // Clone the Uint8Array to avoid any detachment issues
    const clonedPdfArray = pdfArray.slice(0);

    // Extract text from the cloned array
    const textContent = await extractTextFromPDF(clonedPdfArray);

    // Count the words
    const wordCount = textContent
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    // console.log(wordCount);
    return wordCount;
  } catch (error) {
    console.error("Error processing PDF:", error);
    throw error;
  }
}