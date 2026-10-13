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
    if (personData.brand.metaDescription) {
        document.getElementById('meta-description').setAttribute('content', personData.brand.metaDescription);
    }
    document.getElementById('nav-logo').textContent = personData.brand.logoText;
    document.getElementById('footer-logo').textContent = personData.brand.logoText;

    // Nav Links
    const navList = document.getElementById('nav-list');
    if (navList) {
        personData.navLinks.forEach(link => {
            const li = document.createElement('li');
            li.className = 'nav__item';
            li.innerHTML = `<a href="${link.url}" class="nav__link"><img src="${link.iconPath}" alt="${link.text}" class="nav__icon"><span class="nav__tooltip">${link.text}</span></a>`;
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

    // Hero Social Links
    const heroSocial = document.getElementById('hero-social');
    if (heroSocial && personData.hero.socialLinks) {
        personData.hero.socialLinks.forEach(social => {
            const link = document.createElement('a');
            link.href = social.url;
            link.className = 'hero__social-link';
            link.setAttribute('aria-label', social.platform);
            link.innerHTML = `<img src="${social.iconPath}" alt="${social.platform}" onerror="this.style.display='none'">`;
            heroSocial.appendChild(link);
        });
    }

    // Expertise
    const expertiseGrid = document.getElementById('expertise-grid');
    if (expertiseGrid) {
        personData.expertise.forEach((exp, i) => {
            const card = document.createElement('div');
            card.className = 'expertise__card';
            card.style.animationDelay = `${i * 0.1}s`;
            card.innerHTML = `
                <img src="${exp.iconPath}" alt="${exp.title}" class="expertise__icon" onerror="this.style.display='none'">
                <h3 class="expertise__card-title">${exp.title}</h3>
                <p class="expertise__card-desc">${exp.description}</p>
            `;
            expertiseGrid.appendChild(card);
        });
    }

    // Education
    const educationList = document.getElementById('education-list');
    if (educationList) {
        personData.education.forEach((edu, i) => {
            const item = document.createElement('div');
            item.className = 'education__item';
            item.style.animationDelay = `${i * 0.1}s`;
            item.innerHTML = `
                <div class="education__degree">${edu.degree}</div>
                <div class="education__institution">${edu.institution}</div>
                <div class="education__date">${edu.date}</div>
                ${edu.gpa ? `<div class="education__gpa">GPA: ${edu.gpa}</div>` : ''}
            `;
            educationList.appendChild(item);
        });
    }

    // Works / Projects
    const worksGrid = document.getElementById('works-grid');
    if (worksGrid) {
        personData.works.forEach((work, i) => {
            const item = document.createElement('div');
            item.className = 'works__item';
            item.style.animationDelay = `${i * 0.1}s`;
            item.innerHTML = `
                <img src="${work.imagePath}" alt="${work.title}" class="works__image" onerror="this.src='https://via.placeholder.com/400x300?text=Project'">
                <h3 class="works__item-title">${work.title}</h3>
                <p class="works__item-desc">${work.description}</p>
            `;
            if (work.tech) {
                const techContainer = document.createElement('div');
                techContainer.className = 'works__tech';
                work.tech.forEach(tech => {
                    const span = document.createElement('span');
                    span.className = 'works__tech-tag';
                    span.textContent = tech;
                    techContainer.appendChild(span);
                });
                item.appendChild(techContainer);
            }
            worksGrid.appendChild(item);
        });
    }

    // About
    const aboutIntro = document.getElementById('about-intro');
    if (aboutIntro) aboutIntro.textContent = personData.about.intro;
    const aboutQuote = document.getElementById('about-quote');
    if (aboutQuote) aboutQuote.textContent = personData.about.quote;

    // Contact Info (About Section)
    const focusVal = document.getElementById('info-design-for-value');
    if (focusVal) focusVal.textContent = personData.contact.focus;
    const emailVal = document.getElementById('info-email-value');
    if (emailVal) {
        emailVal.textContent = personData.contact.email;
        emailVal.href = `mailto:${personData.contact.email}`;
    }
    const locationVal = document.getElementById('info-location-value');
    if (locationVal) locationVal.textContent = personData.contact.location;

    // Skills (simple list)
    const skillsContainer = document.getElementById('skills-bars');
    if (skillsContainer) {
        skillsContainer.className = 'skills__tags';
        skillsContainer.innerHTML = '';
        personData.about.skills.forEach(skill => {
            const tag = document.createElement('span');
            tag.className = 'skill__tag';
            tag.textContent = typeof skill === 'string' ? skill : skill.label;
            skillsContainer.appendChild(tag);
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

    // Certificates
    const certificatesList = document.getElementById('certificates-list');
    if (certificatesList && personData.certificates) {
        personData.certificates.forEach((cert, i) => {
            const item = document.createElement('div');
            item.className = 'certificate__item';
            item.style.animationDelay = `${i * 0.1}s`;
            item.innerHTML = `
                <img src="assets/person/icon-system.svg" alt="Certificate" class="certificate__icon" onerror="this.style.display='none'">
                <h3 class="certificate__title">${cert.title}</h3>
                <p class="certificate__issuer">${cert.issuer}</p>
                <p class="certificate__date">${cert.date}</p>
                ${cert.url ? `<a href="${cert.url}" class="certificate__link" target="_blank">View Certificate</a>` : ''}
            `;
            certificatesList.appendChild(item);
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

    // Footer Nav Links
    const footerNav = document.getElementById('footer-nav');
    if (footerNav && personData.footer.navLinks) {
        const nav = document.createElement('ul');
        nav.className = 'footer__nav-list';
        personData.footer.navLinks.forEach(link => {
            const li = document.createElement('li');
            li.className = 'footer__nav-item';
            li.innerHTML = `<a href="${link.url}" class="footer__nav-link">${link.text}</a>`;
            nav.appendChild(li);
        });
        footerNav.appendChild(nav);
    }
});

// Mobile Nav Toggle
const navToggle = document.getElementById('nav-toggle');
const navListEl = document.getElementById('nav-list');
if (navToggle && navListEl) {
    navToggle.addEventListener('click', () => {
        navListEl.classList.toggle('nav__list--open');
    });
}

// Close mobile menu on resize if desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && navListEl) {
        navListEl.classList.remove('nav__list--open');
    }
});

// Header scroll effect
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    });
}

// Close mobile menu when clicking nav links
if (navListEl) {
    navListEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav__link') && navListEl.classList.contains('nav__list--open')) {
            navListEl.classList.remove('nav__list--open');
        }
    });
}
