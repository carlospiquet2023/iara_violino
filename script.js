/* ═══════════════════════════════════════════════════
   🎻 IARA SILVIA — SITE INSPIRACIONAL
   Partículas, Cursor, Scroll, Motivação,
   Contador de Práticas, Confetti, Frases
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Loading Screen ───
    const loadingScreen = document.getElementById('loadingScreen');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            animateHero();
        }, 1800);
    });

    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        animateHero();
    }, 4000);

    // ─── Hero Entrance Animations ───
    let heroAnimated = false;
    function animateHero() {
        if (heroAnimated) return;
        heroAnimated = true;

        const revealElements = document.querySelectorAll('.reveal-text');
        revealElements.forEach(el => {
            const delay = parseInt(el.dataset.delay) || 0;
            setTimeout(() => {
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) scale(1)';
            }, delay + 300);
        });
    }

    // ─── Custom Cursor ───
    const cursor = document.getElementById('cursor');
    const cursorTrail = document.getElementById('cursorTrail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateCursorTrail() {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        requestAnimationFrame(animateCursorTrail);
    }
    animateCursorTrail();

    const hoverTargets = document.querySelectorAll('a, button, .repertoire-card, .gallery-item, .service-card, .feature-item, .contact-item, .social-link, .testimonial-card, .stat-item, .love-letter, .motivation-box');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // ─── Particle System ───
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 80;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.pulse = Math.random() * Math.PI * 2;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulse += this.pulseSpeed;

            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            const dynamicOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse));
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 169, 55, ${dynamicOpacity})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 169, 55, ${dynamicOpacity * 0.1})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(212, 169, 55, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    let particleMouseX = 0, particleMouseY = 0;
    document.addEventListener('mousemove', (e) => {
        particleMouseX = e.clientX;
        particleMouseY = e.clientY;
    });

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            const dx = p.x - particleMouseX;
            const dy = p.y - particleMouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 120) {
                const force = (120 - distance) / 120;
                p.x += (dx / distance) * force * 2;
                p.y += (dy / distance) * force * 2;
            }

            p.update();
            p.draw();
        });

        drawConnections();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ─── Floating Musical Notes ───
    const musicalNotes = document.getElementById('musicalNotes');
    const noteSymbols = ['♪', '♫', '♬', '♩', '𝄞', '𝅘𝅥𝅮', '♭', '♯', '❤️', '✨', '🎻'];

    function createMusicalNote() {
        const note = document.createElement('span');
        note.className = 'musical-note';
        note.textContent = noteSymbols[Math.floor(Math.random() * noteSymbols.length)];
        note.style.left = Math.random() * 100 + '%';
        note.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
        note.style.animationDuration = (Math.random() * 6 + 6) + 's';
        note.style.animationDelay = Math.random() * 2 + 's';
        note.style.opacity = '0';
        musicalNotes.appendChild(note);

        setTimeout(() => {
            if (note.parentNode) {
                note.parentNode.removeChild(note);
            }
        }, 14000);
    }

    setInterval(createMusicalNote, 2500);
    for (let i = 0; i < 5; i++) {
        setTimeout(createMusicalNote, i * 500);
    }

    // ─── Navbar Scroll Effect ───
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });

        const backToTop = document.getElementById('backToTop');
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        const heroImage = document.getElementById('heroImage');
        if (heroImage && scrollY < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0003})`;
        }
    });

    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ─── Mobile Nav Toggle ───
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // ─── Scroll Reveal ───
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollRevealElements.forEach(el => revealObserver.observe(el));

    // ─── Gallery Tilt Effect ───
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            el.style.transition = 'transform 0.5s ease';
        });

        el.addEventListener('mouseenter', () => {
            el.style.transition = 'transform 0.1s ease';
        });
    });

    // ─── Dynamic Gradient on Cards (mouse follow) ───
    document.querySelectorAll('.repertoire-card, .service-card, .testimonial-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212, 169, 55, 0.06), rgba(20, 20, 35, 0.6))`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = 'rgba(20, 20, 35, 0.6)';
        });
    });

    // ─── Magnetic Buttons ───
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.3s ease';
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'transform 0.1s ease';
        });
    });

    // ─── Ripple Effect on Buttons ───
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ─── Inject Keyframes ───
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rippleEffect {
            to { transform: scale(2.5); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // ─── Text Scramble on Hero Title ───
    const heroTitle = document.querySelector('.title-script');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        const chars = '♪♫♬♩𝄞♭♯🎵🎶❤️✨';

        heroTitle.addEventListener('mouseenter', () => {
            let iterations = 0;
            const interval = setInterval(() => {
                heroTitle.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) return originalText[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                iterations += 1 / 2;

                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    heroTitle.textContent = originalText;
                }
            }, 40);
        });
    }

    // ─── Loading Text Animation ───
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        const phrases = [
            'Preparando algo especial para Iara...',
            'Afinando as cordas com carinho...',
            'Quase lá, guerreira...'
        ];
        let phraseIndex = 0;

        setInterval(() => {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            loadingText.style.opacity = '0';
            setTimeout(() => {
                loadingText.textContent = phrases[phraseIndex];
                loadingText.style.opacity = '1';
            }, 300);
        }, 1200);
    }

    // ─── Smooth Scroll for Anchor Links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);

            if (targetEl) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetEl.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ════════════════════════════════════════════════
    // 🎻 MOTIVATIONAL QUOTE GENERATOR
    // ════════════════════════════════════════════════
    
    const quotes = [
        { text: "A música expressa aquilo que não pode ser dito e sobre o que é impossível ficar em silêncio.", author: "Victor Hugo" },
        { text: "Sem a música, a vida seria um erro.", author: "Friedrich Nietzsche" },
        { text: "A música é o remédio da mente triste.", author: "John A. Logan" },
        { text: "Onde as palavras falham, a música fala.", author: "Hans Christian Andersen" },
        { text: "A prática não leva à perfeição. A prática perfeita leva à perfeição.", author: "Vince Lombardi" },
        { text: "Nunca é tarde demais para ser aquilo que sempre desejou ser.", author: "George Eliot" },
        { text: "O único modo de fazer um excelente trabalho é amar o que você faz.", author: "Steve Jobs" },
        { text: "A jornada de mil milhas começa com um único passo.", author: "Lao Tsé" },
        { text: "Acredite que você pode, assim você já está no meio do caminho.", author: "Theodore Roosevelt" },
        { text: "O violino é o instrumento mais próximo da voz humana.", author: "Itzhak Perlman" },
        { text: "Cada mestre já foi um desastre.", author: "Provérbio Popular" },
        { text: "O talento é metade, a dedicação é tudo.", author: "Jascha Heifetz" },
        { text: "Não tenha medo de desistir do bom para perseguir o ótimo.", author: "John D. Rockefeller" },
        { text: "A persistência é o caminho do êxito.", author: "Charles Chaplin" },
        { text: "A música dá alma ao universo, asas à mente, voo à imaginação.", author: "Platão" },
        { text: "Você não precisa ser grande para começar, mas precisa começar para ser grande.", author: "Zig Ziglar" },
        { text: "O sucesso é a soma de pequenos esforços repetidos dia após dia.", author: "Robert Collier" },
        { text: "Aqueles que dançam foram considerados loucos por aqueles que não podiam ouvir a música.", author: "Friedrich Nietzsche" },
        { text: "Iara, cada nota que você toca é uma prova de que a coragem vence o medo.", author: "Para Você ❤️" },
        { text: "Mãe, estudante, servidora pública E violinista? Isso não é multitarefa, isso é SUPERPODER.", author: "Para Você ❤️" },
        { text: "O violino que está nas suas mãos hoje será a trilha sonora dos sorrisos de amanhã.", author: "Para Você ❤️" },
        { text: "Cada vez que você pega o arco, mesmo cansada, você ensina seus filhos que sonhos não têm hora para acontecer.", author: "Para Você ❤️" },
        { text: "Iara Silvia: a mulher que prova que não existe idade certa para começar, existe apenas coragem.", author: "Para Você ❤️" },
    ];

    let currentQuoteIndex = 0;

    const dailyQuote = document.getElementById('dailyQuote');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const newQuoteBtn = document.getElementById('newQuoteBtn');

    // Set initial quote based on date (so it's different each day)
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    currentQuoteIndex = dayOfYear % quotes.length;
    
    function showQuote(index) {
        dailyQuote.style.opacity = '0';
        quoteAuthor.style.opacity = '0';

        setTimeout(() => {
            dailyQuote.textContent = `"${quotes[index].text}"`;
            quoteAuthor.textContent = `— ${quotes[index].author}`;
            dailyQuote.style.opacity = '1';
            quoteAuthor.style.opacity = '1';
        }, 400);
    }

    showQuote(currentQuoteIndex);

    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', () => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            showQuote(currentQuoteIndex);
        });
    }

    // ════════════════════════════════════════════════
    // 🎯 PRACTICE COUNTER WITH CELEBRATION
    // ════════════════════════════════════════════════

    const STORAGE_KEY = 'iara_violin_practice_count';
    let practiceCount = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
    
    const practiceNumberEl = document.getElementById('practiceCount');
    const practiceBtn = document.getElementById('practiceBtn');
    const celebrationEl = document.getElementById('practiceCelebration');

    if (practiceNumberEl) {
        practiceNumberEl.textContent = practiceCount;
    }

    const celebrations = [
        '🎉 Incrível, Iara! Mais uma prática!',
        '🌟 Você é demais! Continue assim!',
        '🎻 Cada prática te torna melhor!',
        '💪 Guerreira! O violino agradece!',
        '✨ Bravo! Bravo! Bravíssimo!',
        '❤️ Que orgulho de você!',
        '🎵 A música vive em você!',
        '🔥 Imparável! Nada te segura!',
        '👏 Os mestres também começaram assim!',
        '💎 Mais uma pedra preciosa na sua coroa!',
    ];

    function createConfetti() {
        const colors = ['#d4a937', '#ffd666', '#ff6b9d', '#8b5cf6', '#34d399', '#f472b6', '#fbbf24'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '0px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 1 + 1) + 's';
            
            // Random horizontal drift
            const drift = (Math.random() - 0.5) * 200;
            confetti.style.setProperty('--drift', drift + 'px');
            confetti.style.animation = `confettiFall ${1 + Math.random()}s ease-out forwards`;
            confetti.style.transform = `translateX(${drift}px)`;
            
            celebrationEl.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 2000);
        }
    }

    if (practiceBtn) {
        practiceBtn.addEventListener('click', () => {
            practiceCount++;
            localStorage.setItem(STORAGE_KEY, practiceCount);
            
            // Update number with bump animation
            practiceNumberEl.textContent = practiceCount;
            practiceNumberEl.classList.add('bump');
            setTimeout(() => practiceNumberEl.classList.remove('bump'), 300);

            // Show celebration message
            const message = celebrations[Math.floor(Math.random() * celebrations.length)];
            
            // Create floating celebration text
            const celebText = document.createElement('div');
            celebText.textContent = message;
            celebText.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                font-family: 'Cormorant Garamond', serif;
                font-size: 1.5rem;
                font-weight: 600;
                color: #ffd666;
                text-align: center;
                z-index: 999;
                pointer-events: none;
                text-shadow: 0 0 30px rgba(212, 169, 55, 0.5);
                animation: celebrationPop 2s ease-out forwards;
                padding: 20px 40px;
                background: rgba(10, 10, 15, 0.9);
                border: 1px solid rgba(212, 169, 55, 0.3);
                border-radius: 20px;
                backdrop-filter: blur(20px);
            `;
            document.body.appendChild(celebText);

            // Inject celebration animation
            if (!document.getElementById('celebStyle')) {
                const celebStyle = document.createElement('style');
                celebStyle.id = 'celebStyle';
                celebStyle.textContent = `
                    @keyframes celebrationPop {
                        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                        20% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
                        30% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                        80% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                        100% { transform: translate(-50%, -60%) scale(0.8); opacity: 0; }
                    }
                `;
                document.head.appendChild(celebStyle);
            }

            setTimeout(() => celebText.remove(), 2500);

            // Create confetti
            createConfetti();

            // Milestone celebrations
            if (practiceCount === 10) {
                showMilestone('🏆 10 PRÁTICAS!', 'Você alcançou sua primeira dezena! Iara, você é inspiradora!');
            } else if (practiceCount === 25) {
                showMilestone('🌟 25 PRÁTICAS!', 'Um quarto de centena! O violino já faz parte de você!');
            } else if (practiceCount === 50) {
                showMilestone('💎 50 PRÁTICAS!', 'MEIO CENTENÁRIO! Você é prova viva de que disciplina é tudo!');
            } else if (practiceCount === 100) {
                showMilestone('👑 100 PRÁTICAS!', 'CEM PRÁTICAS! Iara, você é uma LENDA! O violino se curva diante de você!');
            }
        });
    }

    function showMilestone(title, message) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.5s ease;
            cursor: pointer;
        `;

        overlay.innerHTML = `
            <div style="
                text-align: center;
                padding: 60px;
                background: rgba(20, 20, 35, 0.95);
                border: 2px solid #d4a937;
                border-radius: 28px;
                max-width: 500px;
                animation: celebrationPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                box-shadow: 0 0 80px rgba(212, 169, 55, 0.3);
            ">
                <div style="font-size: 4rem; margin-bottom: 20px;">🎻</div>
                <h2 style="font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: #ffd666; margin-bottom: 15px;">${title}</h2>
                <p style="font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: #b8b0a0; line-height: 1.8;">${message}</p>
                <p style="font-size: 0.8rem; color: #7a7468; margin-top: 20px;">Clique para fechar</p>
            </div>
        `;

        // Inject fadeIn animation
        if (!document.getElementById('fadeInStyle')) {
            const fadeStyle = document.createElement('style');
            fadeStyle.id = 'fadeInStyle';
            fadeStyle.textContent = `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`;
            document.head.appendChild(fadeStyle);
        }

        document.body.appendChild(overlay);
        overlay.addEventListener('click', () => {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
        });

        // Super confetti for milestones
        for (let i = 0; i < 5; i++) {
            setTimeout(createConfetti, i * 300);
        }
    }

    // ─── Keyboard Navigation Support ───
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        }
    });

    // ─── Performance: Pause animations when tab is not visible ───
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            canvas.style.display = 'none';
        } else {
            canvas.style.display = 'block';
        }
    });

    // ════════════════════════════════════════════════
    // 🎻 VIOLIN SYNTHESIZER — WEB AUDIO API
    // Works 100% without external files!
    // ════════════════════════════════════════════════

    let audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    /**
     * Synthesize a realistic violin note using Web Audio API
     * @param {number} frequency - Note frequency in Hz
     * @param {number} duration - Duration in seconds
     */
    function playViolinNote(frequency, duration = 2.5) {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        // Master gain
        const masterGain = ctx.createGain();
        masterGain.connect(ctx.destination);

        // Violin harmonic profile — multiple oscillators for rich timbre
        const harmonics = [
            { ratio: 1,   gain: 1.0,  type: 'sawtooth' },  // Fundamental
            { ratio: 2,   gain: 0.6,  type: 'sine' },      // 2nd harmonic
            { ratio: 3,   gain: 0.4,  type: 'sine' },      // 3rd harmonic
            { ratio: 4,   gain: 0.25, type: 'sine' },      // 4th harmonic
            { ratio: 5,   gain: 0.15, type: 'sine' },      // 5th harmonic
            { ratio: 6,   gain: 0.08, type: 'sine' },      // 6th harmonic
        ];

        const oscillators = [];
        const gains = [];

        harmonics.forEach(h => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = h.type;
            osc.frequency.setValueAtTime(frequency * h.ratio, now);

            // Add vibrato (pitch modulation) — characteristic of violin
            const vibrato = ctx.createOscillator();
            const vibratoGain = ctx.createGain();
            vibrato.frequency.setValueAtTime(5.5, now);  // ~5.5 Hz vibrato rate
            vibratoGain.gain.setValueAtTime(frequency * h.ratio * 0.005, now); // subtle pitch variation
            vibrato.connect(vibratoGain);
            vibratoGain.connect(osc.frequency);
            vibrato.start(now + 0.3);  // Vibrato starts after attack
            vibrato.stop(now + duration);

            gain.gain.setValueAtTime(0, now);

            // ADSR Envelope
            const attackTime = 0.12;
            const decayTime = 0.2;
            const sustainLevel = h.gain * 0.35;
            const releaseTime = 0.5;

            // Attack
            gain.gain.linearRampToValueAtTime(h.gain * 0.5, now + attackTime);
            // Decay
            gain.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
            // Sustain (hold)
            gain.gain.setValueAtTime(sustainLevel, now + duration - releaseTime);
            // Release
            gain.gain.linearRampToValueAtTime(0, now + duration);

            osc.connect(gain);
            gain.connect(masterGain);

            osc.start(now);
            osc.stop(now + duration + 0.1);

            oscillators.push(osc);
            gains.push(gain);
        });

        // Apply a low-pass filter to soften the sound (more violin-like)
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(frequency * 6, now);
        filter.Q.setValueAtTime(0.7, now);

        // Reconnect through filter
        masterGain.disconnect();
        masterGain.connect(filter);
        filter.connect(ctx.destination);

        // Master volume envelope
        masterGain.gain.setValueAtTime(0.3, now);

        return { oscillators, duration };
    }

    // ════════════════════════════════════════════════
    // 🖼️ GALLERY — CLICK ON PHOTOS TO PLAY NOTES
    // ════════════════════════════════════════════════

    const galleryItems = document.querySelectorAll('.gallery-item[data-sound]');
    let currentGalleryAudio = null;
    let currentGalleryItem = null;

    galleryItems.forEach(item => {
        item.style.cursor = 'pointer';

        item.addEventListener('click', () => {
            const soundSrc = item.dataset.sound;
            
            if (currentGalleryItem === item) {
                stopGallerySound();
                return;
            }

            stopGallerySound();

            currentGalleryAudio = new Audio(soundSrc);
            currentGalleryItem = item;

            // Visual feedback — glowing border
            item.classList.add('note-playing');

            // Show note name popup
            const existingPopup = item.querySelector('.note-name-popup');
            if (existingPopup) existingPopup.remove();

            const popup = document.createElement('div');
            popup.className = 'note-name-popup';
            popup.innerHTML = `
                <span class="popup-note">♪ Tocando</span>
                <span class="popup-label">Som do Violino</span>
            `;
            item.appendChild(popup);

            currentGalleryAudio.play().catch(err => {
                console.log('Audio play error:', err);
                stopGallerySound();
            });

            currentGalleryAudio.addEventListener('ended', () => {
                stopGallerySound();
            });
        });
    });

    function stopGallerySound() {
        if (currentGalleryAudio) {
            currentGalleryAudio.pause();
            currentGalleryAudio.currentTime = 0;
            currentGalleryAudio = null;
        }
        if (currentGalleryItem) {
            currentGalleryItem.classList.remove('note-playing');
            const popup = currentGalleryItem.querySelector('.note-name-popup');
            if (popup) popup.remove();
            currentGalleryItem = null;
        }
    }

    // ════════════════════════════════════════════════
    // 🔊 SOUND CARDS — PLAY LONGER MELODIES
    // ════════════════════════════════════════════════

    let currentPlayingCard = null;
    let currentMelodyTimeout = null;

    // Simple melodies for each card (arrays of [frequency, duration] pairs)
    const melodies = {
        playBtn1: [
            [440, 0.6], [494, 0.6], [523, 0.6], [587, 0.6], 
            [659, 0.8], [587, 0.4], [523, 0.8], [440, 1.0]
        ],
        playBtn2: [
            [330, 0.8], [392, 0.4], [440, 0.6], [523, 0.8], 
            [494, 0.4], [440, 0.6], [392, 0.8], [330, 1.0]
        ],
        playBtn3: [
            [659, 0.5], [587, 0.5], [523, 0.5], [494, 0.5],
            [440, 0.5], [494, 0.5], [523, 0.5], [659, 1.0]
        ],
    };

    const soundButtons = document.querySelectorAll('.btn-sound');

    soundButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.sound-card');
            const playIcon = btn.querySelector('.play-icon');
            const playText = btn.querySelector('.play-text');
            const btnId = btn.id;

            // If this card is already playing, stop
            if (currentPlayingCard === card) {
                stopMelody(card, btn);
                return;
            }

            // Stop any previous melody
            if (currentPlayingCard) {
                const prevBtn = currentPlayingCard.querySelector('.btn-sound');
                stopMelody(currentPlayingCard, prevBtn);
            }

            // Play melody
            currentPlayingCard = card;
            card.classList.add('playing');
            playIcon.textContent = '⏸';
            playText.textContent = 'Tocando...';

            const melody = melodies[btnId] || melodies.playBtn1;
            playMelody(melody, card, btn);
        });
    });

    function playMelody(notes, card, btn) {
        let delay = 0;
        const timeouts = [];

        notes.forEach(([freq, dur], index) => {
            const t = setTimeout(() => {
                playViolinNote(freq, dur);
            }, delay * 1000);
            timeouts.push(t);
            delay += dur;
        });

        // When melody ends, reset the card
        const totalDuration = delay + 0.5; // extra time for last note to fade
        currentMelodyTimeout = setTimeout(() => {
            stopMelody(card, btn);
        }, totalDuration * 1000);

        // Store timeouts for cleanup
        card._melodyTimeouts = timeouts;
    }

    function stopMelody(card, btn) {
        if (!card) return;

        card.classList.remove('playing');
        if (btn) {
            const playIcon = btn.querySelector('.play-icon');
            const playText = btn.querySelector('.play-text');
            if (playIcon) playIcon.textContent = '▶';
            if (playText) {
                const btnId = btn.id;
                if (btnId === 'playBtn1') playText.textContent = 'Ouvir Violino 1';
                else if (btnId === 'playBtn2') playText.textContent = 'Ouvir Violino 2';
                else if (btnId === 'playBtn3') playText.textContent = 'Ouvir Violino 3';
            }
        }

        // Clear pending notes
        if (card._melodyTimeouts) {
            card._melodyTimeouts.forEach(t => clearTimeout(t));
            card._melodyTimeouts = null;
        }
        if (currentMelodyTimeout) {
            clearTimeout(currentMelodyTimeout);
            currentMelodyTimeout = null;
        }

        if (currentPlayingCard === card) {
            currentPlayingCard = null;
        }
    }

    console.log('🎻 Site da Iara Silvia carregado com sucesso!');
    console.log('❤️ Feito com muito amor.');
    console.log('✨ Continue tocando, Iara. O mundo precisa da sua música.');
});

