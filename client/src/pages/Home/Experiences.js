import React, { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';


function Experiences({ data }) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  // Eğer veri mevcut değilse kullanıcıyı bilgilendir
  if (!data || data.length === 0) {
    return <div className="text-white">No experiences available.</div>;
  }

  return (
    <div>
      <SectionTitle title={"Experiences"} />

      {/* Container */}
      <div className="flex flex-col lg:flex-row py-10 gap-10">
        {/* Dates section */}
        <div className="w-full lg:w-1/2">
          {/* Dates row on small screens */}
          <div className="flex overflow-x-auto whitespace-nowrap pb-5 lg:border-b-0 border-b-2 border-[#135e4c82] lg:flex-col lg:border-l-2 lg:pl-5">
            {data.map((experience, index) => (
              <div
                key={experience._id} // MongoDB id'si
                className={`cursor-pointer inline-block w-auto lg:w-full text-center lg:text-left py-2 transition-all duration-300
                ${selectedItemIndex === index ? 'bg-[#1a7f5a31] text-third border-third lg:border-l-4 border-b-2 lg:border-b-0 -ml-[3px]' : 'text-white'}`}
                onClick={() => setSelectedItemIndex(index)}
              >
                <h1 className="text-md sm:text-lg px-2 lg:px-5">
                  {experience.period}
                </h1>
              </div>
            ))}
          </div>
        </div>

        {/* Details section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-5 p-5 rounded-lg shadow-lg transition-all duration-300">
          <h1 className="text-secondary text-lg sm:text-xl md:text-2xl">
            {data[selectedItemIndex].title}
          </h1>
          <h1 className="text-third text-lg sm:text-xl md:text-2xl">
            {data[selectedItemIndex].company}
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg">
            {data[selectedItemIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Experiences;
