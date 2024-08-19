
"use client"
// import React, { useState, ChangeEvent, FormEvent } from "react";
// import { Document, Page, pdfjs } from 'react-pdf';
import React, { useRef, useState, ChangeEvent, FormEvent, useCallback, useEffect } from "react";
import Image from 'next/image';
import useStore from "@/store";
import { GlobalWorkerOptions } from "pdfjs-dist";
import * as pdfjsLib from "pdfjs-dist";
import { updateLocalStorage } from "./MyCourseWork";
import { useRouter } from "next/navigation";
// import MyCourseWork from "./MyCourseWork";
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

export default function CourseWorkForm() {
  
  const { pdfFile, updatePdfFile ,fileName,setFileName } = useStore();
  console.log(fileName)
  const router = useRouter()
    const [subject,setSubject]=useState("")
    const [CourseWork,setCourseWork]=useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [essay,setEssay]=useState("")
    const [numPages, setNumPages] = useState<number | null>(null);
    const fileRef=useRef<HTMLInputElement | null>(null)
    // const [fileName,setFileName]=useState<string >("");

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

console.log(pdfFile)
    const otherData = {
CourseWork,essay,subject,
pdfFile
    }
      const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (pdfFile) {
          // Save data to local storage
        //   localStorage.setItem("pdfFile", pdfFile);
          // localStorage.setItem("otherData", JSON.stringify(otherData));
          updateLocalStorage(otherData)

router.push("/evaluation")
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
// we take the file the user select and store it in "file" and converted it to base64 string
    const file = event.target.files?.[0];
    if (file) {
        setFileName(file.name)
        localStorage.setItem("fileName",file.name)
      const reader = new FileReader();
      reader.onloadend = () => {
          if (typeof reader.result === "string") {
            const base64= reader.result.split(",")[1];
            // localStorage.setItem("pdf",base)
            updatePdfFile(base64); 
        }
      };
      reader.readAsDataURL(file);
    }
  };

    const handleDrop = useCallback(
      async (e: React.DragEvent<HTMLDivElement>) => {
        preventDefaults(e);
        setIsDragOver(false);
        setIsLoading(true); 
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          const pdfFilez = files[0];
          if (pdfFilez.type === "application/pdf") {
            try {
              setFileName(pdfFilez.name); 
              localStorage.setItem("fileName", pdfFilez.name);
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

        setIsLoading(false); 
      },
      []
    );
 
  return (
    // <article className=''>
    <div className="md:w-[700px]  xl:w-full mx-auto">
      <h2 className="font-semibold text-2xl ">
        Hey IB Folks ! Unsure about the quality of your answers?{" "}
        <span className="text-brand500">We get you.</span>
      </h2>
      <div className="bg-stone-50 rounded-[1.4rem] md:w-[700px] xl:w-full md:mx-auto  border border-primary200 my-4 p-3">
        <form className="  rounded-lg " onSubmit={handleSubmit}>
          <div className="bg-white  rounded-[1.4rem] ">
            <div
              style={{
                backgroundColor: isDragOver ? "#e0e0e0" : "#f9f9f9", 
                transition: "background-color 0.3s ease",
              }}
              onDragEnter={handleDragEnter}
              onDragOver={preventDefaults}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex  flex-col items-center px-4 py-8 border-dashed border-[2px] border-primary300 rounded-md`}
            >
              {!pdfFile ? (
                <>
                  <Image
                    src="/upload_file.png"
                    alt="bounding box"
                    className="mb-4"
                    width={50}
                    height={50}
                  />

                  <span className="text-primary600 mb-2">
                    Drag and drop a PDF 
                  </span>
                  <span className="text-primary600 text-sm mb-2">
                    *Limit 25 MB per file.
                  </span>
                  <button
                    onClick={handleButtonClick}
                    className="text-brand500 shadow-md font-semibold rounded-full border-2 px-4 border-primary300 p-2"
                  >
                    Upload your file
                  </button>
                  <input
                    type="file"
                    ref={fileRef}
                    accept="image"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </>
              ) : (
                <div className="file-preview">{fileName}</div>
              )}
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
                  <option>literature</option>
                  <option>maths</option>
                </select>
              </div>
              <div className="bg-white inline-block py-2 rounded-full px-2">
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
            <button className="flex   items-center justify-center hover:bg-primary700 text-white w-auto rounded-full p-2 max-sm:w-full pr-[1.4rem] text-center gap-x-2 bg-primary500">
              <div className="relative aspect-square">
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
    </div>
  ); 
}



const arrayBufferToBase64 = (buffer: Uint8Array): string => {
  let binary = "";
  const len = buffer.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return window.btoa(binary);
};



