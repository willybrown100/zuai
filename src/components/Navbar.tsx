import React from 'react'
import Logo from './Logo'
import { FaBars } from 'react-icons/fa'

export default function Navbar() {

  return (
    <nav className="md:hidden  bg-white p-2">
      <div className="flex w-[90vw]  m-auto justify-between items-center ">
        <Logo />
        <FaBars />
      </div>
    </nav>
  );
}
