document.addEventListener("DOMContentLoaded", () => {
    // setTimeout(function () {
    //     const techIcons = document.querySelectorAll('.tech-icon');
    //     let currentIndex = 0;
    
    //     function hideAllTooltips() {
    //         techIcons.forEach(icon => {
    //             icon.classList.remove('hover');
    //         });
    //     }
    
    //     function showNextTooltip() {
    //         hideAllTooltips();
    //         if (currentIndex < techIcons.length) {
    //             techIcons[currentIndex].classList.add('hover');
    //             techIcons[currentIndex].querySelector('i').classList.add('colored');
    //             currentIndex++;
    //             // Déclencher le prochain tooltip après un certain délai (par exemple, 300 ms)
    //             setTimeout(showNextTooltip, 400);
    //         }
    //     }
    
    //     // Cacher tous les tooltips sauf le premier
    //     hideAllTooltips();
    //     techIcons[0].classList.add('hover');
    
    //     // Démarrer le tour automatique
    //     showNextTooltip();
    // }, 1000);

    
        setTimeout(function () {
            const techIcons = document.querySelectorAll('.tech-icon');
        
            // Ajoutez une classe "colored" à toutes les icônes en même temps
            techIcons.forEach(icon => {
                icon.querySelector('i').classList.add('colored');
            });
        
            setTimeout(function () {
                // Ajoutez une classe "hover" à tous les tooltips après un délai
                techIcons.forEach(icon => {
                    icon.classList.add('hover');
                });
        
                setTimeout(function () {
                    // Enlevez les tooltips après un certain délai (par exemple, 3 secondes)
                    techIcons.forEach(icon => {
                        icon.classList.remove('hover');
                    });
                }, 3500); // Délai pour enlever les tooltips (1500 ms)
            }, 1500); // Délai pour afficher les tooltips (1500 ms)
        }, 1000); // Délai initial pour commencer l'animation (1000 ms)
    ;

    function loadTranslation(language) {
        fetch(`https://github.com/d-perreaux/portfolio_v2/blob/main/traductions/${language}.json`)
            .then(response => response.json()
            .then(data => {
                //DESCRIPTION
                document.getElementById('name').textContent = data.description.name;
                document.getElementById('job').textContent = data.description.job;
                document.getElementById('school').innerHTML = data.description.school;
                document.getElementById('availability').innerHTML = data.description.availability;

                //MENU
                const menuFiltersList = data.globalMenu;
                const menuFilters = document.getElementsByClassName('menu-filter');
                for (let i = 0; i < menuFilters.length; i++) {
                    menuFilters[i].textContent = menuFiltersList[i];
                }

                //SOFT SKILLS
                const softSkillsElements = document.getElementsByClassName('soft-skill');
                const softSkillsList = data.softSkills;
                for (let i = 0; i < softSkillsElements.length; i++) {
                    softSkillsElements[i].textContent = softSkillsList[i];
                }

                //TITLE SECTIONS
                const sectionTitlesElements = document.getElementsByTagName('h2');
                const sectionTitlesList = data.titleSections;
                for (let i = 0; i < sectionTitlesList.length; i++) {
                    sectionTitlesElements[i].textContent = sectionTitlesList[i];
                }

                //PROJECTS
                const projectsList = data.projects;
                const projectsElements = document.getElementsByClassName("project-card");
                for (let i = 0; i < projectsList.length; i++) {
                    if (projectsList[i]) {
                        const projectCardDescription = projectsElements[i].querySelector(".project-card-description");
                        const projectCardTitle = projectCardDescription.querySelector(".project-card-description-title");
                        projectCardTitle.textContent = projectsList[i].title;

                        const projectCardSummary = projectCardDescription.querySelector(".project-card-description-summary");
                        projectCardSummary.textContent = projectsList[i].description;
                    }
                }

                //ABOUT
                const aboutParagraphes = data.about;
                aboutInner = "";
                aboutParagraphes.forEach( paragraphe => {
                    aboutInner += `<p>${paragraphe}</p>`;
                })
                document.getElementById('about-text').innerHTML = aboutInner;

                //FOOTER
                const footerParagraphesList = data.footer;
                const footerParagraphesElements = document.querySelectorAll("footer p");
                for (let i = 0; i < footerParagraphesList.length; i++) {
                    footerParagraphesElements[i].textContent = data.footer[i];
                }

            }))
    }

    loadTranslation("fr");

    const languageToggle = document.getElementById("language-toggle");

    languageToggle.addEventListener("change", function () {
        if (languageToggle.checked) {
            // Si le bouton est coché (en anglais)
            loadTranslation("en"); // Appelez la fonction loadTranslation avec la langue "en"
        } else {
            // Si le bouton n'est pas coché (en français)
            loadTranslation("fr"); // Appelez la fonction loadTranslation avec la langue "fr"
        }
    });


    

    menuFilters = document.getElementsByClassName('menu-selector');
    

    function removeMenuSelected(){
        for (const menuFilter of menuFilters) {
            if (menuFilter.classList.contains('menu-selected')) {
                menuFilter.classList.remove('menu-selected');
            }
        }
    }

    for (const menuFilter of menuFilters) {
        menuFilter.addEventListener('click', () => {
            if (!menuFilter.classList.contains('menu-selected')) {
                removeMenuSelected();
                menuFilter.classList.add('menu-selected');
            }
        })
    }

    

    function handleProjectScroll() {
        const projectCards = document.querySelectorAll(".project-card");
        
        
        projectCards.forEach(card => {
            const rect = card.getBoundingClientRect();
             // top = distance du bord sup de l'objet par rapport au viewport
            // bottom = distance du bord inf de l'objet par rapport au viewport
            // The read-only innerHeight property of the Window interface returns
            // the interior height of the window in pixels, including the height of 
            // the horizontal scroll bar, if present. 
            const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
            if (isVisible) {
                card.classList.add("project-card-visible");
            } else {
                if (card.classList.contains("project-card-visible")) {
                    card.classList.remove("project-card-visible");
                }
            }
        });

        const aboutWrapper = document.querySelector(".wrapper-about");
        const rectAbout = aboutWrapper.getBoundingClientRect();
        const rectAboutIsVisible = (rectAbout.top >= 0 && rectAbout.bottom <= window.innerHeight);
        if (rectAboutIsVisible) {
            aboutWrapper.classList.add("about-visible");
        } else {
            if (aboutWrapper.classList.contains("about-visible")) {
                aboutWrapper.classList.remove("about-visible");
            }
        }


    }

    function handleMenuScroll() {
        const sections = document.getElementsByTagName("section");
        const sectionArray = Array.from(sections);
    
        sectionArray.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isSelected = (rect.top < window.innerHeight * 0.1 && rect.bottom > window.innerHeight * 0.1);
    
            if (isSelected) {
                const menuLink = document.querySelector(`a[href="#${section.id}"]`);
                if (menuLink) {
                    menuLink.classList.add('menu-selected');
                }
            } else {
                const menuLink = document.querySelector(`a[href="#${section.id}"]`);
                if (menuLink) {
                    menuLink.classList.remove('menu-selected');
                }
            }
        });
    }
    

    // gestionnaire d'événement de défilement
    window.addEventListener("scroll", handleProjectScroll);
    window.addEventListener("scroll", handleMenuScroll);
    

    // appeler handleScroll au chargement de la page pour vérifier si les éléments initialement visibles doivent également être animés
    handleProjectScroll();
    handleMenuScroll();

    let modal = null;

    const openModal = function (e) {
        e.preventDefault();
        let target = e.target;

        while (target && target.tagName !== 'A') {
            target = target.parentElement;
        }

        const modalFocus = document.querySelector(`${target.getAttribute('href')}`);      
        modalFocus.style.display = null

        modal = modalFocus;

        // modal.addEventListener("click", closeModal);
        modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    }

    const closeModal = function (e) {
        if (modal === null) return
        e.preventDefault;
        modal.style.display = "none";
        // modal.removeEventListener("click", closeModal);
        modal.querySelector('.js-modal-close').removeListener('click', closeModal);
        modal = null
    }

    
    document.querySelectorAll(".js-modal").forEach(a => {
        
        a.addEventListener("click", openModal);
        
    })
    

})



  
  



