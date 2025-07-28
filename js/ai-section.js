// Script pour animer et améliorer l'interaction avec la section IA
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les éléments de la section IA
    const aiCards = document.querySelectorAll('.ai-card');
    
    // Ajouter des animations d'entrée avec délai progressif
    function animateAICards() {
        aiCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
            }, 150 * index);
        });
    }
    
    // Ajouter des effets de survol avancés pour les liens
    aiCards.forEach(card => {
        // Effet de survol pour les cartes
        card.addEventListener('mouseenter', function() {
            const cardIcon = this.querySelector('.ai-card-icon');
            if (cardIcon) {
                cardIcon.style.animation = 'pulse-icon 0.8s infinite alternate';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const cardIcon = this.querySelector('.ai-card-icon');
            if (cardIcon) {
                cardIcon.style.animation = 'pulse-icon 3s infinite alternate';
            }
        });
    });
    
    // Observer d'intersection pour déclencher les animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'ai') {
                    animateAICards();
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.2 });
    
    // Observer la section IA
    const aiSection = document.getElementById('ai');
    if (aiSection) {
        observer.observe(aiSection);
    }
    
    // Déclencher l'animation si la section IA est déjà visible au chargement
    if (aiSection && aiSection.classList.contains('active')) {
        animateAICards();
    }
    
    // Ajouter un écouteur d'événement pour le changement d'onglet
    const aiTabLink = document.querySelector('.profile-nav a[href="#ai"]');
    if (aiTabLink) {
        aiTabLink.addEventListener('click', function() {
            // Réinitialiser et relancer les animations
            aiCards.forEach(card => {
                card.classList.remove('animated');
            });
            
            // Petit délai pour laisser le temps à la transition de se faire
            setTimeout(() => {
                animateAICards();
            }, 300);
        });
    }
    
    // Ajouter un effet de hover sur les liens
    const aiCardLinks = document.querySelectorAll('.ai-card-link');
    aiCardLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.innerHTML = '<i class="fas fa-external-link-alt"></i> Visiter <i class="fas fa-arrow-right"></i>';
        });
        
        link.addEventListener('mouseleave', function() {
            this.innerHTML = '<i class="fas fa-external-link-alt"></i> Visiter le site';
        });
    });
});
