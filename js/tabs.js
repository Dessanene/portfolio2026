document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les onglets
    const tabs = document.querySelectorAll('.profile-tab');
    
    // Ajouter un écouteur d'événement à chaque onglet
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Récupérer l'onglet à afficher
            const tabId = this.getAttribute('data-tab');
            
            // Retirer la classe active de tous les onglets
            document.querySelectorAll('.profile-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // Retirer la classe active de tous les contenus d'onglets
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Ajouter la classe active à l'onglet cliqué
            this.classList.add('active');
            
            // Afficher le contenu correspondant
            const tabContent = document.getElementById(tabId + '-content');
            if (tabContent) {
                tabContent.classList.add('active');
                
                // Déclencher les animations appropriées selon l'onglet
                if (tabId === 'skills') {
                    animateSkillBars();
                } else if (tabId === 'qualities') {
                    animateQualityBars();
                }
            }
        });
    });
    
    // Animation pour les barres de compétences
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            // Récupérer le niveau depuis l'attribut data-level
            const level = bar.getAttribute('data-level') + '%';
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = level;
            }, 100);
        });
    }
    
    // Animation pour les barres de qualités
    function animateQualityBars() {
        const qualityBars = document.querySelectorAll('.quality-level');
        qualityBars.forEach(bar => {
            // Récupérer la valeur de progression depuis l'attribut data-level
            const level = bar.getAttribute('data-level') + '%';
            bar.style.width = '0';
            
            // Ajouter un délai pour créer un effet d'animation séquentielle
            setTimeout(() => {
                bar.style.width = level;
            }, 100);
        });
    }
    
    // Déclencher l'animation des barres de compétences lorsque l'onglet compétences est affiché
    document.querySelector('.profile-tab[data-tab="skills"]').addEventListener('click', animateSkillBars);
    
    // Déclencher l'animation des barres de qualités lorsque l'onglet qualités est affiché
    document.querySelector('.profile-tab[data-tab="qualities"]').addEventListener('click', animateQualityBars);
    
    // Animer les barres au chargement initial selon l'onglet actif
    if (document.querySelector('#skills-content.active')) {
        animateSkillBars();
    } else if (document.querySelector('#qualities-content.active')) {
        animateQualityBars();
    }
});
