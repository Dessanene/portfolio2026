// Script pour supprimer le texte de copyright indésirable
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour supprimer le texte de copyright
    function removeCopyright() {
        // Cibler spécifiquement la section À propos
        const aboutSection = document.querySelector('#about-content .section-content');
        if (aboutSection) {
            // Supprimer tout texte de copyright qui pourrait être injecté
            const paragraphs = aboutSection.querySelectorAll('p');
            paragraphs.forEach(p => {
                // Créer un nouvel élément avec le même contenu mais sans pseudo-éléments
                const newP = document.createElement('p');
                newP.textContent = p.textContent;
                newP.className = p.className + ' clean-p';
                // Remplacer l'ancien paragraphe par le nouveau
                p.parentNode.replaceChild(newP, p);
            });
            
            // Supprimer tout nœud de texte qui contient "copyright" ou "2025" dans la section À propos
            const walker = document.createTreeWalker(
                aboutSection,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            const nodesToRemove = [];
            let node;
            while (node = walker.nextNode()) {
                if (node.nodeValue.includes('copyright') || 
                    node.nodeValue.includes('2025') || 
                    node.nodeValue.includes('Déssanène') || 
                    node.nodeValue.includes('SANHAN') || 
                    node.nodeValue.includes('réservés')) {
                    nodesToRemove.push(node);
                }
            }
            
            nodesToRemove.forEach(node => {
                node.parentNode.removeChild(node);
            });
        }
        
        // Cibler également la section compétences
        const skillsSection = document.querySelector('#skills-content');
        if (skillsSection) {
            // Même traitement pour les compétences
            const headings = skillsSection.querySelectorAll('h3');
            headings.forEach(h => {
                const newH = document.createElement('h3');
                newH.innerHTML = h.innerHTML;
                newH.className = h.className + ' clean-h';
                h.parentNode.replaceChild(newH, h);
            });
        }
    }
    
    // S'assurer que les icônes de réseaux sociaux sont visibles
    function restoreSocialIcons() {
        const socialIcons = document.querySelectorAll('.social-icons .social-icon');
        socialIcons.forEach(icon => {
            icon.style.display = 'flex';
            const i = icon.querySelector('i');
            if (i) {
                i.style.display = 'inline-block';
            }
        });
    }
    
    // Exécuter les fonctions
    removeCopyright();
    restoreSocialIcons();
    
    // Et aussi après un court délai pour s'assurer que tout contenu dynamique est traité
    setTimeout(() => {
        removeCopyright();
        restoreSocialIcons();
    }, 500);
    
    setTimeout(() => {
        removeCopyright();
        restoreSocialIcons();
    }, 1000);
});
