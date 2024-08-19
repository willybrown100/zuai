"use client"
import React from 'react'


import Logo from './Logo';
import NavLinks from './NavLinks';


export default function Sidebar() {



  return <aside className="row-span-full py-4 bg-white hidden md:flex md:flex-col gap-y-4 md:items-center  rounded-md">
    <Logo/>

    <NavLinks/>
  </aside>;
}
