import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import opentype from 'opentype.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function loadFont(fontRelPath) {
  const buf = fs.readFileSync(path.join(rootDir, fontRelPath));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

const fontBold = loadFont('assets/fonts/Gilroy-Bold.otf');
const fontSemi = loadFont('assets/fonts/Gilroy-SemiBold.otf');
const fontMed = loadFont('assets/fonts/Gilroy-Medium.otf');

// Helper to convert opentype Path to clean SVG path data without NaN floating-point glitches
function pathToSvgData(path) {
  function fmt(n) {
    if (typeof n !== 'number' || Number.isNaN(n)) return '0';
    return Number(n.toFixed(2)).toString();
  }
  let d = '';
  for (const cmd of path.commands) {
    if (cmd.type === 'M') {
      d += 'M' + fmt(cmd.x) + ' ' + fmt(cmd.y);
    } else if (cmd.type === 'L') {
      d += 'L' + fmt(cmd.x) + ' ' + fmt(cmd.y);
    } else if (cmd.type === 'C') {
      d += 'C' + fmt(cmd.x1) + ' ' + fmt(cmd.y1) + ' ' + fmt(cmd.x2) + ' ' + fmt(cmd.y2) + ' ' + fmt(cmd.x) + ' ' + fmt(cmd.y);
    } else if (cmd.type === 'Q') {
      d += 'Q' + fmt(cmd.x1) + ' ' + fmt(cmd.y1) + ' ' + fmt(cmd.x) + ' ' + fmt(cmd.y);
    } else if (cmd.type === 'Z') {
      d += 'Z';
    }
  }
  return d;
}

// Helper to convert text to SVG path with exact Gilroy vector glyphs
function textToPath(font, text, x, y, size, fill, extra = '') {
  const p = font.getPath(text, x, y, size);
  return `<path d="${pathToSvgData(p)}" fill="${fill}" ${extra} />`;
}

// Helper for multi-styled inline text
function inlineText(segments, startX, y, defaultSize) {
  let curX = startX;
  let out = '';
  for (const seg of segments) {
    const font = seg.font || fontMed;
    const size = seg.size || defaultSize;
    const p = font.getPath(seg.text, curX, y, size);
    out += `<path d="${pathToSvgData(p)}" fill="${seg.fill || '#FFFFFF'}" />\n`;
    curX += font.getAdvanceWidth(seg.text, size);
  }
  return out;
}

export function buildBannerSvg() {
  // 1. Nom de marque personnelle : Jessica en blanc, Deplanche en rose (Gilroy-Bold)
  // Utilisation de la fonction vectorielle sécurisée pour un rendu ultra net sans artefact
  const wJessica = fontBold.getAdvanceWidth('Jessica ', 48);
  const pathJessica = textToPath(fontBold, 'Jessica ', 0, 102, 48, '#FFFFFF');
  const pathDeplanche = textToPath(fontBold, 'Deplanche', wJessica, 102, 48, '#ffb1ef');

  // 2. Titre Métier Principal Percutant (Gilroy-Bold avec dégradé turquoise/ciel élégant de la charte)
  const pathRole = textToPath(fontBold, 'UI Designer & Intégratrice Web', 0, 158, 32, 'url(#role-grad)');

  // 3. Première phrase d'accroche (Gilroy-Medium + Gilroy-Bold) - deuxième phrase supprimée selon demande
  const pathTagline1 = inlineText([
    { text: "De la conception d'interfaces sur ", fill: '#F8FAFC', font: fontMed },
    { text: 'Figma', fill: '#2DD4BF', font: fontBold },
    { text: " à l'intégration front-end & ", fill: '#F8FAFC', font: fontMed },
    { text: 'HubSpot CMS', fill: '#ffb1ef', font: fontBold }
  ], 0, 204, 16.5);

  // 4. Les 4 Boutons de compétences (Gilroy-SemiBold)
  // Mise à jour exacte avec "titre designer web bac +2"
  const pathBtn1 = textToPath(fontSemi, 'Figma & Design System', 44, 26, 13.5, '#FFFFFF');
  const pathBtn2 = textToPath(fontSemi, 'HubSpot CMS & HubL', 44, 26, 13.5, '#FFFFFF');
  const pathBtn3 = textToPath(fontSemi, 'HTML5 • CSS3 / Sass • JS', 44, 26, 13.5, '#FFFFFF');
  const pathBtn4 = textToPath(fontSemi, 'Titre Designer Web Bac +2', 44, 26, 12.5, '#FFFFFF');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1584 396" width="1584" height="396">
  <defs>
    <!-- Filtres d'effets identiques à fond_header_designer.svg -->
    <filter id="glow-ambient" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="90" result="blur" />
    </filter>
    <filter id="glow-soft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="50" result="blur" />
    </filter>
    <filter id="glass-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="24" flood-color="#000000" flood-opacity="0.5" />
    </filter>
    <filter id="btn-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000000" flood-opacity="0.35" />
    </filter>

    <!-- Dégradé de fond EXACT du portfolio (fond_header_designer.svg) -->
    <linearGradient id="bg-base" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00141a" />
      <stop offset="35%" stop-color="#002027" />
      <stop offset="70%" stop-color="#002832" />
      <stop offset="100%" stop-color="#002f39" />
    </linearGradient>

    <!-- Dégradés de lueurs ambiantes identiques à fond_header_designer.svg -->
    <radialGradient id="radial-mint" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2DD4BF" stop-opacity="0.65" />
      <stop offset="55%" stop-color="#2DD4BF" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#2DD4BF" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="radial-pink" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffb1ef" stop-opacity="0.60" />
      <stop offset="50%" stop-color="#ffb1ef" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#ffb1ef" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="radial-sky" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.60" />
      <stop offset="55%" stop-color="#38BDF8" stop-opacity="0.16" />
      <stop offset="100%" stop-color="#38BDF8" stop-opacity="0" />
    </radialGradient>

    <!-- Dégradé pour carte mockup glassmorphism 1 comme fond_header_designer.svg -->
    <linearGradient id="card-glass-1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2DD4BF" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#00252e" stop-opacity="0.75" />
    </linearGradient>

    <!-- Dégradé de texte titre métier -->
    <linearGradient id="role-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="55%" stop-color="#2DD4BF" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>

    <!-- Motif de grille design & intégration exact de fond_header_designer.svg -->
    <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2DD4BF" stroke-opacity="0.04" stroke-width="1" />
      <circle cx="0" cy="0" r="1" fill="#2DD4BF" fill-opacity="0.12" />
    </pattern>

    <!-- Motif de points Figma exact de fond_header_designer.svg -->
    <pattern id="dot-matrix" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="12" cy="12" r="0.8" fill="#38BDF8" fill-opacity="0.1" />
    </pattern>
  </defs>

  <!-- ==================== 1. FOND EXACT DU PORTFOLIO ==================== -->
  <rect width="1584" height="396" fill="url(#bg-base)" />
  <rect width="1584" height="396" fill="url(#grid-pattern)" />
  <rect x="1100" y="30" width="460" height="350" fill="url(#dot-matrix)" opacity="0.7" />
  <rect x="30" y="40" width="380" height="330" fill="url(#dot-matrix)" opacity="0.4" />

  <!-- ==================== 2. HALOS AMBIANTS DE FOND_HEADER_DESIGNER ==================== -->
  <!-- Halo supérieur droit : Mint & Sky Blue -->
  <circle cx="1380" cy="140" r="260" fill="url(#radial-mint)" filter="url(#glow-ambient)" />
  <circle cx="1490" cy="90" r="180" fill="url(#radial-sky)" filter="url(#glow-soft)" />

  <!-- Halo supérieur gauche : Rose poudré néon #ffb1ef (autour de la photo de profil LinkedIn) -->
  <circle cx="240" cy="140" r="240" fill="url(#radial-pink)" filter="url(#glow-ambient)" />
  <circle cx="280" cy="170" r="130" fill="url(#radial-pink)" filter="url(#glow-soft)" opacity="0.75" />

  <!-- Halo central bas : Profondeur Mint #2DD4BF & Sky Blue -->
  <circle cx="850" cy="390" r="300" fill="url(#radial-mint)" filter="url(#glow-ambient)" opacity="0.4" />
  <circle cx="900" cy="340" r="160" fill="url(#radial-sky)" filter="url(#glow-ambient)" opacity="0.3" />

  <!-- ==================== 3. COURBES VECTORIELLES BÉZIER & REPÈRES DE FOND_HEADER_DESIGNER ==================== -->
  <!-- Courbe élégante qui traverse l'arrière-plan -->
  <g opacity="0.6">
    <path d="M 120,380 C 350,260 580,360 880,280 C 1120,210 1320,290 1580,230" fill="none" stroke="#2DD4BF" stroke-width="2" stroke-dasharray="6,8" stroke-opacity="0.35" />
    <path d="M 50,240 C 320,130 580,270 920,170 C 1180,90 1380,200 1560,130" fill="none" stroke="#ffb1ef" stroke-width="1.5" stroke-opacity="0.4" />

    <!-- Poignées de Bézier interactives -->
    <line x1="920" y1="170" x2="870" y2="120" stroke="#ffb1ef" stroke-width="1.5" />
    <line x1="920" y1="170" x2="970" y2="220" stroke="#ffb1ef" stroke-width="1.5" />
    <circle cx="920" cy="170" r="4.5" fill="#ffb1ef" />
    <circle cx="870" cy="120" r="3" fill="#2DD4BF" />
    <circle cx="970" cy="220" r="3" fill="#2DD4BF" />
  </g>

  <!-- Croix de repère d'alignement (Grid Crosses) du portfolio -->
  <g stroke="#2DD4BF" stroke-opacity="0.3" stroke-width="1.5">
    <path d="M 450,45 L 460,45 M 455,40 L 455,50" />
    <path d="M 1040,40 L 1050,40 M 1045,35 L 1045,45" />
    <path d="M 1120,350 L 1130,350 M 1125,345 L 1125,355" />
  </g>

  <!-- Étoiles à 4 branches (Sparkles) du portfolio -->
  <g fill="#ffb1ef" opacity="0.75">
    <path d="M 980,36 Q 980,43 987,43 Q 980,43 980,50 Q 980,43 973,43 Q 980,43 980,36 Z" />
    <path d="M 1150,65 Q 1150,72 1157,72 Q 1150,72 1150,79 Q 1150,72 1143,72 Q 1150,72 1150,65 Z" />
  </g>
  <g fill="#2DD4BF" opacity="0.75">
    <path d="M 470,350 Q 470,358 478,358 Q 470,358 470,366 Q 470,358 462,358 Q 470,358 470,350 Z" />
    <path d="M 1530,60 Q 1530,68 1538,68 Q 1530,68 1530,76 Q 1530,68 1522,68 Q 1530,68 1530,60 Z" />
  </g>

  <!-- ==================== 4. BLOC DROITE : MOCKUP UI DE FOND_HEADER_DESIGNER ==================== -->
  <!-- Card UI Flottante fidèle à fond_header_designer.svg -->
  <g transform="translate(1220, 48) rotate(-3)" filter="url(#glass-shadow)">
    <!-- Fond de carte avec bordure lumineuse -->
    <rect width="365" height="255" rx="14" fill="url(#card-glass-1)" stroke="#2DD4BF" stroke-opacity="0.3" stroke-width="1.5" />
    
    <!-- Barre de titre fenêtre UI -->
    <rect width="365" height="34" rx="14" fill="#00252e" fill-opacity="0.8" />
    <circle cx="20" cy="17" r="4" fill="#ffb1ef" fill-opacity="0.85" />
    <circle cx="34" cy="17" r="4" fill="#38BDF8" fill-opacity="0.75" />
    <circle cx="48" cy="17" r="4" fill="#2DD4BF" fill-opacity="0.75" />
    <rect x="70" y="10" width="130" height="14" rx="4" fill="#2DD4BF" fill-opacity="0.12" />

    <!-- Sidebar wireframe -->
    <rect x="14" y="46" width="70" height="195" rx="8" fill="#001d24" fill-opacity="0.7" stroke="#2DD4BF" stroke-opacity="0.12" />
    <rect x="22" y="58" width="44" height="7" rx="2.5" fill="#ffb1ef" fill-opacity="0.6" />
    <rect x="22" y="75" width="54" height="5" rx="2" fill="#2DD4BF" fill-opacity="0.4" />
    <rect x="22" y="89" width="46" height="5" rx="2" fill="#38BDF8" fill-opacity="0.3" />
    <rect x="22" y="103" width="50" height="5" rx="2" fill="#2DD4BF" fill-opacity="0.25" />

    <!-- Hero banner wireframe -->
    <rect x="96" y="46" width="255" height="88" rx="8" fill="#00252e" fill-opacity="0.85" stroke="#2DD4BF" stroke-opacity="0.3" />
    <rect x="110" y="60" width="120" height="10" rx="3" fill="#2DD4BF" fill-opacity="0.8" />
    <rect x="110" y="76" width="165" height="6" rx="2" fill="#ffffff" fill-opacity="0.35" />
    <rect x="110" y="87" width="135" height="6" rx="2" fill="#ffffff" fill-opacity="0.22" />
    <rect x="110" y="103" width="68" height="19" rx="5" fill="#2DD4BF" fill-opacity="0.9" />

    <!-- Bento grid miniatures -->
    <rect x="96" y="144" width="78" height="95" rx="8" fill="#001d24" fill-opacity="0.7" stroke="#2DD4BF" stroke-opacity="0.2" />
    <circle cx="116" cy="164" r="8" fill="#ffb1ef" fill-opacity="0.5" />
    <rect x="106" y="180" width="48" height="5" rx="2" fill="#ffffff" fill-opacity="0.35" />

    <rect x="184" y="144" width="78" height="95" rx="8" fill="#001d24" fill-opacity="0.7" stroke="#38BDF8" stroke-opacity="0.2" />
    <rect x="195" y="158" width="56" height="6" rx="2.5" fill="#38BDF8" fill-opacity="0.7" />
    <rect x="195" y="171" width="45" height="5" rx="2" fill="#ffffff" fill-opacity="0.3" />

    <rect x="272" y="144" width="79" height="95" rx="8" fill="#001d24" fill-opacity="0.7" stroke="#ffb1ef" stroke-opacity="0.2" />
    <circle cx="292" cy="164" r="8" fill="#2DD4BF" fill-opacity="0.6" />
    <rect x="282" y="180" width="50" height="5" rx="2" fill="#ffb1ef" fill-opacity="0.6" />
  </g>

  <!-- ==================== 5. CONTENU PRINCIPAL DÉCALÉ POUR PHOTO LINKEDIN ==================== -->
  <!-- Décalé à x=465 pour un espace sécurisé total de 465px sur la gauche de la bannière -->
  <g transform="translate(465, 0)">
    
    <!-- 1. Nom de marque personnelle (Gilroy-Bold : Jessica en blanc, deplanche en rose) -->
    ${pathJessica}
    ${pathDeplanche}

    <!-- 2. Titre Métier Principal Percutant (Gilroy-Bold avec dégradé turquoise) -->
    ${pathRole}

    <!-- 3. Première phrase d'accroche conservée (Gilroy-Medium + Gilroy-Bold) -->
    ${pathTagline1}

    <!-- ==================== 4. LES 4 BOUTONS AVEC "TITRE DESIGNER WEB BAC +2" ==================== -->
    <g transform="translate(0, 246)">
      
      <!-- BOUTON 1 : FIGMA & DESIGN SYSTEM -->
      <g transform="translate(0, 0)" filter="url(#btn-shadow)">
        <rect width="240" height="42" rx="10" fill="#00222a" fill-opacity="0.94" stroke="#2DD4BF" stroke-opacity="0.5" stroke-width="1.2" />
        <!-- Carré arrondi icône 28x28 centré verticalement (y=7) -->
        <g transform="translate(7, 7)">
          <rect width="28" height="28" rx="7" fill="#002d37" stroke="#2DD4BF" stroke-opacity="0.35" stroke-width="1" />
          <g transform="translate(8, 5)">
            <path d="M0,3 A3,3 0 0,1 3,0 L6,0 L6,6 L3,6 A3,3 0 0,1 0,3 Z" fill="#ffb1ef" />
            <path d="M6,0 L9,0 A3,3 0 0,1 12,3 A3,3 0 0,1 9,6 L6,6 Z" fill="#2DD4BF" />
            <path d="M0,9 A3,3 0 0,1 3,6 L6,6 L6,12 L3,12 A3,3 0 0,1 0,9 Z" fill="#38BDF8" />
            <circle cx="9" cy="9" r="3" fill="#2DD4BF" />
            <path d="M0,15 A3,3 0 0,1 3,12 L6,12 L6,15 A3,3 0 0,1 3,18 A3,3 0 0,1 0,15 Z" fill="#2DD4BF" />
          </g>
        </g>
        ${pathBtn1}
      </g>

      <!-- BOUTON 2 : HUBSPOT CMS & HUBL -->
      <g transform="translate(254, 0)" filter="url(#btn-shadow)">
        <rect width="240" height="42" rx="10" fill="#00222a" fill-opacity="0.94" stroke="#ffb1ef" stroke-opacity="0.5" stroke-width="1.2" />
        <!-- Carré arrondi icône 28x28 centré verticalement (y=7) -->
        <g transform="translate(7, 7)">
          <rect width="28" height="28" rx="7" fill="#002d37" stroke="#ffb1ef" stroke-opacity="0.35" stroke-width="1" />
          <circle cx="14" cy="14" r="3.8" fill="none" stroke="#ffb1ef" stroke-width="1.8" />
          <circle cx="14" cy="6" r="2.2" fill="#ffb1ef" />
          <line x1="14" y1="8.2" x2="14" y2="10.2" stroke="#ffb1ef" stroke-width="1.8" />
          <circle cx="21" cy="18" r="2.2" fill="#ffb1ef" />
          <line x1="19.5" y1="16.8" x2="17.2" y2="15.5" stroke="#ffb1ef" stroke-width="1.8" />
          <circle cx="5.5" cy="14" r="2" fill="#ffb1ef" />
          <line x1="7.5" y1="14" x2="10.2" y2="14" stroke="#ffb1ef" stroke-width="1.8" />
        </g>
        ${pathBtn2}
      </g>

      <!-- BOUTON 3 : HTML5 • CSS3 / SASS • JS -->
      <g transform="translate(0, 54)" filter="url(#btn-shadow)">
        <rect width="240" height="42" rx="10" fill="#00222a" fill-opacity="0.94" stroke="#38BDF8" stroke-opacity="0.5" stroke-width="1.2" />
        <!-- Carré arrondi icône 28x28 centré verticalement (y=7) -->
        <g transform="translate(7, 7)">
          <rect width="28" height="28" rx="7" fill="#002d37" stroke="#38BDF8" stroke-opacity="0.35" stroke-width="1" />
          <path d="M 9 9.5 L 5 14 L 9 18.5" fill="none" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 19 9.5 L 23 14 L 19 18.5" fill="none" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <line x1="16" y1="8" x2="12" y2="20" stroke="#38BDF8" stroke-width="1.8" stroke-linecap="round" />
        </g>
        ${pathBtn3}
      </g>

      <!-- BOUTON 4 : TITRE DESIGNER WEB BAC +2 -->
      <g transform="translate(254, 54)" filter="url(#btn-shadow)">
        <rect width="240" height="42" rx="10" fill="#00222a" fill-opacity="0.94" stroke="#2DD4BF" stroke-opacity="0.5" stroke-width="1.2" />
        <!-- Carré arrondi icône 28x28 centré verticalement (y=7) -->
        <g transform="translate(7, 7)">
          <rect width="28" height="28" rx="7" fill="#002d37" stroke="#2DD4BF" stroke-opacity="0.35" stroke-width="1" />
          <polygon points="14,6 23,10.8 14,15.5 5,10.8" fill="#2DD4BF" />
          <path d="M 9 12.8 L 9 17 C 9 19.2 11.2 20.8 14 20.8 C 16.8 20.8 19 19.2 19 17 L 19 12.8" fill="none" stroke="#2DD4BF" stroke-width="1.5" stroke-linecap="round" />
          <path d="M 20.5 11.2 L 22.2 16.5 L 21 17" fill="none" stroke="#ffb1ef" stroke-width="1.3" stroke-linecap="round" />
        </g>
        ${pathBtn4}
      </g>

    </g>

    <!-- Ligne de repère inférieure subtile -->
    <line x1="0" y1="354" x2="680" y2="354" stroke="#2DD4BF" stroke-opacity="0.18" stroke-width="1" stroke-dasharray="4,8" />
  </g>
</svg>`;
}

export async function generateBannerAssets() {
  const svgContent = buildBannerSvg();
  const svgPath = path.join(rootDir, 'assets', 'img', 'banniere_linkedin.svg');
  const pngPath = path.join(rootDir, 'assets', 'img', 'banniere_linkedin.png');

  fs.writeFileSync(svgPath, svgContent);

  const info = await sharp(Buffer.from(svgContent))
    .png({ quality: 100, compressionLevel: 8 })
    .toFile(pngPath);

  console.log('Bannière LinkedIn régénérée avec fond identique au portfolio, 1 phrase et Bac +2 :', info);
  return info;
}

// Auto-run if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateBannerAssets().catch(err => {
    console.error('Erreur génération bannière :', err);
    process.exit(1);
  });
}
