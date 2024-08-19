// import { Icon } from '@react-pdf-viewer/core'
"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';

import React from 'react'

export interface icon{
    svgIcon:JSX.Element;
 id:number;
 path:string
}

export default function SideLinks ({item}:{item:icon})  {
 const pathname=usePathname()
 console.log(pathname)
  return (
    <Link
      href={item.path}
      className={`${pathname === item.path ? "bg-[#6947BF] p-2 rounded-full" : ""} p-2`}
    >
      {item.svgIcon}
    </Link>
  );
};
