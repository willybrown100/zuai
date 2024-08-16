import CourseWorkForm from '@/components/CourseWorkForm';
import MyCourseWork from '@/components/MyCourseWork';
import TabbedSection from '@/components/TabbedSection';
import Image from 'next/image';
import React from 'react'


export default function Page() {
  const className = " w-[90vw]  m-auto";
  return (
    <article className="xl:grid mt-14 grid-cols-[1fr,300px] xl:px-20 gap-x-4 ">
      <div className={`${className} md:w-[700px] xl:w-full`}>
        <h2 className="font-semibold text-2xl ">
          Hey IB Folks ! Unsure about the quality of your answers?{" "}
          <span className="text-brand500">We get you.</span>
        </h2>

        <CourseWorkForm />
        <h2 className="text-primary700 font-[500] capitalize ">
          my coursework
        </h2>
        
          <MyCourseWork />
          <MyCourseWork />
        
        <h3 className="text-primary700 text-center md:hidden">view all</h3>
     
        {/* <div className='flex items-center gap-x-11'> */}
        {/* </div> */}
        <TabbedSection/>
        <MyCourseWork />
        <MyCourseWork />
      </div>
      <Image
        src="/toy.png"
        alt="toyimage"
        width={300}
        height={400}
        className="hidden object-cover xl:block"
      />
    </article>
  );
}

