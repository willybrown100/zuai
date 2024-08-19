
"use client"
import React, { useEffect } from 'react'
import  { useState, useCallback } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { GlobalWorkerOptions } from "pdfjs-dist";
import { Document, Page, pdfjs } from "react-pdf";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import * as pdfjsLib from "pdfjs-dist";
import useStore from '@/store';
import CriteriaItem from '@/components/CriteriaItem';
pdfjs.GlobalWorkerOptions.workerSrc = `https:/cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import {  getCurrentDateString } from "@/utils/utils";
import { ProgressBar } from '@/components/ProgressBar';
// Setting the worker source

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
            <PDFViewer pdfUrl={pdfUrl} />
          </div>
        )}
        <div className="hidden md:block  rounded-md my-4 xl:grid grid-cols-[1fr,500px] gap-x-4">
          <PDFViewer pdfUrl={pdfUrl} />
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


const PDFViewer: React.FC<{ pdfUrl: string }> = ({ pdfUrl }) => {
  const fileName = localStorage.getItem("fileName")
  const [toggle,setToggle]=useState(true)
const handleToggle=function(){
  setToggle(!toggle);
}
    // const { pdfFile, updatePdfFile, fileName, setFileName } = useStore();
    console.log(fileName)
  const zoomPluginInstance = zoomPlugin();
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
  return (
    <div>
      {pdfUrl ? (
        <>
          {toggle ? (
            <div
              className={` rounded-tl-xl rounded-tr-xl  py-2 bg-[#eff4f8] px-3 border-b border-gray-300`}
            >
              <span className="font-bold xl:hidden my-4 bg-white py-1 px-4 rounded-2xl ">
                {fileName}
              </span>

              <div className="hidden xl:flex xl:items-center justify-between">
                <span className="font-bold  my-4 bg-white py-1 px-4 rounded-2xl ">
                  {fileName}
                </span>
                <div className='flex items-center gap-x-6'>
                  <Toolbar>
                    {(props) => {
                      const { ZoomIn, ZoomOut } = props;
                      return (
                        <div className="flex items-center space-x-4">
                          <ZoomOut />
                          <ZoomIn />
                        </div>
                      );
                    }}
                  </Toolbar>
                  <div className="bg-white rounded-full p-1">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.333008 11.6668V8.52583H1.33301V10.6668H3.47401V11.6668H0.333008ZM8.53167 11.6668V10.6668H10.6727V8.52583H11.6727V11.6668H8.53167ZM0.333008 3.4745V0.333496H3.47401V1.3335H1.33301V3.4745H0.333008ZM10.6727 3.4745V1.3335H8.53167V0.333496H11.6727V3.4745H10.6727Z"
                        fill="#5B6170"
                      />
                    </svg>
                  </div>
                  <button className="md:flex items-center hidden  bg-white px-2 rounded-3xl gap-x-2 tex">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.33366 5.66663V9.33329H3.33366V6.66663H0.666992V5.66663H4.33366ZM6.66699 0.666626V3.33329H9.33366V4.33329H5.66699V0.666626H6.66699Z"
                        fill="#5B6170"
                      />
                    </svg>
                    <text className="text-primary700 text-sm capitalize">collapse</text>
                  </button>
                </div>
              </div>


              <div className="flex justify-between mt-3 items-center xl:hidden">
                <Toolbar>
                  {(props) => {
                    const { ZoomIn, ZoomOut } = props;
                    return (
                      <div className="flex items-center space-x-4">
                        <ZoomOut />
                        <ZoomIn />
                      </div>
                    );
                  }}
                </Toolbar>

                <div className="flex items-center gap-x-3">
                  <div className="bg-white rounded-full p-1">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.333008 11.6668V8.52583H1.33301V10.6668H3.47401V11.6668H0.333008ZM8.53167 11.6668V10.6668H10.6727V8.52583H11.6727V11.6668H8.53167ZM0.333008 3.4745V0.333496H3.47401V1.3335H1.33301V3.4745H0.333008ZM10.6727 3.4745V1.3335H8.53167V0.333496H11.6727V3.4745H10.6727Z"
                        fill="#5B6170"
                      />
                    </svg>
                  </div>

                  <button
                    onClick={handleToggle}
                    className="md:flex items-center hidden  bg-white px-2 rounded-3xl gap-x-2 tex"
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.33366 5.66663V9.33329H3.33366V6.66663H0.666992V5.66663H4.33366ZM6.66699 0.666626V3.33329H9.33366V4.33329H5.66699V0.666626H6.66699Z"
                        fill="#5B6170"
                      />
                    </svg>
                    <text className="text-primary700 text-sm">collapse</text>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-2 px-4 rounded-3xl flex justify-between items-center">
              <span className="font-bold   bg-stone-100 py-1 px-4 rounded-2xl">
                {fileName}
              </span>
              <button
                onClick={handleToggle}
                className="flex bg-white p-2 rounded-full font-semibold items-center gap-x-2 text-[#6947BF]"
              >
                <span className="mb-0 capitalize font-semibold">
                  expand and view your file{" "}
                </span>
                <BiRightArrowAlt className="mb-0" />
              </button>
            </div>
          )}

          {toggle && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfUrl}
                plugins={[toolbarPluginInstance, zoomPluginInstance]}
              />
            </Worker>
          )}
        </>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

// =======================

// Function to convert Base64 string to Uint8Array
 function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
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
    const exreactedScores=extractScoresFromText(textContent);
    console.log(exreactedScores)
    localStorage.setItem("userScores", JSON.stringify(exreactedScores));
    console.log(textContent)
  }

  return textContent;
}





interface ScoreDetails {
  overallScore: number | null;
  criteriaA: number | null;
  criteriaB: number | null;
  criteriaC: number | null;
}

function extractScoresFromText(text: string): ScoreDetails {
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
    criteriaA: criteriaAMatch ? parseInt(criteriaAMatch[1],10) : null,
    criteriaB: criteriaBMatch ? parseInt(criteriaBMatch[1],10) : null,
    criteriaC: criteriaCMatch ? parseInt(criteriaCMatch[1],10) : null,
  };

}

interface criterion{
  title:string,
  heading:string,
  essay:string,
  criteria:number | undefined
  strenghtText1:string
  strenghtText2:string

}

function CriteriaComponent(){
    const {
      criteriaA,
      criteriaB,
      criteriaC,
      setCriteriaA,
      setCriteriaB,
      setCriteriaC,
    } = useStore();
    const [curOpen,setCurOpen]=useState(null)
    const criterias: criterion[] = [
      {
        title: "criteria A",
        heading: "Understanding Knowledge Questions",
        essay:
          "The essay identifies and focuses on the knowledge question regarding the resolvaility of disputes over knowledge claims within disciplines.",
        strenghtText1:
          "Demonstrates a good understanding of the prescribed title and the associated knowledge questions.",
        strenghtText2:
          "Addresses the nature of disputes in both the Natural Sciences and Human Sciences effectively.",
        criteria: criteriaA,
      },
      {
        title: "criteria B",
        heading: "Understanding Knowledge Questions",
        essay:
          "The essay identifies and focuses on the knowledge question regarding the resolvaility of disputes over knowledge claims within disciplines.",
        strenghtText1:
          "Demonstrates a good understanding of the prescribed title and the associated knowledge questions.",
        strenghtText2:
          "Addresses the nature of disputes in both the Natural Sciences and Human Sciences effectively.",
        criteria: criteriaB,
      },
      {
        title: "criteria C",
        heading: "Understanding Knowledge Questions",
        essay:
          "The essay identifies and focuses on the knowledge question regarding the resolvaility of disputes over knowledge claims within disciplines.",
        strenghtText1:
          "Demonstrates a good understanding of the prescribed title and the associated knowledge questions.",
        strenghtText2:
          "Addresses the nature of disputes in both the Natural Sciences and Human Sciences effectively.",
        criteria: criteriaC,
      },
    ];
  return <div>
  {criterias.map((item,i)=><CriteriaItem curOpen={curOpen} num={i} onOpen={setCurOpen} key={item.title} item={item}/>)}
  </div>
}
