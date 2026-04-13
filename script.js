// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Email button functionality
const emailButtons = document.querySelectorAll('.email-btn, .email-btn-hero, .email-btn-footer');
emailButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const email = 't.tomi3a@gmail.com';
        // Copy to clipboard
        navigator.clipboard.writeText(email).then(() => {
            // Find the email text span
            const emailTextSpan = button.querySelector('.email-text');
            if (emailTextSpan) {
                const originalText = emailTextSpan.textContent;
                emailTextSpan.classList.add('fade-out');
                setTimeout(() => {
                    emailTextSpan.textContent = 'EMAIL COPIED!';
                    emailTextSpan.classList.remove('fade-out');
                }, 200);
                button.style.pointerEvents = 'none';
                // Revert after 3 seconds
                setTimeout(() => {
                    emailTextSpan.classList.add('fade-out');
                    setTimeout(() => {
                        emailTextSpan.textContent = originalText;
                        emailTextSpan.classList.remove('fade-out');
                        button.style.pointerEvents = 'auto';
                    }, 200);
                }, 2500);
            }
        }).catch(err => {
            // Fallback: open mailto if clipboard fails
            window.location.href = `mailto:${email}`;
        });
    });
});


