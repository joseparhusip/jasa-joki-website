// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaPlus, FaInstagram, FaShare } from 'react-icons/fa';
import '../styles/NavbarFooter.css';

function Footer() {
  const [isFabOpen, setIsFabOpen] = useState(false);
  
  // =================================================================
  // ===== LOGIKA COOKIE YANG TELAH DISEMPURNAKAN =====================
  // =================================================================
  
  const [showCookiePopup, setShowCookiePopup] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);

  // Periksa status persetujuan cookie saat komponen dimuat
  useEffect(() => {
    const consentGiven = localStorage.getItem('cookieConsent');
    // Hanya tampilkan pop-up jika belum ada persetujuan sama sekali
    if (!consentGiven) {
      setShowCookiePopup(true);
    }
  }, []);

  // Fungsi saat pengguna MENERIMA pilihan cookie
  const handleAcceptCookies = () => {
    // Simpan persetujuan secara permanen
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('analyticsConsent', analyticsConsent.toString());
    // Sembunyikan pop-up
    setShowCookiePopup(false);
  };

  // Fungsi saat pengguna MENOLAK cookie opsional
  const handleDeclineCookies = () => {
    // Tetap simpan status persetujuan agar pop-up tidak muncul lagi,
    // namun nonaktifkan cookie analitik.
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('analyticsConsent', 'false');
    // Sembunyikan pop-up
    setShowCookiePopup(false);
  };

  // ===========================================
  // ===== AKHIR DARI LOGIKA COOKIE BARU ========
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
      // Fallback untuk browser yang tidak mendukung Web Share API
      alert('Fitur berbagi tidak didukung di browser ini. Anda bisa menyalin URL secara manual.');
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
      {/* ===== KODE COOKIE POP-UP YANG DISEMPURNAKAN ===== */}
      {/* ================================================= */}
      {showCookiePopup && (
        <div className="cookie-overlay">
          <div className="cookie-popup">
            <h3>Kami Menghargai Privasi Anda</h3>
            <p className="cookie-text">
              Situs ini menggunakan <strong>cookie</strong> esensial untuk fungsi dasar. Kami juga ingin memakai <strong>cookie</strong> analitik opsional untuk membantu meningkatkan pengalaman Anda dengan memahami bagaimana situs ini digunakan.
            </p>
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
      {/* ===== AKHIR DARI KODE COOKIE POP-UP ===== */}
      {/* ======================================= */}
    </>
  );
}

export default Footer;