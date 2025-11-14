import React, { useState } from "react";
import Logo from "../assets/images/Logo Tsany.png"; 

function Header({ language, setLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: language === "EN" ? "Home" : "Beranda" },
    { href: "#projects", label: language === "EN" ? "Projects" : "Proyek" },
    { href: "#about", label: language === "EN" ? "About" : "Tentang" },
    { href: "#contact", label: language === "EN" ? "Contact" : "Kontak" },
  ];

  return (
    <header className="fixed top-0 w-full bg-gray-800 shadow z-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <a href="#home" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 w-auto object-contain select-none"
          />
        </a>

        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={() => setLanguage(language === "EN" ? "ID" : "EN")}
            className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors duration-300 text-gray-200"
            aria-label="Toggle Language"
          >
            {language}
          </button>
        </nav>

        <div className="flex items-center space-x-4 md:hidden">
          <button
            className="p-2 text-gray-200 bg-gray-700 hover:bg-gray-600 rounded transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden bg-gray-800 border-t transition-all duration-500 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-60 opacity-100 py-4" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-4 px-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-300 hover:text-purple-400 transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}

          <li>
            <button
              onClick={() => setLanguage(language === "EN" ? "ID" : "EN")}
              className="w-full text-left p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors duration-300 text-gray-200"
              aria-label="Toggle Language"
            >
              {language}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
