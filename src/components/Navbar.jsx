import React, { useState, useEffect } from 'react';
import '../styles/NavbarFooter.css';
import siteLogo from '../assets/images/logo/logo-mindhera-tech.png';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [activeLink, setActiveLink] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'portfolio', 'cta'];
      let currentSection = 'home';

      for (const sectionId of sections) {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop;
          if (window.scrollY >= sectionTop - 150) {
            currentSection = sectionId;
          }
        }
      }
      setActiveLink(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <a href="/">
          <img src={siteLogo} alt="Mindhera Tech Logo" className="site-logo" />
        </a>
      </div>
      
      <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>
        <li><a href="#home" className={activeLink === 'home' ? 'active' : ''} onClick={handleLinkClick}>Beranda</a></li>
        <li><a href="#services" className={activeLink === 'services' ? 'active' : ''} onClick={handleLinkClick}>Layanan</a></li>
        <li><a href="#portfolio" className={activeLink === 'portfolio' ? 'active' : ''} onClick={handleLinkClick}>Portfolio</a></li>
        <li><a href="#cta" className={activeLink === 'cta' ? 'active' : ''} onClick={handleLinkClick}>Kontak</a></li>
        
        <li className="nav-cta-mobile-wrapper">
          <a href="#cta" className="nav-cta-mobile" onClick={handleLinkClick}>Pesan Jasa</a>
        </li>
      </ul>
      
      <a href="#cta" className="nav-cta-desktop">Pesan Jasa</a>
      
      <div className="mobile-menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}

export default Navbar;