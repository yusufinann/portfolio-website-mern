import React from "react";
import SectionTitle from "../../components/SectionTitle";

function About({ data }) {
  const {lottieURL, description1, description2, skills } = data;
  return (
    <div className="p-4">
      <SectionTitle title={"About Me"} />
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="h-[50vh] w-full flex justify-center">
          <dotlottie-player
            src={lottieURL}
            background="transparent"
            speed="1"
            style={{ width: "100%", height: "100%" }}
            loop
            autoplay
          ></dotlottie-player>
        </div>
        <div className="flex flex-col gap-5 w-full lg:w-1/2">
          <p className="text-white">{description1}</p>
          <p className="text-white">{description2}</p>
        </div>
      </div>
      <div className="py-5">
        <h1 className="text-third text-2xl mb-4">
          Here are a few technologies I've been working with recently:
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {skills.map((skill, index) => (
            <a
              key={index}
              href={skill.link}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-third py-2 px-2 flex flex-col items-center text-center gap-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-white/80 hover:shadow-lg transform"
            >
              <img
                src={skill.image}
                alt={skill.name}
                className="h-12 w-12 object-contain"
              />
              <h1 className="text-secondary text-lg font-semibold">{skill.name}</h1>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
