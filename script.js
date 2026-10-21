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
            const isActive = window.location.hash === link.url;
            const iconName = link.iconPath.split('/').pop().replace('.svg', '').replace('nav-', '');
            const shortLabel = link.shortText || link.text;
            li.innerHTML = `
                <a href="${link.url}" class="nav__link" aria-current="${isActive ? 'page' : 'false'}">
                    ${navIconSVG(iconName)}
                    <span class="nav__label nav__label--full">${link.text}</span>
                    <span class="nav__label nav__label--short">${shortLabel}</span>
                </a>
            `;
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
            link.innerHTML = socialSVG(social.platform);
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
                <img src="${work.imagePath}" alt="${work.title}" class="works__image" onerror="this.style.display='none'">
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
            if (work.link) {
                const linkContainer = document.createElement('div');
                linkContainer.className = 'works__links';
                const viewBtn = document.createElement('a');
                viewBtn.href = work.link;
                viewBtn.className = 'btn btn--primary works__btn';
                viewBtn.textContent = 'View project';
                viewBtn.target = '_blank';
                viewBtn.rel = 'noopener noreferrer';
                linkContainer.appendChild(viewBtn);
                const srcBtn = document.createElement('a');
                srcBtn.href = 'https://github.com/Ialwaysloveu';
                srcBtn.className = 'btn btn--ghost works__btn';
                srcBtn.textContent = 'Source';
                srcBtn.target = '_blank';
                srcBtn.rel = 'noopener noreferrer';
                linkContainer.appendChild(srcBtn);
                item.appendChild(linkContainer);
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
            // CHECK: date vs 2027 graduation.
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
            link.innerHTML = socialSVG(social.platform);
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

// Social icon inline SVGs (48x48 tap targets, accessible)
function socialSVG(platform) {
    if (platform === 'GitHub') {
        return '<img src="assets/person/github-logo-png-hd-11659780126wgzczltlbm.png" alt="GitHub" width="24" height="24" aria-hidden="true" focusable="false" style="display:block;">';
    }
    if (platform === 'Email') {
        return '<svg width="48" height="48" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>';
    }
    return '<svg width="48" height="48" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7.17-3.77-7.17-7.93 0-.62.08-1.21.21-1.79L9 15v-5c0-.35.1-.69.26-.96l2.7-2.8v-.02l-2.7-2.8c-.13-.14-.24-.31-.26-.49 0-.14.01-.29.01-.43 0-.45.15-.85.42-1.19 1.51-1.94 4.04-2.27 6.09-1.08 1.61.99 3.09 2.96 4.18 4.95v3.4c-1.49-.34-2.98-.69-4.23-.85l-.1-.1c-.14-.04-.3-.07-.45-.08-.14-.01-.29-.01-.43-.01-.26 0-.52.1-.76.25-.28.18-.58.48-.82.89-.13.23-.21.49-.21.77v.05c0 .24.02.48.07.71.08.41.24.79.47 1.11.35.49.81.9 1.38 1.21.57.32 1.24.51 1.97.51.73 0 1.4-.19 1.97-.51.57-.32 1.03-.72 1.38-1.21.23-.32.39-.7.47-1.11.05-.23.07-.47.07-.71 0-.28-.08-.54-.21-.77-.24-.41-.54-.71-.82-.89-.24-.15-.5-.25-.76-.25-.14 0-.29 0-.43.01-.15.01-.31.04-.45.08l-.1.1c-1.25.16-2.74.51-4.23.85v-3.4c1.09-1.99 2.57-3.96 4.18-4.95 2.05-1.19 4.58-.86 6.09 1.08.27.34.42.74.42 1.19 0 .14.01.29.01.43 0 .18-.03.35-.06.5-.07.38-.25.73-.45 1.01-.22.32-.48.61-.77.87l-.02.02v5c0 .35.1.69.26.96l2.7 2.8v.02l-2.7 2.8c-.16.27-.26.61-.26.96v.02c0 .62.08 1.21.21 1.79 0 4.16-3.22 7.44-7.17 7.93-.04.22-.06.44-.06.67v.02c0 .23.02.45.06.67-.03.11-.05.21-.05.32v.01c0 .41.27.76.64.92.24.11.5.17.79.17.08 0 .16-.01.24-.02.39-.05.76-.2 1.08-.47.34-.3.59-.71.79-1.18.17-.41.28-.87.28-1.39v-.01c0-.11-.02-.21-.05-.32v-.02c0-.23-.02-.45-.06-.67 0-.23-.02-.45-.06-.67"/></svg>';
}

// Inline nav icons (Lucide-style, stroke=currentColor, consistent 2px stroke, 20px size)
function navIconSVG(name) {
    const icons = {
        home: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
        expertise: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
        education: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>',
        work: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>',
        certificates: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>',
        about: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
    };
    return icons[name] || '';
}

// Theme toggle inline SVGs (moon = switch to dark, sun = switch to light)
const themeSVG = {
    moon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    sun: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
};

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');
const root = document.documentElement;

function setTheme(dark) {
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    themeToggle.setAttribute('aria-pressed', dark);
    themeToggleIcon.innerHTML = dark ? themeSVG.sun : themeSVG.moon;
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    try {
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (e) {
        // localStorage unavailable
    }
    const metas = document.querySelectorAll('meta[name="theme-color"]');
    metas.forEach((m) => {
        m.content = dark ? '#0f172a' : '#f8fafc';
    });
}

if (themeToggle && themeToggleIcon) {
    const currentDark = root.getAttribute('data-theme') === 'dark';
    setTheme(currentDark);
    themeToggle.addEventListener('click', () => {
        const dark = root.getAttribute('data-theme') !== 'dark';
        setTheme(dark);
    });
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    try {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches);
        }
    } catch (err) {
        setTheme(e.matches);
    }
});

// Fade-up on scroll (respects prefers-reduced-motion)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (!reduceMotion) {
                entry.target.classList.add('fade-up');
            } else {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'none';
            }
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section-header, .expertise__card, .education__item, .works__item, .certificate__item').forEach((el) => {
    if (reduceMotion) {
        el.style.opacity = '1';
        el.style.transform = 'none';
    } else {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    }
});

// Highlight current section while scrolling using IntersectionObserver
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');
let isScrolling = false;
let scrollEndTimer;

// Single source of truth: aria-current="page" only (no separate .active class)
function setActiveLink(id) {
    navLinks.forEach(link => {
        link.removeAttribute('aria-current');
    });
    const active = document.querySelector(`.nav__link[href="#${id}"]`);
    if (active) {
        active.setAttribute('aria-current', 'page');
    }
}

// Find the section whose top is closest to the top of the viewport (below the header)
function findActiveSection() {
    const header = document.getElementById('header');
    const headerHeight = header ? header.offsetHeight : 64;
    let closest = null;
    let closestDist = Infinity;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // section top is at or just below the top of viewport (accounting for header)
        const dist = rect.top - headerHeight;
        if (dist >= -headerHeight && dist < closestDist) {
            closestDist = dist;
            closest = section.id;
        }
    });
    // Fallback: at very top, Home is active; at very bottom, last section is active
    if (!closest && sections.length > 0) {
        const first = sections[0].id;
        const last = sections[sections.length - 1].id;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop <= 0) closest = first;
        else closest = last;
    }
    return closest;
}

function onObserverChange() {
    if (isScrolling) return;
    const id = findActiveSection();
    if (id) setActiveLink(id);
}

const navObserver = new IntersectionObserver((entries) => {
    onObserverChange();
}, { root: null, rootMargin: '-64px 0% -64px 0%', threshold: 0 });

sections.forEach((section) => {
    navObserver.observe(section);
});

// Set initial active link from URL hash
if (window.location.hash) {
    setActiveLink(window.location.hash.slice(1));
}

// Smooth scroll on nav link click (respects prefers-reduced-motion)
// Pause the observer during scroll so other icons don't flash
navList.addEventListener('click', (e) => {
    const link = e.target.closest('.nav__link');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
        e.preventDefault();
        const id = href.slice(1);
        setActiveLink(id);
        isScrolling = true;
        const target = document.querySelector(href);
        if (target) {
            if (reduceMotion) {
                target.scrollIntoView();
                isScrolling = false;
                onObserverChange();
            } else {
                target.scrollIntoView({ behavior: 'smooth' });
                const endScroll = () => {
                    isScrolling = false;
                    onObserverChange();
                    window.removeEventListener('scrollend', endScroll);
                    clearTimeout(scrollEndTimer);
                };
                window.addEventListener('scrollend', endScroll);
                scrollEndTimer = setTimeout(endScroll, 800);
            }
        }
    }
});
