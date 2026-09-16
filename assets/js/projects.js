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
      url: "prestige.monchasseurimmo.com",
      items: [
        { src: "assets/img/prestige_pageaccueil.png", caption: "Page d'accueil Desktop — Conception haute fidélité prestige" },
        { src: "assets/img/prestige_mobile.png", caption: "Version Mobile — Expérience responsive sur smartphone", type: "mobile" },
        { src: "assets/img/maquette_prestige/MCI-Prestige-Home.png", caption: "Page d'accueil complète — Biens prestigieux et recherche sur-mesure" },
        { src: "assets/img/maquette_prestige/MCI-Prestige-Services.png", caption: "Page Services — Offre d'accompagnement dédiée aux acquéreurs exigeants" },
        { src: "assets/img/maquette_prestige/MCI-Prestige-partenaire.png", caption: "Page Partenaires — Espace de collaboration et prescripteurs de prestige" },
        { src: "assets/img/maquette_prestige/MCI-Prestige-Equipe.png", caption: "Page Équipe — Mise en valeur des experts et conseillers dédiés" },
        { src: "assets/img/maquette_prestige/MCI-Prestige-Chasseur.png", caption: "Fiche Chasseur — Profil détaillé, avis clients et contact direct" }
      ]
    },
    recrutement: {
      title: "Maquettes UI & Tunnel — Recrutement Mon Chasseur Immo",
      subtitle: "Parcours candidat complet & optimisation de la conversion",
      url: "recrutement.monchasseurimmo.com",
      items: [
        { src: "assets/img/recrut_pageaccueil.png", caption: "Page d'accueil Desktop — Proposition employeur et réassurance" },
        { src: "assets/img/recrut_mobile.png", caption: "Version Mobile — Tunnel et candidature sur mobile", type: "mobile" },
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
      url: "acadimmo.fr",
      items: [
        { src: "assets/img/acadimmo_pageaccueil.png", caption: "Page d'accueil Desktop — Conception plateforme Acadimmo" },
        { src: "assets/img/acadimmo_mobile.png", caption: "Version Mobile — Consultation mobile responsive", type: "mobile" },
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
    mci: {
      title: "Refonte Mon Chasseur Immo",
      subtitle: "Plateforme nationale de recherche immobilière",
      url: "monchasseurimmo.com",
      items: [
        { src: "assets/img/monchasseurimmo_pageaccueil.png", caption: "Page d'accueil Desktop — Refonte ergonomique, recherche géolocalisée et réassurance" },
        { src: "assets/img/monchasseurimmo_mobile.png", caption: "Version Mobile — Expérience fluide optimisée pour smartphone", type: "mobile" }
      ]
    },
    playbook: {
      title: "Playbook Interne Chasseurs — Mon Chasseur Immo",
      subtitle: "Intranet métier & architecture de l'information pour équipes terrain",
      url: "intranet.monchasseurimmo.com/playbook",
      items: [
        { src: "assets/img/playbook.png", caption: "Interface d'accueil du Playbook — Navigation thématique, recherche intégrée et modules métiers" }
      ]
    },
    propre: {
      device: "none", // Mode Print / Papeterie & Identité (sans écran d'ordinateur car déjà dans le mockup)
      title: "Webdesign & Identité de Marque — Propre & Co",
      subtitle: "Vitrine web responsive, flyer promotionnel, cartes de visite et charte graphique officielle",
      pdf: "assets/pdf/charte-propre-et-co.pdf",
      items: [
        { src: "assets/img/site_propre_et_co.jpg", caption: "Mockup Webdesign — Vitrine responsive Propre & Co sur Desktop (Safari) et iPhone" },
        { src: "assets/img/chartes/propre-1.png", caption: "Charte Graphique officielle — Logo décliné, typographies Gilroy & Quicksand et palette de couleurs" },
        { src: "assets/img/mockup_propre_flyer.jpg", caption: "Mockup Flyer — Présentation réaliste du flyer A5 Propre & Co en mise en situation" },
        { src: "assets/img/mockup_propre_cartes.jpg", caption: "Mockup Cartes de Visite — Duo Recto & Verso en mise en situation studio" } 
      ]
    },
    careinyoga: {
      device: "none", // Mode Print / Charte pure (sans écran d'ordinateur)
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
      device: "none", // Mode Print / Charte pure (sans écran d'ordinateur)
      title: "Charte Graphique & Print — Les P'tites Aiguilles d'Hélène",
      subtitle: "Atelier couture artisanale — Identité visuelle douce et papeterie print",
      pdf: "assets/pdf/charte-les-ptites-aiguilles.pdf",
      items: [
        { src: "assets/img/chartes/aiguilles-1.png", caption: "Charte Graphique — Typographies Parisienne & Glacial Indifference, palette rose poudré et or" },
        { src: "assets/img/print_ptite_aiguilles.png", caption: "Support Print — Flyer et support de présentation artisanal" }
      ]
    },
    lamarque: {
      device: "none", // Mode Print / Charte pure (sans écran d'ordinateur)
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
  const projectWrappers = document.querySelectorAll(".project-case-card-wrapper");

  if (filterButtons.length && projectWrappers.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener("click", function () {
        const selectedCategory = this.getAttribute("data-filter");

        // Mise à jour de l'état actif des boutons
        filterButtons.forEach(b => b.classList.remove("active"));
        this.classList.add("active");

        // Filtrage des cartes et de leurs colonnes de grille
        projectWrappers.forEach(wrapper => {
          const card = wrapper.querySelector(".project-case-card");
          if (!card) return;

          const cardCategories = card.getAttribute("data-category") || "";
          const categoriesList = cardCategories.split(" ");
          const isMatch = selectedCategory === "all" || categoriesList.includes(selectedCategory);

          if (isMatch) {
            wrapper.style.display = "";
            card.style.display = "";
            card.style.opacity = "0";
            card.style.transform = "translateY(10px)";
            requestAnimationFrame(() => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, 30);
            });
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(10px)";
            wrapper.style.display = "none";
            card.style.display = "none";
          }
        });
      });
    });
  }

  // --- 2. Visionneuse / Lightbox interactive avec écran d'ordinateur défilant ---
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

  // Nouveaux éléments de l'écran interactif
  const viewerDeviceWrapper = document.getElementById("viewerDeviceWrapper");
  const viewerScreenViewport = document.getElementById("viewerScreenViewport");
  const viewerUrlText = document.getElementById("viewerUrlText");
  const viewerScrollHint = document.getElementById("viewerScrollHint");
  const viewerScrollTopBtn = document.getElementById("viewerScrollTopBtn");

  let currentGalleryKey = null;
  let currentIndex = 0;

  function openGallery(key, startIndex = 0) {
    const gallery = galleries[key];
    if (!gallery || !gallery.items.length) return;

    currentGalleryKey = key;
    currentIndex = startIndex;

    viewerTitle.textContent = gallery.title;
    viewerSubtitle.textContent = gallery.subtitle;

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
        thumb.innerHTML = `<img src="${item.src}" alt="Miniature ${idx + 1}" loading="lazy" decoding="async" width="80" height="50">`;
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

    // Réinitialiser la position de scroll tout en haut de l'écran
    if (viewerScreenViewport) {
      viewerScreenViewport.scrollTop = 0;
    }

    // Déterminer le mode d'affichage (Ordinateur, Mobile ou Print/Charte sans appareil)
    const hasDevice = gallery.device !== "none";
    const isMobile = hasDevice && (currentItem.type === "mobile" || (currentItem.src && currentItem.src.includes("mobile")));
    const isDesktop = hasDevice && !isMobile;
    const isPrint = !hasDevice;

    if (viewerDeviceWrapper) {
      viewerDeviceWrapper.classList.toggle("is-mobile", isMobile);
      viewerDeviceWrapper.classList.toggle("is-desktop", isDesktop);
      viewerDeviceWrapper.classList.toggle("is-print", isPrint);
    }

    // Mettre à jour l'URL dans la barre Safari
    if (viewerUrlText) {
      viewerUrlText.textContent = gallery.url || "monchasseurimmo.com";
    }

    // Réinitialiser les états d'indication de défilement
    if (viewerScrollHint) {
      viewerScrollHint.classList.remove("scrolled");
      viewerScrollHint.style.display = "none";
    }
    if (viewerScrollTopBtn) {
      viewerScrollTopBtn.classList.remove("visible");
    }

    // Transition fluide de l'image
    viewerMainImg.style.opacity = "0";
    setTimeout(() => {
      viewerMainImg.onload = function () {
        viewerMainImg.style.opacity = "1";
        // Vérifier si l'image est plus haute que la fenêtre de visualisation (uniquement en mode écran)
        if (hasDevice && viewerScreenViewport && viewerScrollHint) {
          setTimeout(() => {
            const canScroll = viewerScreenViewport.scrollHeight > viewerScreenViewport.clientHeight + 25;
            viewerScrollHint.style.display = canScroll ? "inline-flex" : "none";
          }, 60);
        }
      };

      viewerMainImg.src = currentItem.src;
      viewerMainImg.alt = currentItem.caption;
      viewerCaption.textContent = currentItem.caption;
      viewerCounter.textContent = `${currentIndex + 1} / ${gallery.items.length}`;
    }, 120);

    // Mettre à jour l'état actif des miniatures
    const allThumbs = viewerThumbs.querySelectorAll(".viewer-thumb");
    allThumbs.forEach((thumb, idx) => {
      thumb.classList.toggle("active", idx === currentIndex);
      if (idx === currentIndex) {
        thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
  }

  // Écouter le défilement dans l'écran de l'ordinateur
  if (viewerScreenViewport) {
    viewerScreenViewport.addEventListener("scroll", function () {
      if (viewerScrollHint) {
        if (this.scrollTop > 30) {
          viewerScrollHint.classList.add("scrolled");
        } else {
          viewerScrollHint.classList.remove("scrolled");
        }
      }
      if (viewerScrollTopBtn) {
        if (this.scrollTop > 160) {
          viewerScrollTopBtn.classList.add("visible");
        } else {
          viewerScrollTopBtn.classList.remove("visible");
        }
      }
    }, { passive: true });
  }

  // Clic sur le bouton "Remonter en haut" de la barre de navigation
  if (viewerScrollTopBtn && viewerScreenViewport) {
    viewerScrollTopBtn.addEventListener("click", function () {
      viewerScreenViewport.scrollTo({ top: 0, behavior: "smooth" });
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
