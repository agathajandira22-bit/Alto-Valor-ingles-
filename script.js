document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (body.hasAttribute('data-theme')) {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // --- Carousel Logic ---
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(container => {
        const track = container.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextBtn = container.querySelector('.next-btn');
        const prevBtn = container.querySelector('.prev-btn');
        let currentIndex = 0;

        const updateCarousel = () => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        // Auto-play for testimonials and product carousel
        if (track.id === 'testimonial-carousel' || track.id === 'product-carousel') {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            }, 4000); // 4 seconds interval for smoother viewing
        }
    });

    // --- Accordion Logic ---
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            // Close others 
            // accordions.forEach(other => {
            //     if (other !== acc) {
            //         other.classList.remove('active');
            //         other.nextElementSibling.style.maxHeight = null;
            //         other.querySelector('i').classList.replace('fa-minus', 'fa-plus');
            //     }
            // });

            // Toggle current
            acc.classList.toggle('active');
            const content = acc.nextElementSibling;
            const icon = acc.querySelector('i');

            if (acc.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.classList.replace('fa-plus', 'fa-minus');
            } else {
                content.style.maxHeight = null;
                icon.classList.replace('fa-minus', 'fa-plus');
            }
        });
    });

    // --- Sales Pop-up Notification ---
    const popup = document.getElementById('sales-popup');
    const popupText = document.getElementById('popup-text');
    const popupTime = document.querySelector('.popup-time');

    const salesData = [
        { name: "Jessica from Rio de Janeiro", action: "just purchased!" },
        { name: "Maria", action: "just joined 3 minutes ago!" },
        { name: "Sarah from London", action: "claimed her guide!" },
        { name: "Ana from São Paulo", action: "started her journey!" },
        { name: "Emily from Texas", action: "is reading now!" }
    ];

    const showPopup = () => {
        // Pick random data
        const data = salesData[Math.floor(Math.random() * salesData.length)];
        popupText.innerText = `${data.name} ${data.action}`;

        // Show
        popup.classList.remove('hidden');
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)';

        // Hide after 5 seconds
        setTimeout(() => {
            popup.style.opacity = '0';
            popup.style.transform = 'translateY(20px)';
            setTimeout(() => {
                popup.classList.add('hidden');
            }, 500); // wait for fade out
        }, 5000);
    };

    // Random interval between 20-40 seconds
    const scheduleNextPopup = () => {
        const delay = Math.floor(Math.random() * (40000 - 20000 + 1) + 20000);
        setTimeout(() => {
            showPopup();
            scheduleNextPopup();
        }, delay);
    };

    // Initial delay
    setTimeout(() => {
        showPopup();
        scheduleNextPopup();
    }, 10000); // First one after 10s

    // --- Intersection Observer for Fade-in Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
});
