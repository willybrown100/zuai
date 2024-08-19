import React from 'react'
import MyCourseWork from '../MyCourseWork';

export default function All() {
  return (
    <div className="md:grid gap-x-4 grid-cols-2 xl:grid xl:grid-cols-2">
      <MyCourseWork />
      <MyCourseWork />
    </div>
  );
}
