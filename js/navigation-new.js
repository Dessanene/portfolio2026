document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu Plus
    const plusToggle = document.querySelector('.plus-toggle');
    const plusMenu = document.querySelector('.plus-menu');
    const submenuContainer = document.querySelector('.submenu-container');
    
    if (plusToggle && plusMenu && submenuContainer) {
        plusToggle.addEventListener('click', function(e) {
            e.preventDefault();
            plusMenu.classList.toggle('active');
            submenuContainer.classList.toggle('active');
            
            // Changer l'icône
            const icon = plusToggle.querySelector('.plus-icon');
            if (icon) {
                if (plusMenu.classList.contains('active')) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            }
        });
    }
    
    // Gestion du menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Marquer le lien actif dans la navigation
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-link');
    const submenuItems = document.querySelectorAll('.submenu-item');
    
    // Fonction pour vérifier si un chemin correspond à la page actuelle
    function isCurrentPage(href) {
        const linkPath = href.split('/').pop();
        const currentPath = currentLocation.split('/').pop() || 'index.html';
        return linkPath === currentPath;
    }
    
    // Vérifier les liens de navigation principale
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && isCurrentPage(href)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Vérifier les liens du sous-menu
    let isSubmenuItemActive = false;
    submenuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && isCurrentPage(href)) {
            item.classList.add('active');
            isSubmenuItemActive = true;
        } else {
            item.classList.remove('active');
        }
    });
    
    // Si un élément du sous-menu est actif, afficher le sous-menu
    if (isSubmenuItemActive && plusMenu && submenuContainer) {
        plusMenu.classList.add('active');
        submenuContainer.classList.add('active');
        
        // Changer l'icône
        const icon = plusToggle.querySelector('.plus-icon');
        if (icon) {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    }
});
