import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle';

function Courses({ data }) {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    return (
        <div>
            <SectionTitle title={"Courses"} /> {/* Title updated */}

            {/* Container */}
            <div className="flex flex-col lg:flex-row py-10 gap-10">

                {/* Dates section */}
                <div className="w-full lg:w-1/3">
                    {/* Dates row on small screens */}
                    <div className="flex overflow-x-auto whitespace-nowrap pb-5 lg:border-b-0 border-b-2 border-[#135e4c82] lg:flex-col lg:border-l-2 lg:pl-5">
                        {data.map((course, index) => (
                            <div
                                key={course._id}
                                className={`cursor-pointer inline-block w-auto lg:w-full text-center lg:text-left py-2 transition-all duration-300
                                ${selectedItemIndex === index ? 'bg-[#1a7f5a31] text-third border-third lg:border-l-4 border-b-2 lg:border-b-0 -ml-[3px]' : 'text-white'}`} 
                                onClick={() => setSelectedItemIndex(index)}
                            >
                                <h1 className="text-md sm:text-lg px-2 lg:px-5">
                                    {course.title}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details section */}
                <div className='flex items-center lg:w-1/2 justify-center gap-10'>
                    <div className="w-full flex flex-col gap-5 p-5 rounded-lg shadow-lg">
                        <h1 className="text-secondary text-lg sm:text-xl md:text-2xl font-bold">
                            {data[selectedItemIndex].title}
                        </h1>
                        <p className="text-white text-sm sm:text-base md:text-lg">
                            {data[selectedItemIndex].description}
                        </p>

                        {/* Technologies Section */}
                        {data[selectedItemIndex].technologies && (
                            <div className="mt-4">
                                <h2 className="text-secondary font-semibold text-lg">Technologies:</h2>
                                <ul className="list-disc pl-5">
                                    {data[selectedItemIndex].technologies.map((tech, techIndex) => (
                                        <li key={techIndex} className="text-white text-sm sm:text-base md:text-lg">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    
                    {/* Image Section */}
                    <div>
                        <img src={data[selectedItemIndex].link} alt={data[selectedItemIndex].title} className='rounded-lg w-72 h-60 object-cover shadow-md' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Courses;
