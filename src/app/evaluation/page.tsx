
"use client"
import React, { useEffect } from 'react'
import  { useState, useCallback } from "react";
import { GlobalWorkerOptions } from "pdfjs-dist";

import * as pdfjsLib from "pdfjs-dist";
import useStore from '@/store';
// export default function Evaluationpage() {
//   return (
//     <div>Evaluationpage</div>
//   )
// }
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;






const Home: React.FC = () => {
//   const handleFileDrop = async (file: Uint8Array) => {
//     console.log("PDF file dropped!");
//     try {
//       const wordCount = await getWordCountFromPDF(file);
//       console.log(`Word count: ${wordCount}`);
//     } catch (error) {
//       console.error("Error processing PDF:", error);
//     }
//   };

//   useEffect(() => {
    // Retrieve and log the stored PDF from localStorage on page load
    // const storedPdfBase64 = localStorage.getItem("pdfFile");
    // if (storedPdfBase64) {
    //   try {
    //     const pdfArrayBuffer = base64ToUint8Array(storedPdfBase64);
    //     console.log("Retrieved PDF from localStorage", pdfArrayBuffer);
    //   } catch (error) {
    //     console.error("Error decoding Base64 string:", error);
    //   }
    // }
//   }, []);

  return (
    <div>
      <h1>Drag and Drop PDF Example</h1>
      <DropArea  />
    </div>
  );
};

export default Home;

async function getWordCountFromPDF(pdfArray: Uint8Array): Promise<number> {
  const textContent = await extractTextFromPDF(pdfArray);
  const wordCount = textContent
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  return wordCount;
}

// Helper function to convert Base64 back to Uint8Array
const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};


export const extractTextFromPDF = async (
  pdfArray: Uint8Array
): Promise<string> => {
  const pdf = await pdfjsLib.getDocument({ data: pdfArray }).promise;
  let textContent = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const text = await page.getTextContent();
    textContent += text.items.map((item) => (item as any).str).join(" ");
  }

  return textContent;
};

// Helper function to convert Base64 back to Uint8Array




// import React, { useState, useCallback } from "react";





// interface DropAreaProps {
//   onFileDrop: (file: Uint8Array) => void;
// }

const DropArea: React.FC = () => {
        const { pdfFile, updatePdfFile } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
console.log(pdfFile)
  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    setIsDragOver(false);
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      preventDefaults(e);
      setIsDragOver(false);
      setIsLoading(true); // Show loading indicator

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const pdfFilez = files[0];
        if (pdfFilez.type === "application/pdf") {
          try {
            setFileName(pdfFilez.name); // Display file name
            const arrayBuffer = await pdfFilez.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            // onFileDrop(uint8Array);

            // Convert Uint8Array to Base64 and store in localStorage
            const base64String = arrayBufferToBase64(uint8Array);
            // localStorage.setItem("pdfFile", base64String);
            updatePdfFile(base64String);
            console.log("PDF stored in localStorage.");
          } catch (error) {
            console.error("Error processing PDF:", error);
          }
        } else {
          alert("Please drop a PDF file.");
        }
      }

      setIsLoading(false); // Hide loading indicator
    },
    []
  );

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={preventDefaults}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "200px",
        border: "2px dashed #ccc",
        borderRadius: "10px",
        textAlign: "center",
        lineHeight: "200px",
        color: "#aaa",
        fontSize: "18px",
        margin: "50px auto",
        cursor: "pointer",
        position: "relative",
        backgroundColor: isDragOver ? "#e0e0e0" : "#f9f9f9", // Change color on drag over
        transition: "background-color 0.3s ease",
      }}
    >
      {isLoading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "24px",
          }}
        >
          Processing...
        </div>
      ) : fileName ? (
        <div>
          <div>{fileName}</div>
          <div>PDF loaded successfully!</div>
        </div>
      ) : (
        "Drag and drop a PDF file here"
      )}
    </div>
  );
};

// Helper function to convert Uint8Array to Base64
const arrayBufferToBase64 = (buffer: Uint8Array): string => {
  let binary = "";
  const len = buffer.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return window.btoa(binary);
};






