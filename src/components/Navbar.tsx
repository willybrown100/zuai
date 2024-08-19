import React from 'react'
import Logo from './Logo'
import { FaBars } from 'react-icons/fa'

export default function Navbar() {

  return (
    <nav className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white p-2 py-4">
      <div className="flex w-[90vw]  m-auto justify-between items-center ">
        <Logo />
        <FaBars className='w-[1.3rem]' />
      </div>
    </nav>
  );
}
