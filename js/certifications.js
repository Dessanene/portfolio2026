// Script pour la page des certifications
document.addEventListener('DOMContentLoaded', function() {
    // Animation des cartes de certification
    const certificationCards = document.querySelectorAll('.certification-card');
    
    // Définir l'ordre d'animation pour chaque carte
    certificationCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
    
    // Observer l'intersection pour déclencher les animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    certificationCards.forEach(card => {
        observer.observe(card);
        
        // Ajouter des effets de survol pour les icônes
        const icon = card.querySelector('.certification-logo i');
        if (icon) {
            card.addEventListener('mouseenter', function() {
                icon.style.animation = 'pulse 1s infinite alternate';
            });
            
            card.addEventListener('mouseleave', function() {
                icon.style.animation = '';
            });
        }
    });
    
    // Effet de particules cyberpunk
    setupParticles();
});

// Configuration et animation des particules cyberpunk
function setupParticles() {
    const canvas = document.getElementById('certifications-particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.querySelector('.particles-container');
    
    // Redimensionner le canvas pour qu'il occupe tout l'espace
    function resizeCanvas() {
        canvas.width = particlesContainer.offsetWidth;
        canvas.height = particlesContainer.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Configuration des particules
    const particlesArray = [];
    const numberOfParticles = 100;
    
    // Couleurs cyberpunk
    const colors = [
        'rgba(0, 240, 255, 0.7)',   // Cyan
        'rgba(209, 0, 240, 0.7)',    // Violet
        'rgba(255, 0, 170, 0.7)',    // Rose
        'rgba(0, 255, 159, 0.7)'     // Vert
    ];
    
    // Classe Particule
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
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Initialiser les particules
    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // Animer les particules
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Mettre à jour et dessiner chaque particule
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        // Connecter les particules proches
        connectParticles();
        
        requestAnimationFrame(animate);
    }
    
    // Connecter les particules qui sont proches les unes des autres
    function connectParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i + 1; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    // Opacité basée sur la distance
                    const opacity = 1 - (distance / 100);
                    
                    // Dégradé entre les deux couleurs de particules
                    ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Démarrer l'animation
    init();
    animate();
}

// Fonction pour ajouter un effet de glitch temporaire sur les titres
function triggerGlitchEffect() {
    const titles = document.querySelectorAll('.certification-title');
    
    titles.forEach(title => {
        title.classList.add('glitch-effect');
        
        setTimeout(() => {
            title.classList.remove('glitch-effect');
        }, 1000);
    });
}

// Déclencher l'effet de glitch périodiquement
setInterval(triggerGlitchEffect, 10000);
