import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../config/supabaseClient'

import heroImage from '../../assets/images/dentist.png'
import service1 from '../../assets/images/service1.jpg'
import service2 from '../../assets/images/service2.jpg'
import service3 from '../../assets/images/service3.jpg'
import service4 from '../../assets/images/service4.jpg'
import service5 from '../../assets/images/service5.jpg'
import service6 from '../../assets/images/service6.jpg'
import mapBg from '../../assets/images/map.jpg'


// const services = [
//   { name: 'Tooth Decay Treatment', desc: 'Fluoride treatments, Fillings, Crowns, Root canals, Tooth extractions.', img: service1 },
//   { name: 'Periodontal Disease',   desc: 'Clean out bacteria and prevent bone & tissue destruction.', img: service2 },
//   { name: 'Pediatric Dentistry',   desc: 'Special care for children, making first visits comfortable.', img: service3 },
//   { name: 'Preventive Dentistry',  desc: 'Keep teeth healthy and avoid cavities, gum disease, enamel wear.', img: service4 },
//   { name: 'Dental Whitening',      desc: 'Safe, painless whitening for outstanding results.', img: service5 },
//   { name: 'Dental Implants',       desc: 'Artificial tooth root surgically placed to secure replacement teeth.', img: service6 },
// ]

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [specialists, setSpecialists] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch dentists from Supabase
  useEffect(() => {
    const fetchDentists = async () => {
      const { data, error } = await supabase
        .from('dentists')
        .select('*')

      if (error) {
        console.error('Error fetching dentists:', error)
      } else {
        setSpecialists(data || [])
      }
      setLoading(false)
    }

    fetchDentists()
  }, [])

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        // .select('id, service_name, description, price,duration_minutes')
        .select('*')
        // .eq('is_active', true)
        // .order('id')
      console.log('services data:', data)
      console.log('services error:', error)
      // if (error) { console.error(error); return }
      if (data) setServices(data)
    }
    fetchServices()
  }, [])

  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setActive(id)
      setMenuOpen(false)
    }
  }
  const handleBooking = () => {
    if (user) {
      navigate('/book')
    } else {
      navigate('/login', {
        state: { message: 'Please sign in first to book an appointment! 🦷' }
      })
    }
  }

  return (
    <div className="home">

      {/* Drawer overlay */}
      <div
        className={`drawer-overlay ${menuOpen ? 'overlay-show' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`drawer ${menuOpen ? 'drawer-open' : ''}`}>
        <ul className="drawer-links">
          <button className="drawer-btn" onClick={() => { scrollToSection('home') }}>
            Home
          </button>
          <button className="drawer-btn" onClick={() => { scrollToSection('specialists') }}>
            About Us
          </button>
          <button className="drawer-btn" onClick={() => { scrollToSection('contact') }}>
            Contact Us
          </button>
          <button className="drawer-btn" onClick={handleBooking}>
            Book Appointment
          </button>
          {user ? (
            <button className="drawer-btn" onClick={() => navigate('/dashboard')}>
              My Dashboard
            </button>
          ) : (
            <button className="drawer-btn" onClick={() => navigate('/login')}>
              Sign In
            </button>
          )}
        </ul>
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">
          <span className="logo-icon">🦷</span>
          <div style={{ marginLeft: '15px', fontFamily: 'Poppins' }}>
            <span style={{ color: '#1e1e1e' }}>Tooth</span>
            <span style={{ color: '#2ec4b6' }}>Time</span>
          </div>
        </div>
        <ul className="nav-links">
          <li>
            <button
              className={`nav-btn ${active === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${active === 'specialists' ? 'active' : ''}`}
              onClick={() => scrollToSection('specialists')}
            >
              About Us
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${active === 'contact' ? 'active' : ''}`}
              onClick={() => scrollToSection('contact')}
            >
              Contact Us
            </button>
          </li>
          <li>
            {/* ✅ Fixed — checks login */}
            <button className="btn-book" onClick={handleBooking}>
              Book Appointment
            </button>
          </li>
          <li>
            
            {user ? (
              <button className="btn-signin" onClick={() => navigate('/dashboard')}>
                My Dashboard
              </button>
            ) : (
              <button className="btn-signin" onClick={() => navigate('/login')}>
                Sign In
              </button>
            )}
          </li>
        </ul>
        <button className="manu" onClick={() => setMenuOpen(!menuOpen)}>
          ≡
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="hero-sub">YOUR PERFECT</p>
          <h1 className="hero-title">
            <span className="highlight">SMILE START</span> HERE
          </h1>
          <p className="hero-desc">
            Comprehensive dental and orthodontic care for the whole family. From routine checkups to advanced cosmetic treatments — we've got your smile covered.
          </p>
          {/* ✅ Hero CTA also checks login */}
          <button className="btn-book" onClick={handleBooking}>
            Book Appointment
          </button>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Hero" />
        </div>
      </section>

      {/* SPECIALISTS */}
      <section className="specialists" id="specialists">
        <h2 className="section-title">Our <span className="highlight">Specialists</span></h2>
        <p className="section-sub">A dedicated team of caring professionals for treatments you can trust.</p>

        {loading ? (
          <p className="section-sub">Loading specialists...</p>
        ) : specialists.length === 0 ? (
          <p className="section-sub">No specialists available yet.</p>
        ) : (
          <div className="cards-grid">
            {specialists.map((s) => (
              <div className="specialist-card" key={s.id}>
                <img
                  src={s.photo_key || 'https://placehold.co/300x200?text=Dentist'}
                  alt={s.dentist_name}
                  className="img"
                />
                <h3 className="card-name">{s.dentist_name}</h3>
                <p className="card-title">{s.specialty}</p>
                <p className="card-desc">{s.phone}</p>
                <button className="btn-view" onClick={() => navigate(`/doctor/${s.id}`)}>
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <h2 className="section-title">Our <span className="highlight">Services</span></h2>
        <p className="section-sub">Expert treatments for every patient.</p>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={s.id}>
              <div
                className="service-img-bg"
                style={{ backgroundImage: `url(${s.image_url || [service1,service2,service3,service4,service5,service6][i] || service1})` }}
              />
              <div className="service-hover-overlay" />
              <div className="service-content">
                {/* <div className="service-icon-wrap">{s.icon || '👩‍⚕️'}</div> */}
                <div className="service-icon-wrap">👩‍⚕️</div>
                
                <div className="service-divider" />
                <h3 className="service-name">{s.service_name}</h3>  {/* ✅ was s.name */}
                <p className="service-desc">{s.description}</p>      {/* ✅ was s.desc */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <h2 className="section-title">Get in <span className="highlight">Touch</span></h2>
        <p className="section-sub">Have a question or want to book an appointment? Our team is ready to assist you.</p>
        <div className="contact-cards">
          <div className="contact-info-card">
            <span className="contact-icon">📍</span>
            <p className="contact-label">Location</p>
            <p className="contact-val">Smile Clinic - Downtown</p>
          </div>
          <div className="contact-info-card">
            <span className="contact-icon">📞</span>
            <p className="contact-label">Phone Number</p>
            <p className="contact-val">+855 12 345 678</p>
          </div>
          <div className="contact-info-card">
            <span className="contact-icon">✉️</span>
            <p className="contact-label">Email</p>
            <p className="contact-val">smile@dentalcare.com</p>
          </div>
        </div>
        <div className="map-placeholder" style={{ backgroundImage: `url(${mapBg})` }}>
          <a href="https://maps.app.goo.gl/UgrjtzJ132jWJoNz8" target="_blank" rel="noopener noreferrer" className="map-pin">
            View Location
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-cols">
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>General Dentistry</li>
              <li>Orthodontics</li>
              <li>Teeth Whitening</li>
              <li>Dental Implants</li>
              <li>Cosmetic Dentistry</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>📍 12 Smile Street</li>
              <li>📞 +1 (555) 234-5678</li>
              <li>✉️ hello@dentalcare.com</li>
              <li>🕐 Mon–Sat 9AM–7PM</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Clinic</h4>
            <ul>
              <li>About Us</li>
              <li>Our Doctors</li>
              <li>Testimonials</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Smile Dental Clinic. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}