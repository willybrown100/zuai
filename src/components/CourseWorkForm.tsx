
"use client"
// import React, { useState, ChangeEvent, FormEvent } from "react";
// import { Document, Page, pdfjs } from 'react-pdf';
import React, { useRef, useState, ChangeEvent, FormEvent, useCallback, useEffect } from "react";
import Image from 'next/image';
import useStore from "@/store";
import { GlobalWorkerOptions } from "pdfjs-dist";
import * as pdfjsLib from "pdfjs-dist";
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

export default function CourseWorkForm() {
    const { pdfFile, updatePdfFile } = useStore();
    const [subject,setSubject]=useState("")
     const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [CourseWork,setCourseWork]=useState("")
    const [essay,setEssay]=useState("")
    const [numPages, setNumPages] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fileRef=useRef<HTMLInputElement | null>(null)
    // const [pdfFile,setPdfFile]=useState<string | null>(null);
    const [fileName,setFileName]=useState<string >("");

console.log(pdfFile)
// const handleFileDrop = async (file: Uint8Array) => {
//         console.log('PDF file dropped!', file);
//         try {
//             const wordCount = await getWordCountFromPDF(file);
//             console.log(`Word count: ${wordCount}`);
//         } catch (error) {
//             console.error('Error processing PDF:', error);
//         }
//     };

    // useEffect(() => {
    //     // Retrieve and log the stored PDF from localStorage on page load
    //     const storedPdfBase64 = localStorage.getItem('pdfFile');
    //     if (storedPdfBase64) {
    //         try {
    //             const pdfArrayBuffer = base64ToUint8Array(storedPdfBase64);
    //             console.log('Retrieved PDF from localStorage', pdfArrayBuffer);
    //         } catch (error) {
    //             console.error('Error decoding Base64 string:', error);
    //         }
    //     }
    // }, []);



    const otherData = {
CourseWork,essay,subject,
pdfFile
    }
      const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (pdfFile) {
          // Save data to local storage
        //   localStorage.setItem("pdfFile", pdfFile);
          localStorage.setItem("otherData", JSON.stringify(otherData));

          alert("Data submitted to local storage successfully!");
        } else {
          alert("Please upload a PDF file.");
        }
      };
    const handleButtonClick = function (
      e: React.MouseEvent<HTMLButtonElement>
    ) {
      e.preventDefault();
      if (fileRef.current) {
        fileRef.current.click();
      }
    };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
// we take the file the uer select and store it in "file" and converted it to base64 string
    const file = event.target.files?.[0];
    if (file) {
        setFileName(file.name)
      const reader = new FileReader();
      reader.onloadend = () => {
          if (typeof reader.result === "string") {
            const base= reader.result.split(",")[1];
            // localStorage.setItem("pdf",base)
            updatePdfFile(base); // Ensure result is a string
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    // <article className='xl:flex '>
    <div className="bg-stone-50 rounded-[1.4rem]  border border-primary200 my-4 p-3">
      <form className="  rounded-lg " onSubmit={handleSubmit}>
        <div className="bg-white  rounded-[1.4rem] ">
          <div className="flex flex-col items-center px-4 py-8 border-dashed border-[2px] border-primary300 rounded-md">
            {!pdfFile ?
          <>
          {/* <div className='relative '> */}
            <Image src="/upload_file.png"  alt="bounding box" className="mb-4" width={50} height={50} />
          {/* </div> */}
            {/* <h3 className="text-primary600 font-semibold">
              Drag and drop a PDF
            </h3> */}
            {/* <DropArea/> */}
       
            <span className="text-primary600 mb-2">*Limit 25 MB per file.</span>
            <button onClick={handleButtonClick} className="text-brand500 shadow-md font-semibold rounded-full border-2 px-4 border-primary300 p-2">
              Upload your file
            </button>
            <input type='file' ref={fileRef} accept='image' onChange={handleFileChange} className='hidden'/>
          </>:    <div className="file-preview">
         {fileName}
        </div>
              }
          </div>
        </div>
        <div className="flex flex-col mt-4 items-start">
          <span className="text-sm my-2 text-primary600">
            select your course of work & subjects*
          </span>
          <div className="md:flex max-sm:space-y-4 gap-x-4 md:items-center">
            <div className="bg-white   py-2 rounded-full px-2">
              <select
                value={CourseWork}
                onChange={(e) => setCourseWork(e.target.value)}
                className="inline-block px-2  text-primary700 "
              >
                <option>CourseWork Type</option>
                <option>kk</option>
                <option>kk</option>
              </select>
            </div>
            <div className="bg-white py-2 rounded-full px-2">
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="inline-block px-2 text-primary700"
              >
                <option value="Subject">Subject</option>
                <option value="physis">physis</option>
                <option value="chemistry">chemistry</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-6 mt-2 gap-y-2 ">
          <label className="text-primary600 ">Enter you essay title</label>
          <input
            type="text"
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            className="placeholder:text-primary600 md:w-[22rem] w-auto rounded-full p-2"
            placeholder="how nation works"
          />
        </div>
        <div className="md:flex justify-center xl:justify-start">
          <button className="flex   items-center justify-center text-white w-auto rounded-full p-2 max-sm:w-full pr-[1.4rem] text-center gap-x-2 bg-primary500">
            <div className='relative aspect-square'>

            <Image
              src="/star1.png"
              className="bg-primary100 rounded-full"
              alt="star"
              fill
              />
              </div>
            Evaluate your Score
          </button>
        </div>
      </form>
    </div>
  ); 
}





const DropArea: React.FC = () => {
  const { pdfFile, updatePdfFile } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  console.log(pdfFile);
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

  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
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
  }, []);

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




const arrayBufferToBase64 = (buffer: Uint8Array): string => {
  let binary = "";
  const len = buffer.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return window.btoa(binary);
};

// interface DropAreaProps {
//   onFileDrop: (file: Uint8Array) => void;
// }

// const DropArea: React.FC<DropAreaProps> = ({ onFileDrop }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const preventDefaults = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = useCallback(
//     async (e: React.DragEvent<HTMLDivElement>) => {
//       preventDefaults(e);
//       setIsLoading(true); // Set loading to true

//       const files = e.dataTransfer.files;
//       if (files.length > 0) {
//         const pdfFile = files[0];
//         if (pdfFile.type === "application/pdf") {
//           const arrayBuffer = await pdfFile.arrayBuffer();
//           const uint8Array = new Uint8Array(arrayBuffer);
//           onFileDrop(uint8Array);

//           // Convert Uint8Array to Base64 and store in localStorage
//           const base64String = arrayBufferToBase64(uint8Array);
//           localStorage.setItem("pdfFile", base64String);
//           console.log("PDF stored in localStorage.");
//         } else {
//           alert("Please drop a PDF file.");
//         }
//       }

//       setIsLoading(false); // Set loading to false after processing
//     },
//     [onFileDrop]
//   );

//   return (
//     <div
//       onDragEnter={preventDefaults}
//       onDragOver={preventDefaults}
//       onDragLeave={preventDefaults}
//       onDrop={handleDrop}
//       style={{
//         width: "100%",
//         maxWidth: "400px",
//         height: "200px",
//         border: "2px dashed #ccc",
//         borderRadius: "10px",
//         textAlign: "center",
//         lineHeight: "200px",
//         color: "#aaa",
//         fontSize: "18px",
//         margin: "50px auto",
//         cursor: "pointer",
//         position: "relative",
//         backgroundColor: "#f9f9f9",
//       }}
//     >
//       {isLoading ? (
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             fontSize: "24px",
//           }}
//         >
//           Processing...
//         </div>
//       ) : (
//         "Drag and drop a PDF file here"
//       )}
//     </div>
//   );
// };

// // Helper function to convert Uint8Array to Base64
// const arrayBufferToBase64 = (buffer: Uint8Array): string => {
//   let binary = "";
//   const len = buffer.byteLength;
//   for (let i = 0; i < len; i++) {
//     binary += String.fromCharCode(buffer[i]);
//   }
//   return window.btoa(binary);
// };

// export default DropArea;







 





// const Home: React.FC = () => {

//     const handleFileDrop = async (file: Uint8Array) => {
//         console.log('PDF file dropped!', file);
//         try {
//             const wordCount = await getWordCountFromPDF(file);
//             console.log(`Word count: ${wordCount}`);
//         } catch (error) {
//             console.error('Error processing PDF:', error);
//         }
//     };

//     useEffect(() => {
//         // Retrieve and log the stored PDF from localStorage on page load
//         const storedPdfBase64 = localStorage.getItem('pdfFile');
//         if (storedPdfBase64) {
//             try {
//                 const pdfArrayBuffer = base64ToUint8Array(storedPdfBase64);
//                 console.log('Retrieved PDF from localStorage', pdfArrayBuffer);
//             } catch (error) {
//                 console.error('Error decoding Base64 string:', error);
//             }
//         }
//     }, []);

//     return (
//         <div>
//             <h1>Drag and Drop PDF Example</h1>
//             <DropArea onFileDrop={handleFileDrop} />
//         </div>
//     );
// };


// // Example getWordCountFromPDF function
// async function getWordCountFromPDF(pdfArray: Uint8Array): Promise<number> {
//     // Assume extractTextFromPDF is a function that extracts text from the PDF
//     const textContent = await extractTextFromPDF(pdfArray);
//     const wordCount = textContent
//         .split(/\s+/)
//         .filter((word) => word.length > 0).length;
//     return wordCount;
// }

// async function extractTextFromPDF(pdfArray: Uint8Array): Promise<string> {
//     // This is just a placeholder function
//     // Replace this with actual PDF.js code to extract text
//     return "Extracted text from PDF";
// }

// // Helper function to convert Base64 back to Uint8Array
// const base64ToUint8Array = (base64: string): Uint8Array => {
//     const binaryString = window.atob(base64);
//     const len = binaryString.length;
//     const bytes = new Uint8Array(len);
//     for (let i = 0; i < len; i++) {
//         bytes[i] = binaryString.charCodeAt(i);
//     }
//     return bytes;
// };
