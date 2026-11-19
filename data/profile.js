// =====================================================================
// PROFILE DATA — the single source for the site's CV content.
// Edit this file to update the portfolio. index.html and script.js read
// everything below from window.PROFILE.
//
// Not covered by this file (search engines and link previews need them as
// plain HTML): <title>, meta description, Open Graph/Twitter tags and the
// JSON-LD block in the <head> of index.html. Update those by hand if the
// name, headline or summary changes.
// =====================================================================
window.PROFILE = {
  name: 'Luqman Hakem Bin Laily',
  shortName: 'Luqman',
  headline:
    'Third-Year Cloud Computing Student (BITA) | Cloud Infrastructure / Networking / System Administration',
  location: 'Chemor, Perak, Malaysia',
  email: 'work.luqman04@gmail.com',
  phone: '+6018-293 8471',
  whatsapp: '60182938471', // digits only, used for the wa.me link
  resumeUrl: '/Luqman-Hakem-CV.pdf',

  links: {
    github: 'https://github.com/Luqos',
    linkedin: 'https://www.linkedin.com/in/luqman-hakem-laily-0815282a9/',
  },

  summary:
    "Third-year BITA (Cloud Computing and Application) student at Universiti Teknikal Malaysia Melaka (UTeM), CGPA 3.66, two Dean's Awards. KV Skills IT Network Systems Administration Perak Zone Champion (National 4th) and WorldSkills Malaysia Belia Top 10 finalist. Hands-on with AWS serverless/IoT, OpenStack, Windows Server, Linux, Cisco networking, Terraform and GitHub Actions, with public projects on GitHub. Seeking a cloud, infrastructure, network, sysadmin or IT support industrial training placement, 15 March 2027 to 27 August 2027 (24 weeks).",

  placement:
    'Seeking a cloud, infrastructure, network, sysadmin or IT support industrial training placement, 15 March 2027 to 27 August 2027 (24 weeks).',

  skills: [
    {
      category: 'Cloud (AWS)',
      icon: 'fab fa-aws',
      items: ['IoT Core', 'Lambda', 'DynamoDB', 'API Gateway', 'S3', 'CloudWatch', 'EC2', 'Lightsail', 'VPC', 'IAM', 'Well-Architected Framework'],
    },
    {
      category: 'Private Cloud & Virtualization',
      icon: 'fas fa-cloud',
      items: ['OpenStack (Keystone, Nova, Neutron, Glance, Cinder, Horizon)', 'VMware Workstation', 'VirtualBox'],
    },
    {
      category: 'Networking',
      icon: 'fas fa-network-wired',
      items: ['TCP/IP', 'subnetting', 'VLAN', 'inter-VLAN routing', 'OSPF', 'ACL', 'NAT', 'Cisco IOS', 'Packet Tracer', 'wireless LAN', 'WireGuard VPN'],
    },
    {
      category: 'Security',
      icon: 'fas fa-shield-alt',
      items: ['IAM and least privilege', 'encryption at rest/in transit', 'security groups', 'firewalls', 'TLS/X.509'],
    },
    {
      category: 'System Administration',
      icon: 'fas fa-server',
      items: ['Windows Server (AD, DNS, DHCP, Group Policy)', 'Debian/Ubuntu Linux (systemd, SSH, network services)', 'RAID/NAS/SAN', 'backup', 'hardware and software troubleshooting'],
    },
    {
      category: 'DevOps & Automation',
      icon: 'fas fa-code-branch',
      items: ['Git', 'GitHub Actions (CI/CD)', 'Terraform', 'Ansible', 'Puppet', 'PowerShell', 'Bash'],
    },
    {
      category: 'Programming & Databases',
      icon: 'fas fa-database',
      items: ['Python', 'Java', 'SQL/MySQL', 'DynamoDB', 'HTML', 'CSS', 'JavaScript', 'PHP', 'IoT with ESP32 and MQTT'],
    },
    {
      category: 'AI-Assisted Development',
      icon: 'fas fa-robot',
      items: ['Agentic and vibe coding with Claude, Gemini and ChatGPT', 'reviewing and testing AI-generated code'],
    },
  ],

  experience: [
    {
      role: 'IT Intern – Device Preparation and IT Support',
      org: "Imika Empire Sdn Bhd (Malaysia's largest refurbished device retail chain), Perak",
      date: 'Apr 2024 – Sep 2024',
      points: [
        'Prepared laptops for sale: software installation, hardware checks and customer-readiness checks.',
        'Configured iPads and smartphones: device settings, apps, activation and accounts.',
        'Troubleshot hardware and software issues before customer handover, and kept stock records up to date.',
      ],
    },
    {
      role: 'KV Skills IT Network Systems Administration – Coach and Judge',
      org: 'Kolej Vokasional Ipoh',
      date: '2024',
      points: [
        'Coached Perak Zone and National participants on Windows Server, Linux and Cisco labs, and judged the KV Ipoh internal competition.',
      ],
    },
  ],

  // `filters` decides which project filter buttons a card matches.
  projects: [
    {
      title: 'Final Year Project: Secure and Reliable Serverless IoT Smart Parking System',
      repo: 'https://github.com/Luqos/FYP-CI-CD',
      tech: ['AWS IoT Core', 'Lambda', 'DynamoDB', 'API Gateway', 'S3', 'Terraform', 'GitHub Actions', 'ESP32', 'HC-SR04', 'MQTT', 'mTLS/X.509', 'Python'],
      filters: ['AWS', 'Terraform'],
      points: [
        'Serverless, event-driven system: ESP32 sensors publish over MQTT to AWS IoT Core, Lambda processes and stores data in DynamoDB, and API Gateway serves an S3 dashboard.',
        'Secured with mutual TLS (X.509 device certificates) and input validation. Reliability from stale-sensor detection and atomic DynamoDB transactions.',
        'Infrastructure in Terraform. GitHub Actions runs secret scanning, unit tests and terraform plan, and deploys on push to main.',
      ],
    },
    {
      title: 'Self-Hosted WireGuard VPN on AWS Lightsail',
      repo: 'https://github.com/Luqos/wireguard-lightsail-terraform',
      tech: ['AWS Lightsail', 'Terraform (aws + awscc providers)', 'WireGuard', 'Ubuntu', 'Bash', 'Python', 'SQLite', 'GitHub Actions (OIDC)', 'IAM'],
      filters: ['AWS', 'Terraform'],
      points: [
        'One terraform apply creates a Lightsail server, static IP and firewall in the AWS Malaysia Region, with a data-transfer alarm. A setup script installs WireGuard and manages peers.',
        'Python monitor app for users and data usage. It reaches servers through least-privilege SSH accounts limited to fixed commands.',
        'GitHub Actions CI (ShellCheck, unit tests, terraform validate) and a deploy workflow using GitHub OIDC, with no stored AWS keys.',
      ],
    },
    {
      title: 'OpenStack Theory Atlas – Learning Website',
      repo: 'https://github.com/Luqos/openstack-theory',
      tech: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
      filters: ['Web'],
      points: [
        'Three-level OpenStack learning site (compute, networking, storage, identity, HA) for BITA students, deployed on Vercel.',
      ],
    },
    {
      title: 'AREO Events – Landing Page Mock-up',
      repo: 'https://github.com/Luqos/areomockup',
      tech: ['Astro', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages Functions', 'Playwright'],
      filters: ['Web'],
      points: [
        'Responsive, SEO-optimised landing page for an events company, with a Cloudflare Pages Function contact form and Playwright tests.',
      ],
    },
  ],

  education: [
    {
      title: 'Bachelor of Technology in Cloud Computing and Application with Honours (BITA)',
      org: 'Universiti Teknikal Malaysia Melaka (UTeM)',
      date: '2024 – Present',
      meta: 'Expected graduation 2028 | CGPA 3.66',
      points: [
        "Dean's Award: Semester 1 2024/2025 and Semester 1 2025/2026",
        'Key courses: Cloud Computing Services, Cloud Security, OpenStack Cloud Platform, Virtualization, Storage Technology, Enterprise Network Technology, Windows and Linux System Management, Python Programming, Database',
      ],
    },
    {
      title: 'Diploma Vokasional Malaysia (DVM) – Information Technology',
      org: 'Kolej Vokasional Ipoh',
      date: '2022 – 2024',
      meta: 'CGPA 3.81',
      points: [],
    },
    {
      title: 'Sijil Vokasional Malaysia (SVM) – Computer System and Networking, and Sijil Kemahiran Malaysia (Level 3) – Computer Network Services',
      org: 'Kolej Vokasional Ipoh',
      date: '2020 – 2022',
      meta: 'CGPA 3.67',
      points: [],
    },
  ],

  // Optional `url` adds a "Verify" link.
  certifications: [
    {
      text: 'AWS Academy Graduate – Cloud Foundations (AWS, Jul 2025)',
      url: 'https://www.credly.com/badges/01ab5ac4-538a-4e31-bb23-ce56da8ab4b3',
    },
    {
      text: 'AWS Academy Graduate – Cloud Security Foundations (AWS, Sep 2026)',
      url: 'https://www.credly.com/badges/9f2f867c-e99f-4858-94a1-ebbc5256f930',
    },
    {
      text: 'Red Hat OpenStack Administration I (CL110), 40 hours (Red Hat, Aug 2026)',
      url: 'https://www.credly.com/badges/7e388bfd-7b14-449e-a742-eef1523142c4',
    },
    {
      text: 'Cisco CCNA: Introduction to Networks (Cisco, Mar 2024)',
      url: 'https://www.credly.com/badges/e5caac46-649f-4584-a4dc-4282fb5632b5',
    },
    {
      text: 'Cisco IT Essentials (Cisco, Jan 2024)',
      url: 'https://www.credly.com/badges/269bf345-fe79-4647-b37d-8f3b1968420e',
    },
    { text: 'Google Certified Educator Level 1 (2026–2029); Google Gemini short courses including Introduction to Vibe Coding (2026)' },
    { text: 'MUET Band 4.0 (2023)' },
  ],

  awards: [
    'KV Skills ITNSA: Champion, Perak Zone, and 4th Place, National Level (2022)',
    'Top 10 Finalist, WorldSkills Malaysia Belia (WSMB) ITNSA, 2023',
    'Gold Medal, International Invention, Innovation & Design Competition (2024); Bronze Medal, International Arsvot Malaysia (2024)',
    "Third Place, Cloud Deploy Mini Challenge, D'FTMK Technity 2026 (FTMK, UTeM)",
    "Director's Award (DVM IT, Semesters 3 and 4, 2023) and Best Student (Semester 2, 2022), Kolej Vokasional Ipoh",
    '3rd Place, National Esports Championship (Mobile Legends) for Kolej Vokasional, 2023',
  ],

  leadership: [
    { role: 'Exco Penerangan (Information Bureau)', org: 'ABIM Melaka', date: '2026' },
    { role: 'Lead Coach (Jurulatih Utama), Program Pekerti Ibu Bapa & NGO', org: 'LPPKN with ABIM Melaka', date: 'Oct 2026' },
    { role: 'Committee, Systems & Data Bureau', org: 'Perkampungan Menara Gading Kebangsaan, UPM', date: '2026' },
    { role: 'Secretary, JAKSIS Kasturi Residential College Committee', org: 'UTeM', date: '2024/2025' },
    { role: '2nd Vice President, Student Representative Council', org: 'Kolej Vokasional Ipoh', date: '2021 – 2022' },
  ],

  languages: [
    { name: 'Bahasa Malaysia', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Mandarin', level: 'Basic' },
    { name: 'French', level: 'Basic' },
  ],
};
