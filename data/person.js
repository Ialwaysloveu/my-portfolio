const personData = {
    brand: {
        logoText: "Angelo.",
        pageTitle: "Angelo Salivio"
    },
    hero: {
        subtitle: "Head of design at Angelo",
        title: "Angelo Salivio",
        description: "I'm a digital product designer based in San Francisco.",
        photoPath: "assets/person/profile.jpg",
        ctaPrimaryText: "View Works",
        ctaPrimaryLink: "#works",
        ctaSecondaryText: "Download CV",
        ctaSecondaryLink: "#"
    },
    contact: {
        designFor: "Web & Mobile",
        phone: "+1 (234) 567 890",
        email: "hello@calvino.com"
    },
    navLinks: [
        { text: "Home", url: "#hero" },
        { text: "Expertise", url: "#expertise" },
        { text: "Works", url: "#works" },
        { text: "About", url: "#about" }
    ],
    expertise: [
        { title: "UI/UX Design", description: "Creating beautiful and functional interfaces.", linkText: "Learn more", iconPath: "assets/person/icon-ux.svg" },
        { title: "Web Development", description: "Building modern and responsive websites.", linkText: "Learn more", iconPath: "assets/person/icon-web.svg" }
    ],
    works: [
        { title: "Project Alpha", imagePath: "assets/person/work1.jpg" },
        { title: "Project Beta", imagePath: "assets/person/work2.jpg" }
    ],
    about: {
        intro: "Hi, I'm Angelo. I have over 10 years of experience designing for web and mobile.",
        quote: "Design is not just what it looks like and feels like. Design is how it works.",
        skills: [
            { label: "Figma", percentage: 95 },
            { label: "HTML/CSS", percentage: 90 },
            { label: "JavaScript", percentage: 80 }
        ],
        tools: [
            { name: "Figma", iconPath: "assets/person/tool-figma.svg" },
            { name: "VS Code", iconPath: "assets/person/tool-vscode.svg" }
        ]
    },
    testimonials: [
        { quote: "Angelo is a fantastic designer who always delivers on time.", name: "Jane Doe", role: "CEO, TechCorp", avatarPath: "assets/person/avatar1.jpg" }
    ],
    news: [
        { title: "Design Trends 2026", tag: "Design", date: "Oct 10, 2026", author: "Angelo", imagePath: "assets/person/news1.jpg" }
    ],
    footer: {
        blurb: "Let's create something amazing together.",
        copyright: "© 2026 Angelo Salivio. All rights reserved.",
        socialLinks: [
            { platform: "Twitter", url: "#" },
            { platform: "LinkedIn", url: "#" }
        ]
    }
};
