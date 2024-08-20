"use client"
import React, { useEffect } from 'react'
import  { useState, useCallback } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { Viewer, Worker } from "@react-pdf-viewer/core";
// import { GlobalWorkerOptions } from "pdfjs-dist";
import { Document, Page, pdfjs } from "react-pdf";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import * as pdfjsLib from "pdfjs-dist";
import useStore from '@/store';
import CriteriaItem from '@/components/CriteriaItem';


import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import {  base64ToUint8Array, extractScoresFromText, getCurrentDateString } from "@/utils/utils";
import { ProgressBar } from '@/components/ProgressBar';
import { PdfViewer } from '@/components/PdfViewer';
import { extractTextFromPDF } from '@/components/MyCourseWork';
import { CriteriaComponent } from '@/components/Criteria';
// Setting the worker source
// pdfjs.GlobalWorkerOptions.workerSrc = `https:/cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export default function Evaluationpage() {
    const {
      criteriaA,
      criteriaB,
      criteriaC,
      setCriteriaA,
      setCriteriaB,
      setCriteriaC,
    
    } = useStore();
  const [showbtn, setShowBtn] = useState<boolean>(true);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [numbers, setNumbers] = useState<number[]>()
  const [overAllScore, setOverAllScore] = useState<number>()
  const handleToggle=function(){
    setShowBtn(!showbtn)
  }
  console.log(criteriaA, criteriaB,criteriaC,overAllScore);
  const totalScore = overAllScore;
  const date  =new Date()
  const day =date.getDate();
  // Now you can use pdfjsLib to load PDFs
  useEffect(() => {
    // Step 1: Retrieve the stringified object from local storage
    const storedObjString = localStorage.getItem("otherData"); 

    // 'pdfData' is the key used to store the object
    const storedUserScore = localStorage.getItem("userScores"); // 'pdfData' is the key used to store the object
    if (storedUserScore){
      const convertToObj = JSON.parse(storedUserScore)
      console.log(storedUserScore, convertToObj);
setCriteriaA(convertToObj.criteriaA)
setCriteriaB(convertToObj.criteriaB)
setCriteriaC(convertToObj.criteriaC)
setOverAllScore(convertToObj.overallScore);
    } 

    if (storedObjString) {
      try {
        // Step 2: Parse the string back to an object
        const storedObj = JSON.parse(storedObjString);
console.log(storedObj)
        // Step 3: Extract the Base64 string from the object
        const base64String = storedObj.pdfFile;
        
        // turned base64 to Uint8Array=
const pdfData = base64ToUint8Array(base64String);
extractTextFromPDF(pdfData);
    // extractNumbersFromPDF(pdfData).then(setNumbers);
        if (base64String) {
          // Convert Base64 string to Blob
          const byteCharacters = atob(base64String);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: "application/pdf" });

          // Create a Blob URL
          const blobUrl = URL.createObjectURL(blob);
          setPdfUrl(blobUrl);

          // Clean up the Blob URL when the component unmounts
          return () => URL.revokeObjectURL(blobUrl);
        }
      } catch (error) {
        console.error("Failed to parse or retrieve PDF data:", error);
      }
    }
  }, [criteriaA,criteriaB,criteriaC,overAllScore]);

const currentDate = getCurrentDateString();
console.log(JSON.stringify(currentDate))
  return (
    <div className='" px-4 mt-16 m-auto py-10 md:max-w-[1000px] md:px-8 xl:max-w-[1170px]'>
      <div className="bg-white flex md:hidden  justify-between items-center p-4 rounded-[1.5rem]">
        <div className="">
          <h3>overall score</h3>
          <div className="flex justify-between gap-x-2">
            <h2 className="capitlize font-semibold">
              remark <span className="font-semibold text-black">:</span>
            </h2>
            <h2 className="capitlize font-semibold text-green-500">good</h2>
          </div>
          <h4 className="text-primary700">evaluated on {currentDate}</h4>
        </div>
        <div>
          <span>
            <ProgressBar total={20} score={totalScore} />
          </span>
        </div>
      </div>
      <div className="mt-6 md:hidden">
        {showbtn ? (
          <button
            onClick={handleToggle}
            className="bg-white p-2 rounded-full items-center gap-x-2 font-semibold flex text-[#6947BF]"
          >
            <span className="mb-0 font-semibold capitalize">
              check detailed evaluation{" "}
            </span>
            <BiRightArrowAlt className="mb-0" />
          </button>
        ) : (
          <button
            onClick={handleToggle}
            className="flex bg-white p-2 rounded-full font-semibold items-center gap-x-2 text-[#6947BF]"
          >
            <span className="mb-0 capitalize font-semibold">
              expand and view your file{" "}
            </span>
            <BiRightArrowAlt className="mb-0" />
          </button>
        )}
      </div>
      <div>
        {showbtn && (
          <div className=" md:hidden rounded-md my-4 ">
            <PdfViewer pdfUrl={pdfUrl} />
          </div>
        )}
        <div className="hidden md:block  rounded-md my-4 xl:grid grid-cols-[1fr,500px] gap-x-4">
          <PdfViewer pdfUrl={pdfUrl} />
          <div>
            <div className="bg-white hidden  xl:flex  rounded-[1.5rem] justify-between items-center px-6 py-3 ">
              <div>
                <h4 className="font-semibold text-primary700">overall score</h4>
                <div className="flex justify-between gap-x-4 ">
                  <h2 className="capitlize text-[2rem] font-semibold">
                    remark <span className="font-semibold text-black">:</span>
                  </h2>
                  <h2 className="capitlize  font-semibold text-[2rem] text-green-500">
                    good
                  </h2>
                </div>
                <h4 className="text-primary700 font-semibold">evaluation</h4>
              </div>
              <div>
                <ProgressBar total={20} score={totalScore} />
              </div>
            </div>
            {/* <div> */}
            <CriteriaComponent />
            <button className="bg-white p-2 rounded-full hidden  items-center gap-x-2 font-semibold xl:flex text-[#6947BF]">
              <span className="mb-0 font-semibold capitalize">
                check detailed evaluation{" "}
              </span>
              <BiRightArrowAlt className="mb-0" />
            </button>
            {/* </div> */}
          </div>
        </div>

        <div className=" md:hidden">{!showbtn && <CriteriaComponent />}</div>
        <div className="bg-white hidden xl:hidden md:flex mt-6 rounded-[1.5rem] justify-between items-center px-6 py-3 ">
          <div className="">
            <h3>overall score</h3>
            <div className="flex justify-between gap-x-4 ">
              <h2 className="capitlize font-semibold">
                remark <span className="font-semibold text-black">:</span>
              </h2>
              <h2 className="capitlize font-semibold text-green-500">good</h2>
            </div>
            <h3 className="text-primary700 text-sm ">
               evaluated on {currentDate}
            </h3>
          </div>
          <div>
            <ProgressBar total={20} score={totalScore} />
          </div>
        </div>
      </div>
      <div className="hidden md:block xl:hidden">
        <CriteriaComponent />
      </div>
    </div>
  );
}




// =======================

// Function to convert Base64 string to Uint8Array










