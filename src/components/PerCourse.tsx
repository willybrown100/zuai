import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
interface Item {
  CourseWork: string;
  essay: string;
  subject: string;
  pdfFile: Uint8Array;
}


// Define a Card component to display item information
export function PerCourse({ item,num}:{item:Item,num:number}  )  {
  const [pdfUrl,setPdfUrl]=useState<string>("")
console.log(item.pdfFile)
 const convertedToBase64= uint8ArrayToBase64(item.pdfFile)

  useEffect(() => {
    // Step 1: Retrieve the stringified object from local storage
    // const storedObjString = localStorage.getItem("otherData"); // 'pdfData' is the key used to store the object

    if (convertedToBase64) {
      try {
    

        if (convertedToBase64) {
          // Convert Base64 string to Blob
          const byteCharacters = atob(convertedToBase64);
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
  }, []);
return (
  <div className="bg-gradient-to-r my-6 gap-x-3 xl:grid xl:grid-cols-[190px,1fr] from-white to-primary100 p-2 rounded-lg ">
    <div className="w-[19rem]]  h-[100%] rounded-lg hidden xl:block p-2 overflow-hidden">
      <PDFViewer pdfUrl={pdfUrl} />
    </div>
    <div>
      <h3 className="font-semibold mb">{item.essay}</h3>
      <p className="text-sm text-primary600">{item.essay}</p>
      <div className="flex items-center gap-3">
        <div className="bg-white rounded-md inline-block ">
          <div className="flex gap-x-3">
            <Image src="/human.png" alt="dummyavatar" width={20} height={20} />
            <p className="mb-0 text-sm text-stone-600 capitalize">
              {item.subject}
            </p>{" "}
          </div>
        </div>
        <div className=" mb-0 bg-white rounded-md p-[2px] inline-block">
          <div className="flex items-center gap-x-2">
            <Image
              src="/timer.png"
              className="object-cover"
              width={20}
              height={20}
              alt="img"
            />

            <p className="capitalize text-stone-600 mb-0 text-[0.8rem]">
              18 mins read
            </p>
          </div>
        </div>
        <div className=" mb-0 bg-white rounded-md p-[2px] inline-block">
          <div className="flex items-center gap-x-1 ">
            <Image src="/note.png" width={20} height={20} alt="img" />
            <p className="capitalize mb-0 text-stone-600 text-[0.8rem]">
              {" "}
              {num} words
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-x-4 my-2 ">
        <div className="bg-white mb-0 rounded-md p-[2px]  inline-block">
          <div className="flex items-center gap-x-1">
            <Image src="/star.png" alt="star" width={20} height={20} />
            <p className="capitalize  text-stone-600 mb-0 text-sm">7/7</p>
          </div>
        </div>
        <div className="bg-white inline-block p-[2px]">
          <div className="flex items-center  gap-x-1">
            <Image src="/lang.png" alt="langimg" width={20} height={20} />
            <p className=" mb-0 capitalize text-stone-600 text-sm rounded-md inline-block">
              english
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
} 





function uint8ArrayToBase64(uint8Array:any) {
  // Convert Uint8Array to a binary string
  const binaryString = String.fromCharCode(...uint8Array);
  
  // Convert binary string to Base64 string
  const base64String = btoa(binaryString);
  console.log(base64String)
  return base64String;
}

const PDFViewer: React.FC<{ pdfUrl: string }> = ({ pdfUrl }) => {
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div>
      {pdfUrl ? (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0/build/pdf.worker.min.js">
          {/* <div className=''> */}
          <Viewer fileUrl={pdfUrl} />
          {/* </div> */}
        </Worker>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};