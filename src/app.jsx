import React, { useState, useEffect, useRef } from 'react';
import ExpertsPage from './ourexperts.jsx'; // Import the new component
import emailjs from "emailjs-com";


// --- Reusable Components ---

// Custom hook for Intersection Observer animations
const useAnimateOnScroll = () => {
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1
    });

    animatedElements.forEach(el => observer.observe(el));

    return () => animatedElements.forEach(el => observer.unobserve(el));
  }, []);
};

// --- Page Components ---

const Header = ({ setPage, activePage }) => {
    const [activeLink, setActiveLink] = useState('home');
    const navbarRef = useRef(null);

    // Active link on scroll logic
    useEffect(() => {
        if (activePage !== 'home') return; // Only run this logic on the home page

        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    setActiveLink(id);
                }
            });
        }, {
            rootMargin: '-20% 0px -80% 0px'
        });

        sections.forEach(section => observer.observe(section));

        return () => sections.forEach(section => observer.unobserve(section));
    }, [activePage]);
    
    // Logic to handle navigation clicks
    const handleNavClick = (page, anchor) => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }

        if (page) {
             setPage(page);
             window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (anchor) {
            if(activePage !== 'home') {
                setPage('home');
                setTimeout(() => {
                     document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                 document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const navLinks = [
        { name: 'Home', anchor: '#home', page: 'home' },
        { name: 'About', anchor: '#about' },
        { name: 'Features', anchor: '#features' },
        { name: 'Services', anchor: '#services' },
        { name: 'Contact', anchor: '#contact' },
        { name: 'Our Experts', page: 'experts' },
        
    ];

    return (
        <nav ref={navbarRef} className="navbar navbar-expand-lg fixed-top">
            <div className="container">
                <a className="navbar-brand" href="#home" onClick={(e) => {e.preventDefault(); handleNavClick('home', '#home')}}>
                    <img src="/assets/physiocare-logo.png" alt="PhysioCare Logo" className="navbar-logo" />
                    Physio Matrix
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {navLinks.map(link => (
                             <li className="nav-item" key={link.name}>
                                <a 
                                    className={`nav-link ${
                                        (link.page === 'experts' && activePage === 'experts') || 
                                        (link.page === 'home' && activePage === 'home' && activeLink === 'home') ||
                                        (activePage === 'home' && link.anchor && link.anchor.substring(1) === activeLink)
                                        ? 'active' 
                                        : ''
                                    }`}
                                    href={link.anchor || '#'}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.page, link.anchor); }}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};


const HomePage = () => {
    useAnimateOnScroll();
    const [formStatus, setFormStatus] = useState({ message: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        emailjs
            .sendForm(
                "service_7wyp98v",   // from EmailJS dashboard
                "template_2srshdd",  // from EmailJS template
                e.target,
                "siumNKzznoiayg-a2"    // from EmailJS account
            )
            .then(
                (result) => {
                    setFormStatus({
                        message: '<strong>Thank You!</strong> Your appointment request has been received. We will contact you on WhatsApp shortly.',
                        type: 'success'
                    });
                    e.target.reset();
                },
                (error) => {
                    console.error("EmailJS Error:", error);
                    setFormStatus({
                        message: 'Oops! Something went wrong. Please try again or contact us directly.',
                        type: 'danger'
                    });
                }
            )
            .finally(() => {
                setIsSubmitting(false);
                setTimeout(() => setFormStatus({ message: '', type: '' }), 6000);
            });
    };


    return (
        <>
            <section id="home" className="hero-section">
                <div className="hero-overlay"></div>
                <div className="container text-center text-white position-relative">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h1 className="hero-title mb-4 animate-on-scroll">Welcome to Physio Matrix</h1>
                            <p className="hero-tagline mb-5 animate-on-scroll">Expert Physiotherapy at Your Doorstep. Painless Therapy · Natural Healing · Long-term Results.</p>
                            <a href="#contact" className="btn btn-primary btn-lg px-5 py-3 animate-on-scroll">
                                <i className="bi bi-calendar-check me-2"></i>Book Home Visit
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0 animate-on-scroll">
                            <div className="about-content">
                                <h2 className="section-title mb-4">Your Partners in Healing</h2>
                                <p className="lead mb-4">
                                    At PhysioMatrix, we bring world-class physiotherapy directly to you. We believe that the most comfortable place for recovery is your own home. Our team of certified experts uses advanced, German research-based technology to provide personalized care that fits your life, ensuring a faster, more effective healing journey.
                                </p>
                                <div className="goals-list">
                                    <h5 className="mb-3">Our Commitment to You</h5>
                                    <div className="goal-item"><i className="bi bi-house-heart-fill text-success me-3"></i><span>Personalized care in the comfort of your home.</span></div>
                                    <div className="goal-item"><i className="bi bi-check-circle-fill text-success me-3"></i><span>Painless, non-invasive therapy with zero side effects.</span></div>
                                    <div className="goal-item"><i className="bi bi-graph-up-arrow text-success me-3"></i><span>Achieving long-term, sustainable results for your health.</span></div>
                                    <div className="goal-item"><i className="bi bi-person-arms-up text-success me-3"></i><span>Empowering you to live an independent, pain-free life.</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 animate-on-scroll">
                            <div className="about-image">
                                <img src="/assets/physiomatrix.jpg" alt="Physiotherapy Services Illustration" className="img-fluid rounded shadow-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="features" className="py-5 bg-light">
                 <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col-12"><h2 className="section-title">Why Choose Physio Matrix?</h2><p className="section-subtitle">Our unique approach ensures you get the best care possible.</p></div>
                    </div>
                    <div className="row g-4">
                        {[
                            {img: "/assets/feature-german-therapy.jpg", icon: "bi-award-fill", title: "German Research-Based Therapy", desc: "We utilize state-of-the-art Matrix Rhythm Therapy, ensuring effective and scientifically-proven results at a cellular level."},
                            {img: "/assets/feature-women-health.png", icon: "bi-gender-female", title: "Specialized Women's Health", desc: "Offering dedicated, compassionate care for conditions like PCOD/PCOS, and managing pregnancy-related back pain with safe, gentle therapies."},
                            {img: "/assets/feature-diet-plan.png", icon: "bi-apple", title: "Holistic Diet Plans", desc: "Recovery is more than therapy. We provide tailored nutrition plans that complement your treatment, accelerating healing and boosting overall wellness."},
                            {img: "/assets/feature-safe-devices.jpg", icon: "bi-shield-check", title: "Safe for Medical Implants", desc: "Your safety is our priority. Our advanced equipment is certified safe for patients with pacemakers, metal implants, and stents."},
                            {img: "/assets/feature-avoid-surgery.png", icon: "bi-bandaid-fill", title: "Avoid Invasive Surgery", desc: "Our powerful, non-surgical treatments can often provide relief and restore function, helping you to avoid the risks and recovery time of surgery."},
                            {img: "/assets/feature-chronic-cases.png", icon: "bi-clock-history", title: "Success in Chronic Cases", desc: "Don't lose hope. We specialize in treating long-standing, chronic conditions (10+ years), often achieving results where others have failed."},
                            {img: "/assets/feature-diabetic-wound.jpg", icon: "bi-droplet-fill", title: "Diabetic Wound Healing", desc: "Our specialized therapy promotes blood circulation and tissue regeneration, significantly accelerating the healing of stubborn diabetic wounds."},
                            {img: "/assets/feature-lymphedema.png", icon: "bi-activity", title: "Lymphedema Management", desc: "We provide expert care and complete decongestive therapy (CDT) to manage lymphedema, reduce swelling, and improve your quality of life."},
                            {img: "/assets/feature-cancer-care.png", icon: "bi-ribbon", title: "Supportive Cancer Care", desc: "Providing gentle, supportive physiotherapy to help manage treatment side effects, reduce pain and fatigue, and improve mobility for cancer patients."}
                        ].map(feature => (
                             <div className="col-md-6 col-lg-4 animate-on-scroll" key={feature.title}>
                                <div className="feature-card">
                                    <div className="feature-image"><img src={feature.img} alt={feature.title} className="img-fluid" /></div>
                                    <div className="feature-content">
                                        <div className="feature-icon"><i className={`bi ${feature.icon}`}></i></div>
                                        <h5>{feature.title}</h5><p>{feature.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
             <section id="services" className="py-5">
                <div className="container">
                    <div className="row text-center mb-5"><div className="col-12"><h2 className="section-title">Conditions We Treat</h2><p className="section-subtitle">Expert care for a wide range of musculoskeletal and neurological conditions.</p></div></div>
                    <div className="row g-4">
                         {[
                            {img: "/assets/service-spondolysis.png", name: "Spondolysis"},
                            {img: "/assets/service-spondylolisthesis.png", name: "Spondylolisthesis"},
                            {img: "/assets/service-frozen-shoulder.jpg", name: "Frozen Shoulder"},
                            {img: "/assets/service-knee-rehab.jpeg", name: "Knee Rehabilitation"},
                            {img: "/assets/service-back-pain.png", name: "Back Pain"},
                            {img: "/assets/service-neck-pain.png", name: "Neck Pain"},
                            {img: "/assets/service-stroke.png", name: "Stroke Rehabilitation"},
                            {img: "/assets/service-parkinsons.png", name: "Parkinson's Disease"}
                         ].map(service => (
                            <div className="col-md-6 col-lg-3 animate-on-scroll" key={service.name}>
                                <div className="service-card">
                                    <div className="service-image"><img src={service.img} alt={service.name} className="img-fluid" /></div>
                                    <div className="service-content"><h6>{service.name}</h6></div>
                                </div>
                            </div>
                         ))}
                    </div>
                </div>
            </section>
            
            <section id="contact" className="py-5 bg-light">
                <div className="container">
                    <div className="row text-center mb-5"><div className="col-12"><h2 className="section-title">Book Your Home Visit</h2><p className="section-subtitle">Fill out the form below, and we'll get in touch to schedule your appointment.</p></div></div>
                    <div className="row">
                        <div className="col-lg-6 mb-4 mb-lg-0 animate-on-scroll">
                             <div className="contact-info">
                                <h5 className="mb-4">Contact Information</h5>
                                <div className="contact-item"><div className="d-flex align-items-center"><div className="contact-icon me-3"><i className="bi bi-envelope-fill"></i></div><div><strong>Email:</strong><br /><a href="mailto:info@myphysiomatrix.com">info@myphysiomatrix.com</a></div></div></div>
                                <div className="contact-item"><div className="d-flex align-items-center"><div className="contact-icon me-3"><i className="bi bi-telephone-fill"></i></div><div><strong>Phone:</strong><br /><a href="tel:+919049529358">+91 9049529358</a></div></div></div>
                                <div className="contact-item"><div className="d-flex align-items-center"><div className="contact-icon me-3"><i className="bi bi-whatsapp"></i></div><div><strong>WhatsApp:</strong><br /><a href="https://wa.me/919049529358" target="_blank">+91 9049529358</a></div></div></div>
                                <div className="map-placeholder mt-4"><div className="map-content"><i className="bi bi-house-door-fill"></i><p className="mb-0">We provide services across the Mumbai region, bringing expert care right to your doorstep.</p></div></div>
                            </div>
                        </div>
                        <div className="col-lg-6 animate-on-scroll">
                            <div className="contact-form">
                                <form id="contactForm" onSubmit={handleFormSubmit}>
                                    <div className="mb-3"><input type="text" className="form-control" name="name" placeholder="Full Name" required /></div>
                                    <div className="mb-3"><input type="tel" className="form-control" name="mobile" placeholder="Mobile Number" required /></div>
                                    <div className="mb-3"><input type="email" className="form-control" name="email" placeholder="Email Address" required /></div>
                                    <div className="mb-3"><input type="text" className="form-control" name="address" placeholder="Your Full Address" required /></div>
                                    <div className="mb-3"><textarea className="form-control" name="message" rows="4" placeholder="Briefly describe your condition or message" required></textarea></div>
                                    <button type="submit" className="btn btn-primary btn-lg w-100" disabled={isSubmitting}>
                                        {isSubmitting ? <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...</> : <><i className="bi bi-send me-2"></i>Submit Appointment Request</>}
                                    </button>
                                </form>
                                {formStatus.message && <div id="form-status" className="mt-3" dangerouslySetInnerHTML={{ __html: `<div class="alert alert-${formStatus.type}" role="alert">${formStatus.message}</div>` }}></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const Footer = () => (
    <footer className="bg-dark text-white py-4">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
                    <p className="mb-0">© 2025 Myphysiomatrix. All Rights Reserved.</p>
                </div>
                <div className="col-md-6 text-center text-md-end">
                    <div className="social-icons">
                        <a href="#" className="social-icon me-3"><i className="bi bi-facebook"></i></a>
                        <a href="#" className="social-icon me-3"><i className="bi bi-instagram"></i></a>
                        <a href="#" className="social-icon me-3"><i className="bi bi-linkedin"></i></a>
                        <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default function App() {
    const [page, setPage] = useState('home'); // 'home' or 'experts'

    return (
        <>
            <Header setPage={setPage} activePage={page} />
            <main>
                {page === 'home' && <HomePage />}
                {page === 'experts' && <ExpertsPage />}
            </main>
            <Footer />
        </>
    );
}

