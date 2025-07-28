// Script pour créer un effet de particules cyberpunk dans la section IA
document.addEventListener('DOMContentLoaded', function() {
    // Créer le canvas pour les particules uniquement quand la section IA est visible
    function setupParticles() {
        const aiSection = document.getElementById('ai');
        if (!aiSection) return;
        
        // Vérifier si le canvas existe déjà
        if (document.getElementById('ai-particles')) return;
        
        // Créer le canvas
        const canvas = document.createElement('canvas');
        canvas.id = 'ai-particles';
        canvas.className = 'particles-canvas';
        
        // Insérer le canvas après le titre et la description, avant la grille de cartes
        const aiToolsGrid = aiSection.querySelector('.ai-tools-grid');
        if (aiToolsGrid) {
            aiSection.insertBefore(canvas, aiToolsGrid);
        } else {
            aiSection.appendChild(canvas);
        }
        
        // Configuration du canvas
        canvas.width = aiSection.offsetWidth;
        canvas.height = aiSection.offsetHeight;
        
        const ctx = canvas.getContext('2d');
        
        // Tableau pour stocker les particules
        const particles = [];
        const particleCount = 70; // Plus de particules pour un effet plus dense
        
        // Classe Particule
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.8 - 0.4;
                this.speedY = Math.random() * 0.8 - 0.4;
                this.color = `rgba(0, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 100) + 150}, ${Math.random() * 0.5 + 0.2})`;
                this.glowIntensity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Rebondir sur les bords
                if (this.x < 0 || this.x > canvas.width) {
                    this.speedX = -this.speedX;
                }
                if (this.y < 0 || this.y > canvas.height) {
                    this.speedY = -this.speedY;
                }
                
                // Effet de pulsation
                this.glowIntensity += Math.random() * 0.02 - 0.01;
                if (this.glowIntensity < 0.2) this.glowIntensity = 0.2;
                if (this.glowIntensity > 0.7) this.glowIntensity = 0.7;
            }
            
            draw() {
                // Effet de lueur
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                
                // Réinitialiser l'effet de lueur
                ctx.shadowBlur = 0;
            }
        }
        
        // Initialiser les particules
        function init() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        // Animer les particules
        function animate() {
            if (!document.getElementById('ai-particles')) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Connecter les particules proches
                connectParticles(particles[i], particles);
            }
            
            requestAnimationFrame(animate);
        }
        
        // Connecter les particules avec des lignes
        function connectParticles(p1, particles) {
            for (let i = 0; i < particles.length; i++) {
                const p2 = particles[i];
                const distance = Math.sqrt(
                    Math.pow(p1.x - p2.x, 2) + 
                    Math.pow(p1.y - p2.y, 2)
                );
                
                if (distance < 120) { // Distance plus grande pour plus de connexions
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 209, 255, ${0.15 - distance/1000})`;
                    ctx.lineWidth = 0.4;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        // Redimensionner le canvas si la fenêtre change de taille
        window.addEventListener('resize', function() {
            if (document.getElementById('ai-particles')) {
                canvas.width = aiSection.offsetWidth;
                canvas.height = aiSection.offsetHeight;
            }
        });
        
        // Initialiser et démarrer l'animation
        init();
        animate();
    }
    
    // Observer la section IA pour détecter quand elle devient visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === 'ai') {
                setupParticles();
            } else if (!entry.isIntersecting && entry.target.id === 'ai') {
                // Supprimer le canvas quand la section n'est plus visible
                const canvas = document.getElementById('ai-particles');
                if (canvas) {
                    canvas.remove();
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observer la section IA
    const aiSection = document.getElementById('ai');
    if (aiSection) {
        observer.observe(aiSection);
    }
    
    // Ajouter un écouteur d'événement pour le changement d'onglet
    const aiTabLink = document.querySelector('.profile-nav a[href="#ai"]');
    if (aiTabLink) {
        aiTabLink.addEventListener('click', function() {
            // Petit délai pour laisser le temps à la transition de se faire
            setTimeout(() => {
                setupParticles();
            }, 300);
        });
    }
    
    // Si la section IA est déjà active au chargement, initialiser les particules
    if (aiSection && aiSection.classList.contains('active')) {
        setupParticles();
    }
});
