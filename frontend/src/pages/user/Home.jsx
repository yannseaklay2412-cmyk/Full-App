import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../config/supabaseClient'
import api from '../../api/axios'

import heroImage from '../../assets/images/dentist.png'
import mapBg from '../../assets/images/map.jpg'
import ServiceCard from '../../components/ServiceCard'


export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [specialists, setSpecialists] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch dentists from the backend API
  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const { data } = await api.get('/dentists')
        setSpecialists(data || [])
      } catch (err) {
        console.error('Error fetching dentists:', err)
      }
      setLoading(false)
    }

    fetchDentists()
  }, [])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get('/services')
        setServices(data.data || [])
      } catch (err) {
        console.error('Error fetching services:', err)
      }
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
                  src={s.image_path
                    ? supabase.storage.from('file_image').getPublicUrl(s.image_path).data.publicUrl
                    : 'https://placehold.co/300x200?text=Dentist'}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48, alignItems: 'center' }}>
          {services.map((s, i) => (
            <ServiceCard
              key={s.id}
              serviceName={s.service_name}
              description={s.description}
              price={`$${s.price}`}
              duration={`${s.duration_minutes} min`}
              reverse={i % 2 === 1}
              image={s.image_url}
            />
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