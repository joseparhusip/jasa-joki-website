// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaPlus, FaInstagram, FaShare } from 'react-icons/fa';
import '../styles/NavbarFooter.css';

function Footer() {
  const [isFabOpen, setIsFabOpen] = useState(false);
  
  // =================================================================
  // ===== LOGIKA BARU COOKIE DENGAN PERILAKU REFRESH DIMULAI SINI =====
  // =================================================================
  
  // State untuk menampilkan pop-up jika belum ada persetujuan permanen
  const [showCookiePopup, setShowCookiePopup] = useState(false);
  // State untuk menutup pop-up sementara (akan reset saat refresh)
  const [isDismissed, setIsDismissed] = useState(false);
  // State untuk menyimpan pilihan cookie analytics
  const [analyticsConsent, setAnalyticsConsent] = useState(true);

  // useEffect untuk memeriksa localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const permanentConsent = localStorage.getItem('cookieConsent');
    
    // Hanya tampilkan popup jika persetujuan permanen BELUM diberikan
    if (!permanentConsent) {
      setShowCookiePopup(true);
    }
  }, []); // Array kosong berarti efek ini hanya berjalan sekali saat mount

  // Fungsi saat pengguna MENERIMA cookies
  const handleAcceptCookies = () => {
    // Simpan persetujuan secara permanen di localStorage
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('analyticsConsent', analyticsConsent);
    // Tutup pop-up
    setIsDismissed(true);
  };

  // Fungsi saat pengguna MENOLAK cookies
  const handleDeclineCookies = () => {
    // Hanya tutup pop-up untuk sementara (state akan hilang saat refresh)
    setIsDismissed(true);
  };

  // ===========================================
  // ===== LOGIKA BARU UNTUK COOKIE SELESAI =====
  // ===========================================

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'JokiWeb.dev',
        text: 'Lihat portofolio dan layanan dari JokiWeb.dev!',
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Sharing is not supported on this browser.');
    }
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-socials">
          <a href="https://github.com/joseparhusip" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/joseparhusip/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://wa.me/6281292690095" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="mailto:joseparhusip7@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
        
        <p className="footer-tagline">
          Spesialis dalam pembuatan website modern dan responsif menggunakan teknologi terkini. Mari berkolaborasi untuk membangun proyek Anda selanjutnya.
        </p>

        <p className="footer-copyright">
          &copy; 2025 JokiWeb.dev - Solusi Cepat Website Impian Anda.
        </p>
      </footer>

      {/* Floating Action Button (FAB) */}
      <div className={`fab-container ${isFabOpen ? 'active' : ''}`}>
        <div className="fab-actions">
          <a href="https://wa.me/6281292690095" target="_blank" rel="noopener noreferrer" className="fab-action" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="https://www.instagram.com/joseparhusip_?igsh=a2VnbWF2b2x0dXRk" target="_blank" rel="noopener noreferrer" className="fab-action" aria-label="Instagram">
            <FaInstagram />
          </a>
          <button onClick={handleShare} className="fab-action" aria-label="Share">
            <FaShare />
          </button>
        </div>
        <button className="fab" onClick={() => setIsFabOpen(!isFabOpen)} aria-label="Toggle Actions">
          <FaPlus />
        </button>
      </div>

      {/* ================================================= */}
      {/* ===== KODE COOKIE POP-UP DENGAN LOGIKA BARU ===== */}
      {/* ================================================= */}
      {/* Tampilkan jika showCookiePopup true DAN belum ditutup sementara (isDismissed false) */}
      {showCookiePopup && !isDismissed && (
        <div className="cookie-overlay">
          <div className="cookie-popup">
            <h3>Kami Menghargai Privasi Anda</h3>
            <p className="cookie-text">
              Situs kami menggunakan *cookie* esensial untuk beroperasi. Kami juga ingin menggunakan *cookie* analitik untuk membantu kami meningkatkan pengalaman Anda dengan memahami bagaimana situs ini digunakan.
            </p>
            <div className="cookie-options">
              <div className="cookie-option">
                <input type="checkbox" id="necessary" checked disabled />
                <label htmlFor="necessary">
                  <strong>Necessary Cookies</strong>
                  <small>Penting untuk fungsionalitas dasar situs.</small>
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
                  <small>Membantu kami menganalisis lalu lintas situs.</small>
                </label>
              </div>
            </div>
            <div className="cookie-buttons">
              <button onClick={handleDeclineCookies} className="cookie-button decline">
                Decline
              </button>
              <button onClick={handleAcceptCookies} className="cookie-button accept">
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ======================================= */}
      {/* ===== KODE COOKIE POP-UP SELESAI ===== */}
      {/* ======================================= */}
    </>
  );
}

export default Footer;