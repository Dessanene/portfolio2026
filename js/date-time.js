document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour mettre à jour la date et l'heure
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        // Formater la date en français
        const dateTimeString = now.toLocaleDateString('fr-FR', options)
            .replace(/^\w/, c => c.toUpperCase()) // Première lettre en majuscule
            .replace(/à (\d{2}:\d{2})/, 'à $1'); // Ajouter "à" avant l'heure
        
        // Mettre à jour l'élément HTML - vérifier les deux IDs possibles
        const currentDateElement = document.getElementById('current-date');
        const dateTimeElement = document.getElementById('date-time');
        
        if (currentDateElement) {
            currentDateElement.textContent = dateTimeString;
        }
        
        if (dateTimeElement) {
            dateTimeElement.textContent = dateTimeString;
        }
        
        // Mettre à jour l'année du copyright
        const currentYearElement = document.getElementById('current-year');
        if (currentYearElement) {
            currentYearElement.textContent = now.getFullYear();
        }
    }
    
    // Mettre à jour immédiatement
    updateDateTime();
    
    // Mettre à jour toutes les minutes
    setInterval(updateDateTime, 60000);
});
