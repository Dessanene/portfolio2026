document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner l'élément de pluie numérique
    const digitalRainElement = document.querySelector('.digital-rain');
    
    // Vérifier si l'élément existe
    if (!digitalRainElement) return;
    
    // Créer le canvas pour l'animation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Ajouter le canvas à l'élément de pluie numérique
    digitalRainElement.appendChild(canvas);
    
    // Définir la taille du canvas
    function resizeCanvas() {
        canvas.width = digitalRainElement.offsetWidth;
        canvas.height = digitalRainElement.offsetHeight;
    }
    
    // Appeler la fonction de redimensionnement
    resizeCanvas();
    
    // Redimensionner le canvas lorsque la fenêtre change de taille
    window.addEventListener('resize', resizeCanvas);
    
    // Caractères pour la pluie numérique (chiffres, lettres et symboles)
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    // Paramètres de l'animation
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    
    // Initialiser les positions des gouttes
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100);
    }
    
    // Fonction pour dessiner la pluie numérique
    function drawDigitalRain() {
        // Fond semi-transparent pour créer un effet de traînée
        ctx.fillStyle = 'rgba(10, 15, 44, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Définir la police et la couleur du texte
        ctx.font = `${fontSize}px monospace`;
        
        // Dessiner les caractères
        for (let i = 0; i < drops.length; i++) {
            // Sélectionner un caractère aléatoire
            const char = chars[Math.floor(Math.random() * chars.length)];
            
            // Couleur cyan avec opacité variable
            const opacity = Math.random() * 0.5 + 0.5;
            ctx.fillStyle = `rgba(0, 209, 255, ${opacity})`;
            
            // Dessiner le caractère
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            // Réinitialiser la position si la goutte atteint le bas ou aléatoirement
            if (drops[i] * fontSize > canvas.height || Math.random() > 0.99) {
                drops[i] = 0;
            }
            
            // Faire tomber la goutte
            drops[i]++;
        }
    }
    
    // Animer la pluie numérique
    function animate() {
        drawDigitalRain();
        requestAnimationFrame(animate);
    }
    
    // Démarrer l'animation
    animate();
});
