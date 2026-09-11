/**
 * Gestion interactive de la section Projets :
 * - Filtrage dynamique par catégorie (Tous, UI Design, Intégration, Identité visuelle)
 * - Visionneuse / Lightbox moderne plein écran avec miniatures et navigation clavier
 */

document.addEventListener("DOMContentLoaded", function () {
  // --- Données des galeries de maquettes ---
  const galleries = {
    prestige: {
      title: "Maquettes UI — Prestige Mon Chasseur Immo",
      subtitle: "Conception Figma pour portail immobilier haut de gamme",
      items: [
        { src: "assets/img/maquette_prestige/MCI-Prestige-Home.png", caption: "Page d'accueil — Présentation des biens de prestige et recherche ciblée" },
        { src: "assets/img/maquette_prestige/MCI-Prestige-Services.png", caption: "Page Services — Offre d'accompagnement sur-mesure pour acheteurs exigeants" },
        { src: "assets/img/maquette_prestige/MCI-Prestige-partenaire.png", caption: "Page Partenaires — Espace de collaboration et prescripteurs de luxe" },
        { src: "assets/img/maquette_prestige/MCI-Prestige-Equipe.png", caption: "Page Équipe — Mise en valeur des experts et conseillers dédiés" },
        { src: "assets/img/maquette_prestige/MCI-Prestige-Chasseur.png", caption: "Fiche Chasseur — Profil détaillé, avis clients et contact direct" }
      ]
    },
    recrutement: {
      title: "Maquettes UI & Tunnel — Recrutement Mon Chasseur Immo",
      subtitle: "Parcours candidat complet & optimisation de la conversion",
      items: [
        { src: "assets/img/maquette_recrutement/MCI_Recrut-Accueil.png", caption: "Page d'accueil Recrutement — Proposition de valeur employeur & réassurance" },
        { src: "assets/img/maquette_recrutement/MCI_Recrut-métier.png", caption: "Découvrir le Métier — Fiche métier immersive et missions au quotidien" },
        { src: "assets/img/maquette_recrutement/MCI_Recrut-reseau.png", caption: "Le Réseau — Chiffres clés, maillage territorial et communauté" },
        { src: "assets/img/maquette_recrutement/MCI_Recrut-Notre_offre.png", caption: "Notre Offre — Rémunération, outils tech et programmes de formation" },
        { src: "assets/img/maquette_recrutement/MCI_Recrut-Avis.png", caption: "Témoignages & Avis — Retours d'expérience et vidéos de chasseurs" },
        { src: "assets/img/maquette_recrutement/MCI_Recrut-Blog & Faq.png", caption: "Blog & FAQ — Articles conseils et réponses aux questions fréquentes" },
        { src: "assets/img/maquette_recrutement/PageMCI-Recrut-Postuler.png", caption: "Page Postuler — Appel à l'action clair et amorce du formulaire" },
        { src: "assets/img/maquette_recrutement/Form-etape1.png", caption: "Tunnel Candidature (Étape 1) — Qualification du profil et zone géographique" },
        { src: "assets/img/maquette_recrutement/Form-etape2.png", caption: "Tunnel Candidature (Étape 2) — Coordonnées, CV et disponibilités" },
        { src: "assets/img/maquette_recrutement/Form-merci.png", caption: "Confirmation de candidature — Message rassurant et prochaines étapes" },
        { src: "assets/img/maquette_recrutement/MCI-Recrut-Réunion d_information.png", caption: "Réunion d'information — Inscription aux webinaires de présentation" },
        { src: "assets/img/maquette_recrutement/MCI-Recrut-parrainage.png", caption: "Programme Parrainage — Valorisation de la cooptation au sein du réseau" }
      ]
    },
    acadimmo: {
      title: "Maquettes UI — Acadimmo (Formation Immobilière)",
      subtitle: "Plateforme éducative professionnelle — Conception ergonomique",
      items: [
        { src: "assets/img/maquette_acadimmo/Ac - Homepage.png", caption: "Page d'accueil Acadimmo — Catalogue de formations et mise en avant des cursus" },
        { src: "assets/img/maquette_acadimmo/Ac - Nos formations (page HUB).png", caption: "Hub Formations — Filtres thématiques par niveau, durée et statut" },
        { src: "assets/img/maquette_acadimmo/Ac - Formation page de detaille.png", caption: "Fiche détaillée de formation — Programme complet, objectifs et inscription" },
        { src: "assets/img/maquette_acadimmo/Ac - Formateurs.png", caption: "Page Formateurs — Trombinoscope et présentation des intervenants experts" },
        { src: "assets/img/maquette_acadimmo/Ac-popUp_formateur.png", caption: "Pop-up Formateur — Bio complète, parcours et formations dispensées" },
        { src: "assets/img/maquette_acadimmo/Ac - Actualité.png", caption: "Page Actualités — Flux des articles de veille juridique et immobilière" },
        { src: "assets/img/maquette_acadimmo/Ac - Actualité - Post.png", caption: "Détail d'article — Lecture aérée et partage sur les réseaux sociaux" },
        { src: "assets/img/maquette_acadimmo/Ac - Qui sommes-nous.png", caption: "Qui sommes-nous — L'organisme, la certification Qualiopi et les valeurs" },
        { src: "assets/img/maquette_acadimmo/Ac - FAQ.png", caption: "Foire Aux Questions — Financement CPF, modalités et accès aux cours" },
        { src: "assets/img/maquette_acadimmo/Ac - Contact.png", caption: "Page Contact — Demande de devis et renseignements pédagogiques" }
      ]
    },
    propre: {
      title: "Charte Graphique — Propre & Co",
      subtitle: "Identité de marque, logotypes, palette et typographies officielles",
      pdf: "assets/pdf/charte-propre-et-co.pdf",
      items: [
        { src: "assets/img/chartes/propre-1.png", caption: "Charte Graphique complète — Logo décliné, Gilroy / Quicksand et palette #052844, #005c78, #028391, #e88d67" }
      ]
    },
    careinyoga: {
      title: "Charte Graphique & Print — Care in Yoga",
      subtitle: "Univers apaisant Vinyasa & Féminin Sacré, papeterie et supports imprimés",
      pdf: "assets/pdf/charte-care-in-yoga.pdf",
      items: [
        { src: "assets/img/chartes/care-1.png", caption: "Charte Graphique officielle — Typographies Playfair Display & Montserrat, palette Terracotta & Sauge" },
        { src: "assets/img/cover_care_in_yoga.png", caption: "Mise en situation — Marque-pages et papeterie sur toile de lin naturelle" },
        { src: "assets/img/print_care_in_yoga.png", caption: "Support d'impression — Marque-page / flyer recto & verso détaillé" }
      ]
    },
    aiguilles: {
      title: "Charte Graphique & Print — Les P'tites Aiguilles d'Hélène",
      subtitle: "Atelier couture artisanale — Identité visuelle douce et papeterie print",
      pdf: "assets/pdf/charte-les-ptites-aiguilles.pdf",
      items: [
        { src: "assets/img/chartes/aiguilles-1.png", caption: "Charte Graphique — Typographies Parisienne & Glacial Indifference, palette rose poudré et or" },
        { src: "assets/img/print_ptite_aiguilles.png", caption: "Support Print — Flyer et support de présentation artisanal" }
      ]
    },
    lamarque: {
      title: "Charte Graphique — Lamarque Chivaley",
      subtitle: "Identité visuelle botanique, univers de marque raffiné et déclinaisons",
      pdf: "assets/pdf/charte-lamarque-chivaley.pdf",
      items: [
        { src: "assets/img/chartes/lamarque-1.png", caption: "Charte Graphique complète — Typographies Amsterdam Four & Helvetica Now, palette vert profond & terre" }
      ]
    }
  };

  // --- 1. Filtrage des projets par catégories ---
  const filterButtons = document.querySelectorAll(".project-filter-btn");
  const projectCards = document.querySelectorAll(".project-case-card");

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener("click", function () {
        const selectedCategory = this.getAttribute("data-filter");

        // Mise à jour de l'état actif des boutons
        filterButtons.forEach(b => b.classList.remove("active"));
        this.classList.add("active");

        // Filtrage visuel des cartes
        projectCards.forEach(card => {
          const cardCategories = card.getAttribute("data-category") || "";
          const categoriesList = cardCategories.split(" ");

          if (selectedCategory === "all" || categoriesList.includes(selectedCategory)) {
            card.style.display = "";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 50);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(15px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 250);
          }
        });
      });
    });
  }

  // --- 2. Visionneuse / Lightbox interactive ---
  const viewerModal = document.getElementById("projectViewerModal");
  if (!viewerModal) return;

  const viewerTitle = document.getElementById("viewerTitle");
  const viewerSubtitle = document.getElementById("viewerSubtitle");
  const viewerMainImg = document.getElementById("viewerMainImg");
  const viewerCaption = document.getElementById("viewerCaption");
  const viewerCounter = document.getElementById("viewerCounter");
  const viewerThumbs = document.getElementById("viewerThumbs");
  const btnPrev = document.getElementById("viewerPrev");
  const btnNext = document.getElementById("viewerNext");
  const btnClose = document.getElementById("viewerClose");
  const btnPdf = document.getElementById("viewerDownloadPdf");

  let currentGalleryKey = null;
  let currentIndex = 0;

  function openGallery(key, startIndex = 0) {
    const gallery = galleries[key];
    if (!gallery || !gallery.items.length) return;

    currentGalleryKey = key;
    currentIndex = startIndex;

    viewerTitle.textContent = gallery.title;
    viewerSubtitle.textContent = gallery.subtitle;

    // Gérer l'affichage du lien PDF original
    if (btnPdf) {
      if (gallery.pdf) {
        btnPdf.href = gallery.pdf;
        btnPdf.style.display = "inline-flex";
      } else {
        btnPdf.style.display = "none";
      }
    }

    // Masquer les boutons suivant/précédent si un seul élément
    const hasMultiple = gallery.items.length > 1;
    if (btnPrev) btnPrev.style.display = hasMultiple ? "flex" : "none";
    if (btnNext) btnNext.style.display = hasMultiple ? "flex" : "none";
    if (viewerCounter) viewerCounter.style.display = hasMultiple ? "inline-block" : "none";
    if (viewerThumbs) viewerThumbs.style.display = hasMultiple ? "flex" : "none";

    // Générer les miniatures cliquables
    viewerThumbs.innerHTML = "";
    if (hasMultiple) {
      gallery.items.forEach((item, idx) => {
        const thumb = document.createElement("button");
        thumb.type = "button";
        thumb.className = `viewer-thumb ${idx === startIndex ? "active" : ""}`;
        thumb.setAttribute("aria-label", `Voir écran ${idx + 1}`);
        thumb.innerHTML = `<img src="${item.src}" alt="Miniature ${idx + 1}">`;
        thumb.addEventListener("click", () => showSlide(idx));
        viewerThumbs.appendChild(thumb);
      });
    }

    showSlide(startIndex);

    viewerModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function showSlide(index) {
    const gallery = galleries[currentGalleryKey];
    if (!gallery) return;

    if (index < 0) index = gallery.items.length - 1;
    if (index >= gallery.items.length) index = 0;

    currentIndex = index;
    const currentItem = gallery.items[currentIndex];

    // Transition fluide
    viewerMainImg.style.opacity = "0";
    setTimeout(() => {
      viewerMainImg.src = currentItem.src;
      viewerMainImg.alt = currentItem.caption;
      viewerCaption.textContent = currentItem.caption;
      viewerCounter.textContent = `${currentIndex + 1} / ${gallery.items.length}`;
      viewerMainImg.style.opacity = "1";
    }, 150);

    // Mettre à jour l'état actif des miniatures
    const allThumbs = viewerThumbs.querySelectorAll(".viewer-thumb");
    allThumbs.forEach((thumb, idx) => {
      thumb.classList.toggle("active", idx === currentIndex);
      if (idx === currentIndex) {
        thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
  }

  function closeGallery() {
    viewerModal.classList.remove("active");
    document.body.style.overflow = "";
    setTimeout(() => {
      viewerMainImg.src = "";
    }, 300);
  }

  // Écouteurs de déclenchement d'ouverture
  document.querySelectorAll("[data-open-gallery]").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const galleryKey = this.getAttribute("data-open-gallery");
      openGallery(galleryKey, 0);
    });
  });

  // Contrôles suivant / précédent / fermeture
  if (btnPrev) btnPrev.addEventListener("click", () => showSlide(currentIndex - 1));
  if (btnNext) btnNext.addEventListener("click", () => showSlide(currentIndex + 1));
  if (btnClose) btnClose.addEventListener("click", closeGallery);

  // Fermeture au clic sur le fond sombre
  viewerModal.addEventListener("click", function (e) {
    if (e.target === viewerModal || e.target.classList.contains("viewer-overlay")) {
      closeGallery();
    }
  });

  // Navigation au clavier (Flèches gauche/droite et Echap)
  document.addEventListener("keydown", function (e) {
    if (!viewerModal.classList.contains("active")) return;
    if (e.key === "Escape") {
      closeGallery();
    } else if (e.key === "ArrowLeft") {
      showSlide(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      showSlide(currentIndex + 1);
    }
  });
});
