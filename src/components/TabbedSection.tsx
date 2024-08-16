"use client"
import React from 'react'
import TabLink from './TabLink';


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
export default function TabbedSection() {

  return (
    <div className="grid grid-cols-3 items-start grid-rows-2">
   {item.map((item)=><TabLink item={item} key={item.names} li="hdhdh"/>)}
    </div>
  );
}
