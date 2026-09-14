import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imgDir = path.resolve('assets/img');

async function processImages() {
  console.log('Optimisation et génération des formats responsives pour le portfolio...');

  const tasks = [
    {
      source: 'site_mci.jpg',
      variants: [
        { suffix: '-400w.jpg', width: 400, quality: 85 },
        { suffix: '-670w.jpg', width: 670, quality: 85 }
      ]
    },
    {
      source: 'site_prestige.jpg',
      variants: [
        { suffix: '-400w.jpg', width: 400, quality: 85 },
        { suffix: '-670w.jpg', width: 670, quality: 85 }
      ]
    },
    {
      source: 'site_recrutement.jpg',
      variants: [
        { suffix: '-400w.jpg', width: 400, quality: 85 },
        { suffix: '-670w.jpg', width: 670, quality: 85 }
      ]
    },
    {
      source: 'site_acadimmo.jpg',
      variants: [
        { suffix: '-400w.jpg', width: 400, quality: 85 },
        { suffix: '-670w.jpg', width: 670, quality: 85 }
      ]
    },
    {
      source: 'site_playbook.jpg',
      variants: [
        { suffix: '-400w.jpg', width: 400, quality: 85 },
        { suffix: '-670w.jpg', width: 670, quality: 85 }
      ]
    },
    {
      source: 'cover_care_in_yoga.png',
      variants: [
        { suffix: '-400w.jpg', width: 400, quality: 85, toJpg: true },
        { suffix: '-800w.jpg', width: 800, quality: 85, toJpg: true },
        { suffix: '-1200w.jpg', width: 1200, quality: 85, toJpg: true }
      ]
    },
    {
      source: 'profil.png',
      variants: [
        { suffix: '-250w.png', width: 250 },
        { suffix: '-371w.png', width: 371 }
      ]
    }
  ];

  for (const item of tasks) {
    const srcPath = path.join(imgDir, item.source);
    if (!fs.existsSync(srcPath)) {
      console.warn(`Image source introuvable: ${item.source}`);
      continue;
    }

    const baseName = item.source.replace(/\.[^/.]+$/, "");

    for (const v of item.variants) {
      const outPath = path.join(imgDir, `${baseName}${v.suffix}`);
      let pipeline = sharp(srcPath).resize(v.width);

      if (v.toJpg || v.suffix.endsWith('.jpg')) {
        pipeline = pipeline.jpeg({ quality: v.quality || 85, progressive: true });
      } else if (v.suffix.endsWith('.png')) {
        pipeline = pipeline.png({ quality: 90, compressionLevel: 9 });
      }

      await pipeline.toFile(outPath);
      const stat = fs.statSync(outPath);
      console.log(`Généré : ${path.basename(outPath)} (${Math.round(stat.size / 1024)} KB)`);
    }
  }

  console.log('Optimisation des images terminée avec succès !');
}

processImages().catch(err => {
  console.error('Erreur lors de l\'optimisation des images:', err);
  process.exit(1);
});
