"use client"
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";

export const PdfViewer: React.FC<{ pdfUrl: string }> = ({ pdfUrl }) => {
  const fileName = localStorage.getItem("fileName");
  const [toggle, setToggle] = useState(true);
  const handleToggle = function () {
    setToggle(!toggle);
  };
  // const { pdfFile, updatePdfFile, fileName, setFileName } = useStore();

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
                <div className="flex items-center gap-x-6">
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
                    <span className="text-primary700 text-sm capitalize">
                      collapse
                    </span>
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
                    <span className="text-primary700 text-sm">collapse</span>
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
