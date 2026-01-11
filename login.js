document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 600,
        easing: 'ease-out-quad',
        once: true
    });

    // Tab Switching
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    const indicator = document.querySelector('.active-indicator');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            tab.classList.add('active');
            const formId = tab.getAttribute('data-tab');
            document.getElementById(formId + 'Form').classList.add('active');
            
            // Move active indicator
            const tabIndex = Array.from(tabs).indexOf(tab);
            indicator.style.transform = `translateX(${tabIndex * 100}%)`;
        });
    });

    // Password Strength Checker
    const passwordInput = document.getElementById('registerPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const strengthBars = document.querySelectorAll('.strength-bar');
            const strengthText = document.querySelector('.strength-text');
            const password = this.value;
            let strength = 0;
            
            // Check password strength
            if (password.length > 0) strength += 1;
            if (password.length >= 8) strength += 1;
            if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 1;
            
            // Update UI
            strengthBars.forEach((bar, index) => {
                bar.style.background = index < strength ? 
                    (strength === 1 ? '#ff4757' : strength === 2 ? '#ffa502' : '#2ed573') : '#eee';
            });
            
            strengthText.textContent = 
                strength === 0 ? 'Password Strength' :
                strength === 1 ? 'Weak' :
                strength === 2 ? 'Moderate' : 'Strong';
            strengthText.style.color = 
                strength === 1 ? '#ff4757' :
                strength === 2 ? '#ffa502' : '#2ed573';
        });
    }

    // Forgot Password Modal
    const forgotPasswordLink = document.querySelector('.forgot-password');
    const modal = document.getElementById('forgot-password');
    const modalClose = document.querySelector('.modal-close');
    
    if (forgotPasswordLink && modal) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
        });
        
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Form Submissions
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your login logic here
            alert('Login functionality would be implemented here');
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your registration logic here
            alert('Registration functionality would be implemented here');
        });
    }
    
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your password reset logic here
            alert('Password reset link would be sent');
            modal.style.display = 'none';
        });
    }
});