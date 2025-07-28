document.addEventListener('DOMContentLoaded', function() {
    // Phrases à afficher avec l'effet typewriter
    const phrases = [
        "Façonnant les infrastructures de demain, un réseau sécurisé à la fois.",
        "Déployer, sécuriser et optimiser les infrastructures numériques de demain."
    ];
    
    // Élément où afficher le texte
    const typewriterElement = document.getElementById('typewriter');
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Vitesse de frappe en ms
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Suppression de caractères
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Plus rapide pour la suppression
        } else {
            // Ajout de caractères
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal pour la frappe
        }
        
        // Si on a fini d'écrire la phrase
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause avant de commencer à supprimer
            isDeleting = true;
            typingSpeed = 2000; // Pause de 2 secondes
        }
        
        // Si on a fini de supprimer la phrase
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Passer à la phrase suivante
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause avant la prochaine phrase
        }
        
        // Continuer l'animation
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Démarrer l'effet
    setTimeout(typeWriter, 1000);
});
