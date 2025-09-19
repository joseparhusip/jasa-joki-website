import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa';
import '../styles/Home.css';
import heroImage from '../assets/images/carousel-1.png';

// --- GAMBAR PORTOFOLIO DI-IMPORT ---
import portfolioTrivo from '../assets/images/portfolio/img-flutter-trivo.png';
import portfolioTrivo1 from '../assets/images/portfolio/img-flutter-trivo1.png';
import portfolioDashboard from '../assets/images/portfolio/img-website-dashboard.png';
import portfolioEcommerce from '../assets/images/portfolio/img-website-ecommerce-stylo.png';
import imgOrang from '../assets/images/logo/img-orang.png'; // <-- GAMBAR BARU DI-IMPORT


function Home() {
  // --- STATE BARU UNTUK FORM ---
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-section');
        }
      });
    }, {
      threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.hidden-section');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // --- FUNGSI BARU UNTUK MENGHANDLE SUBMIT FORM ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    // Validasi sederhana
    if (formData.name && formData.email && formData.message) {
      console.log("Form Data Submitted:", formData); // Anda bisa menambahkan logika pengiriman data ke backend di sini
      setFormSubmitted(true);
    } else {
      alert("Harap isi semua kolom sebelum mengirim.");
    }
  };


  return (
    <div className="home-container">
      <section id="home" className="hero">
        <div className="hero-image-container">
          <img
            src={heroImage}
            alt="Jasa Pembuatan Website Profesional"
            className="hero-image"
          />
          <span className="bubble b1"></span>
          <span className="bubble b2"></span>
          <span className="bubble b3"></span>
          <span className="bubble b4"></span>
          <span className="bubble b5"></span>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Jasa <span className="highlight">Joki Website</span> Profesional
          </h1>
          <p className="hero-subtitle">
            Ubah ide Anda menjadi website modern dan responsif dengan cepat dan andal.
          </p>
          <a href="#cta" className="hero-button">Pesan Jasa</a>
        </div>
      </section>

      <section id="services" className="services hidden-section">
        <h2 className="section-title">Layanan yang Kami Tawarkan</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Website Perusahaan</h3>
            <p>Tampilkan profil profesional perusahaan Anda dengan desain yang elegan dan modern.</p>
          </div>
          <div className="service-card">
            <h3>Toko Online (E-commerce)</h3>
            <p>Solusi lengkap untuk memulai bisnis online Anda, lengkap dengan sistem pembayaran.</p>
          </div>
          <div className="service-card">
            <h3>Landing Page</h3>
            <p>Halaman arahan yang dioptimalkan untuk marketing dan konversi tinggi.</p>
          </div>
        </div>
      </section>

      <section id="portfolio" className="portfolio hidden-section">
        <h2 className="section-title">Portofolio Proyek Kami</h2>
        <div className="portfolio-grid">
           <div className="portfolio-item">
            <img src={portfolioEcommerce} alt="Proyek Website E-commerce Stylo" />
            <div className="portfolio-overlay">
              <h3>Website E-commerce Fesyen</h3>
              <p>React, Node.js, Express</p>
            </div>
          </div>
          <div className="portfolio-item">
            <img src={portfolioDashboard} alt="Proyek Website Dashboard" />
            <div className="portfolio-overlay">
              <h3>Admin Dashboard</h3>
              <p>React, Material UI, Recharts</p>
            </div>
          </div>
          
          <div className="portfolio-item">
            <div className="portfolio-image-split">
              <img src={portfolioTrivo} alt="Proyek Aplikasi Mobile Trivo" />
              <img src={portfolioTrivo1} alt="Proyek Aplikasi Mobile Trivo UI" />
            </div>
            <div className="portfolio-overlay">
              <h3>Aplikasi Mobile Trivo</h3>
              <p>Flutter, Firebase, Figma</p>
            </div>
          </div>

        </div>
      </section>

      <section id="why-us" className="why-us hidden-section">
        <h2 className="section-title">Mengapa Memilih Kami?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h4>🚀 Teknologi Modern</h4>
            <p>Kami menggunakan stack teknologi terbaru seperti React, Next.js, dan lainnya untuk performa website terbaik.</p>
          </div>
          <div className="feature-card">
            <h4>🎨 Desain Kustom & Responsif</h4>
            <p>Setiap website didesain unik dan dapat diakses dengan sempurna di semua perangkat, dari mobile hingga desktop.</p>
          </div>
          <div className="feature-card">
            <h4>⏱️ Pengerjaan Cepat</h4>
            <p>Proses kerja yang efisien memastikan proyek Anda selesai tepat waktu sesuai dengan timeline yang disepakati.</p>
          </div>
        </div>
      </section>

      <section id="process" className="process hidden-section">
        <h2 className="section-title">Proses Kerja Kami</h2>
        <div className="process-timeline">
           <div className="process-step">
            <div className="process-number">1</div>
            <h3>Konsultasi & Perencanaan</h3>
            <p>Kami mendiskusikan ide dan kebutuhan Anda untuk merumuskan strategi terbaik.</p>
          </div>
          <div className="process-step">
            <div className="process-number">2</div>
            <h3>Desain UI/UX</h3>
            <p>Membuat mockup dan prototipe desain yang fungsional dan menarik secara visual.</p>
          </div>
          <div className="process-step">
            <div className="process-number">3</div>
            <h3>Pengembangan (Coding)</h3>
            <p>Proses mengubah desain menjadi kode website yang bersih dan efisien.</p>
          </div>
          <div className="process-step">
            <div className="process-number">4</div>
            <h3>Peluncuran & Maintenance</h3>
            <p>Website Anda siap online! Kami juga menyediakan dukungan setelah peluncuran.</p>
          </div>
        </div>
      </section>
      
      <section id="cta" className="cta hidden-section">
        <div className="cta-container">
          <div className="cta-image-container">
            <img src={imgOrang} alt="Siap Memulai Proyek" className="cta-image"/>
          </div>
          <div className="cta-content">
            <h2 className="section-title">Siap Memulai Proyek Website Anda?</h2>
            <p className="cta-subtitle">Jangan ragu untuk berdiskusi. Konsultasi gratis!</p>
            <a href="#contact" className="hero-button">Pesan Jasa</a>
          </div>
        </div>
      </section>
      
      <section id="contact" className="contact hidden-section">
        <h2 className="section-title">Hubungi Kami</h2>
        <p className="contact-subtitle">
          Punya pertanyaan atau ingin memulai proyek? Kirimkan pesan kepada kami!
        </p>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Informasi Kontak</h3>
            <p>Hubungi kami melalui salah satu platform di bawah ini, atau langsung isi formulir di samping.</p>
            <div className="contact-item">
              <FaEnvelope />
              <a href="mailto:joseparhusip7@gmail.com">joseparhusip7@gmail.com</a>
            </div>
            <div className="contact-item">
              <FaWhatsapp />
              <a href="https://wa.me/6281292690095" target="_blank" rel="noopener noreferrer">+62 812 9269 0095</a>
            </div>
            <div className="contact-item">
              <FaGithub />
              <a href="https://github.com/joseparhusip" target="_blank" rel="noopener noreferrer">github.com/joseparhusip</a>
            </div>
             <div className="contact-item">
              <FaLinkedin />
              <a href="https://www.linkedin.com/in/joseparhusip/" target="_blank" rel="noopener noreferrer">linkedin.com/in/joseparhusip</a>
            </div>
          </div>
          
          {/* --- BAGIAN YANG DIUBAH: FORM DENGAN KONDISIONAL --- */}
          <div className="contact-form">
            {formSubmitted ? (
              <div className="thank-you-message">
                <h3>Terima Kasih!</h3>
                <p>Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda kembali.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Nama Anda" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Anda" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
                <textarea 
                  name="message" 
                  rows="6" 
                  placeholder="Pesan Anda" 
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
                <button type="submit" className="hero-button">Kirim Pesan</button>
              </form>
            )}
          </div>
          {/* --- AKHIR BAGIAN YANG DIUBAH --- */}

        </div>
      </section>
    </div>
  );
}

export default Home;