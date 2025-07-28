// BTS SIO Page - Cyberpunk Effects and Tab Management

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des onglets
    initTabs();
    
    // Effets d'apparition au scroll
    initScrollEffects();
    
    // Effet de glitch sur les titres
    initGlitchEffect();
    
    // Effet de pulsation sur les icônes
    initPulseEffect();
    
    // Initialisation du canvas pour les particules (si présent)
    if (document.getElementById('particles-canvas')) {
        setupParticles();
    }
});

// Gestion des onglets
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Désactiver tous les onglets
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activer l'onglet sélectionné
            btn.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// Effets d'apparition au scroll
function initScrollEffects() {
    // Options pour l'Intersection Observer
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Fonction de callback pour l'Intersection Observer
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Créer l'observer
    const observer = new IntersectionObserver(handleIntersect, options);
    
    // Observer les éléments
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
    
    // Observer les cartes de compétences
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.classList.add('fade-in-card');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observer les cartes d'options
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach((card, index) => {
        card.classList.add('fade-in-card');
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Observer les cartes de métiers
    const careerCards = document.querySelectorAll('.career-card');
    careerCards.forEach((card, index) => {
        card.classList.add('fade-in-card');
        card.style.animationDelay = `${index * 0.05}s`;
        observer.observe(card);
    });
    
    // Observer les catégories d'études
    const studyCategories = document.querySelectorAll('.study-category');
    studyCategories.forEach((category, index) => {
        category.classList.add('fade-in-card');
        category.style.animationDelay = `${index * 0.15}s`;
        observer.observe(category);
    });
}

// Effet de glitch sur les titres
function initGlitchEffect() {
    const titles = document.querySelectorAll('.section-title');
    
    titles.forEach(title => {
        // Ajouter la classe pour le style CSS
        title.classList.add('glitch-title');
        
        // Créer l'effet de glitch périodiquement
        setInterval(() => {
            // Ajouter la classe glitch
            title.classList.add('glitching');
            
            // Retirer la classe après l'animation
            setTimeout(() => {
                title.classList.remove('glitching');
            }, 1000);
        }, 5000 + Math.random() * 5000); // Entre 5 et 10 secondes
    });
}

// Effet de pulsation sur les icônes
function initPulseEffect() {
    const icons = document.querySelectorAll('.skill-icon, .option-icon, .tab-icon');
    
    icons.forEach(icon => {
        icon.classList.add('pulse-icon');
    });
}

// Configuration des particules (si le canvas est présent)
function setupParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    // Ajuster la taille du canvas à la fenêtre
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Couleurs cyberpunk
    const colors = [
        'rgba(0, 243, 255, 0.7)',    // Cyan
        'rgba(157, 78, 221, 0.7)',    // Violet
        'rgba(255, 42, 109, 0.7)',    // Rose
        'rgba(5, 255, 161, 0.7)'      // Vert
    ];
    
    // Classe pour les particules
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Rebondir sur les bords
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Créer un tableau de particules
    const particlesArray = [];
    const numberOfParticles = 50;
    
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
    
    // Fonction pour connecter les particules proches
    function connectParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = 1 - distance / 150;
                    ctx.strokeStyle = `rgba(0, 243, 255, ${opacity * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    // Redimensionner le canvas si la fenêtre change de taille
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Démarrer l'animation
    animate();
}

// Ajouter des styles CSS dynamiques
function addDynamicStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Animation de fade-in pour les sections */
        .fade-in-section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in-section.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Animation de fade-in pour les cartes */
        .fade-in-card {
            opacity: 0;
            transform: translateY(15px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .fade-in-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Effet de glitch sur les titres */
        .glitch-title.glitching {
            animation: glitch 1s linear;
        }
        
        @keyframes glitch {
            0% {
                transform: translate(0);
            }
            20% {
                transform: translate(-2px, 2px);
            }
            40% {
                transform: translate(-2px, -2px);
            }
            60% {
                transform: translate(2px, 2px);
            }
            80% {
                transform: translate(2px, -2px);
            }
            100% {
                transform: translate(0);
            }
        }
        
        /* Effet de pulsation sur les icônes */
        .pulse-icon {
            transition: transform 0.3s ease;
        }
        
        .pulse-icon:hover {
            animation: pulse 1.5s infinite;
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Appeler la fonction pour ajouter les styles dynamiques
addDynamicStyles();
