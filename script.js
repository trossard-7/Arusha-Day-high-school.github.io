// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer for fade-in animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.program-card, .testimonial-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Mobile menu toggle
function toggleMenu() {
    alert('Mobile menu would expand here - implement as needed with CSS');
}

// Active nav link on scroll
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = '#fff';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#0ea5e9';
        }
    });
});

// Scroll reveal with stagger
const cards = document.querySelectorAll('.program-card');
cards.forEach((card, index) => {
    card.style.setProperty('--delay', index * 0.1 + 's');
});

// Logo click to home
document.querySelector('.logo').addEventListener('click', function() {
    window.location.href = 'index.html';
});

console.log('ARuSHa DaY High School - Website Loaded Successfully');

const messages = [
            "Excellence in Education | Innovation in Learning",
            "Welcome To Seek The Highest Standards",
            "Learn Anywhere, Anytime With Us",
            "Enriching lives and unlocking talents",
            "Empowering Students Every Day",
            "Knowledge is Power",
            "Building Bright Futures"
        ];
        let index = 1;
        const msgEl = document.getElementById("hero-subtitle");

        function changeMessage() {
            msgEl.style.opacity = 0;
            setTimeout(() => {
                msgEl.textContent = messages[index];
                index = (index + 1) % messages.length;
                msgEl.style.opacity = 1;
            }, 500);
        }
        setInterval(changeMessage, 5000);