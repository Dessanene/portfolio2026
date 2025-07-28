// Initialisation de la carte avec Leaflet et OpenStreetMap
document.addEventListener('DOMContentLoaded', function() {
    // Coordonnées de Limoges
    const limoges = [45.8315, 1.2578];
    
    // Création de la carte
    const map = L.map('map').setView(limoges, 13);
    
    // Ajout du fond de carte OpenStreetMap avec style sombre
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);
    
    // Ajout d'un marqueur personnalisé
    const markerIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-inner"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    const marker = L.marker(limoges, {
        icon: markerIcon,
        title: "Limoges"
    }).addTo(map);
    
    // Ajout d'un cercle autour du marqueur
    const circle = L.circle(limoges, {
        color: '#00D1FF',
        fillColor: '#00D1FF',
        fillOpacity: 0.1,
        radius: 1000,
        weight: 2
    }).addTo(map);
    
    // Animation du cercle
    let radius = 1000;
    const pulseCircle = setInterval(() => {
        radius = radius === 1000 ? 1200 : 1000;
        circle.setRadius(radius);
    }, 1000);
    
    // Popup sur le marqueur
    marker.bindPopup("<b>Limoges</b><br>France").openPopup();
    
    // Ajout de styles CSS pour le marqueur personnalisé
    const style = document.createElement('style');
    style.textContent = `
        .custom-marker {
            background-color: transparent;
        }
        .marker-inner {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #00D1FF;
            box-shadow: 0 0 15px rgba(0, 209, 255, 0.8);
            position: relative;
            animation: pulse-marker 2s infinite;
        }
        .marker-inner:after {
            content: '';
            position: absolute;
            top: -5px;
            left: -5px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 2px solid #00D1FF;
            opacity: 0.5;
            animation: pulse-ring 2s infinite;
        }
        @keyframes pulse-ring {
            0% {
                transform: scale(0.5);
                opacity: 0.8;
            }
            50% {
                opacity: 0.4;
            }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }
        @keyframes pulse-marker {
            0% {
                box-shadow: 0 0 0 0 rgba(0, 209, 255, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(0, 209, 255, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(0, 209, 255, 0);
            }
        }
        .leaflet-container {
            background-color: #050A1A;
        }
        .leaflet-popup-content-wrapper {
            background-color: rgba(10, 15, 44, 0.9);
            color: #fff;
            border: 1px solid #00D1FF;
            border-radius: 4px;
            box-shadow: 0 0 15px rgba(0, 209, 255, 0.5);
        }
        .leaflet-popup-tip {
            background-color: #00D1FF;
        }
    `;
    document.head.appendChild(style);
});

// Gestion du formulaire de contact avec Formspree
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contact-form");
    const urlParams = new URLSearchParams(window.location.search);
    const successParam = urlParams.get('success');
    
    // Afficher un message de succès si l'utilisateur revient de Formspree avec success=true
    if (successParam === 'true' && contactForm) {
        // Affichage d'un message de succès
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.innerHTML = `
            <div class="cyber-alert">
                <i class="fas fa-check-circle"></i>
                <p>Message envoyé avec succès! Je vous répondrai dès que possible.</p>
            </div>
        `;
        
        contactForm.parentNode.insertBefore(successMessage, contactForm);
        
        // Suppression du message après 5 secondes
        setTimeout(() => {
            successMessage.style.opacity = "0";
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }, 5000);
        
        // Nettoyer l'URL pour éviter d'afficher le message à chaque rechargement
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    if (contactForm) {
        // Animation du bouton lors de la soumission
        contactForm.addEventListener("submit", function() {
            const submitButton = contactForm.querySelector("button[type='submit']");
            submitButton.innerHTML = '<span class="button-content">Envoi en cours...</span>';
            submitButton.disabled = true;
        });
    }

    // Effet de glitch sur les champs de formulaire
    const inputs = document.querySelectorAll('.cyber-input input, .cyber-textarea textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('glitch-effect');
            setTimeout(() => {
                this.parentNode.classList.remove('glitch-effect');
            }, 500);
        });
    });

    // Animation des liens sociaux
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.classList.add('pulse-animation');
        });
        
        link.addEventListener('mouseleave', function() {
            this.classList.remove('pulse-animation');
        });
    });
});

// Ajout de styles CSS pour les animations supplémentaires
document.addEventListener("DOMContentLoaded", function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% {
                transform: translate(0);
            }
            20% {
                transform: translate(-2px, 2px);
            }
            40% {
                transform: translate(-2px, -2px);
            }
            60% {
                transform: translate(2px, 2px);
            }
            80% {
                transform: translate(2px, -2px);
            }
            100% {
                transform: translate(0);
            }
        }
        
        .glitch-effect {
            animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both;
        }
        
        .cyber-alert {
            background-color: rgba(0, 209, 255, 0.1);
            border: 1px solid #00D1FF;
            border-radius: 4px;
            padding: 1rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            animation: fadeIn 0.3s ease;
        }
        
        .cyber-alert i {
            color: #00D1FF;
            font-size: 1.5rem;
            margin-right: 1rem;
        }
        
        .cyber-alert p {
            color: #FFFFFF;
            margin: 0;
        }
        
        .success-message {
            transition: opacity 0.3s ease;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .pulse-animation {
            animation: pulse 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});
