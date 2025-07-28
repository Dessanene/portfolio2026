// Script pour animer et améliorer l'interaction avec la page des stages
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les éléments de la page des stages
    const stageCards = document.querySelectorAll('.stage-card');
    const skillCards = document.querySelectorAll('.skill-card');
    
    // Fonction pour animer les cartes de stage avec délai progressif
    function animateStageCards() {
        stageCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
            }, 150 * index);
        });
    }
    
    // Fonction pour animer les cartes de compétences avec délai progressif
    function animateSkillCards() {
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
            }, 150 * index);
        });
    }
    
    // Observer d'intersection pour déclencher les animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si c'est une carte de stage
                if (entry.target.classList.contains('stage-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, 150);
                    observer.unobserve(entry.target);
                }
                
                // Si c'est une carte de compétence
                if (entry.target.classList.contains('skill-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, 150);
                    observer.unobserve(entry.target);
                }
                
                // Si c'est la section des compétences
                if (entry.target.classList.contains('skills-developed')) {
                    animateSkillCards();
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.2 });
    
    // Observer chaque carte de stage
    stageCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observer la section des compétences
    const skillsSection = document.querySelector('.skills-developed');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Déclencher l'animation au chargement de la page
    window.addEventListener('load', function() {
        animateStageCards();
        
        // Petit délai pour les cartes de compétences
        setTimeout(() => {
            animateSkillCards();
        }, stageCards.length * 150 + 300);
    });
    
    // Ajouter des effets de survol pour les boutons d'action
    const actionButtons = document.querySelectorAll('.stage-action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Animation pour le stage futur
    const futureStage = document.querySelector('.future-stage');
    if (futureStage) {
        const icon = futureStage.querySelector('.stage-placeholder i');
        if (icon) {
            // Animation de rotation lente pour l'icône du sablier
            setInterval(() => {
                icon.style.transform = 'rotate(180deg)';
                setTimeout(() => {
                    icon.style.transform = 'rotate(0deg)';
                }, 2000);
            }, 4000);
        }
    }
    
    // Effet de particules cyberpunk en arrière-plan (similaire à celui de la section IA)
    function setupParticles() {
        const stagesContainer = document.querySelector('.stages-container');
        if (!stagesContainer) return;
        
        // Vérifier si le canvas existe déjà
        if (document.getElementById('stages-particles')) return;
        
        // Créer le canvas
        const canvas = document.createElement('canvas');
        canvas.id = 'stages-particles';
        canvas.className = 'particles-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        
        // Insérer le canvas au début du body
        document.body.insertBefore(canvas, document.body.firstChild);
        
        // Configuration du canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext('2d');
        
        // Tableau pour stocker les particules
        const particles = [];
        const particleCount = 50;
        
        // Classe Particule
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = `rgba(0, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 100) + 150}, ${Math.random() * 0.5 + 0.2})`;
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
            }
            
            draw() {
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
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
            if (!document.getElementById('stages-particles')) return;
            
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
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 209, 255, ${0.1 - distance/1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        // Redimensionner le canvas si la fenêtre change de taille
        window.addEventListener('resize', function() {
            if (document.getElementById('stages-particles')) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        });
        
        // Initialiser et démarrer l'animation
        init();
        animate();
    }
    
    // Initialiser les particules
    setupParticles();
});
