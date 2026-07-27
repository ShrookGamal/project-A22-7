document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-btn');
    const menuOverlay = document.getElementById('menu-overlay');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-item, .mobile-item');
    const sections = document.querySelectorAll('section');
    const scrollBtn = document.getElementById('scroll-btn');

    // 1. تشغيل زر الهامبرغر والاكس مع البلور
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        menuOverlay.classList.toggle('active');
        
        // منع السكرول عند فتح المنيو
        if(menuOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // 2. إغلاق القائمة عند الضغط على أي رابط
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 3. تغيير شكل الناف بار عند السكرول (حل مشكلة وضوح النص)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 4. نظام Scroll Spy للـ Active State
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // 5. جعل سهم الايفون يعمل بسلاسة
    scrollBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = scrollBtn.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// مصفوفة الأنيميشن والعدادات لسكشن من نحن
const initAboutSection = () => {
    const section = document.querySelector('.about-section');
    const counters = document.querySelectorAll('.stat-number');
    const revealElements = document.querySelectorAll('.section-reveal');
    
    const countOptions = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // تفعيل ظهور العناصر
                entry.target.classList.add('active');

                // تشغيل عداد الأرقام إذا كان هذا العنصر هو الـ stats-grid
                if (entry.target.classList.contains('stats-grid')) {
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const duration = 2000; // مدة الأنيميشن بالملي ثانية
                        const increment = target / (duration / 16);
                        
                        let currentCount = 0;
                        const updateCount = () => {
                            currentCount += increment;
                            if (currentCount < target) {
                                counter.innerText = Math.ceil(currentCount);
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.innerText = target + (target === 100 ? "%" : "+");
                            }
                        };
                        updateCount();
                    });
                }
            }
        });
    }, countOptions);

    // مراقبة العناصر للظهور
    revealElements.forEach(el => observer.observe(el));
    if(document.querySelector('.stats-grid')) {
        observer.observe(document.querySelector('.stats-grid'));
    }
};

// استدعاء الوظيفة
initAboutSection();
// نظام فلترة معرض الأعمال
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // إزالة الكلاس active من الأزرار
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => { item.style.display = 'none'; }, 400);
            }
        });
    });
});