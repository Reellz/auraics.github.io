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

// Initialize event page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Animate term cards on scroll
    const termCards = document.querySelectorAll('.term-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    termCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        cardObserver.observe(card);
    });

    // Newsletter form validation
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

    // Add click event to newsletter images for lightbox effect
    const newsletterImages = document.querySelectorAll('.newsletter-item img');
    newsletterImages.forEach(img => {
        img.addEventListener('click', function() {
            const imageUrl = this.src;
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${imageUrl}" alt="Newsletter">
                    <button class="close-lightbox"><i class="fas fa-times"></i></button>
                </div>
            `;
            document.body.appendChild(lightbox);
            
            // Close lightbox
            const closeBtn = lightbox.querySelector('.close-lightbox');
            closeBtn.addEventListener('click', () => {
                lightbox.remove();
            });
            
            // Close when clicking outside image
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.remove();
                }
            });
        });
    });

    // Add hover effect to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const date = item.querySelector('.timeline-date');
            date.style.transform = 'scale(1.1)';
            date.style.backgroundColor = 'var(--gold)';
            date.style.color = 'var(--dark-gray)';
        });
        
        item.addEventListener('mouseleave', () => {
            const date = item.querySelector('.timeline-date');
            date.style.transform = 'scale(1)';
            date.style.backgroundColor = 'var(--primary-green)';
            date.style.color = 'var(--white)';
        });
    });
});

// Lightbox styles (added dynamically)
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: zoom-out;
    }
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        border-radius: 8px;
    }
    .close-lightbox {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    }
    .close-lightbox:hover {
        color: var(--gold);
    }
`;
document.head.appendChild(lightboxStyles);