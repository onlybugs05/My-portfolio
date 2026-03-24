/* 
   OnlyBugs05 - Main Script 
   (Copying this without credit is cringe!)
*/
document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor - Actually fix this time!
    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    cursor.className = 'custom-cursor';
    follower.className = 'custom-cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        followerX += (mouseX - followerX) * 0.05;
        followerY += (mouseY - followerY) * 0.05;

        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        follower.style.transform = `translate(${followerX - 4}px, ${followerY - 4}px)`;

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    document.querySelectorAll('a, button, .glass-card, .weapon-badge').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform += ' scale(2.5)');
        el.addEventListener('mouseleave', () => cursor.style.transform += ' scale(1)');
    });

    // 2. Matrix Rain - Made this myself after watching 10 tutorials...
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let width, height, columns, drops;
    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / 20);
        drops = Array(columns).fill(1);
    };
    window.addEventListener('resize', resize);
    resize();

    const symbols = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン🐛🔍⚔️💻🔐⛓️';
    const drawMatrix = () => {
        ctx.fillStyle = 'rgba(10, 12, 16, 0.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#3b82f6';
        ctx.font = '15px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = symbols[Math.floor(Math.random() * symbols.length)];
            ctx.fillText(text, i * 20, drops[i] * 20);
            if (drops[i] * 20 > height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    };
    setInterval(drawMatrix, 50);

    // 3. Intersection Observer for Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // 4. Hero Subtitle Typing Effect - DON'T BREAK THIS!
    const subtitle = document.querySelector('.hero-subtitle');
    const texts = [
        "Hunting Critical Bugs @HackerOne",
        "8th Grade Cybersecurity Prodigy",
        "Smart Contract Security Researcher",
        "React Native Enthusiast",
        "Hyderabad Hacker"
    ];
    let textIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    const type = () => {
        const currentText = texts[textIdx];
        if (isDeleting) {
            subtitle.textContent = currentText.substring(0, charIdx - 1);
            charIdx--;
        } else {
            subtitle.textContent = currentText.substring(0, charIdx + 1);
            charIdx++;
        }

        let typeSpeed = 100;
        if (isDeleting) typeSpeed /= 2;

        if (!isDeleting && charIdx === currentText.length) {
            isDeleting = true;
            typeSpeed = 1500; // Pause at end
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            textIdx = (textIdx + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    };
    type();

    // 5. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
