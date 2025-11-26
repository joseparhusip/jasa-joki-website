import React, { useState, useEffect, useRef } from 'react';
// --- REACT ICONS ---
import { 
  FaEnvelope, FaWhatsapp, FaLinkedin, FaCheckCircle, 
  FaLaptopCode, FaRocket, FaChevronDown, FaCode,
  FaChevronLeft, FaChevronRight, FaTimes, FaLayerGroup
} from 'react-icons/fa';

// --- STYLES ---
import '../styles/Home.css';

// --- ASSETS UTAMA ---
import heroImage from '../assets/images/carousel-1.png';
import imgOrang from '../assets/images/logo/img-orang.png';
import imgHp from '../assets/images/logo/img-hp.png';

// --- ASSETS PORTFOLIO (Sesuai Struktur Folder) ---
// 1. Mobile Page Images
import mobile1 from '../assets/images/portfolio/mobile-page/mobile-1.png';
import mobile2 from '../assets/images/portfolio/mobile-page/mobile-2.png';
import mobile3 from '../assets/images/portfolio/mobile-page/mobile-3.png';
import mobile4 from '../assets/images/portfolio/mobile-page/mobile-4.png';

// 2. Toko Online Images
import toko1 from '../assets/images/portfolio/toko-online/toko-online-1.jpeg';
import toko2 from '../assets/images/portfolio/toko-online/toko-online-2.jpeg';
import toko3 from '../assets/images/portfolio/toko-online/toko-online-3.jpeg';

// 3. Website Page (Admin JEC)
import web1 from '../assets/images/portfolio/website-page/administrator-jec.png';
import web2 from '../assets/images/portfolio/website-page/administrator-jec-2.png';
import web3 from '../assets/images/portfolio/website-page/administrator-jec-3.png';
import web4 from '../assets/images/portfolio/website-page/administrator-jec-4.png';

// Placeholder (Jika gambar belum ada)
const imgJeremy = null; 
const imgRandom1 = null; 
const imgRandom2 = null;

// --- DATA: TESTIMONIAL ---
const testimonialData = [
  {
    quote: "Mindhera Tech benar-benar mengubah cara bisnis kami beroperasi. Website yang mereka bangun membuat kami lebih independen dan berhasil mendatangkan lebih banyak customer.",
    name: "Alia Mega Putri",
    title: "Owner of Eaton Indonesia",
    image: imgJeremy,
  },
  {
    quote: "Dengan dashboard admin yang intuitif, pengelolaan website menjadi sangat efisien. Fitur SEO pada setiap halaman juga sangat membantu kami mendapatkan peringkat lebih baik di Google.",
    name: "Ravendiartha Muclas Aldino",
    title: "CEO L.tru Studio",
    image: imgRandom1,
  },
  {
    quote: "Kualitas aplikasi yang dikerjakan sangat memuaskan, desainnya elegan dan modern. Komunikasi selama proses pengerjaan juga sangat lancar dan profesional.",
    name: "Sri Nuryani Pujiastuti",
    title: "Owner Rh. Studio Arsitek",
    image: imgRandom2,
  },
];

// --- DATA: PORTFOLIO ---
const portfolioData = [
  {
    id: 1,
    title: "Aplikasi Mobile Trivo",
    category: "Mobile App",
    tech: "Flutter, Firebase, Figma",
    description: "Aplikasi mobile yang responsif dengan fitur autentikasi dan manajemen data real-time.",
    coverImage: mobile1, 
    gallery: [mobile1, mobile2, mobile3, mobile4] 
  },
  {
    id: 2,
    title: "Website E-commerce Fesyen",
    category: "Web Development",
    tech: "React, Node.js, Express, MySQL",
    description: "Platform jual beli online lengkap dengan fitur keranjang belanja dan payment gateway.",
    coverImage: toko1,
    gallery: [toko1, toko2, toko3]
  },
  {
    id: 3,
    title: "Admin Dashboard System",
    category: "Web App",
    tech: "React, Material UI, Recharts",
    description: "Sistem manajemen admin untuk memantau data user, transaksi, dan laporan bulanan.",
    coverImage: web1,
    gallery: [web1, web2, web3, web4]
  },
  {
    id: 4,
    title: "Company Profile Corporate",
    category: "Web Design",
    tech: "HTML, CSS, JavaScript",
    description: "Website profil perusahaan modern untuk meningkatkan branding klien.",
    coverImage: null, 
    gallery: [] 
  }
];

// --- DATA: FAQ ---
const faqData = [
    {
        question: "Apa saja layanan yang ditawarkan?",
        answer: "Kami fokus pada 4 layanan utama sesuai kebutuhan Anda: 1) UI/UX Design, 2) Pembuatan Landing Page, 3) Website Company Profile, dan 4) Joki Website (Tugas/Skripsi)."
    },
    {
        question: "Berapa lama waktu pengerjaan proyek?",
        answer: "Durasi proyek bervariasi. Landing page bisa selesai dalam 3-5 hari, Company Profile 1-2 minggu, dan Joki Website tergantung kompleksitas fitur yang diminta."
    },
    {
        question: "Apakah harga Joki Website bisa nego?",
        answer: "Harga Joki Website kami mulai dari 500rb hingga 1.5jt tergantung tingkat kesulitan dan deadline. Silahkan konsultasikan detail tugas Anda untuk penawaran terbaik."
    }
];

function Home() {
  // --- STATE MANAGEMENT ---
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [openFaq, setOpenFaq] = useState(null);
  
  const [quickFormSubmitted, setQuickFormSubmitted] = useState(false);
  const [quickFormData, setQuickFormData] = useState({
    name: '', email: '', phone: '', service: ''
  });
  const [quickFormErrors, setQuickFormErrors] = useState({});

  const [selectedProject, setSelectedProject] = useState(null); 

  const scrollRef = useRef(null);

  // --- FUNGSI SCROLL PORTFOLIO (Disesuaikan dengan lebar kartu baru) ---
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      // Geser sesuai lebar kartu + gap (480px + 32px gap = approx 512px)
      const scrollAmount = 510; 
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-section');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.hidden-section, .hero');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      console.log("Form Data Submitted:", formData);
      setFormSubmitted(true);
    } else {
      alert("Harap isi semua kolom sebelum mengirim.");
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openProjectDetail = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; 
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; 
  };

  const handleQuickInputChange = (e) => {
    const { name, value } = e.target;
    setQuickFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateQuickForm = () => {
    const errors = {};
    if (!quickFormData.name) errors.name = "Mohon isi ruas ini.";
    if (!quickFormData.email) errors.email = "Mohon isi ruas ini.";
    if (!quickFormData.phone) errors.phone = "Mohon isi ruas ini.";
    if (!quickFormData.service) errors.service = "Mohon pilih salah satu.";
    return errors;
  };
  
  const handleQuickFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateQuickForm();
    setQuickFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Quick Form Data Submitted:", quickFormData);
      setQuickFormSubmitted(true);
    }
  };

  return (
    <div className="home-container">
      
      {/* === SECTION HERO === */}
      <section id="home" className="hero">
        <div className="section-content-wrapper" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4rem', width: '100%', maxWidth: '1100px', margin: '0 auto'}}>
          <div className="hero-image-container">
            <img src={heroImage} alt="Mindhera Tech - Digital Solutions" className="hero-image"/>
            <span className="bubble b1"></span>
            <span className="bubble b2"></span>
            <span className="bubble b3"></span>
            <span className="bubble b4"></span>
            <span className="bubble b5"></span>
          </div>
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="highlight">Mindhera</span> Tech
            </h1>
            <p className="hero-subtitle">
              Solusi digital terpercaya untuk Jasa Website, UI/UX, dan Joki Tugas Coding. 
              Kami membantu kebutuhan digital Anda dengan harga terjangkau dan kualitas profesional.
            </p>
            <a href="#cta" className="hero-button">Mulai Proyek</a>
          </div>
        </div>
      </section>

      {/* === SECTION: QUICK FORM === */}
      <section id="quick-form" className="quick-form-section hidden-section">
        <div className="section-content-wrapper">
          <h2 className="quick-form-title">
            BUTUH WEBSITE ATAU JOKI TUGAS?
            <span>Silahkan isi Form di bawah ini!</span>
          </h2>
          <div className="quick-form-container">
            {quickFormSubmitted ? (
              <div className="thank-you-message">
                <h3>Terima Kasih!</h3>
                <p>Data Anda telah kami terima. Tim kami akan segera menghubungi Anda.</p>
              </div>
            ) : (
              <form onSubmit={handleQuickFormSubmit} noValidate>
                <div className="quick-form-grid">
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Nama" value={quickFormData.name} onChange={handleQuickInputChange} />
                    {quickFormErrors.name && <p className="error-message">{quickFormErrors.name}</p>}
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="E-mail" value={quickFormData.email} onChange={handleQuickInputChange} />
                    {quickFormErrors.email && <p className="error-message">{quickFormErrors.email}</p>}
                  </div>
                  <div className="form-group">
                    <input type="tel" name="phone" placeholder="Nomor Hp" value={quickFormData.phone} onChange={handleQuickInputChange} />
                    {quickFormErrors.phone && <p className="error-message">{quickFormErrors.phone}</p>}
                  </div>
                  <div className="form-group">
                    <select name="service" value={quickFormData.service} onChange={handleQuickInputChange}>
                      <option value="" disabled>--Pilih Layanan--</option>
                      <option value="UI/UX Design">Jasa UI/UX (Landing Page/Web)</option>
                      <option value="Company Profile">Jasa Company Profile</option>
                      <option value="Landing Page">Jasa Landing Page</option>
                      <option value="Joki Website">Jasa Joki Website (Tugas/Skripsi)</option>
                    </select>
                    {quickFormErrors.service && <p className="error-message">{quickFormErrors.service}</p>}
                  </div>
                  <div className="form-group form-group-button">
                    <button type="submit" className="hero-button">Kirim Pesan</button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* === SECTION: SERVICES === */}
      <section id="services" className="services hidden-section">
        <div className="section-content-wrapper">
          <h2 className="section-title">Layanan & Solusi Digital Kami</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon"><FaRocket /></div>
              <h3>UI/UX Design</h3>
              <p>Desain Landing Page mulai dari 300rb dan Web Design Komplit mulai dari 800rb dengan tampilan modern.</p>
            </div>
            <div className="service-card">
              <div className="service-icon"><FaLaptopCode /></div>
              <h3>Company Profile</h3>
              <p>Website profil perusahaan profesional dengan harga terjangkau (600rb - 1jt) untuk meningkatkan kredibilitas.</p>
            </div>
            <div className="service-card">
              <div className="service-icon"><FaCode /></div>
              <h3>Joki Website</h3>
              <p>Bantuan pengerjaan tugas coding atau website skripsi (500rb - 1.5jt). Aman, cepat, dan include revisi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION: PORTFOLIO === */}
      <section id="portfolio" className="portfolio hidden-section">
        {/* Style inline ini untuk memastikan wrapper mengambil lebar penuh jika perlu */}
        <div className="section-content-wrapper" style={{maxWidth: '100%', paddingLeft: '1rem', paddingRight: '1rem'}}>
          <h2 className="section-title">Portofolio Proyek Kami</h2>
          
          <div className="portfolio-slider-container">
            <button className="nav-btn prev-btn" onClick={() => scroll('left')}>
              <FaChevronLeft />
            </button>

            <div className="portfolio-scroller" ref={scrollRef}>
              <div className="portfolio-track">
                {portfolioData.map((item) => (
                  <div 
                    className="portfolio-item" 
                    key={item.id}
                    onClick={() => openProjectDetail(item)}
                  >
                    {item.coverImage ? (
                      <img src={item.coverImage} alt={item.title} />
                    ) : (
                      <div className="placeholder-img">Coming Soon</div>
                    )}
                    <div className="click-indicator">Klik untuk Detail</div>
                    <div className="portfolio-overlay">
                      <h3>{item.title}</h3>
                      <p>{item.tech}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="nav-btn next-btn" onClick={() => scroll('right')}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>
      
      {/* === MODAL POPUP PORTFOLIO === */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeProjectDetail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeProjectDetail}>
              <FaTimes />
            </button>
            <div className="modal-header">
              <h2 className="modal-title">{selectedProject.title}</h2>
              <div className="modal-tech">
                 <FaLayerGroup style={{marginRight: '8px'}}/> {selectedProject.tech}
              </div>
              <p style={{marginTop: '1rem', lineHeight: '1.6', color: 'var(--text-color)'}}>
                {selectedProject.description}
              </p>
            </div>
            <h4 style={{color: 'var(--subtitle-color)'}}>Gallery Preview:</h4>
            <div className="modal-gallery-grid">
              {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
                selectedProject.gallery.map((img, index) => (
                  <div key={index} className="gallery-item">
                    <img src={img} alt={`Detail ${selectedProject.title} ${index + 1}`} />
                  </div>
                ))
              ) : (
                <p>Tidak ada gambar tambahan untuk proyek ini.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* === SECTION: WHY US === */}
      <section id="why-us" className="why-us hidden-section">
        <div className="section-content-wrapper">
          <div className="why-us-container">
            <div className="why-us-image-container">
              <img src={imgHp} alt="Teknologi Mindhera Tech" className="why-us-image"/>
            </div>
            <div className="why-us-content">
              <h2 className="section-title">Mengapa Memilih Kami?</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <h4>💰 Harga Bersahabat</h4>
                  <p>Solusi digital dengan harga mahasiswa namun kualitas tetap profesional dan memuaskan.</p>
                </div>
                <div className="feature-card">
                  <h4>🎨 Desain Modern</h4>
                  <p>Tampilan UI/UX yang kekinian dan responsif di semua perangkat (HP, Tablet, Laptop).</p>
                </div>
                <div className="feature-card">
                  <h4>⚡ Pengerjaan Cepat</h4>
                  <p>Deadline mepet? Tenang, kami siap membantu mengerjakan proyek Anda tepat waktu.</p>
                </div>
              </div>  
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION: PROCESS === */}
      <section id="process" className="process hidden-section">
        <div className="section-content-wrapper">
          <h2 className="section-title">Proses Kerja Kami</h2>
          <div className="process-timeline">
            <div className="process-step"><div className="process-number">1</div><h3>Konsultasi</h3><p>Diskusi kebutuhan website atau detail tugas joki Anda.</p></div>
            <div className="process-step"><div className="process-number">2</div><h3>Deal Harga</h3><p>Kesepakatan harga dan estimasi waktu pengerjaan.</p></div>
            <div className="process-step"><div className="process-number">3</div><h3>Pengerjaan</h3><p>Proses coding dan desain dilakukan dengan teliti.</p></div>
            <div className="process-step"><div className="process-number">4</div><h3>Serah Terima</h3><p>File dikirim, demo aplikasi, dan revisi jika diperlukan.</p></div>
          </div>
        </div>
      </section>
      
      {/* === SECTION: CTA === */}
      <section id="cta" className="cta hidden-section">
        <div className="section-content-wrapper">
          <div className="cta-container">
            <div className="cta-image-container"><img src={imgOrang} alt="Hubungi Mindhera Tech" className="cta-image"/></div>
            <div className="cta-content">
              <h2 className="section-title">Butuh Bantuan Coding?</h2>
              <p className="cta-subtitle">Jangan ragu untuk tanya-tanya dulu. Admin ramah dan fast respon!</p>
              <a href="#contact" className="hero-button">Hubungi Sekarang</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* === SECTION: TESTIMONIALS === */}
      <section id="testimonials" className="testimonials hidden-section">
        <div className="section-content-wrapper">
          <h2 className="section-title">Testimoni Klien</h2>
          <div className="testimonial-grid">
            {testimonialData.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="testimonial-text">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  {testimonial.image && (<img src={testimonial.image} alt={testimonial.name} className="author-image"/>)}
                  <div className="author-details"><h4>{testimonial.name}</h4><p>{testimonial.title}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* === SECTION: PRICING === */}
      <section id="pricing" className="pricing-section hidden-section">
        <div className="section-content-wrapper">
          <h2 className="pricing-title">Daftar Harga Vendor</h2>
          <p className="pricing-subtitle">Pilih paket sesuai budget dan kebutuhan Anda.</p>
          <div className="pricing-grid">
            
            {/* ITEM 1: LANDING PAGE */}
            <div className="pricing-card">
              <div className="plan-header"><h3 className="plan-name">Landing Page</h3><p className="plan-description">Halaman tunggal untuk promosi produk atau event.</p></div>
              <p className="price-old">Rp. 750.000</p><p className="price-new">Rp. 500.000</p>
              <ul className="plan-features">
                <li><FaCheckCircle /> One Page Website</li>
                <li><FaCheckCircle /> Responsive Mobile</li>
                <li><FaCheckCircle /> Revisi Minor</li>
              </ul>
              <div className="price-button-container"><a href="https://wa.me/6282298385531" target="_blank" rel="noopener noreferrer" className="hero-button">Pesan Sekarang</a></div>
            </div>

            {/* ITEM 2: COMPANY PROFILE (HIGHLIGHT) */}
            <div className="pricing-card card-highlight">
              <div className="plan-header"><h3 className="plan-name">Company Profile</h3><p className="plan-description">Website profil bisnis lengkap agar terlihat profesional.</p></div>
              <p className="price-old">Rp. 1.500.000</p><p className="price-new">600K - 1 Juta</p>
              <ul className="plan-features">
                <li><FaCheckCircle /> Up to 5 Halaman</li>
                <li><FaCheckCircle /> Desain Premium</li>
                <li><FaCheckCircle /> SEO Friendly Basic</li>
              </ul>
              <div className="price-button-container"><a href="https://wa.me/6282298385531" target="_blank" rel="noopener noreferrer" className="hero-button">Pesan Sekarang</a></div>
            </div>

            {/* ITEM 3: UI/UX DESIGN */}
            <div className="pricing-card">
              <div className="plan-header"><h3 className="plan-name">UI/UX Design</h3><p className="plan-description">Desain tampilan website/aplikasi di Figma.</p></div>
              <p className="price-new" style={{fontSize: '1.8rem'}}>300K - 800K</p>
              <ul className="plan-features">
                <li><FaCheckCircle /> Landing Page: 300K</li>
                <li><FaCheckCircle /> Web Design: 800K</li>
                <li><FaCheckCircle /> File Master Figma</li>
              </ul>
              <div className="price-button-container"><a href="https://wa.me/6282298385531" target="_blank" rel="noopener noreferrer" className="hero-button">Pesan Sekarang</a></div>
            </div>
          </div>

          <div className="secondary-pricing-grid">
            {/* ITEM 4: JOKI WEBSITE */}
            <div className="secondary-card" style={{maxWidth: '600px', border: '2px solid var(--primary-color)'}}>
              <h4>xJoki Website (Tugas/Skripsi)</h4>
              <p>Solusi untuk mahasiswa yang butuh bantuan coding tugas akhir atau project kuliah. Include Source Code & Database.</p>
              
              <h3 className="xjoki-price">Rp. 500.000 - 1.500.000</h3>
              
              <div className="price-button-container"><a href="https://wa.me/6282298385531" target="_blank" rel="noopener noreferrer" className="hero-button">Konsultasi Tugas</a></div>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION: FAQ === */}
      <section id="faq" className="faq-section hidden-section">
        <div className="section-content-wrapper">
            <div className="faq-container">
                <div className="faq-content">
                    <h2 className="faq-title">Masih bingung? <br/>Kami siap membantu</h2>
                    <p className="faq-subtitle">Tanyakan apa saja seputar kebutuhan digital Anda, dan kami akan memberikan solusi terbaik.</p>
                </div>
                <div className="faq-accordion">
                    {faqData.map((item, index) => (
                        <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={index} onClick={() => toggleFaq(index)}>
                            <div className="faq-question">
                                <span>{item.question}</span>
                                <FaChevronDown className="faq-toggle" />
                            </div>
                            <div className="faq-answer">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>
      
      {/* === SECTION: CONTACT === */}
      <section id="contact" className="contact hidden-section">
        <div className="section-content-wrapper">
          <h2 className="section-title">Hubungi Kami</h2>
          <p className="contact-subtitle">Punya pertanyaan atau ingin memulai proyek? Kirimkan pesan kepada kami!</p>
          <div className="contact-container">
            <div className="contact-info">
              <h3>Informasi Kontak</h3>
              <p>Mindhera Tech siap menjadi mitra digital Anda. Hubungi kami melalui:</p>
              <div className="contact-item">
                <FaEnvelope />
                <a href="mailto:mindheratech@gmail.com">mindheratech@gmail.com</a>
              </div>
              <div className="contact-item">
                <FaWhatsapp />
                <a href="https://wa.me/6282298385531" target="_blank" rel="noopener noreferrer">+62 822-9838-5531</a>
              </div>
              <div className="contact-item">
                <FaLinkedin />
                <a href="https://www.linkedin.com/company/mindheratech/about/" target="_blank" rel="noopener noreferrer">Mindhera Tech</a>
              </div>
            </div>
            <div className="contact-form">
              {formSubmitted ? (
                <div className="thank-you-message"><h3>Terima Kasih!</h3><p>Pesan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda kembali.</p></div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <input type="text" name="name" placeholder="Nama Anda" value={formData.name} onChange={handleInputChange} required />
                  <input type="email" name="email" placeholder="Email Anda" value={formData.email} onChange={handleInputChange} required />
                  <textarea name="message" rows="6" placeholder="Jelaskan kebutuhan proyek Anda..." value={formData.message} onChange={handleInputChange} required></textarea>
                  <button type="submit" className="hero-button">Kirim Pesan</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;