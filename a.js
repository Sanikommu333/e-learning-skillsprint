// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const menuIcon = document.getElementById("menuIcon");
    
    // Toggle menu visibility
    navLinks.classList.toggle("active");
    menuIcon.classList.toggle("active");
    
    // Toggle body scroll
    if (navLinks.classList.contains("active")) {
        document.body.classList.add("menu-open");
    } else {
        document.body.classList.remove("menu-open");
    }
}

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial-card");
const totalTestimonials = testimonials.length;

function initTestimonialSlider() {
    if (testimonials.length > 0) {
        showTestimonial(currentTestimonial);
        createTestimonialDots();
    }
}

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove("active");
        if (i === index) {
            testimonial.classList.add("active");
        }
    });
    
    // Update dots
    const dots = document.querySelectorAll(".testimonial-dot");
    dots.forEach((dot, i) => {
        dot.classList.remove("active");
        if (i === index) {
            dot.classList.add("active");
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function createTestimonialDots() {
    const dotsContainer = document.querySelector(".testimonial-dots");
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = "";
    
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement("div");
        dot.classList.add("testimonial-dot");
        if (i === currentTestimonial) {
            dot.classList.add("active");
        }
        dot.addEventListener("click", () => {
            currentTestimonial = i;
            showTestimonial(currentTestimonial);
        });
        dotsContainer.appendChild(dot);
    }
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll(".stat h3");
    const animationDuration = 2000;
    const frameDuration = 1000 / 60; // 60fps
    
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-count");
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            const currentValue = Math.floor(progress * target);
            
            counter.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// Scroll Trigger for Counter Animation
function setupScrollTrigger() {
    const section = document.querySelector(".about-section");
    if (!section) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(section);
}

// Back to Top Button
function setupBackToTop() {
    const backToTopButton = document.getElementById("backToTop");
    if (!backToTopButton) return;
    
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = "flex";
        } else {
            backToTopButton.style.display = "none";
        }
    });
    
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Navbar Scroll Effect
function setupNavbarScroll() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

// Form Submission
function setupForm() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;
    
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
        
        // Here you would typically send the form data to a server
        console.log("Form submitted:", { name, email, subject, message });
        
        // Show success message
        alert("Thank you for your message! We'll get back to you soon.");
        
        // Reset form
        contactForm.reset();
    });
}

// Initialize AOS (Animate On Scroll)
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const menuIcon = document.getElementById("menuIcon");
    if (menuIcon) {
        menuIcon.addEventListener("click", toggleMenu);
    }

    // Close menu when clicking a link
    document.querySelectorAll("#navLinks ul li a").forEach(link => {
        link.addEventListener("click", () => {
            const navLinks = document.getElementById("navLinks");
            const menuIcon = document.getElementById("menuIcon");
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                menuIcon.classList.remove("active");
                document.body.classList.remove("menu-open");
            }
        });
    });

    // Testimonial navigation buttons
    const nextBtn = document.querySelector(".testimonial-next");
    const prevBtn = document.querySelector(".testimonial-prev");
    
    if (nextBtn) nextBtn.addEventListener("click", nextTestimonial);
    if (prevBtn) prevBtn.addEventListener("click", prevTestimonial);

    // Initialize all components
    initTestimonialSlider();
    setupScrollTrigger();
    setupBackToTop();
    setupNavbarScroll();
    setupForm();
    initAOS();
});
// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const menuIcon = document.getElementById("menuIcon");
    
    navLinks.classList.toggle("active");
    menuIcon.classList.toggle("active");
    
    // Toggle body scroll
    document.body.classList.toggle("menu-open");
}

// Close menu when clicking links
function closeMenu() {
    const navLinks = document.getElementById("navLinks");
    const menuIcon = document.getElementById("menuIcon");
    
    navLinks.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("menu-open");
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu
    const menuIcon = document.getElementById("menuIcon");
    if (menuIcon) {
        menuIcon.addEventListener("click", toggleMenu);
    }

    // Close menu when clicking links
    document.querySelectorAll("#navLinks ul li a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Rest of your initialization code...
});