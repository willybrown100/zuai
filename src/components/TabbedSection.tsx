"use client"
import React, { useState } from 'react'
import TabLink from './TabLink';
import All from './tabContent/All';


interface item {
    names:string
}
const item :item[]= [
  { names: "All" },
  { names: "IA Example" },
  { names: "EE Example" },
  { names: "IO Example" },
  { names: "TOK Example" },
];






// import React, { useState } from "react";
// import Tab1Content from "./Tab1Content";
// import Tab2Content from "./Tab2Content";
// import Tab3Content from "./Tab3Content";
// import Tab4Content from "./Tab4Content";
// import Tab5Content from "./Tab5Content";

export default function CustomTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="">
      <div className=" md:flex gap-x-12">
        <div className="flex items-center gap-x-7">
          <button
            className={`py-2  font-semibold text-center text-primary600 ${
              activeTab === 0 ? "bg-white text-[#6947BF] rounded-md p-1" : ""
            }`}
            onClick={() => handleTabClick(0)}
          >
            All
          </button>
          <button
            className={`py-2  font-semibold text-center text-primary600 ${
              activeTab === 1 ? "bg-white rounded-md p-1 text-[#6947BF]" : ""
            }`}
            onClick={() => handleTabClick(1)}
          >
            IA Example
          </button>
          <button
            className={`py-2  font-semibold text-center  text-primary600${
              activeTab === 2 ? "bg-white text-[#6947BF] rounded-md p-1" : ""
            }`}
            onClick={() => handleTabClick(2)}
          >
            EE Example
          </button>
        </div>
        <div className="flex gap-x-7">
          <button
            className={`py-2 font-semibold text-center text-primary600 ${
              activeTab === 3 ? "bg-white text-[#6947BF] rounded-md p-1" : ""
            }`}
            onClick={() => handleTabClick(3)}
          >
            IO Example
          </button>
          <button
            className={`py-2 px-4 font-semibold text-center text-primary600 ${
              activeTab === 4 ? "bg-white text-[#6947BF] rounded-md p-1" : ""
            }`}
            onClick={() => handleTabClick(4)}
          >
            TOK Example
          </button>
        </div>
      </div>
      <div className="mt-4 ">
        {activeTab === 0 && <All/>}
        {activeTab === 1 && <div>2</div>}
        {activeTab === 2 && <div>3</div>}
        {/* {activeTab === 3 && <Tab4Content />}
        {activeTab === 4 && <Tab5Content />} */}
      </div>
         
    </div>
  );
}
