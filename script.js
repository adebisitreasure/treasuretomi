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
/*
// Lazy-load the background video after page load and interaction
const backgroundVideo = document.querySelector('.background-video');
const videoPlaceholder = document.querySelector('.video-placeholder');
let videoLoaded = false;

const loadBackgroundVideo = () => {
    if (videoLoaded || !backgroundVideo) return;
    const source = backgroundVideo.querySelector('source[data-src]');
    if (!source) return;

    source.src = source.dataset.src;
    backgroundVideo.load();
    videoLoaded = true;

    backgroundVideo.addEventListener('canplay', () => {
        backgroundVideo.classList.add('loaded');
        if (videoPlaceholder) {
            videoPlaceholder.classList.add('fade-out');
            setTimeout(() => {
                videoPlaceholder.style.display = 'none';
            }, 400);
        }
    }, { once: true });

    backgroundVideo.play().catch(() => {
        // If autoplay is blocked, user interaction will start playback later.
    });
};

window.addEventListener('load', () => {
    setTimeout(loadBackgroundVideo, 1500);
});

['scroll', 'mousemove', 'click', 'touchstart'].forEach(eventName => {
    window.addEventListener(eventName, loadBackgroundVideo, { once: true });
});
*/

const elements = document.querySelectorAll(".reveal, .reveal.normal");

// 🔥 scroll tracking
let lastScrollY = window.scrollY;
let lastTime = performance.now();
let scrollSpeed = 0;

// smooth speed (removes jitter)
const SMOOTHING = 0.15;

window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    const currentTime = performance.now();

    const deltaY = Math.abs(currentY - lastScrollY);
    const deltaTime = currentTime - lastTime;

    const instantSpeed = deltaY / (deltaTime || 1);

    // smooth velocity
    scrollSpeed += (instantSpeed - scrollSpeed) * SMOOTHING;

    lastScrollY = currentY;
    lastTime = currentTime;
});

const observer = new IntersectionObserver((entries, observer) => {

    let batchDelay = 0;

    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        const isFastScroll = scrollSpeed > 1.2;

        if (isFastScroll) {
            // ⚡ instant reveal (no delay)
            el.style.transitionDelay = "0s";
        } else {
            // 🐢 smooth stagger (TUNED)
            const delay = Math.min(batchDelay, 0.3);
            el.style.transitionDelay = `${delay}s`;

            batchDelay += 0.14;
        }

        el.classList.add("show");
        observer.unobserve(el);
    });

}, {
    threshold: 0.2,
    rootMargin: "0px 0px 1% 0px"
});

elements.forEach(el => observer.observe(el));

