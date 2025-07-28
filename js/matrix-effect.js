document.addEventListener('DOMContentLoaded', function() {
    // Ne pas exécuter l'effet sur la page profil
    if (window.location.pathname.includes('profil.html')) {
        return;
    }
    // Créer un canvas pour l'effet Matrix
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Ajouter le canvas à la section hero
    const heroSection = document.querySelector('.hero-section');
    heroSection.appendChild(canvas);
    
    // Positionner le canvas
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.5';
    
    // Redimensionner le canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Appeler resizeCanvas lors du chargement et du redimensionnement
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Caractères pour l'effet Matrix
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    // Colonnes pour les gouttes
    const columns = Math.floor(canvas.width / 20);
    
    // Position Y de chaque goutte
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100);
    }
    
    // Fonction pour dessiner l'effet Matrix
    function draw() {
        // Fond semi-transparent pour créer l'effet de fondu
        ctx.fillStyle = 'rgba(10, 25, 47, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Couleur et police pour les caractères
        ctx.fillStyle = '#64ffda';
        ctx.font = '15px monospace';
        
        // Dessiner les caractères
        for (let i = 0; i < drops.length; i++) {
            // Caractère aléatoire
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            // Position x = i * largeur de caractère
            // Position y = valeur dans le tableau drops
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            // Réinitialiser la position Y si la goutte atteint le bas
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Déplacer la goutte vers le bas
            drops[i]++;
        }
    }
    
    // Animer l'effet Matrix
    setInterval(draw, 50);
});
