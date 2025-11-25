import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaPlus, FaInstagram, FaShare, FaPaperPlane } from 'react-icons/fa';
import '../styles/NavbarFooter.css';

function Footer() {
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [showCookiePopup, setShowCookiePopup] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    const consentGiven = localStorage.getItem('cookieConsent');
    if (!consentGiven) {
      setShowCookiePopup(true);
    }
    const storedAnalytics = localStorage.getItem('analyticsConsent');
    if (storedAnalytics !== null) {
      setAnalyticsConsent(storedAnalytics === 'true');
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('analyticsConsent', analyticsConsent.toString());
    setShowCookiePopup(false);
  };

  const handleDeclineCookies = () => {
    setAnalyticsConsent(false);
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('analyticsConsent', 'false');
    setShowCookiePopup(false);
  };
  
  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Mindhera Tech',
        text: 'Lihat portofolio dan layanan dari Mindhera Tech!',
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Fitur berbagi tidak didukung di browser ini. Anda bisa menyalin URL secara manual.');
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      alert(`Terima kasih telah berlangganan dengan email: ${newsletterEmail}`);
      setNewsletterEmail('');
    }
  };

  return (
    <>
      <footer className="footer-new">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>Mindhera Tech</h3>
              <p>Solusi digital inovatif untuk mendorong pertumbuhan bisnis Anda.</p>
            </div>
            <div className="footer-newsletter">
              <h4>Berlangganan Info Terbaru</h4>
              <p>Dapatkan update proyek, artikel, dan penawaran spesial langsung di email Anda.</p>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  placeholder="Masukkan email Anda" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required 
                />
                <button type="submit" aria-label="Berlangganan"><FaPaperPlane /></button>
              </form>
            </div>
          </div>

          <div className="footer-main">
            <div className="footer-column">
              <h4>Layanan</h4>
              <ul>
                <li><a href="#services">Pengembangan Website</a></li>
                <li><a href="#services">Pengembangan Aplikasi</a></li>
                <li><a href="#services">Desain UI/UX</a></li>
                <li><a href="#services">Solusi E-commerce</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Perusahaan</h4>
              <ul>
                <li><a href="#why-us">Tentang Kami</a></li>
                <li><a href="#portfolio">Portofolio</a></li>
                <li><a href="#process">Proses Kerja</a></li>
                <li><a href="#contact">Hubungi Kami</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Kebijakan Privasi</a></li>
                <li><a href="#">Syarat & Ketentuan</a></li>
                <li><a href="#">Pengaturan Cookie</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Hubungi Kami</h4>
              <p>Bandung, Jawa Barat, Indonesia</p>
              {/* Menggunakan email yang konsisten dengan bagian sosial media */}
              <p><a href="mailto:joseparhusip7@gmail.com">joseparhusip7@gmail.com</a></p>
              <div className="footer-socials-new">
                <a href="https://github.com/joseparhusip" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/joseparhusip/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="https://wa.me/6281292690095" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
                <a href="mailto:joseparhusip7@gmail.com" aria-label="Email"><FaEnvelope /></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Mindhera Tech. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <div className={`fab-container ${isFabOpen ? 'active' : ''}`}>
        <div className="fab-actions">
          <a href="https://wa.me/6281292690095" target="_blank" rel="noopener noreferrer" className="fab-action" aria-label="WhatsApp"><FaWhatsapp /></a>
          <a href="https://www.instagram.com/joseparhusip_?igsh=a2VnbWF2b2x0dXRk" target="_blank" rel="noopener noreferrer" className="fab-action" aria-label="Instagram"><FaInstagram /></a>
          <button onClick={handleShare} className="fab-action" aria-label="Share"><FaShare /></button>
        </div>
        <button className="fab" onClick={() => setIsFabOpen(!isFabOpen)} aria-label="Toggle Actions"><FaPlus /></button>
      </div>

      {showCookiePopup && (
        <div className="cookie-overlay">
          <div className="cookie-popup">
            <h3>Kami Menghargai Privasi Anda</h3>
            <p className="cookie-text">Situs ini menggunakan <strong>cookie</strong> esensial untuk fungsi dasar. Kami juga ingin memakai <strong>cookie</strong> analitik opsional untuk membantu meningkatkan pengalaman Anda.</p>
            <div className="cookie-options">
              <div className="cookie-option">
                <input type="checkbox" id="necessary" checked disabled />
                <label htmlFor="necessary">
                  <strong>Necessary Cookies</strong>
                  <small>Penting untuk fungsionalitas inti situs.</small>
                </label>
              </div>
              <div className="cookie-option">
                <input 
                  type="checkbox" 
                  id="analytics" 
                  checked={analyticsConsent} 
                  onChange={(e) => setAnalyticsConsent(e.target.checked)} 
                />
                <label htmlFor="analytics">
                  <strong>Analytics Cookies</strong>
                  <small>Membantu kami menganalisis lalu lintas dan performa situs.</small>
                </label>
              </div>
            </div>
            <div className="cookie-buttons">
              <button onClick={handleDeclineCookies} className="cookie-button decline">Decline</button>
              <button onClick={handleAcceptCookies} className="cookie-button accept">Accept</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;