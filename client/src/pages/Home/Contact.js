import React from "react";
import SectionTitle from "../../components/SectionTitle";

function Contact({ data }) {
  const { name, age, gender, email, mobile, country } = data;

  return (
    <div>
      <SectionTitle title={"Say Hello"} />

      {/* Flex container for image and JSON */}
      <div className="flex flex-col lg:flex-row h-full gap-10 w-full justify-center items-center">
        
        {/* JSON data display section */}
        <div className="w-full lg:w-1/2 p-5 rounded-lg shadow-lg">
          <pre
            className="text-white w-full"
            style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          >
            {JSON.stringify(
              {
                name: name,
                age: age,
                gender: gender,
                email: email,
                mobile: mobile,
                country: country,
              },
              null,
              2
            )}
          </pre>
        </div>

        {/* Image/Animation section */}
        <div className="w-full lg:w-1/3">
          <lottie-player
            src="https://lottie.host/af24b927-f4ee-45c9-8bad-af20c9ea2719/6PFvcS0zfi.json"
            background="transparent"
            speed="1"
            autoplay
            loop
            style={{ width: "100%", height: "auto" }}
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
