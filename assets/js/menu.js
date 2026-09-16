document.addEventListener("DOMContentLoaded", function () {
    // 1. Réduction de hauteur et changement de couleur de fond du header au scroll
    const headerNav = document.querySelector(".site-header-nav");
    if (headerNav) {
      const handleHeaderScroll = () => {
        if (window.scrollY > 30) {
          headerNav.classList.add("is-scrolled");
        } else {
          headerNav.classList.remove("is-scrolled");
        }
      };

      window.addEventListener("scroll", handleHeaderScroll, { passive: true });
      handleHeaderScroll(); // Appel initial au chargement
    }

    // 2. Animation dynamique de survol des liens du menu desktop
    const menuItems = document.querySelectorAll(".menu-item");
    const hoverBar = document.querySelector(".hover-animation");
  
    // Vérifie que nous sommes sur desktop (on active uniquement pour large écran)
    if (window.innerWidth >= 992 && menuItems.length && hoverBar) {
      menuItems.forEach((item) => {
        item.addEventListener("mouseenter", function () {
          const rect = item.getBoundingClientRect();
          const parentRect = item.parentElement.getBoundingClientRect();
          const left = item.offsetLeft;
          const width = item.offsetWidth;
          const color = item.getAttribute("data-color");
  
          hoverBar.style.transform = `translateX(${left}px)`;
          hoverBar.style.width = `${width}px`;
          hoverBar.style.backgroundColor = color;
        });
      });
      // Réinitialiser l'animation quand la souris quitte le conteneur du menu
      document.querySelector(".navbar-nav").addEventListener("mouseleave", function () {
        hoverBar.style.width = "0";
      });
    }

    // 3. Bouton flottant Retour en haut
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
      window.addEventListener("scroll", function () {
        if (window.scrollY > 320) {
          backToTopBtn.classList.add("visible");
        } else {
          backToTopBtn.classList.remove("visible");
        }
      }, { passive: true });

      backToTopBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }
  });
  