"use client"
import React, { useState } from 'react'
interface item {
    names:string
}
export default function TabLink({ item }: { item: item }) {
    const [currentElemet,seCurrentElement]=useState(false)
    const handleClick =function(){
seCurrentElement(true)
    }
  return (
    <div className="grid ">
        
      <button onClick={handleClick} className={`${currentElemet?"bg-white text-red-500":""} text-primary700`}>{item.names}</button>
    </div>
  );
}
   

