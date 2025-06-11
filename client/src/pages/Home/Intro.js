import React from "react";

function Intro({data}) {
  const {welcomeText, firstName, lastName, caption,description } = data;
  return (
    <div className="min-h-[80vh] bg-primary flex flex-col items-start justify-center gap-6 py-10 px-5 md:px-10 lg:px-20">
      
      <h1 className="text-white text-3xl md:text-4xl lg:text-5xl">{welcomeText}</h1>
      <h1 className="text-4xl md:text-6xl lg:text-7xl text-secondary font-semibold">
        {firstName} {lastName}
      </h1>
      <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-semibold">
        {caption}
      </h1>
      <p className="text-white w-full md:w-2/3 lg:w-1/2">
     {description}
      </p>
      <button className="border-2 border-third text-white px-5 py-2 md:px-8 md:py-3 rounded transition-all duration-300 hover:bg-third hover:text-black">
        Get Started
      </button>
    </div>
  );
}

export default Intro;
