import React from 'react';
import { footers } from '../../resources/footer'; // footers verinizi buraya import edin

function Footer() {
  return (
    <footer className="text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {footers.map((footer, index) => (
            <div key={index}>
              <h2 className="text-lg font-bold mb-4">{footer.title}</h2>
              {footer.content && (
                <p className="text-gray-400">{footer.content}</p>
              )}
              {footer.links && (
                <ul className="space-y-2">
                  {footer.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        className="text-gray-400 hover:text-white transition"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {footer.socialLinks && (
                <div className="flex space-x-4">
                  {footer.socialLinks.map((social, socialIndex) => (
                    <a
                      key={socialIndex}
                      href={social.url}
                      className="text-gray-400 hover:text-white transition"
                    >
                      <i className={social.icon}></i> {/* Font Awesome icon */}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-500 mt-10">
        <p>© {new Date().getFullYear()} Created by yusuf inan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
