import React, { useState, useEffect } from 'react';
// --- PENAMBAHAN IKON BARU DARI REACT-ICONS ---
import { FaEnvelope, FaWhatsapp, FaGithub, FaLinkedin, FaCheckCircle, FaLaptopCode, FaShoppingCart, FaRocket, FaChevronDown } from 'react-icons/fa';
import '../styles/Home.css';
import heroImage from '../assets/images/carousel-1.png';

// --- GAMBAR PORTOFOLIO DI-IMPORT (SET TO NULL) ---
const portfolioTrivo = null;
const portfolioTrivo1 = null;
const portfolioDashboard = null;
const portfolioEcommerce = null;
import imgOrang from '../assets/images/logo/img-orang.png';

// --- PENAMBAHAN IMPORT GAMBAR HP BARU ---
import imgHp from '../assets/images/logo/img-hp.png';

// --- GAMBAR BARU UNTUK TESTIMONIAL (DIUBAH MENJADI null UNTUK MENGHINDARI ERROR RESOLVE PATH) ---
const imgJeremy = null;
const imgRandom1 = null;
const imgRandom2 = null;

// --- DATA TESTIMONI BARU ---
const testimonialData = [
  {
    quote: "Youth Technology Creation benar-benar mengubah cara bisnis kami beroperasi. Website yang mereka bangun membuat kami lebih independen dan berhasil mendatangkan lebih banyak customer.",
    name: "Mr. Jeremy Rusli",
    title: "Owner of Eaton Indonesia",
    image: imgJeremy,
  },
  {
    quote: "Dengan dashboard admin yang intuitif, pengelolaan website menjadi sangat efisien. Fitur SEO pada setiap halaman juga sangat membantu kami mendapatkan peringkat lebih baik di Google.",
    name: "L.tru Studio",
    title: "CEO L.tru Studio",
    image: imgRandom1,
  },
  {
    quote: "Kualitas aplikasi yang dikerjakan sangat memuaskan, desainnya elegan dan modern. Komunikasi selama proses pengerjaan juga sangat lancar dan profesional.",
    name: "Rh. Studio Arsitek",
    title: "Owner Rh. Studio Arsitek",
    image: imgRandom2,
  },
];

// --- DATA PORTOFOLIO BARU UNTUK ANIMASI ---
const portfolioData = [
  {
    title: "Website E-commerce Fesyen",
    tech: "React, Node.js, Express",
    image: portfolioEcommerce,
    type: 'single'
  },
  {
    title: "Admin Dashboard & Management",
    tech: "React, Material UI, Recharts",
    image: portfolioDashboard,
    type: 'single'
  },
  {
    title: "Aplikasi Mobile Trivo",
    tech: "Flutter, Firebase, Figma",
    image: portfolioTrivo,
    image2: portfolioTrivo1,
    type: 'split'
  }
];

// --- DATA BARU UNTUK FAQ SECTION ---
const faqData = [
    {
        question: "Apa saja layanan yang ditawarkan?",
        answer: "Kami di Youth Technology Creation fokus pada tiga pilar utama: 1) Pembuatan Website & Aplikasi Perusahaan untuk profil profesional, 2) Solusi E-commerce lengkap untuk bisnis online Anda, dan 3) Desain Landing Page yang dioptimalkan untuk marketing dan konversi tinggi."
    },
    {
        question: "Berapa lama waktu pengerjaan proyek?",
        answer: "Durasi proyek sangat bervariasi tergantung kompleksitas. Rata-rata, sebuah landing page memakan waktu 1-2 minggu, website company profile sekitar 3-5 minggu, dan aplikasi custom bisa memakan waktu beberapa bulan. Kami akan memberikan estimasi timeline yang lebih akurat setelah sesi konsultasi awal."
    },
    {
        question: "Berapa kali revisi yang bisa saya dapatkan?",
        answer: "Kami mengutamakan kepuasan klien. Paket kami umumnya mencakup 2-3 kali sesi revisi mayor pada tahap desain dan pengembangan. Namun, kami fleksibel untuk penyesuaian minor selama proses pengerjaan untuk memastikan hasil akhir sesuai dengan visi Anda."
    }
];


function Home() {
  // State untuk form kontak bawah
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // State untuk accordion FAQ
  const [openFaq, setOpenFaq] = useState(null);

  // === STATE BARU UNTUK FORM PROFESIONAL ===
  const [quickFormSubmitted, setQuickFormSubmitted] = useState(false);
  const [quickFormData, setQuickFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: ''
  });
  const [quickFormErrors, setQuickFormErrors] = useState({});

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

  // Handler untuk form kontak bawah
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

  // Handler untuk FAQ
  const toggleFaq = (index) => {
    if (openFaq === index) {
        setOpenFaq(null);
    } else {
        setOpenFaq(index);
    }
  };

  // === HANDLER BARU UNTUK FORM PROFESIONAL ===
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
      {/* SECTION HERO */}
      <section id="home" className="hero">
        <div className="section-content-wrapper" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4rem', width: '100%', maxWidth: '1100px', margin: '0 auto'}}>
          <div className="hero-image-container">
            <img src={heroImage} alt="Youth Technology Creation - Vendor Website & Aplikasi" className="hero-image"/>
            <span className="bubble b1"></span>
            <span className="bubble b2"></span>
            <span className="bubble b3"></span>
            <span className="bubble b4"></span>
            <span className="bubble b5"></span>
          </div>
          <div className="hero-content">
            <h1 className="hero-title"><span className="highlight">Youth Technology</span> Creation</h1>
            <p className="hero-subtitle">Wujudkan Visi Digital Anda. Kami adalah vendor pengembangan website dan aplikasi custom untuk segala kebutuhan bisnis Anda.</p>
            <a href="#cta" className="hero-button">Mulai Proyek</a>
          </div>
        </div>
      </section>

      {/* === KODE SECTION BARU: FORM WEBSITE PROFESIONAL === */}
      <section id="quick-form" className="quick-form-section hidden-section">
        <div className="section-content-wrapper">
          <h2 className="quick-form-title">
            MAU BUAT WEBSITE PROFESIONAL?
            <span>silahkan isi Form di bawah ini!</span>
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
                      <option value="" disabled>--Pilih Pertanyaanmu--</option>
                      <option value="Jasa Website">Jasa Website</option>
                      <option value="Jasa Aplikasi">Jasa Aplikasi</option>
                      <option value="Jasa Landing Page">Jasa Landing Page</option>
                      <option value="Jasa Web E-commerce">Jasa Web E-commerce</option>
                      <option value="Jasa Desain Figma">Jasa Desain Figma</option>
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
      {/* === AKHIR DARI SECTION BARU === */}

      {/* SECTION SERVICES (YANG DIPERBAIKI) */}
      <section id="services" className="services hidden-section">
        <div className="section-content-wrapper">
          <h2 className="section-title">Layanan & Solusi Digital Kami</h2>
          <div className="services-grid">
            
            <div className="service-card">
              <div className="service-icon"><FaLaptopCode /></div>
              <h3>Website & Aplikasi Perusahaan</h3>
              <p>Tampilkan profil profesional bisnis Anda dengan desain elegan, modern, dan fungsional di semua platform.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon"><FaShoppingCart /></div>
              <h3>Solusi E-commerce</h3>
              <p>Platform lengkap untuk bisnis online Anda, mulai dari toko online sederhana hingga marketplace kompleks.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon"><FaRocket /></div>
              <h3>Landing Page & Campaign</h3>
              <p>Halaman arahan yang dioptimalkan untuk marketing, peluncuran produk, dan konversi penjualan tinggi.</p>
            </div>

          </div>
        </div>
      </section>

      {/* === SECTION PORTFOLIO DENGAN STRUKTUR BARU UNTUK ANIMASI === */}
      <section id="portfolio" className="portfolio hidden-section">
        <div className="section-content-wrapper">
          <h2 className="section-title">Portofolio Proyek Kami</h2>
          <div className="portfolio-scroller">
            <div className="portfolio-track">
              {portfolioData.map((item, index) => (
                <div className="portfolio-item" key={`item-${index}`}>
                  {item.type === 'single' && item.image && <img src={item.image} alt={item.title} />}
                  {item.type === 'split' && (
                    <div className="portfolio-image-split">
                      {item.image && <img src={item.image} alt={item.title} />}
                      {item.image2 && <img src={item.image2} alt={`${item.title} UI`} />}
                    </div>
                  )}
                  <div className="portfolio-overlay">
                    <h3>{item.title}</h3>
                    <p>{item.tech}</p>
                  </div>
                </div>
              ))}
              {portfolioData.map((item, index) => (
                <div className="portfolio-item" key={`duplicate-${index}`}>
                  {item.type === 'single' && item.image && <img src={item.image} alt={item.title} />}
                  {item.type === 'split' && (
                    <div className="portfolio-image-split">
                      {item.image && <img src={item.image} alt={item.title} />}
                      {item.image2 && <img src={item.image2} alt={`${item.title} UI`} />}
                    </div>
                  )}
                  <div className="portfolio-overlay">
                    <h3>{item.title}</h3>
                    <p>{item.tech}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* SECTION WHY US (YANG DIUBAH) */}
      <section id="why-us" className="why-us hidden-section">
        <div className="section-content-wrapper">
          <div className="why-us-container">
            <div className="why-us-image-container">
              <img src={imgHp} alt="Teknologi Terkini Youth Technology Creation" className="why-us-image"/>
            </div>
            <div className="why-us-content">
              <h2 className="section-title">Mengapa Memilih Kami?</h2>
              <div className="features-grid">
                <div className="feature-card"><h4>🚀 Teknologi Terkini</h4><p>Kami menggunakan stack teknologi terbaru seperti React, Next.js, Flutter, dan lainnya untuk performa terbaik.</p></div>
                <div className="feature-card"><h4>🎨 Desain Kustom & Responsif</h4><p>Setiap produk didesain unik sesuai brand Anda dan dapat diakses sempurna di semua perangkat.</p></div>
                <div className="feature-card"><h4>⏱️ Pengerjaan Cepat & Terstruktur</h4><p>Proses kerja yang efisien dan transparan memastikan proyek Anda selesai tepat waktu sesuai timeline.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION PROCESS */}
      <section id="process" className="process hidden-section">
        <div className="section-content-wrapper">
          <h2 className="section-title">Proses Kerja Kami</h2>
          <div className="process-timeline">
            <div className="process-step"><div className="process-number">1</div><h3>Konsultasi & Perencanaan</h3><p>Kami mendiskusikan ide dan kebutuhan Anda untuk merumuskan strategi produk terbaik.</p></div>
            <div className="process-step"><div className="process-number">2</div><h3>Desain UI/UX</h3><p>Membuat mockup dan prototipe desain yang fungsional dan menarik secara visual.</p></div>
            <div className="process-step"><div className="process-number">3</div><h3>Pengembangan (Coding)</h3><p>Proses mengubah desain menjadi kode yang bersih, efisien, dan scalable.</p></div>
            <div className="process-step"><div className="process-number">4</div><h3>Peluncuran & Maintenance</h3><p>Produk Anda siap online! Kami juga menyediakan dukungan penuh setelah peluncuran.</p></div>
          </div>
        </div>
      </section>
      
      {/* SECTION CTA */}
      <section id="cta" className="cta hidden-section">
        <div className="section-content-wrapper">
          <div className="cta-container">
            <div className="cta-image-container"><img src={imgOrang} alt="Siap Memulai Proyek" className="cta-image"/></div>
            <div className="cta-content">
              <h2 className="section-title">Siap Membangun Proyek Digital Anda?</h2>
              <p className="cta-subtitle">Jangan ragu untuk berdiskusi dengan tim kami. Konsultasi gratis!</p>
              <a href="#contact" className="hero-button">Hubungi Kami</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* SECTION TESTIMONIALS */}
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
      
      {/* SECTION PRICING */}
      <section id="pricing" className="pricing-section hidden-section">
        <div className="section-content-wrapper">
          <h2 className="pricing-title">Dapatkan Harga Spesial Dari Yang Terbaik</h2>
          <p className="pricing-subtitle">Pilih paket yang paling sesuai dengan kebutuhan bisnis Anda.</p>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="plan-header"><h3 className="plan-name">Website Landing Page</h3><p className="plan-description">Tampilkan landing page impian dengan desain yang responsif dan siap menarik perhatian pelanggan Anda.</p></div>
              <p className="price-old">Rp. 1.650.000</p><p className="price-new">Rp. 1.250.000</p>
              <ul className="plan-features"><li><FaCheckCircle /> 1 Halaman Utama</li><li><FaCheckCircle /> Gratis Hosting 2GB</li><li><FaCheckCircle /> Gratis Domain .com (Tahun Pertama)</li></ul>
              <div className="price-button-container"><a href="https://wa.me/6281292690095" target="_blank" rel="noopener noreferrer" className="hero-button">Hubungi Sekarang</a></div>
            </div>
            <div className="pricing-card card-highlight">
              <div className="plan-header"><h3 className="plan-name">Website Company Profile</h3><p className="plan-description">Solusi lengkap dan pilihan serius untuk membangun citra profesional perusahaan Anda di dunia digital.</p></div>
              <p className="price-old">Rp. 7.000.000</p><p className="price-new">Rp. 4.450.000</p>
              <ul className="plan-features"><li><FaCheckCircle /> Halaman Tidak Terbatas</li><li><FaCheckCircle /> Gratis Hosting 5GB</li><li><FaCheckCircle /> Gratis Domain .com (Tahun Pertama)</li></ul>
              <div className="price-button-container"><a href="https://wa.me/6281292690095" target="_blank" rel="noopener noreferrer" className="hero-button">Hubungi Sekarang</a></div>
            </div>
            <div className="pricing-card">
              <div className="plan-header"><h3 className="plan-name">Website Company Profile Basic</h3><p className="plan-description">Pilihan ideal untuk bisnis yang sudah berjalan dan ingin memperluas jangkauan pasar.</p></div>
              <p className="price-old">Rp. 3.800.000</p><p className="price-new">Rp. 2.550.000</p>
              <ul className="plan-features"><li><FaCheckCircle /> 5 Halaman Utama</li><li><FaCheckCircle /> Gratis Hosting 3GB</li><li><FaCheckCircle /> Gratis Domain .com (Tahun Pertama)</li></ul>
              <div className="price-button-container"><a href="https://wa.me/6281292690095" target="_blank" rel="noopener noreferrer" className="hero-button">Hubungi Sekarang</a></div>
            </div>
          </div>
          <div className="secondary-pricing-grid">
            <div className="secondary-card"><h4>Website Ecommerce & Toko Online</h4><p>Kami menyediakan solusi pembuatan aplikasi e-commerce yang dapat disesuaikan dengan kebutuhan bisnis dan skala operasi Anda.</p><div className="price-button-container"><a href="https://wa.me/6281292690095" target="_blank" rel="noopener noreferrer" className="hero-button">Hubungi Sekarang</a></div></div>
            <div className="secondary-card"><h4>Aplikasi Website Custom</h4><p>Solusi custom untuk kebutuhan spesifik seperti sistem manajemen, CRM, dashboard analitik, hingga aplikasi Point of Sales (POS).</p><div className="price-button-container"><a href="https://wa.me/6281292690095" target="_blank" rel="noopener noreferrer" className="hero-button">Hubungi Sekarang</a></div></div>
          </div>
        </div>
      </section>

      {/* === SECTION FAQ (BARU) === */}
      <section id="faq" className="faq-section hidden-section">
        <div className="section-content-wrapper">
            <div className="faq-container">
                <div className="faq-content">
                    <h2 className="faq-title">Masih bingung? <br/>Tenang, kami siap membantumu</h2>
                    <p className="faq-subtitle">Jika ada pertanyaan lain yang belum ada di sini boleh tanyakan dan konsultasikan langsung di sini.</p>
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
      
      {/* SECTION CONTACT */}
      <section id="contact" className="contact hidden-section">
        <div className="section-content-wrapper">
          <h2 className="section-title">Hubungi Kami</h2>
          <p className="contact-subtitle">Punya pertanyaan atau ingin memulai proyek? Kirimkan pesan kepada kami!</p>
          <div className="contact-container">
            <div className="contact-info">
              <h3>Informasi Kontak</h3>
              <p>Hubungi kami melalui salah satu platform di bawah ini, atau langsung isi formulir di samping.</p>
              <div className="contact-item"><FaEnvelope /><a href="mailto:joseparhusip7@gmail.com">joseparhusip7@gmail.com</a></div>
              <div className="contact-item"><FaWhatsapp /><a href="https://wa.me/6281292690095" target="_blank" rel="noopener noreferrer">+62 812 9269 0095</a></div>
              <div className="contact-item"><FaGithub /><a href="https://github.com/joseparhusip" target="_blank" rel="noopener noreferrer">github.com/joseparhusip</a></div>
              <div className="contact-item"><FaLinkedin /><a href="https://www.linkedin.com/in/joseparhusip/" target="_blank" rel="noopener noreferrer">linkedin.com/in/joseparhusip</a></div>
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