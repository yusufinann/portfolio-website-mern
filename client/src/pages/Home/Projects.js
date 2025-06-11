import React, { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';

function Projects({ data }) {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    if (!data || data.length === 0) {
        return (
            <div>
                <SectionTitle title={"Projects"} />
                <p className="text-white py-10 text-center">No projects to display.</p>
            </div>
        );
    }

    const currentProject = data[selectedItemIndex] || data[0];

    if (!currentProject) {
        return (
            <div>
                <SectionTitle title={"Projects"} />
                <p className="text-white py-10 text-center">Selected project data is missing.</p>
            </div>
        );
    }

    return (
        <div>
            <SectionTitle title={"Projects"} />

            <div className="flex flex-col lg:flex-row py-10 gap-10">
                <div className="w-full lg:w-1/3">
                    <div className="flex overflow-x-auto whitespace-nowrap pb-5 lg:border-b-0 border-b-2 border-[#135e4c82] lg:flex-col lg:border-l-2 lg:pl-5">
                        {data.map((project, index) => (
                            <div
                                key={project._id || index}
                                className={`cursor-pointer inline-block w-auto lg:w-full text-center lg:text-left py-2 transition-all duration-300
                                ${selectedItemIndex === index
                                        ? 'bg-[#1a7f5a31] text-third border-third lg:border-l-4 border-b-2 lg:border-b-0 -ml-[3px]'
                                        : 'text-white'
                                    }`}
                                onClick={() => setSelectedItemIndex(index)}
                            >
                                <h1 className="text-md sm:text-lg px-2 lg:px-5">
                                    {project.title}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex items-center justify-center gap-10 lg:w-2/3 flex-col sm:flex-row'>
                    {currentProject.link && (
                        <div className="flex-shrink-0">
                            <img
                                src={currentProject.link}
                                alt={currentProject.title || 'Project image'}
                                className='rounded-lg w-72 h-60 object-cover shadow-md'
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                                    console.error("Image failed to load:", currentProject.link);
                                }}
                            />
                        </div>
                    )}

                    <div className="w-full flex flex-col gap-5 p-5 rounded-lg shadow-lg bg-primary_dark_gray_800">
                        <h1 className="text-secondary text-lg sm:text-xl md:text-2xl font-bold">
                            {currentProject.title}
                        </h1>
                        {currentProject.technologies && currentProject.technologies.length > 0 && (
                            <h2 className="text-third text-md sm:text-lg md:text-xl">
                                {currentProject.technologies.join(', ')}
                            </h2>
                        )}
                        <p className="text-white text-sm sm:text-base md:text-lg">
                            {currentProject.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;