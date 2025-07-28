// Script pour gérer les onglets de la page profil avec effet cybernétique
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les liens de navigation
    const navLinks = document.querySelectorAll('.profile-nav a');
    
    // Initialiser les attributs data-level pour les compétences et qualités
    initializeDataAttributes();
    
    // Ajouter un écouteur d'événement à chaque lien
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Récupérer l'ID de la section à afficher
            const sectionId = this.getAttribute('href').substring(1);
            
            // Retirer la classe active de tous les liens
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Retirer la classe active de toutes les sections
            document.querySelectorAll('.profile-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
            
            // Afficher la section correspondante avec animation
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Animer les barres de compétences si la section est "skills"
                if (sectionId === 'skills') {
                    animateSkillBars();
                }
                
                // Animer les barres de qualités si la section est "qualities"
                if (sectionId === 'qualities') {
                    animateQualityBars();
                }
            }
        });
    });
    
    // Fonction pour initialiser les attributs data-level
    function initializeDataAttributes() {
        // Pour les compétences
        const skillItems = document.querySelectorAll('#skills .skill-item');
        skillItems.forEach(item => {
            const level = item.querySelector('.skill-level');
            const heading = item.querySelector('h5');
            if (level && heading) {
                const widthValue = level.style.width;
                const percentage = parseInt(widthValue);
                heading.setAttribute('data-level', percentage + '%');
            }
        });
        
        // Pour les qualités
        const qualityItems = document.querySelectorAll('#qualities .quality-item');
        qualityItems.forEach(item => {
            const level = item.querySelector('.quality-level');
            const heading = item.querySelector('h5');
            if (level && heading) {
                const widthValue = level.style.width;
                const percentage = parseInt(widthValue);
                heading.setAttribute('data-level', percentage + '%');
            }
        });
    }
    
    // Fonction pour animer les barres de compétences avec animation réduite
    function animateSkillBars() {
        const skillLevels = document.querySelectorAll('#skills .skill-level');
        skillLevels.forEach(level => {
            const width = level.style.width;
            level.style.width = '0';
            setTimeout(() => {
                level.style.width = width;
            }, 200); // Délai plus long pour une animation plus douce
        });
    }
    
    // Fonction pour animer les barres de qualités avec animation réduite
    function animateQualityBars() {
        const qualityLevels = document.querySelectorAll('#qualities .quality-level');
        qualityLevels.forEach(level => {
            const width = level.style.width;
            level.style.width = '0';
            setTimeout(() => {
                level.style.width = width;
            }, 200); // Délai plus long pour une animation plus douce
        });
    }
    
    // Animer les barres au chargement initial pour la section active
    if (document.querySelector('#skills.active')) {
        animateSkillBars();
    } else if (document.querySelector('#qualities.active')) {
        animateQualityBars();
    }
    
    // Activer l'onglet "À propos" par défaut si aucun n'est actif
    if (!document.querySelector('.profile-section.active')) {
        document.querySelector('.profile-nav a[href="#about"]').click();
    }
});
