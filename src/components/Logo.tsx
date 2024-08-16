import Image from 'next/image'
import React from 'react'
import logo from "@/app/public/ZUaiLogo.png"
export default function Logo() {
  return (
    <div className="relative aspect-square">
      <Image
        src="/ZUaiLogo.png"
        alt="zuai logo"
        fill
        className="object-cover"
      />
    </div>
  );
}