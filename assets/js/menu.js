document.addEventListener("DOMContentLoaded", function () {
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
  });
  