import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const W = 1200;
const H = 800;

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Crée le fond élégant studio minéral avec ombres douces et typographie éditoriale
function getBackgroundSvg(title, subtitle, category) {
  const safeCat = escapeXml(category.toUpperCase());
  const safeTitle = escapeXml(title);
  const safeSub = escapeXml(subtitle);

  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>
      <linearGradient id="stoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F7F3ED"/>
        <stop offset="35%" stop-color="#EFE7DC"/>
        <stop offset="70%" stop-color="#E5DBCF"/>
        <stop offset="100%" stop-color="#D9CFC1"/>
      </linearGradient>

      <radialGradient id="sunLight" cx="20%" cy="10%" r="80%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6"/>
        <stop offset="45%" stop-color="#FFFDF9" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#CBBFAe" stop-opacity="0.3"/>
      </radialGradient>

      <filter id="foliageBlur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="34"/>
      </filter>
    </defs>

    <!-- Fond dégradé pierre naturelle / travertin -->
    <rect width="${W}" height="${H}" fill="url(#stoneGrad)"/>
    <rect width="${W}" height="${H}" fill="url(#sunLight)"/>

    <!-- Ombres de feuillage douces (ambiance studio design) -->
    <g filter="url(#foliageBlur)" opacity="0.14" fill="#3D3025">
      <path d="M 0 0 C 180 80, 240 220, 200 380 C 170 300, 110 180, 0 160 Z"/>
      <path d="M 1200 800 C 1040 680, 960 520, 1020 360 C 1060 480, 1120 620, 1200 660 Z"/>
      <circle cx="1080" cy="140" r="130"/>
    </g>

    <!-- Socle architectural subtil au sol -->
    <g opacity="0.35">
      <ellipse cx="${W / 2}" cy="712" rx="540" ry="24" fill="#000000" filter="url(#foliageBlur)"/>
      <line x1="100" y1="718" x2="1100" y2="718" stroke="#D3C7B7" stroke-width="1.5" stroke-dasharray="8 6"/>
    </g>

    <!-- Typographie éditoriale en haut à gauche -->
    <g transform="translate(64, 62)">
      <text x="0" y="0" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Montserrat', sans-serif" font-size="12" font-weight="700" fill="#786654" letter-spacing="3.5">${safeCat}</text>
      <text x="0" y="32" font-family="'Playfair Display', 'Nimbus Roman', Georgia, serif" font-size="34" font-weight="700" fill="#20170F" letter-spacing="-0.5">${safeTitle}</text>
      <text x="0" y="60" font-family="'Playfair Display', 'Nimbus Roman', Georgia, serif" font-size="18" font-style="italic" font-weight="400" fill="#5A4A3C">${safeSub}</text>
    </g>
  </svg>
  `;
}

// Barre macOS Safari de la fenêtre desktop
function getBrowserChromeSvg(width, height, url) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <rect width="${width}" height="${height}" fill="#F4F1EC" stroke="rgba(0,0,0,0.06)" stroke-width="1"/>
    
    <!-- Pastilles macOS -->
    <circle cx="22" cy="${height / 2}" r="5.5" fill="#FF5F56"/>
    <circle cx="39" cy="${height / 2}" r="5.5" fill="#FFBD2E"/>
    <circle cx="56" cy="${height / 2}" r="5.5" fill="#27C93F"/>

    <!-- Flèches < > -->
    <path d="M 82 ${height / 2 - 4} L 78 ${height / 2} L 82 ${height / 2 + 4}" stroke="#8E7E70" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M 94 ${height / 2 - 4} L 98 ${height / 2} L 94 ${height / 2 + 4}" stroke="#B8AAA0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

    <!-- Capsule URL Safari -->
    <rect x="${width / 2 - 160}" y="${height / 2 - 12}" width="320" height="24" rx="7" fill="#E8E3DC" stroke="rgba(0,0,0,0.04)" stroke-width="1"/>
    <text x="${width / 2}" y="${height / 2 + 4}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#473B30">🔒 ${url}</text>

    <!-- Ligne de séparation basse -->
    <line x1="0" y1="${height}" x2="${width}" y2="${height}" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
  </svg>
  `;
}

// Châssis iPhone avec Dynamic Island et reflet
function getIphoneFrameSvg(width, height) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <defs>
      <linearGradient id="phoneBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2E2A27"/>
        <stop offset="50%" stop-color="#1B1715"/>
        <stop offset="100%" stop-color="#0E0C0B"/>
      </linearGradient>
      <linearGradient id="phoneReflection" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.16"/>
        <stop offset="35%" stop-color="#FFFFFF" stop-opacity="0.03"/>
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <!-- Châssis titane noir -->
    <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="32" ry="32" fill="none" stroke="url(#phoneBorder)" stroke-width="5"/>
    <rect x="5" y="5" width="${width - 10}" height="${height - 10}" rx="28" ry="28" fill="none" stroke="#3A332C" stroke-width="1.5"/>

    <!-- Dynamic Island -->
    <rect x="${width / 2 - 28}" y="12" width="56" height="15" rx="7.5" ry="7.5" fill="#000000"/>
    <circle cx="${width / 2 + 15}" cy="19.5" r="3" fill="#091420" opacity="0.8"/>

    <!-- Liseré de brillance de verre -->
    <rect x="7" y="7" width="${width - 14}" height="${height - 14}" rx="26" ry="26" fill="url(#phoneReflection)" pointer-events="none"/>
  </svg>
  `;
}

// Ombre portée diffuse au format PNG
async function createDropShadow(w, h, rx, blur, opacity, dy = 16, dx = 0) {
  const pad = blur * 3;
  const totalW = w + pad * 2;
  const totalH = h + pad * 2;

  const shadowSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" width="${totalW}" height="${totalH}">
    <defs>
      <filter id="blurFilter" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="${blur}"/>
      </filter>
    </defs>
    <rect x="${pad + dx}" y="${pad + dy}" width="${w}" height="${h}" rx="${rx}" ry="${rx}" fill="#160F09" opacity="${opacity}" filter="url(#blurFilter)"/>
  </svg>
  `;

  return sharp(Buffer.from(shadowSvg)).png().toBuffer();
}

// Masque arrondi
function getRoundedMask(w, h, rx) {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <rect width="${w}" height="${h}" rx="${rx}" ry="${rx}" fill="#FFFFFF"/>
    </svg>
  `);
}

// Générateur de scène (Desktop seul ou Desktop + Mobile, SANS iPad / SANS volet superflu)
async function buildMockupScene({
  title,
  subtitle,
  category,
  url,
  desktopImgPath,
  deskW = 860,
  deskH = 540,
  deskX = 100,
  deskY = 160,
  phoneImgPath = null,
  phoneW = 220,
  phoneH = 460,
  phoneX = 890,
  phoneY = 240,
  outputPath
}) {
  console.log(`Génération du mockup : ${title}...`);

  const DESK_HEADER_H = 42;
  const DESK_CONTENT_H = deskH - DESK_HEADER_H;

  // 1. Fenêtre Desktop
  const chromeSvg = Buffer.from(getBrowserChromeSvg(deskW, DESK_HEADER_H, url));

  const deskContent = await sharp(desktopImgPath)
    .resize(deskW, DESK_CONTENT_H, { fit: 'cover', position: 'top' })
    .toBuffer();

  const desktopFullBuffer = await sharp({
    create: {
      width: deskW,
      height: deskH,
      channels: 4,
      background: '#FFFFFF'
    }
  })
    .composite([
      { input: chromeSvg, top: 0, left: 0 },
      { input: deskContent, top: DESK_HEADER_H, left: 0 }
    ])
    .png()
    .toBuffer();

  const deskMask = getRoundedMask(deskW, deskH, 14);
  const desktopWindowFinal = await sharp(desktopFullBuffer)
    .composite([{ input: deskMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Ombre portée Desktop
  const blurVal = Math.min(24, Math.floor(deskX / 3));
  const deskShadowPad = blurVal * 3;
  const deskShadowBuffer = await createDropShadow(deskW, deskH, 14, blurVal, 0.30, 20);

  // 2. Châssis iPhone (uniquement si phoneImgPath est fourni)
  let phoneFinal = null;
  let phoneShadowBuffer = null;
  let phoneShadowPad = 24 * 3;

  if (phoneImgPath && fs.existsSync(phoneImgPath)) {
    const PHONE_SCREEN_W = phoneW - 16;
    const PHONE_SCREEN_H = phoneH - 16;

    const phoneScreenBuffer = await sharp(phoneImgPath)
      .resize(PHONE_SCREEN_W, PHONE_SCREEN_H, { fit: 'cover', position: 'top' })
      .composite([{ input: getRoundedMask(PHONE_SCREEN_W, PHONE_SCREEN_H, 26), blend: 'dest-in' }])
      .png()
      .toBuffer();

    const phoneFrameSvg = Buffer.from(getIphoneFrameSvg(phoneW, phoneH));

    phoneFinal = await sharp({
      create: {
        width: phoneW,
        height: phoneH,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([
        { input: phoneScreenBuffer, top: 8, left: 8 },
        { input: phoneFrameSvg, top: 0, left: 0 }
      ])
      .png()
      .toBuffer();

    phoneShadowBuffer = await createDropShadow(phoneW, phoneH, 32, 22, 0.40, 24, -3);
    phoneShadowPad = 22 * 3;
  }

  // 3. Assemblage global sur le fond travertin
  const bgSvg = Buffer.from(getBackgroundSvg(title, subtitle, category));
  const layers = [
    // Fond travertin & ombres douces
    { input: bgSvg, top: 0, left: 0 },

    // Ombre Desktop
    { input: deskShadowBuffer, top: deskY - deskShadowPad, left: deskX - deskShadowPad },

    // Fenêtre Desktop
    { input: desktopWindowFinal, top: deskY, left: deskX }
  ];

  // Smartphone au premier plan à droite (si présent)
  if (phoneFinal) {
    layers.push(
      { input: phoneShadowBuffer, top: phoneY - phoneShadowPad, left: phoneX - phoneShadowPad },
      { input: phoneFinal, top: phoneY, left: phoneX }
    );
  }

  // Rendu final en JPEG haute fidélité
  await sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: '#EAE4D8'
    }
  })
    .composite(layers)
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outputPath);

  console.log(`✅ Fichier généré avec succès : ${outputPath}`);
}

async function runAll() {
  console.log('🚀 Démarrage de la génération des mockups épurés (Desktop + Mobile uniquement)...');

  // 1. Mon Chasseur Immo Prestige (Desktop + Mobile uniquement, SANS iPad)
  await buildMockupScene({
    title: 'Prestige Mon Chasseur Immo',
    subtitle: "L'Immobilier d'Exception & Chasse Privée",
    category: 'Website & Art Direction',
    url: 'prestige.monchasseurimmo.com',
    desktopImgPath: 'assets/img/prestige_pageaccueil.png',
    phoneImgPath: 'assets/img/prestige_mobile.png',
    deskW: 860,
    deskH: 540,
    deskX: 95,
    deskY: 160,
    phoneW: 220,
    phoneH: 460,
    phoneX: 890,
    phoneY: 240,
    outputPath: 'assets/img/site_prestige.jpg'
  });

  // 2. Portail Recrutement (Desktop + Mobile uniquement, SANS iPad)
  await buildMockupScene({
    title: 'Portail Recrutement',
    subtitle: 'Devenir Chasseur Immobilier',
    category: 'UX Research & Candidate Funnel',
    url: 'recrutement.monchasseurimmo.com',
    desktopImgPath: 'assets/img/recrut_pageaccueil.png',
    phoneImgPath: 'assets/img/recrut_mobile.png',
    deskW: 860,
    deskH: 540,
    deskX: 95,
    deskY: 160,
    phoneW: 220,
    phoneH: 460,
    phoneX: 890,
    phoneY: 240,
    outputPath: 'assets/img/site_recrutement.jpg'
  });

  // 3. Plateforme Acadimmo (Desktop + Mobile uniquement, SANS iPad)
  await buildMockupScene({
    title: 'Plateforme Acadimmo',
    subtitle: 'Organisme de Formation Immobilière Qualiopi',
    category: 'UI Design & Educational Hub',
    url: 'acadimmo.fr',
    desktopImgPath: 'assets/img/acadimmo_pageaccueil.png',
    phoneImgPath: 'assets/img/acadimmo_mobile.png',
    deskW: 860,
    deskH: 540,
    deskX: 95,
    deskY: 160,
    phoneW: 220,
    phoneH: 460,
    phoneX: 890,
    phoneY: 240,
    outputPath: 'assets/img/site_acadimmo.jpg'
  });

  // 4. Mon Chasseur Immo Corporate (Desktop + Mobile uniquement, SANS superposition multiple)
  await buildMockupScene({
    title: 'Mon Chasseur Immo',
    subtitle: 'Plateforme Nationale de Recherche Immobilière',
    category: 'Website & UI Design',
    url: 'monchasseurimmo.com',
    desktopImgPath: 'assets/img/monchasseurimmo_pageaccueil.png',
    phoneImgPath: 'assets/img/monchasseurimmo_mobile.png',
    deskW: 860,
    deskH: 540,
    deskX: 95,
    deskY: 160,
    phoneW: 220,
    phoneH: 460,
    phoneX: 890,
    phoneY: 240,
    outputPath: 'assets/img/site_mci.jpg'
  });

  // 5. Playbook Interne Chasseurs (Desktop UNIQUE centré avec playbook.png, SANS mobile, SANS iPad)
  await buildMockupScene({
    title: 'Playbook Interne Chasseurs',
    subtitle: 'Base Métier, Argumentaires & Processus Terrain',
    category: 'Intranet & Design System',
    url: 'intranet.monchasseurimmo.com/playbook',
    desktopImgPath: 'assets/img/playbook.png',
    phoneImgPath: null, // Pas de version mobile ni ipad
    deskW: 980,
    deskH: 550,
    deskX: 110,
    deskY: 155,
    outputPath: 'assets/img/site_playbook.jpg'
  });

  // 6. Propre & Co (Desktop + Mobile)
  const propreDesktop = ['assets/img/propre_co-accueil.png', 'assets/img/propreco_pageaccueil.png', 'propre_co-accueil.png'].find(p => fs.existsSync(p));
  const propreMobile = ['assets/img/mobile_propreco.png', 'assets/img/mobile_propreco', 'mobile_propreco.png', 'mobile_propreco'].find(p => fs.existsSync(p));

  if (propreDesktop) {
    await buildMockupScene({
      title: 'Propre & Co',
      subtitle: 'Nettoyage & Rénovation Extérieure & Intérieure',
      category: 'Website & Identité de Marque',
      url: 'propre-co.fr',
      desktopImgPath: propreDesktop,
      phoneImgPath: propreMobile || null,
      deskW: 860,
      deskH: 540,
      deskX: 95,
      deskY: 160,
      phoneW: 220,
      phoneH: 460,
      phoneX: 890,
      phoneY: 240,
      outputPath: 'assets/img/site_propre_et_co.jpg'
    });
  }

  console.log('🎉 Les visuels ont été générés avec succès !');
}

runAll().catch(err => {
  console.error('Erreur :', err);
  process.exit(1);
});
