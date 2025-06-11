import React, { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';

function Projects({ data }) {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [viewMode, setViewMode] = useState('card'); // 'card' or 'list'

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

    // Mobile Card View Component
    const MobileCardView = () => (
        <div className="lg:hidden">
            {/* View Toggle */}
            <div className="flex justify-center mb-6">
                <div className="bg-primary_dark_gray_800 rounded-full p-1 flex">
                    <button
                        onClick={() => setViewMode('card')}
                        className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                            viewMode === 'card' 
                                ? 'bg-third text-black' 
                                : 'text-white hover:text-third'
                        }`}
                    >
                        Card View
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                            viewMode === 'list' 
                                ? 'bg-third text-black' 
                                : 'text-white hover:text-third'
                        }`}
                    >
                        List View
                    </button>
                </div>
            </div>

            {viewMode === 'card' ? (
                // Card Swipe View
                <div className="relative overflow-hidden">
                    {/* Progress Dots */}
                    <div className="flex justify-center gap-2 mb-4">
                        {data.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedItemIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    selectedItemIndex === index 
                                        ? 'bg-third w-6' 
                                        : 'bg-gray-600'
                                }`}
                            />
                        ))}
                    </div>

                    {/* Card Container */}
                    <div 
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${selectedItemIndex * 100}%)` }}
                    >
                        {data.map((project, index) => (
                            <div key={project._id || index} className="w-full flex-shrink-0 px-2">
                                <div className="bg-primary_dark_gray_800 rounded-xl p-6 shadow-xl">
                                    {project.link && (
                                        <div className="mb-4">
                                            <img
                                                src={project.link}
                                                alt={project.title || 'Project image'}
                                                className='rounded-lg w-full h-48 object-cover'
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                                                }}
                                            />
                                        </div>
                                    )}
                                    
                                    <h1 className="text-secondary text-xl font-bold mb-3">
                                        {project.title}
                                    </h1>
                                    
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="mb-4">
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, techIndex) => (
                                                    <span 
                                                        key={techIndex}
                                                        className="bg-third text-black px-3 py-1 rounded-full text-xs font-medium"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    <p className="text-white text-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    {data.length > 1 && (
                        <>
                            <button
                                onClick={() => setSelectedItemIndex(Math.max(0, selectedItemIndex - 1))}
                                disabled={selectedItemIndex === 0}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary_dark_gray_800 text-white p-2 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                &#8249;
                            </button>
                            <button
                                onClick={() => setSelectedItemIndex(Math.min(data.length - 1, selectedItemIndex + 1))}
                                disabled={selectedItemIndex === data.length - 1}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary_dark_gray_800 text-white p-2 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                &#8250;
                            </button>
                        </>
                    )}
                </div>
            ) : (
                // Accordion List View
                <div className="space-y-3">
                    {data.map((project, index) => (
                        <div key={project._id || index} className="bg-primary_dark_gray_800 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setSelectedItemIndex(selectedItemIndex === index ? -1 : index)}
                                className="w-full p-4 text-left flex justify-between items-center hover:bg-opacity-80 transition-all duration-200"
                            >
                                <div>
                                    <h3 className="text-secondary font-semibold text-lg">{project.title}</h3>
                                    {project.technologies && project.technologies.length > 0 && (
                                        <p className="text-third text-sm mt-1">
                                            {project.technologies.slice(0, 3).join(', ')}
                                            {project.technologies.length > 3 && '...'}
                                        </p>
                                    )}
                                </div>
                                <span className={`transform transition-transform duration-200 text-third ${
                                    selectedItemIndex === index ? 'rotate-180' : ''
                                }`}>
                                    ▼
                                </span>
                            </button>
                            
                            <div className={`overflow-hidden transition-all duration-300 ${
                                selectedItemIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="p-4 pt-0 border-t border-gray-700">
                                    {project.link && (
                                        <img
                                            src={project.link}
                                            alt={project.title || 'Project image'}
                                            className='rounded-lg w-full h-40 object-cover mb-3'
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                                            }}
                                        />
                                    )}
                                    
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {project.technologies.map((tech, techIndex) => (
                                                <span 
                                                    key={techIndex}
                                                    className="bg-third text-black px-2 py-1 rounded-full text-xs"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    
                                    <p className="text-white text-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div>
            <SectionTitle title={"Projects"} />

            {/* Mobile View */}
            <div className="py-10">
                <MobileCardView />
            </div>

            {/* Desktop View - Mevcut tasarım */}
            <div className="hidden lg:flex lg:flex-row py-10 gap-10">
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