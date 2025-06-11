import React from 'react';

function LeftSider() {
  return (
    <div className="lg:fixed left-0 bottom-0 px-5">
      <div className="flex flex-col items-center">
        <div className="flex flex-col space-y-4">
          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/in/yusuf-inan-a42396266/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-blue-800 text-4xl hover:text-blue-600 transition duration-300"
          >
            <i className="ri-linkedin-box-fill"></i>
          </a>

          {/* Instagram Icon */}
          <a
            href="https://www.instagram.com/_yusufinan/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-pink-800 text-4xl hover:text-pink-600 transition duration-300"
          >
            <i className="ri-instagram-line"></i>
          </a>

          {/* Twitter Icon */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-blue-800 text-4xl hover:text-blue-600 transition duration-300"
          >
            <i className="ri-twitter-fill"></i>
          </a>

          {/* Gmail Icon */}
          <a
            href="mailto:iinanyusuf@gmail.com"
            aria-label="Email"
            className="text-4xl transition duration-300"
            style={{ color: '#D93025' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C62828')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#D93025')}
          >
            <i className="ri-mail-send-line"></i>
          </a>

          {/* GitHub Icon */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-4xl hover:text-gray-700 transition duration-300"
          >
            <i className="ri-github-fill"></i>
          </a>
        </div>

        {/* Vertical Line */}
        <div className="w-[1px] h-52 bg-[#125f63] mt-4"></div>
      </div>
    </div>
  );
}

export default LeftSider;
