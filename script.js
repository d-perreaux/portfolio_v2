setTimeout(function () {
    const techIcons = document.querySelectorAll('.tech-icon');
    let currentIndex = 0;

    function hideAllTooltips() {
        techIcons.forEach(icon => {
            icon.classList.remove('hover');
        });
    }

    function showNextTooltip() {
        hideAllTooltips();
        if (currentIndex < techIcons.length) {
            techIcons[currentIndex].classList.add('hover');
            techIcons[currentIndex].querySelector('i').classList.add('colored');
            currentIndex++;
            // Déclencher le prochain tooltip après un certain délai (par exemple, 300 ms)
            setTimeout(showNextTooltip, 400);
        }
    }

    // Cacher tous les tooltips sauf le premier
    hideAllTooltips();
    techIcons[0].classList.add('hover');

    // Démarrer le tour automatique
    showNextTooltip();
}, 1000); // Attendre 2 secondes (2000 ms) après le chargement de la page pour lancer le tour automatique



  
  



