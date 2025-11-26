import React, { useState, useEffect } from 'react';
import '../styles/NavbarFooter.css';
// Pastikan sudah run: npm install lucide-react
import { Menu, X } from 'lucide-react';

// --- PERBAIKAN DI SINI ---
// Import gambar dari folder assets lokal
import logoMindhera from '../assets/images/logo/logo-mindhera-tech.png';

function Navbar() {
  const [activeLink, setActiveLink] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // --- STATE UNTUK MODAL PEMESANAN ---
  const [showModal, setShowModal] = useState(false);
  const [orderData, setOrderData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    notes: '' 
  });

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- LOGIKA MODAL POPUP ---
  const toggleModal = (e) => {
    if (e) e.preventDefault();
    setShowModal(!showModal);
    
    if (!showModal && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // --- EFEK: MATIKAN SCROLL BODY SAAT MODAL MUNCUL ---
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, service, notes } = orderData;

    if (!name || !email || !phone || !service) {
      alert("Harap lengkapi data wajib (Nama, Email, HP, Layanan).");
      return;
    }

    const adminNumber = "6282298385531"; 

    // Format pesan WhatsApp
    const text = `Halo Admin Mindhera Tech, saya ingin memesan jasa.\n\n` +
                 `👤 *Data Pemesanan:*\n` +
                 `Nama: ${name}\n` +
                 `Email: ${email}\n` +
                 `No HP: ${phone}\n` +
                 `Layanan: ${service}\n\n` +
                 `📝 *Catatan / Detail Website:*\n${notes || '-'}\n\n` +
                 `Mohon infonya lebih lanjut. Terima kasih!`;
                 
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');

    setOrderData({ name: '', email: '', phone: '', service: '', notes: '' });
    setShowModal(false);
  };

  // --- SCROLL SPY EFFECT ---
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
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <a href="/">
            {/* Menggunakan variabel import logoMindhera di sini */}
            <img src={logoMindhera} alt="Mindhera Tech Logo" className="site-logo" />
          </a>
        </div>
        
        <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>
          <li><a href="#home" className={activeLink === 'home' ? 'active' : ''} onClick={handleLinkClick}>Beranda</a></li>
          <li><a href="#services" className={activeLink === 'services' ? 'active' : ''} onClick={handleLinkClick}>Layanan</a></li>
          <li><a href="#portfolio" className={activeLink === 'portfolio' ? 'active' : ''} onClick={handleLinkClick}>Portfolio</a></li>
          <li><a href="#cta" className={activeLink === 'cta' ? 'active' : ''} onClick={handleLinkClick}>Kontak</a></li>
          
          <li className="nav-cta-mobile-wrapper">
            <a href="#" className="nav-cta-mobile" onClick={toggleModal}>Pesan Jasa</a>
          </li>
        </ul>
        
        <a href="#" className="nav-cta-desktop" onClick={toggleModal}>Pesan Jasa</a>
        
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </nav>

      {/* === MODAL POPUP FORM PEMESANAN === */}
      {showModal && (
        <div className="order-modal-overlay" onClick={toggleModal}>
          <div className="order-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-order-modal" onClick={toggleModal}>&times;</button>
            
            <h2 className="order-modal-title">Form Pemesanan</h2>
            <p className="order-modal-subtitle">Ceritakan kebutuhan website Anda, kami akan segera merespon via WhatsApp.</p>
            
            <form onSubmit={handleWhatsAppSubmit}>
              {/* Nama Lengkap */}
              <div className="order-form-group">
                <input 
                  type="text" 
                  name="name" 
                  className="order-input" 
                  placeholder="Nama Lengkap" 
                  value={orderData.name}
                  onChange={handleOrderInputChange}
                  required
                />
              </div>
              
              {/* Grid untuk Email dan HP */}
              <div className="order-grid-two">
                <div className="order-form-group">
                  <input 
                    type="email" 
                    name="email" 
                    className="order-input" 
                    placeholder="E-mail" 
                    value={orderData.email}
                    onChange={handleOrderInputChange}
                    required
                  />
                </div>

                <div className="order-form-group">
                  <input 
                    type="tel" 
                    name="phone" 
                    className="order-input" 
                    placeholder="No. WhatsApp" 
                    value={orderData.phone}
                    onChange={handleOrderInputChange}
                    required
                  />
                </div>
              </div>

              {/* Pilihan Layanan */}
              <div className="order-form-group">
                <select 
                  name="service" 
                  className="order-select" 
                  value={orderData.service} 
                  onChange={handleOrderInputChange}
                  required
                >
                  <option value="" disabled>--Pilih Layanan--</option>
                  <option value="Jasa UI/UX (Landing Page/Web)">Jasa UI/UX (Landing Page/Web)</option>
                  <option value="Jasa Company Profile">Jasa Company Profile</option>
                  <option value="Jasa Landing Page">Jasa Landing Page</option>
                  <option value="Jasa Joki Website (Tugas/Skripsi)">Jasa Joki Website (Tugas/Skripsi)</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              {/* Textarea untuk Catatan */}
              <div className="order-form-group">
                <textarea 
                  name="notes" 
                  className="order-input" 
                  placeholder="Detail Website (Cth: Tema minimalis warna biru, fitur login, referensi website A...)" 
                  value={orderData.notes}
                  onChange={handleOrderInputChange}
                  rows="3"
                ></textarea>
              </div>

              <button type="submit" className="order-submit-btn">Kirim Pesan</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;