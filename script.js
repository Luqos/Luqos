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
// FEATURE 1: Interactive Terminal
// =====================================================
const terminalToggle = document.getElementById('terminalToggle');
const terminalOverlay = document.getElementById('terminalOverlay');
const terminalClose = document.getElementById('terminalClose');
const terminalBody = document.getElementById('terminalBody');
const terminalInput = document.getElementById('terminalInput');

const GITHUB_USERNAME = 'Luqos';
const targetRepos = [
    'FastAPI-with-Python-CI-CD',
    'Static-Website-CI-CD',
    'Health-Telemetry-CD-CD',
    'go-microservice'
];

// Hardcoded fallback data in case GitHub API is rate-limited
const FALLBACK_REPOS = [
    {
        name: 'FastAPI-with-Python-CI-CD',
        description: 'Python FastAPI backend that demonstrates passing secure environment variables from a CI/CD pipeline into a running container without hardcoding them. Built with Docker for containerization and automated deployment.',
        language: 'Python',
        html_url: 'https://github.com/Luqos/FastAPI-with-Python-CI-CD',
    },
    {
        name: 'Static-Website-CI-CD',
        description: 'End-to-end CI/CD pipeline for a static website using Docker containerization, provisioned and deployed to AWS EC2 with Terraform.',
        language: 'HCL',
        html_url: 'https://github.com/Luqos/Static-Website-CI-CD',
    },
    {
        name: 'Health-Telemetry-CD-CD',
        description: 'Cloud-focused project exploring and testing CI/CD pipelines for a health telemetry system. Built with C++ and containerized with Docker, provisioned via Terraform.',
        language: 'C++',
        html_url: 'https://github.com/Luqos/Health-Telemetry-CD-CD',
    },
    {
        name: 'go-microservice',
        description: 'A compiled Go microservice designed to run without the full Go runtime environment — demonstrating statically linked binaries, containerization, and microservice architecture.',
        language: 'Go',
        html_url: 'https://github.com/Luqos/go-microservice',
    }
];

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

function appendTerminalOutput(text, className = 'terminal-output') {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="${className}">${text}</span>`;
    line.style.textAlign = 'left';
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function appendTerminalCommand(cmd) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="terminal-prompt">luqman@portfolio:~$</span> ${cmd}`;
    line.style.textAlign = 'left';
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

const terminalCommands = {
    help: () => {
        return [
            'Available commands:',
            '  help       - Show this help message',
            '  whoami     - Display current user info',
            '  skills     - List my technical skills',
            '  projects   - Show featured GitHub projects',
            '  contact    - Display contact information',
            '  uname -a   - Show system information',
            '  clear      - Clear the terminal',
            '  echo [msg] - Print a message',
            '  ls         - List portfolio sections',
            '  pwd        - Print current directory',
            '  date       - Show current date and time',
        ].join('<br>');
    },
    whoami: () => {
        return 'luqman<br>Cloud Computing Student | DevOps Learner | Cloud Engineer To Be<br>GitHub: https://github.com/Luqos';
    },
    skills: () => {
        return [
            'Technical Skills:',
            '  Cloud & Infrastructure:',
            '    - Cloud Computing, AWS, Docker, Terraform, Linux',
            '  Programming Languages:',
            '    - Python, Java, Go, C++, JavaScript',
            '  Web Development:',
            '    - HTML5, CSS3, React, Node.js',
            '  Databases:',
            '    - SQL, MongoDB',
            '  DevOps & Tools:',
            '    - Git, GitHub, CI/CD, Networking',
        ].join('<br>');
    },
    projects: () => {
        return [
            'Featured GitHub Projects:',
            '  1. FastAPI-with-Python-CI-CD - Python FastAPI + Docker CI/CD',
            '  2. Static-Website-CI-CD - Docker + Terraform + AWS EC2',
            '  3. Health-Telemetry-CD-CD - C++ + Docker + Terraform',
            '  4. go-microservice - Go microservice with Docker',
            'Run `fetch` to load live data from GitHub API.',
        ].join('<br>');
    },
    contact: () => {
        return [
            'Contact Information:',
            '  Email:   work.luqman04@gmail.com',
            '  Phone:   +6018-2938 471',
            '  GitHub:  https://github.com/Luqos',
            '  LinkedIn: https://www.linkedin.com/in/luqman-hakem-0815282a9/',
        ].join('<br>');
    },
    'uname -a': () => {
        return 'Linux portfolio-server 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux';
    },
    ls: () => {
        return 'home/  about/  skills/  projects/  contact/';
    },
    pwd: () => {
        return '/home/luqman/portfolio';
    },
    date: () => {
        return new Date().toString();
    },
    echo: (args) => {
        return args || '';
    },
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
            terminalBody.innerHTML = '';
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

        if (terminalCommands[cmd]) {
            appendTerminalOutput(terminalCommands[cmd]());
        } else {
            appendTerminalOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'terminal-error');
        }
    }
});

// =====================================================
// FEATURE 2: Live GitHub Project Fetching
// =====================================================
const projectsGrid = document.getElementById('projectsGrid');
const projectsLoading = document.getElementById('projectsLoading');
const projectsError = document.getElementById('projectsError');

function getPlaceholderUrl(text) {
    const colors = ['0f3460', '16213e', '1a1a2e', '0a0a23'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return `https://via.placeholder.com/600x200/${color}/e94560?text=${encodeURIComponent(text)}`;
}

function buildProjectCard(repo) {
    // Determine tags from language and repo name
    const tags = [repo.language || 'N/A'];
    const nameLower = repo.name.toLowerCase();
    if (nameLower.includes('ci') || nameLower.includes('cd') || (repo.description && repo.description.toLowerCase().includes('ci'))) {
        tags.push('CI/CD');
    }
    if (repo.language === 'Dockerfile' || nameLower.includes('docker') || (repo.description && repo.description.toLowerCase().includes('docker'))) {
        tags.push('Docker');
    }
    if (nameLower.includes('microservice') || nameLower.includes('go-')) {
        tags.push('Microservices');
    }
    if (repo.language === 'HCL' || nameLower.includes('terraform')) {
        tags.push('Terraform');
    }
    if (repo.language === 'Python' || nameLower.includes('fastapi')) {
        tags.push('Python');
    }
    if (repo.language === 'Go' || repo.language === 'C++') {
        tags.push(repo.language);
    }

    const desc = repo.description || 'No description provided.';
    const projectName = repo.name
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .replace(/Ci Cd/g, 'CI/CD')
        .replace(/Cd Cd/g, 'CI/CD');

    return `
        <div class="project-card" data-tags="${tags.join(' ')}">
            <div class="project-img">
                <img src="${getPlaceholderUrl(projectName)}" alt="${projectName}" />
            </div>
            <div class="project-info">
                <h3>${projectName}</h3>
                <p>${desc}</p>
                <div class="project-tags">
                    ${tags.map((tag) => `<span>${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" aria-label="Code"><i class="fab fa-github"></i> Code</a>
                </div>
            </div>
        </div>
    `;
}

async function fetchGitHubProjects() {
    try {
        projectsLoading.style.display = 'block';
        projectsError.style.display = 'none';

        const repos = [];

        for (const repoName of targetRepos) {
            try {
                const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`);
                if (res.ok) {
                    const data = await res.json();
                    repos.push(data);
                }
            } catch (e) {
                // skip failed fetches
            }
        }

        // Fallback repo if fetching fails
        if (repos.length === 0) {
            const fallbackRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=10&sort=updated`);
            if (fallbackRes.ok) {
                const allRepos = await fallbackRes.json();
                // Take top 4 non-fork repos
                const filtered = allRepos.filter((r) => !r.fork).slice(0, 4);
                repos.push(...filtered);
            }
        }

        projectsLoading.style.display = 'none';

        // If API fetch failed entirely, use hardcoded fallback data
        if (repos.length === 0) {
            repos.push(...FALLBACK_REPOS);
        }

        // Sort by target order
        repos.sort((a, b) => {
            const ia = targetRepos.indexOf(a.name);
            const ib = targetRepos.indexOf(b.name);
            return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        });

        projectsGrid.innerHTML = repos.map((r) => buildProjectCard(r)).join('');

        // Re-attach filter to new cards
        initFilter();

        // Re-attach reveal observer
        const newCards = projectsGrid.querySelectorAll('.project-card');
        newCards.forEach((card) => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });

    } catch (err) {
        projectsLoading.style.display = 'none';
        projectsError.style.display = 'block';
    }
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
                if (filter === 'all') {
                    card.classList.remove('hidden', 'fade-out');
                    card.classList.add('fade-in');
                } else {
                    const tags = card.getAttribute('data-tags') || '';
                    if (tags.toLowerCase().includes(filter.toLowerCase())) {
                        card.classList.remove('hidden', 'fade-out');
                        card.classList.add('fade-in');
                    } else {
                        card.classList.add('fade-out');
                        card.classList.remove('fade-in');
                        setTimeout(() => card.classList.add('hidden'), 400);
                    }
                }
            });
        });
    });
}

// Initial filter setup (will be re-called after fetch)
initFilter();

// =====================================================
// Run GitHub fetch on page load
// =====================================================
fetchGitHubProjects();

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

    window.open(`https://wa.me/60182938471?text=${encodedMessage}`, '_blank');
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
    '.skill-card, .contact-content > *'
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