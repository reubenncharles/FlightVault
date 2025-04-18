// Flight Vault - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initFAQAccordions();
    initVaultAnimation();
    initFloatingAlert();
    initPaymentForm();
});

// Mobile Navigation
function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.site-header');
    const navLinks = document.querySelectorAll('.main-nav a');

    // Toggle mobile menu
    if (mobileMenuBtn && closeMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });

        closeMenuBtn.addEventListener('click', () => {
            mainNav.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations & Back to Top Button
function initScrollAnimations() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // Back to top button visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Back to top button click
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.benefit-card, .deal-card, .step, .testimonial-card');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.2, // 20% visibility
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Set initial styles and start observing
    animateElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// FAQ Accordions
function initFAQAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open the clicked FAQ if it was closed
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Vault Animation
function initVaultAnimation() {
    const vaultWrapper = document.querySelector('.vault-wrapper');
    const vaultDoor = document.querySelector('.vault-door');
    const vaultInterior = document.querySelector('#vault-interior');
    
    // Preview effect on hover
    if (vaultWrapper && vaultDoor) {
        vaultWrapper.addEventListener('mouseenter', () => {
            vaultDoor.style.transform = 'rotate(-25deg)';
        });
        
        vaultWrapper.addEventListener('mouseleave', () => {
            // Only reset if not in "open" state
            if (!vaultWrapper.classList.contains('vault-open')) {
                vaultDoor.style.transform = '';
            }
        });
    }
    
    // Access Vault button effect
    const accessButtons = document.querySelectorAll('a[href="#access"]');
    
    accessButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Apply a pulse animation to the vault door when clicking any access button
            if (vaultDoor) {
                vaultDoor.style.animation = 'pulse 1s ease';
                
                // Remove animation after it completes
                setTimeout(() => {
                    vaultDoor.style.animation = '';
                }, 1000);
            }
        });
    });
}

// Floating Deal Alert
function initFloatingAlert() {
    const floatingAlert = document.querySelector('.floating-deal-alert');
    const closeAlertBtn = document.querySelector('.close-alert');
    
    if (floatingAlert && closeAlertBtn) {
        // Show the alert after 5 seconds
        setTimeout(() => {
            floatingAlert.classList.add('visible');
        }, 5000);
        
        // Close button functionality
        closeAlertBtn.addEventListener('click', () => {
            floatingAlert.classList.remove('visible');
        });
    }
}

// Payment Form Handling
function initPaymentForm() {
    const paymentForm = document.getElementById('payment-form');
    const vaultWrapper = document.querySelector('.vault-wrapper');
    const vaultInterior = document.querySelector('#vault-interior');
    
    if (paymentForm && vaultWrapper && vaultInterior) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Change button text to show processing
            const submitButton = this.querySelector('.payment-button');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="payment-button-text">Processing...</span>';
            submitButton.disabled = true;
            
            // Simulate payment processing (would be an API call in production)
            setTimeout(() => {
                // Success state - scroll to vault and animate
                scrollToVault();
                
                // Change payment form to success message
                const formContainer = document.querySelector('.payment-form-container');
                formContainer.innerHTML = `
                    <div class="payment-success">
                        <div class="success-icon">✓</div>
                        <h3>Payment Successful</h3>
                        <p>Thank you for your purchase! Your Flight Vault access has been activated.</p>
                        <p class="gold-text">Your membership is now active</p>
                    </div>
                `;
                
                // Add success styling
                formContainer.classList.add('payment-success-container');
                
            }, 1500); // Simulate 1.5 second processing time
        });
        
        // Format card inputs for better UX
        const cardInput = document.getElementById('card-number');
        const expiryInput = document.getElementById('expiry');
        const cvcInput = document.getElementById('cvc');
        
        if (cardInput) {
            cardInput.addEventListener('input', (e) => {
                // Format card number with spaces every 4 digits
                let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                let formattedValue = '';
                
                for (let i = 0; i < value.length; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formattedValue += ' ';
                    }
                    formattedValue += value[i];
                }
                
                e.target.value = formattedValue;
                
                // Limit to 19 characters (16 digits + 3 spaces)
                if (value.length > 16) {
                    e.target.value = formattedValue.substring(0, 19);
                }
            });
        }
        
        if (expiryInput) {
            expiryInput.addEventListener('input', (e) => {
                // Format expiry date as MM/YY
                let value = e.target.value.replace(/[^0-9]/gi, '');
                
                if (value.length > 2) {
                    e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
                } else {
                    e.target.value = value;
                }
            });
        }
        
        if (cvcInput) {
            cvcInput.addEventListener('input', (e) => {
                // Limit CVC to 3-4 digits
                let value = e.target.value.replace(/[^0-9]/gi, '');
                e.target.value = value.substring(0, 4);
            });
        }
    }
    
    // Helper function to scroll to vault and animate it
    function scrollToVault() {
        // Scroll to vault section
        const vaultSection = document.getElementById('vault-feature');
        
        if (vaultSection) {
            vaultSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // After scrolling, animate the vault opening
            setTimeout(() => {
                // Add open class to animate the vault
                vaultWrapper.classList.add('vault-open');
                
                // After the vault animation completes, show the interior content
                setTimeout(() => {
                    vaultInterior.classList.add('visible');
                    vaultInterior.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 1500); // Match this with the CSS animation duration
            }, 1000); // Wait for scroll to complete
        }
    }
}
