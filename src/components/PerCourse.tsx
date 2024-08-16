import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface Item {
  CourseWork: string;
  essay: string;
  subject: string;
  pdfFile: Uint8Array;
}



// Define a Card component to display item information
export const PerCourse: React.FC<{ item: Item,num:number }> = ({ item,num }) => (
  //   const [text, setText] = useState<string>("");

  <div className="bg-gradient-to-r my-6 from-white to-primary100 p-2 rounded-md ">
    <h2 className="font-semibold mb">{item.essay}</h2>
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

          <p className="capitalize text-stone-600 mb-0 text-sm">18 mins read</p>
        </div>
      </div>
      <div className=" mb-0 bg-white rounded-md p-[2px] inline-block">
        <div className="flex gap-x-2 ">
          <Image src="/note.png" width={20} height={20} alt="img" />
          <p className="capitalize mb-0 text-stone-600 text-sm"> {num} words</p>
        </div>
      </div>
    </div>
    <div className="flex gap-x-4 my-2 ">
      <div className="bg-white mb-0 rounded-md p-[2px]  inline-block">
        <div className="flex items-center gap-x-2">
          <Image src="/star.png" alt="star" width={20} height={20} />
          <p className="capitalize  text-stone-600 mb-0 text-sm">7/7</p>
        </div>
      </div>
      <div className="bg-white inline-block p-[2px]">
        <div className="flex items-center  gap-x-2">
          <Image src="/lang.png" alt="langimg" width={20} height={20} />
          <p className=" mb-0 capitalize text-stone-600 text-sm rounded-md inline-block">
            english
          </p>
        </div>
      </div>
    </div>
  </div>
);

