document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu déroulant
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        
        // Gestion du clic sur le toggle
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Fermer tous les autres dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle le dropdown actuel
            dropdown.classList.toggle('active');
            
            // Ajouter un effet de glitch cyberpunk au toggle
            this.classList.add('glitch-effect');
            setTimeout(() => {
                this.classList.remove('glitch-effect');
            }, 500);
        });
    });
    
    // Fermer les dropdowns quand on clique ailleurs
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Gestion du menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Changer l'icône du menu
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                
                // Fermer tous les dropdowns quand on ferme le menu mobile
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    // Fermer le menu mobile quand on clique sur un lien
    const navItems = document.querySelectorAll('.nav-item:not(.dropdown)');
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    
                    // Restaurer l'icône du menu
                    if (menuToggle) {
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        }
    });
    
    // Gestion des sous-menus sur mobile
    if (window.innerWidth <= 992) {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.stopPropagation(); // Empêcher la propagation pour éviter de fermer le menu mobile
            });
        });
    }
    
    // Gestion de la navigation active
    function setActiveLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        const dropdownItems = document.querySelectorAll('.dropdown-item a');
        
        // Extraire le nom de fichier de l'URL actuelle
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Vérifier les liens principaux
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (currentPage === href || (currentPage === '' && href === 'index.html'))) {
                link.parentElement.classList.add('active');
                link.classList.add('active');
                
                // Si c'est un lien dans un dropdown, activer aussi le dropdown
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    parentDropdown.classList.add('active');
                }
            } else {
                link.parentElement.classList.remove('active');
                link.classList.remove('active');
            }
        });
        
        // Vérifier les liens du dropdown
        dropdownItems.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (currentPage === href || (currentPage === '' && href === 'index.html'))) {
                link.parentElement.classList.add('active');
                
                // Activer aussi le dropdown parent
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                    dropdownToggle.classList.add('active');
                    parentDropdown.classList.add('active');
                }
            } else {
                link.parentElement.classList.remove('active');
            }
        });
        
        // Si nous sommes sur une page du dropdown, activer le bouton "Plus"
        const dropdownPages = ['situations-pro.html', 'ateliers-pro.html', 'certifications.html', 'stages.html', 'veille.html', 'contact.html'];
        if (dropdownPages.includes(currentPage)) {
            const plusDropdown = document.querySelector('.dropdown');
            if (plusDropdown) {
                plusDropdown.classList.add('active');
            }
        }
    }
    
    // Appliquer la navigation active au chargement
    setActiveLink();
    
    // Accessibilité clavier pour le menu déroulant
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownItems = dropdown.querySelectorAll('.dropdown-item a');
        
        // Gestion des touches pour le toggle
        dropdownToggle.addEventListener('keydown', function(e) {
            // Ouvrir le menu avec Entrée ou Espace
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Focus sur le premier élément si le menu est ouvert
                if (dropdown.classList.contains('active') && dropdownItems.length > 0) {
                    dropdownItems[0].focus();
                }
            }
            
            // Fermer avec Escape
            if (e.key === 'Escape' && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
                dropdownToggle.focus();
            }
        });
        
        // Navigation au clavier dans le menu
        dropdownItems.forEach((item, index) => {
            item.addEventListener('keydown', function(e) {
                // Fermer avec Escape
                if (e.key === 'Escape') {
                    dropdown.classList.remove('active');
                    dropdownToggle.focus();
                }
                
                // Navigation avec flèches
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % dropdownItems.length;
                    dropdownItems[nextIndex].focus();
                }
                
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = (index - 1 + dropdownItems.length) % dropdownItems.length;
                    dropdownItems[prevIndex].focus();
                }
            });
        });
    });
});
