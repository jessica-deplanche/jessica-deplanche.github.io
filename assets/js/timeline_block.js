document.addEventListener("DOMContentLoaded", function () {
    const timelineBlocks = document.querySelectorAll(".timeline-block");
    
    const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
    }, { threshold: 0.3 });
    
    timelineBlocks.forEach((block) => {
    observer.observe(block);
    });
    });