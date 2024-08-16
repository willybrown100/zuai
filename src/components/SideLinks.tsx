// import { Icon } from '@react-pdf-viewer/core'
import Link from 'next/link'
import React from 'react'

export interface icon{
    svgIcon:JSX.Element;
 id:1
}

export default function SideLinks ({item}:{item:icon})  {
 
  return <Link href="">{item.svgIcon}</Link>;
};
