import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. GÉNÉRER LE MOCKUP DU FLYER (Flyer seul, grand format, 1600 x 1100)
async function generateFlyerMockup() {
  const W = 1600;
  const H = 1100;

  console.log('Génération du mockup Flyer Propre & Co...');

  const flyerPath = path.join(rootDir, 'assets/img/flyer_propreco.png');
  if (!fs.existsSync(flyerPath)) {
    throw new Error(`Le fichier ${flyerPath} n'existe pas !`);
  }

  // Dimensions exactes du flyer (A5 ratio 2481 : 3509)
  const meta = await sharp(flyerPath).metadata();
  const flyerH = 800;
  const flyerW = Math.round(flyerH * (meta.width / meta.height)); // ~ 566px, ratio 100% préservé

  console.log(`Flyer dimensions originales: ${meta.width}x${meta.height}, mockup: ${flyerW}x${flyerH}`);

  // Fond studio raffiné avec lumière naturelle
  const bgSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>
      <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F9F6F0"/>
        <stop offset="40%" stop-color="#F1ECE2"/>
        <stop offset="100%" stop-color="#E2D9CB"/>
      </linearGradient>
      <radialGradient id="sunSpot" cx="25%" cy="20%" r="75%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.75"/>
        <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.08"/>
      </radialGradient>
      <filter id="shadowFoliage" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="40"/>
      </filter>
    </defs>

    <!-- Fond architectural en pierre claire / papier texturé -->
    <rect width="${W}" height="${H}" fill="url(#wallGrad)"/>
    <rect width="${W}" height="${H}" fill="url(#sunSpot)"/>

    <!-- Ombres de branchages doux (effet baie vitrée naturelle) -->
    <g filter="url(#shadowFoliage)" opacity="0.13" fill="#2E231A">
      <path d="M 0,0 Q 250,220 380,80 T 750,180 L 850,0 Z"/>
      <path d="M 1250,0 Q 1400,320 1600,160 L 1600,0 Z"/>
      <circle cx="280" cy="110" r="140"/>
      <circle cx="1380" cy="160" r="180"/>
    </g>

    <!-- Pastille titre minimaliste studio -->
    <g transform="translate(70, 65)">
      <rect width="280" height="36" rx="18" ry="18" fill="#FFFFFF" fill-opacity="0.88" stroke="#D8CEBF" stroke-width="1.2"/>
      <text x="140" y="22.5" font-family="'Gilroy', 'Montserrat', -apple-system, sans-serif" font-size="12" font-weight="800" fill="#005469" text-anchor="middle" letter-spacing="1.5">
        PROPRE &amp; CO • FLYER PRINT A5
      </text>
    </g>
  </svg>
  `;

  // Préparation du flyer redimensionné fidèlement
  const resizedFlyer = await sharp(flyerPath)
    .resize(flyerW, flyerH)
    .png()
    .toBuffer();

  // Multi-pass drop shadow photoréaliste
  const pad = 80;
  const shadowW = flyerW + pad * 2;
  const shadowH = flyerH + pad * 2;
  const flyerShadowSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${shadowW}" height="${shadowH}">
    <defs>
      <filter id="realisticPaperShadow" x="-30%" y="-30%" width="160%" height="160%">
        <!-- Contact shadow direct sous la feuille -->
        <feDropShadow dx="2" dy="5" stdDeviation="5" flood-color="#140E08" flood-opacity="0.32"/>
        <!-- Ombre portée moyenne -->
        <feDropShadow dx="14" dy="24" stdDeviation="18" flood-color="#140E08" flood-opacity="0.22"/>
        <!-- Diffusion douce lumière ambiante -->
        <feDropShadow dx="26" dy="42" stdDeviation="32" flood-color="#140E08" flood-opacity="0.14"/>
      </filter>
    </defs>
    <rect x="${pad}" y="${pad}" width="${flyerW}" height="${flyerH}" rx="4" ry="4" fill="#000000" filter="url(#realisticPaperShadow)"/>
  </svg>
  `;
  const flyerShadowBuffer = await sharp(Buffer.from(flyerShadowSvg)).png().toBuffer();

  // Filet de tranche de papier (subtil reflet blanc)
  const paperEdgeSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${flyerW}" height="${flyerH}">
    <rect x="0.5" y="0.5" width="${flyerW - 1}" height="${flyerH - 1}" rx="3" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
    <rect x="0.5" y="0.5" width="${flyerW - 1}" height="${flyerH - 1}" rx="3" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
  </svg>
  `;
  const paperEdgeBuffer = await sharp(Buffer.from(paperEdgeSvg)).png().toBuffer();

  const flyerX = Math.round((W - flyerW) / 2);
  const flyerY = Math.round((H - flyerH) / 2) + 20;

  const composites = [
    { input: Buffer.from(bgSvg), top: 0, left: 0 },
    { input: flyerShadowBuffer, top: flyerY - pad, left: flyerX - pad },
    { input: resizedFlyer, top: flyerY, left: flyerX },
    { input: paperEdgeBuffer, top: flyerY, left: flyerX }
  ];

  const outPath = path.join(rootDir, 'assets/img/mockup_propre_flyer.jpg');
  await sharp({
    create: { width: W, height: H, channels: 4, background: '#EAE4D8' }
  })
    .composite(composites)
    .jpeg({ quality: 94, mozjpeg: true })
    .toFile(outPath);

  console.log('✅ Mockup Flyer terminé avec succès :', outPath);
  return outPath;
}

// 2. GÉNÉRER LE MOCKUP DES CARTES DE VISITE (Recto & Verso, 1600 x 1000)
async function generateCartesMockup() {
  const W = 1600;
  const H = 1000;

  console.log('Génération du mockup Cartes de Visite Propre & Co...');

  const rectoPath = path.join(rootDir, 'assets/img/recto_cvpropreco.png');
  const versoPath = path.join(rootDir, 'assets/img/verso_cvpropreco.png');

  if (!fs.existsSync(rectoPath) || !fs.existsSync(versoPath)) {
    throw new Error('Fichiers recto ou verso manquants !');
  }

  const metaR = await sharp(rectoPath).metadata();
  const cardW = 680;
  const cardH = Math.round(cardW * (metaR.height / metaR.width)); // ~ 448px, ratio 100% préservé

  console.log(`Cartes dimensions originales: ${metaR.width}x${metaR.height}, mockup: ${cardW}x${cardH}`);

  // Fond studio épuré
  const bgSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>
      <linearGradient id="cardBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FBF8F3"/>
        <stop offset="45%" stop-color="#F3ECE2"/>
        <stop offset="100%" stop-color="#E5DCce"/>
      </linearGradient>
      <radialGradient id="cardSun" cx="30%" cy="15%" r="75%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.8"/>
        <stop offset="55%" stop-color="#FFFFFF" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.08"/>
      </radialGradient>
      <filter id="cardFoliage" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="36"/>
      </filter>
    </defs>

    <rect width="${W}" height="${H}" fill="url(#cardBgGrad)"/>
    <rect width="${W}" height="${H}" fill="url(#cardSun)"/>

    <!-- Ombres de feuillage douces -->
    <g filter="url(#cardFoliage)" opacity="0.12" fill="#2E231A">
      <path d="M 0,0 Q 200,260 360,100 T 700,200 L 800,0 Z"/>
      <path d="M 1300,0 Q 1450,280 1600,120 L 1600,0 Z"/>
      <circle cx="260" cy="120" r="140"/>
    </g>

    <!-- Pastille titre -->
    <g transform="translate(70, 60)">
      <rect width="292" height="36" rx="18" ry="18" fill="#FFFFFF" fill-opacity="0.88" stroke="#D8CEBF" stroke-width="1.2"/>
      <text x="146" y="22.5" font-family="'Gilroy', 'Montserrat', -apple-system, sans-serif" font-size="12" font-weight="800" fill="#005469" text-anchor="middle" letter-spacing="1.5">
        PROPRE &amp; CO • CARTES DE VISITE
      </text>
    </g>
  </svg>
  `;

  // Coins légèrement arrondis pour une carte de visite premium (14px)
  const cardCornerMaskSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${cardW}" height="${cardH}">
    <rect width="${cardW}" height="${cardH}" rx="14" ry="14" fill="#FFFFFF"/>
  </svg>
  `;

  // Préparer les cartes avec coin arrondi et masque
  const rectoBuffer = await sharp(rectoPath)
    .resize(cardW, cardH)
    .composite([{ input: Buffer.from(cardCornerMaskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  const versoBuffer = await sharp(versoPath)
    .resize(cardW, cardH)
    .composite([{ input: Buffer.from(cardCornerMaskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Ombre portée diffuse pour chaque carte
  const pad = 100;
  const shadowW = cardW + pad * 2;
  const shadowH = cardH + pad * 2;
  const cardShadowSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${shadowW}" height="${shadowH}">
    <defs>
      <filter id="cardRealisticShadow" x="-35%" y="-35%" width="170%" height="170%">
        <feDropShadow dx="3" dy="6" stdDeviation="6" flood-color="#140E08" flood-opacity="0.28"/>
        <feDropShadow dx="14" dy="24" stdDeviation="20" flood-color="#140E08" flood-opacity="0.22"/>
        <feDropShadow dx="24" dy="45" stdDeviation="36" flood-color="#140E08" flood-opacity="0.14"/>
      </filter>
    </defs>
    <rect x="${pad}" y="${pad}" width="${cardW}" height="${cardH}" rx="14" ry="14" fill="#000000" filter="url(#cardRealisticShadow)"/>
  </svg>
  `;
  const cardShadowBuffer = await sharp(Buffer.from(cardShadowSvg)).png().toBuffer();

  // Bords délicats de papier
  const cardEdgeSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${cardW}" height="${cardH}">
    <rect x="0.5" y="0.5" width="${cardW - 1}" height="${cardH - 1}" rx="13.5" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
    <rect x="0.5" y="0.5" width="${cardW - 1}" height="${cardH - 1}" rx="13.5" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
  </svg>
  `;
  const cardEdgeBuffer = await sharp(Buffer.from(cardEdgeSvg)).png().toBuffer();

  // Positionnement élégant en quinconce :
  // Recto en haut à gauche
  const rX = 170;
  const rY = 220;

  // Verso en bas à droite
  const vX = 750;
  const vY = 380;

  const composites = [
    { input: Buffer.from(bgSvg), top: 0, left: 0 },

    // Ombre Recto puis Carte Recto
    { input: cardShadowBuffer, top: rY - pad, left: rX - pad },
    { input: rectoBuffer, top: rY, left: rX },
    { input: cardEdgeBuffer, top: rY, left: rX },

    // Ombre Verso puis Carte Verso
    { input: cardShadowBuffer, top: vY - pad, left: vX - pad },
    { input: versoBuffer, top: vY, left: vX },
    { input: cardEdgeBuffer, top: vY, left: vX }
  ];

  const outPath = path.join(rootDir, 'assets/img/mockup_propre_cartes.jpg');
  await sharp({
    create: { width: W, height: H, channels: 4, background: '#EAE4D8' }
  })
    .composite(composites)
    .jpeg({ quality: 94, mozjpeg: true })
    .toFile(outPath);

  console.log('✅ Mockup Cartes terminé avec succès :', outPath);
  return outPath;
}

async function main() {
  await generateFlyerMockup();
  await generateCartesMockup();
  console.log('🎉 Les 2 mockups ont été générés avec les fichiers originaux !');
}

main().catch(err => {
  console.error('Erreur :', err);
  process.exit(1);
});
