document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Interactive Cursor
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    const interactables = document.querySelectorAll('a, button, .card');
    
    // Only initialize custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        // Move cursor using GSAP for buttery smooth rendering
        // Need to center the cursor based on its width/height.
        // Dot is 6x6, outline is 40x40. 
        // We set xPercent and yPercent to center them.
        gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
        gsap.set(cursorOutline, { xPercent: -50, yPercent: -50 });

        let ms = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        
        window.addEventListener('mousemove', (e) => {
            ms.x = e.clientX;
            ms.y = e.clientY;
            
            gsap.to(cursorDot, { x: ms.x, y: ms.y, duration: 0.1, ease: "power2.out" });
            gsap.to(cursorOutline, { x: ms.x, y: ms.y, duration: 0.5, ease: "power2.out" });
        });

        // Add hover effects for interactive elements
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursorOutline, { 
                    scale: 1.5, 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    duration: 0.3 
                });
                gsap.to(cursorDot, { scale: 0, duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursorOutline, { 
                    scale: 1, 
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    duration: 0.3 
                });
                gsap.to(cursorDot, { scale: 1, duration: 0.3 });
            });
        });
    }

    // 2. Typing Effect with Typed.js
    const typedTextSpan = document.querySelector('.typed-text');
    if (typedTextSpan) {
        new Typed('.typed-text', {
            strings: [
                'crafted for clarity.',
                'designed for conversion.',
                'built for brand credibility.',
                'engineered for impact.'
            ],
            typeSpeed: 40,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // 3. VanillaTilt for 3D Cards
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
        VanillaTilt.init(cards, {
            max: 5,           // maximum tilt rotation (degrees)
            speed: 400,       // Speed of the enter/exit transition
            glare: true,      // enable glare effect
            "max-glare": 0.15, // max glare opacity (1 = 100%, 0.5 = 50%)
            scale: 1.02       // slight scale up on hover
        });
    }

    // 4. GSAP Entrance Animations
    // Hide initially to prevent flash of unstyled content
    gsap.set(['.header-eyebrow', '.header h1', '.header p', '.card', '.footer'], {
        autoAlpha: 0,
        y: 20
    });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    tl.to('.header-eyebrow', { autoAlpha: 1, y: 0, delay: 0.2 })
      .to('.header h1', { autoAlpha: 1, y: 0 }, "-=0.8")
      .to('.header p', { autoAlpha: 1, y: 0 }, "-=0.8")
      .to('.card', { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15 }, "-=0.6")
      .to('.footer', { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.6");
});
