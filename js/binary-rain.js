document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si le canvas existe déjà
    let canvas = document.getElementById('binaryRain');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Redimensionner le canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Appeler resizeCanvas lors du chargement et du redimensionnement
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Caractères pour l'effet Matrix (identiques à la page d'accueil)
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    // Colonnes pour les gouttes
    const columns = Math.floor(canvas.width / 20);
    
    // Position Y de chaque goutte
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100);
    }
    
    // Obtenir les dimensions et la position de la carte de profil
    const heroSection = document.querySelector('.hero-section');
    let heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
    
    // Mettre à jour les dimensions de la carte lors du redimensionnement
    window.addEventListener('resize', function() {
        if (heroSection) {
            heroRect = heroSection.getBoundingClientRect();
        }
    });
    
    // Fonction pour vérifier si un point est à l'intérieur de la carte de profil
    function isInsideHeroSection(x, y) {
        if (!heroRect) return false;
        return (x >= heroRect.left && x <= heroRect.right && 
                y >= heroRect.top && y <= heroRect.bottom);
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
            const x = i * 20;
            const y = drops[i] * 20;
            
            // Ne pas dessiner si le point est à l'intérieur de la carte de profil
            if (!isInsideHeroSection(x, y)) {
                // Caractère aléatoire
                const text = chars[Math.floor(Math.random() * chars.length)];
                
                // Dessiner le caractère
                ctx.fillText(text, x, y);
            }
            
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
