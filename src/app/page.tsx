import CourseWorkForm from '@/components/CourseWorkForm';
import MyCourseWork from '@/components/MyCourseWork';
import CustomTabs from '@/components/TabbedSection';
import ExampleTabs from '@/components/TabbedSection';

import Image from 'next/image';
import React from 'react'


export default function Page() {
  const className = " w-[92vw]  m-auto";
  return (
    <article className=" mt-[6.5rem]  xl:px-20 gap-x-4 ">
      <div className={`${className} max-md:max-w-[800px] xl:w-full px-2`}>
        <div className="xl:flex gap-x-11 justify-between">
          <CourseWorkForm />
          <Image
            src="/toy.png"
            alt="toyimage"
            width={300}
            height={300}
            className="hidden mb-[1rem] object-cover xl:block"
          />
        </div>
        <h3 className="text-primary700  mt-8 mb-0 font-[500] capitalize ">
          my coursework
        </h3>
        <div className="md:grid gap-x-4 grid-cols-2 xl:grid xl:grid-cols-2">
          <MyCourseWork />
          <MyCourseWork />
        </div>
        <h3 className="text-primary600 text-center text-[1.3rem] mb-14">
          view all
        </h3>

      <h4>explore coursework</h4>
       <CustomTabs/>
        {/* </div> */}
      </div>
      {/* <Image
        src="/toy.png"
        alt="toyimage"
        width={300}
        height={400}
        className="hidden object-cover xl:block"
      /> */}
    </article>
  );
}

