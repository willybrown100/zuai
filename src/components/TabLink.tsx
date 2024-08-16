"use client"
import React, { useState } from 'react'
interface item {
    names:string
}
export default function TabLink({ item,li }: { item: item,li:string }) {
    const [currentElemet,seCurrentElement]=useState(false)
    const handleClick =function(){
seCurrentElement(true)
    }
  return (
    <div className="grid ">
        <h3>{li}</h3>
      <button onClick={handleClick} className={`${currentElemet?"bg-white text-red-500":""}`}>{item.names}</button>
    </div>
  );
}
   

