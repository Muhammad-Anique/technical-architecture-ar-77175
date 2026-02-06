'use strict';

/**
 * Arena Salon - Interactive Features
 * Handles navigation effects, mobile menu, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Scroll Effect ---
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    const handleScroll = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);


    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            menuToggle.classList.toggle('open');
            
            // Prevent scrolling when menu is open
            if (navLinksContainer.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });
    }

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            menuToggle.classList.remove('open');
            body.style.overflow = 'auto';
        });
    });


    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- Simple Intersection Observer for Fade-in Effects ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, observerOptions);

    // Apply to sections for subtle entrance
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        appearOnScroll.observe(section);
    });


    // --- Testimonial Auto-Rotation (P1) ---
    // Note: Based on the architecture for a simple slider or grid.
    // This implementation supports a simple fade transition if multiple testimonials exist.
    const testimonials = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;

    if (testimonials.length > 1) {
        setInterval(() => {
            testimonials[currentTestimonial].style.opacity = '0';
            setTimeout(() => {
                testimonials[currentTestimonial].style.display = 'none';
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                testimonials[currentTestimonial].style.display = 'block';
                setTimeout(() => {
                    testimonials[currentTestimonial].style.opacity = '1';
                }, 20);
            }, 500);
        }, 5000);
    }


    // --- Business Logic: Booking Redirection ---
    // Simulates a booking flow or confirms phone click tracking
    const bookingBtns = document.querySelectorAll('.cta-button, .primary-btn');
    bookingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.getAttribute('href').startsWith('tel:')) {
                console.log('Call-to-action: Phone booking initiated');
            }
        });
    });

    // Helper to log initialization
    console.log('Arena Salon: Technical Architecture Interface Initialized.');
});

/**
 * CSS Helpers for JavaScript Animations
 * These are usually added to the stylesheet, but included here as a reference 
 * for what the IntersectionObserver values target.
 */
const style = document.createElement('style');
style.textContent = `
    .fade-in-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .fade-in-section.appear {
        opacity: 1;
        transform: translateY(0);
    }
    .nav-links.active {
        display: flex !important;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: #121212;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }
    .nav-links.active li {
        margin: 20px 0;
    }
    .nav-links.active a {
        font-size: 1.5rem;
    }
`;
document.head.appendChild(style);