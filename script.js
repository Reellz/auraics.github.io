// Mobile Menu Toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
    document.querySelector('.main-nav').classList.toggle('active');
    this.classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('.main-nav').classList.remove('active');
            document.querySelector('.mobile-menu-toggle').classList.remove('active');
        }
    });
});

// Sticky Header on Scroll with background change
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = 'none';
        header.style.backgroundColor = 'var(--white)';
    }
});

// Animate mission/vision cards on scroll
const missionVisionCards = document.querySelectorAll('.mission-card, .vision-card');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

missionVisionCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    cardObserver.observe(card);
});

// Animate value cards sequentially
const valueCards = document.querySelectorAll('.value-card');
valueCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.5s ease-out ${index * 0.1}s`;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    observer.observe(card);
});

// Form validation for newsletter
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value && emailInput.value.includes('@')) {
            // Success state
            this.innerHTML = `
                <p style="color: var(--primary-green); font-weight: 500;">
                    <i class="fas fa-check-circle"></i> Thank you for subscribing!
                </p>
            `;
        } else {
            // Error state
            emailInput.style.borderColor = '#e74c3c';
            setTimeout(() => {
                emailInput.style.borderColor = 'var(--medium-gray)';
            }, 2000);
        }
    });
}

// Current year for footer
document.querySelector('.footer-bottom').innerHTML = `
    <p>Copyright &copy; ${new Date().getFullYear()} | Aura International Christian School. All rights reserved.</p>
`;

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

// Add hover effect to social links
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const icon = link.querySelector('i');
        icon.style.transform = 'scale(1.2)';
    });
    
    link.addEventListener('mouseleave', () => {
        const icon = link.querySelector('i');
        icon.style.transform = 'scale(1)';
    });
});

// Add animation to curriculum section
const curriculumSection = document.querySelector('.curriculum-section');
if (curriculumSection) {
    const curriculumObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.curriculum-text').style.opacity = '1';
                entry.target.querySelector('.curriculum-text').style.transform = 'translateX(0)';
                entry.target.querySelector('.curriculum-image').style.opacity = '1';
                entry.target.querySelector('.curriculum-image').style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    curriculumSection.querySelector('.curriculum-text').style.opacity = '0';
    curriculumSection.querySelector('.curriculum-text').style.transform = 'translateX(-20px)';
    curriculumSection.querySelector('.curriculum-text').style.transition = 'all 0.6s ease-out';
    
    curriculumSection.querySelector('.curriculum-image').style.opacity = '0';
    curriculumSection.querySelector('.curriculum-image').style.transform = 'translateX(20px)';
    curriculumSection.querySelector('.curriculum-image').style.transition = 'all 0.6s ease-out';
    
    curriculumObserver.observe(curriculumSection);
}