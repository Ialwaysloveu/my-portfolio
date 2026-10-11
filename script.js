document.addEventListener('DOMContentLoaded', async () => {
    let personData;
    try {
        const response = await fetch('data/person.json');
        if (!response.ok) throw new Error('Failed to load person data');
        personData = await response.json();
    } catch (error) {
        console.error('Error loading person data:', error);
        return;
    }

    // Header & Meta
    document.getElementById('page-title').textContent = personData.brand.pageTitle;
    document.getElementById('nav-logo').textContent = personData.brand.logoText;
    document.getElementById('footer-logo').textContent = personData.brand.logoText;
    
    // Nav Links
    const navList = document.getElementById('nav-list');
    if (navList) {
        personData.navLinks.forEach(link => {
            const li = document.createElement('li');
            li.className = 'nav__item';
            li.innerHTML = `<a href="${link.url}" class="nav__link">${link.text}</a>`;
            navList.appendChild(li);
        });
    }

    // Hero Section
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) heroTitle.textContent = personData.hero.title;
    const heroSubtitle = document.getElementById('hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = personData.hero.subtitle;
    const heroDesc = document.getElementById('hero-description');
    if (heroDesc) heroDesc.textContent = personData.hero.description;
    const heroPhoto = document.getElementById('hero-photo');
    if (heroPhoto) {
        heroPhoto.src = personData.hero.photoPath;
        heroPhoto.alt = personData.hero.title;
    }
    
    // Hero CTAs
    const ctaPrimary = document.getElementById('hero-cta-primary');
    if (ctaPrimary) {
        ctaPrimary.textContent = personData.hero.ctaPrimaryText;
        ctaPrimary.href = personData.hero.ctaPrimaryLink;
    }
    const ctaSecondary = document.getElementById('hero-cta-secondary');
    if (ctaSecondary) {
        ctaSecondary.textContent = personData.hero.ctaSecondaryText;
        ctaSecondary.href = personData.hero.ctaSecondaryLink;
    }

    // Contact Info (About Section)
    const designForVal = document.getElementById('info-design-for-value');
    if (designForVal) designForVal.textContent = personData.contact.designFor;
    const phoneVal = document.getElementById('info-phone-value');
    if (phoneVal) {
        phoneVal.textContent = personData.contact.phone;
        phoneVal.href = `tel:${personData.contact.phone}`;
    }
    const emailVal = document.getElementById('info-email-value');
    if (emailVal) {
        emailVal.textContent = personData.contact.email;
        emailVal.href = `mailto:${personData.contact.email}`;
    }

    // Expertise
    const expertiseGrid = document.getElementById('expertise-grid');
    if (expertiseGrid) {
        personData.expertise.forEach(exp => {
            const card = document.createElement('div');
            card.className = 'expertise__card';
            card.innerHTML = `
                <img src="${exp.iconPath}" alt="${exp.title}" class="expertise__icon" onerror="this.style.display='none'">
                <h3 class="expertise__card-title">${exp.title}</h3>
                <p class="expertise__card-desc">${exp.description}</p>
                <a href="#" class="expertise__card-link">${exp.linkText}</a>
            `;
            expertiseGrid.appendChild(card);
        });
    }

    // Works
    const worksGrid = document.getElementById('works-grid');
    if (worksGrid) {
        personData.works.forEach(work => {
            const item = document.createElement('div');
            item.className = 'works__item';
            item.innerHTML = `
                <img src="${work.imagePath}" alt="${work.title}" class="works__image" onerror="this.src='https://via.placeholder.com/400x300?text=Work'">
                <h3 class="works__item-title">${work.title}</h3>
            `;
            worksGrid.appendChild(item);
        });
    }

    // About
    const aboutIntro = document.getElementById('about-intro');
    if (aboutIntro) aboutIntro.textContent = personData.about.intro;
    const aboutQuote = document.getElementById('about-quote');
    if (aboutQuote) aboutQuote.textContent = personData.about.quote;
    
    // Skills
    const skillsBars = document.getElementById('skills-bars');
    if (skillsBars) {
        personData.about.skills.forEach(skill => {
            const bar = document.createElement('div');
            bar.className = 'skill';
            bar.innerHTML = `
                <div class="skill__header">
                    <span class="skill__label">${skill.label}</span>
                    <span class="skill__percentage">${skill.percentage}%</span>
                </div>
                <div class="skill__bar">
                    <div class="skill__progress" style="width: ${skill.percentage}%"></div>
                </div>
            `;
            skillsBars.appendChild(bar);
        });
    }

    // Tools
    const toolsList = document.getElementById('tools-list');
    if (toolsList) {
        personData.about.tools.forEach(tool => {
            const item = document.createElement('div');
            item.className = 'tool';
            item.innerHTML = `
                <img src="${tool.iconPath}" alt="${tool.name}" class="tool__icon" onerror="this.style.display='none'">
                <span class="tool__name">${tool.name}</span>
            `;
            toolsList.appendChild(item);
        });
    }

    // Testimonials
    const track = document.getElementById('testimonials-track');
    if (track) {
        personData.testimonials.forEach(test => {
            const t = document.createElement('div');
            t.className = 'testimonial';
            t.innerHTML = `
                <p class="testimonial__quote">"${test.quote}"</p>
                <div class="testimonial__author">
                    <img src="${test.avatarPath}" alt="${test.name}" class="testimonial__avatar" onerror="this.src='https://via.placeholder.com/50'">
                    <div>
                        <h4 class="testimonial__name">${test.name}</h4>
                        <p class="testimonial__role">${test.role}</p>
                    </div>
                </div>
            `;
            track.appendChild(t);
        });
        
        // Initialize simple slider
        initTestimonialSlider();
    }

    // News
    const newsGrid = document.getElementById('news-grid');
    if (newsGrid) {
        personData.news.forEach(news => {
            const item = document.createElement('article');
            item.className = 'news__item';
            item.innerHTML = `
                <img src="${news.imagePath}" alt="${news.title}" class="news__image" onerror="this.src='https://via.placeholder.com/400x250?text=News'">
                <div class="news__content">
                    <span class="news__tag">${news.tag}</span>
                    <h3 class="news__item-title">${news.title}</h3>
                    <div class="news__meta">
                        <span>${news.date}</span>
                        <span>By ${news.author}</span>
                    </div>
                </div>
            `;
            newsGrid.appendChild(item);
        });
    }

    // Footer
    const footerDesc = document.getElementById('footer-description');
    if (footerDesc) footerDesc.textContent = personData.footer.blurb;
    const footerCopy = document.getElementById('footer-copyright');
    if (footerCopy) footerCopy.textContent = personData.footer.copyright;
    
    // Footer Social Links
    const footerSocial = document.getElementById('footer-social');
    if (footerSocial && personData.footer.socialLinks) {
        personData.footer.socialLinks.forEach(social => {
            const link = document.createElement('a');
            link.href = social.url;
            link.className = 'footer__social-link';
            link.setAttribute('aria-label', social.platform);
            link.innerHTML = `<img src="${social.iconPath}" alt="${social.platform}" onerror="this.style.display='none'">`;
            footerSocial.appendChild(link);
        });
    }
});

function initTestimonialSlider() {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dotsContainer = document.getElementById('testimonials-dots');
    const testimonials = track.querySelectorAll('.testimonial');
    
    if (testimonials.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }
    
    let currentIndex = 0;
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'testimonials__dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.testimonials__dot');
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateSlider();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-slide
    setInterval(nextSlide, 5000);
}