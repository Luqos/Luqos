// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

navLinkItems.forEach((link) => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== Active Nav Link Highlighting =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// =====================================================
// Render CV content from data/profile.js (window.PROFILE)
// All text goes in through textContent, never innerHTML.
// =====================================================
const PROFILE = window.PROFILE || {};
const EXTERNAL_REL = 'noopener noreferrer';

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
}

function icon(classes) {
    const i = el('i', classes);
    i.setAttribute('aria-hidden', 'true');
    return i;
}

function externalLink(href, label) {
    const a = el('a');
    a.href = href;
    a.target = '_blank';
    a.rel = EXTERNAL_REL;
    if (label) a.setAttribute('aria-label', label);
    return a;
}

// Simple text fields: <el data-profile="name">
document.querySelectorAll('[data-profile]').forEach((node) => {
    const value = PROFILE[node.getAttribute('data-profile')];
    if (typeof value === 'string') node.textContent = value;
});

const profileImg = document.getElementById('profileImg');
if (profileImg) profileImg.alt = PROFILE.name || '';

const resumeLink = document.getElementById('resumeLink');
if (resumeLink && PROFILE.resumeUrl) resumeLink.href = PROFILE.resumeUrl;

// GitHub / LinkedIn icons (hero + footer)
document.querySelectorAll('[data-social-links]').forEach((container) => {
    const links = PROFILE.links || {};
    if (links.github) {
        const a = externalLink(links.github, 'GitHub');
        a.appendChild(icon('fab fa-github'));
        container.appendChild(a);
    }
    if (links.linkedin) {
        const a = externalLink(links.linkedin, 'LinkedIn');
        a.appendChild(icon('fab fa-linkedin-in'));
        container.appendChild(a);
    }
});

// Contact details
const contactEmail = document.getElementById('contactEmail');
if (contactEmail && PROFILE.email) {
    contactEmail.href = `mailto:${PROFILE.email}`;
    contactEmail.textContent = PROFILE.email;
}
const contactPhone = document.getElementById('contactPhone');
if (contactPhone && PROFILE.phone) {
    contactPhone.href = `tel:${PROFILE.phone.replace(/[^\d+]/g, '')}`;
    contactPhone.textContent = PROFILE.phone;
}

// Languages (About section)
const languagesList = document.getElementById('languagesList');
if (languagesList && Array.isArray(PROFILE.languages)) {
    languagesList.appendChild(el('h3', 'languages-title', 'Languages'));
    const wrap = el('div', 'project-tags languages-tags');
    PROFILE.languages.forEach((lang) => {
        wrap.appendChild(el('span', null, `${lang.name} (${lang.level})`));
    });
    languagesList.appendChild(wrap);
}

// Skills: one card per category
const skillsGrid = document.getElementById('skillsGrid');
if (skillsGrid && Array.isArray(PROFILE.skills)) {
    PROFILE.skills.forEach((group) => {
        const card = el('div', 'skill-card skill-group');
        card.appendChild(icon(group.icon || 'fas fa-check'));
        card.appendChild(el('h3', null, group.category));
        const tags = el('div', 'project-tags skill-tags');
        group.items.forEach((item) => tags.appendChild(el('span', null, item)));
        card.appendChild(tags);
        skillsGrid.appendChild(card);
    });
}

// Timeline entries (experience + education)
function renderTimeline(container, entries, titleKey) {
    if (!container || !Array.isArray(entries)) return;
    entries.forEach((entry) => {
        const card = el('article', 'timeline-card');
        const head = el('div', 'timeline-head');
        head.appendChild(el('h3', null, entry[titleKey]));
        head.appendChild(el('span', 'timeline-date', entry.date));
        card.appendChild(head);
        card.appendChild(el('p', 'timeline-org', entry.org));
        if (entry.meta) card.appendChild(el('p', 'timeline-meta', entry.meta));
        if (entry.points && entry.points.length) {
            const ul = el('ul', 'timeline-points');
            entry.points.forEach((pt) => ul.appendChild(el('li', null, pt)));
            card.appendChild(ul);
        }
        container.appendChild(card);
    });
}
renderTimeline(document.getElementById('experienceList'), PROFILE.experience, 'role');
renderTimeline(document.getElementById('educationList'), PROFILE.education, 'title');

// Certifications, awards, leadership
const certificationsList = document.getElementById('certificationsList');
if (certificationsList && Array.isArray(PROFILE.certifications)) {
    PROFILE.certifications.forEach((cert) => {
        const li = el('li', null, cert.text);
        if (cert.url) {
            li.appendChild(document.createTextNode(' '));
            const a = externalLink(cert.url, `Verify: ${cert.text}`);
            a.className = 'verify-link';
            a.appendChild(icon('fas fa-external-link-alt'));
            a.appendChild(document.createTextNode(' Verify'));
            li.appendChild(a);
        }
        certificationsList.appendChild(li);
    });
}
const awardsList = document.getElementById('awardsList');
if (awardsList && Array.isArray(PROFILE.awards)) {
    PROFILE.awards.forEach((award) => awardsList.appendChild(el('li', null, award)));
}
const leadershipList = document.getElementById('leadershipList');
if (leadershipList && Array.isArray(PROFILE.leadership)) {
    PROFILE.leadership.forEach((item) => {
        const li = el('li');
        li.appendChild(el('strong', null, item.role));
        li.appendChild(el('span', 'info-sub', `${item.org} | ${item.date}`));
        leadershipList.appendChild(li);
    });
}

// =====================================================
// FEATURE 1: Interactive Terminal
// =====================================================
const terminalToggle = document.getElementById('terminalToggle');
const terminalOverlay = document.getElementById('terminalOverlay');
const terminalClose = document.getElementById('terminalClose');
const terminalBody = document.getElementById('terminalBody');
const terminalInput = document.getElementById('terminalInput');

function openTerminal() {
    terminalOverlay.classList.add('open');
    setTimeout(() => terminalInput.focus(), 100);
}

function closeTerminal() {
    terminalOverlay.classList.remove('open');
}

terminalToggle.addEventListener('click', openTerminal);
terminalClose.addEventListener('click', closeTerminal);
terminalOverlay.addEventListener('click', (e) => {
    if (e.target === terminalOverlay) closeTerminal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && terminalOverlay.classList.contains('open')) {
        closeTerminal();
    }
    if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        if (terminalOverlay.classList.contains('open')) {
            closeTerminal();
        } else {
            openTerminal();
        }
    }
});

// Output is plain text (newlines preserved); typed input is never parsed as HTML.
function appendTerminalOutput(text, className = 'terminal-output') {
    const line = el('div', 'terminal-line');
    const span = el('span', className, text);
    span.style.whiteSpace = 'pre-wrap';
    line.appendChild(span);
    line.style.textAlign = 'left';
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function appendTerminalCommand(cmd) {
    const line = el('div', 'terminal-line');
    line.appendChild(el('span', 'terminal-prompt', 'luqman@portfolio:~$'));
    line.appendChild(document.createTextNode(` ${cmd}`));
    line.style.textAlign = 'left';
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

const terminalCommands = {
    help: () => [
        'Available commands:',
        '  help        - Show this help message',
        '  whoami      - Display current user info',
        '  skills      - List my technical skills',
        '  experience  - Show work experience',
        '  projects    - Show featured GitHub projects',
        '  education   - Show education',
        '  contact     - Display contact information',
        '  uname -a    - Show system information',
        '  clear       - Clear the terminal',
        '  echo [msg]  - Print a message',
        '  ls          - List portfolio sections',
        '  pwd         - Print current directory',
        '  date        - Show current date and time',
    ].join('\n'),
    whoami: () => [PROFILE.name, PROFILE.headline, PROFILE.location].join('\n'),
    skills: () => ['Technical Skills:']
        .concat((PROFILE.skills || []).map((g) => `  ${g.category}:\n    - ${g.items.join(', ')}`))
        .join('\n'),
    experience: () => ['Work Experience:']
        .concat((PROFILE.experience || []).map((x) => `  ${x.role}\n    ${x.org} | ${x.date}`))
        .join('\n'),
    projects: () => ['Featured GitHub Projects:']
        .concat((PROFILE.projects || []).map((p, i) => `  ${i + 1}. ${p.title}\n     ${p.repo}`))
        .join('\n'),
    education: () => ['Education:']
        .concat((PROFILE.education || []).map((x) => `  ${x.title}\n    ${x.org} | ${x.date}${x.meta ? ` | ${x.meta}` : ''}`))
        .join('\n'),
    contact: () => [
        'Contact Information:',
        `  Email:    ${PROFILE.email}`,
        `  Phone:    ${PROFILE.phone}`,
        `  Location: ${PROFILE.location}`,
        `  GitHub:   ${(PROFILE.links || {}).github}`,
        `  LinkedIn: ${(PROFILE.links || {}).linkedin}`,
    ].join('\n'),
    'uname -a': () => 'Linux portfolio-server 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux',
    ls: () => 'home/  about/  skills/  experience/  projects/  education/  achievements/  contact/',
    pwd: () => '/home/luqman/portfolio',
    date: () => new Date().toString(),
    echo: (args) => args || '',
};

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value.trim();
        terminalInput.value = '';

        if (!input) {
            appendTerminalCommand('');
            return;
        }

        appendTerminalCommand(input);

        const parts = input.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1).join(' ');

        if (cmd === 'clear') {
            terminalBody.replaceChildren();
            return;
        }

        if (cmd === 'echo') {
            appendTerminalOutput(terminalCommands.echo(args));
            return;
        }

        if (cmd === 'uname' && args === '-a') {
            appendTerminalOutput(terminalCommands['uname -a']());
            return;
        }

        if (Object.prototype.hasOwnProperty.call(terminalCommands, cmd)) {
            appendTerminalOutput(terminalCommands[cmd]());
        } else {
            appendTerminalOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'terminal-error');
        }
    }
});

// =====================================================
// FEATURE 2: Project Cards (from data/profile.js)
// =====================================================
const projectsGrid = document.getElementById('projectsGrid');

function buildProjectCard(project) {
    const card = el('div', 'project-card');
    card.setAttribute('data-tags', (project.filters || []).join(' '));

    // CSS-only banner (replaces the old external placeholder image service)
    const banner = el('div', 'project-img project-banner');
    banner.setAttribute('aria-hidden', 'true');
    banner.appendChild(icon('fab fa-github'));
    card.appendChild(banner);

    const info = el('div', 'project-info');
    info.appendChild(el('h3', null, project.title));

    const ul = el('ul', 'project-points');
    project.points.forEach((pt) => ul.appendChild(el('li', null, pt)));
    info.appendChild(ul);

    const tags = el('div', 'project-tags');
    project.tech.forEach((t) => tags.appendChild(el('span', null, t)));
    info.appendChild(tags);

    const links = el('div', 'project-links');
    const code = externalLink(project.repo, `Source code for ${project.title} on GitHub`);
    code.appendChild(icon('fab fa-github'));
    code.appendChild(document.createTextNode(' Code'));
    links.appendChild(code);
    info.appendChild(links);

    card.appendChild(info);
    return card;
}

if (projectsGrid && Array.isArray(PROFILE.projects)) {
    PROFILE.projects.forEach((p) => projectsGrid.appendChild(buildProjectCard(p)));
}

// =====================================================
// FEATURE 3: Project Filtering System
// =====================================================
function initFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach((card) => {
                const tags = (card.getAttribute('data-tags') || '').toLowerCase().split(' ');
                if (filter === 'all' || tags.includes(filter.toLowerCase())) {
                    card.classList.remove('hidden', 'fade-out');
                    card.classList.add('fade-in');
                } else {
                    card.classList.add('fade-out');
                    card.classList.remove('fade-in');
                    setTimeout(() => {
                        if (card.classList.contains('fade-out')) card.classList.add('hidden');
                    }, 400);
                }
            });
        });
    });
}

initFilter();

// =====================================================
// FEATURE 4: Contact Form — WhatsApp & Email (Web3Forms)
// =====================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const btnEmail = document.getElementById('btnEmail');
const btnWhatsapp = document.getElementById('btnWhatsapp');

function validateContactFields() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill in all fields.';
        return null;
    }
    return { name, email, message };
}

// WhatsApp Logic
btnWhatsapp.addEventListener('click', () => {
    const data = validateContactFields();
    if (!data) return;

    const encodedMessage = `New Portfolio Message!%0AName: ${encodeURIComponent(data.name)}%0AEmail: ${encodeURIComponent(data.email)}%0AMessage: ${encodeURIComponent(data.message)}`;

    formStatus.className = 'form-status';
    formStatus.textContent = '';

    window.open(`https://wa.me/${PROFILE.whatsapp}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
});

// Email Logic via Web3Forms
btnEmail.addEventListener('click', async () => {
    const data = validateContactFields();
    if (!data) return;

    const originalText = btnEmail.innerHTML;
    btnEmail.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    btnEmail.disabled = true;
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            btnEmail.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
            btnEmail.style.background = '#2ecc71';
            contactForm.reset();
        } else {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Failed to send message. Please try again later.';
            btnEmail.innerHTML = originalText;
        }
    } catch (err) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Network error. Please check your connection and try again.';
        btnEmail.innerHTML = originalText;
    }

    btnEmail.style.background = '';
    btnEmail.disabled = false;

    setTimeout(() => {
        btnEmail.innerHTML = originalText;
        btnEmail.style.background = '';
    }, 3000);
});

// ===== Smooth Reveal Animation on Scroll =====
const revealElements = document.querySelectorAll(
    '.skill-card, .timeline-card, .info-card, .contact-content > *'
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});