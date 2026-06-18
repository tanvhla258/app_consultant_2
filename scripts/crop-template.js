const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = path.join(__dirname, '..', 'public', 'images', 'template1.webp');
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'sections');

// [name, yStart, yEnd] — estimated from the 640x2999 mockup
const sections = [
  ['01-hero',              0,    410],
  ['02-trusted-partner',   410,  820],
  ['03-stats',             820,  1100],
  ['04-core-services',     1100, 1580],
  ['05-why-trust-us',      1580, 1870],
  ['06-testimonials',      1870, 2250],
  ['07-cpa-team',          2250, 2620],
  ['08-availability',      2620, 2999],
];

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const { width } = await sharp(SRC).metadata();
  for (const [name, top, bottom] of sections) {
    const height = bottom - top;
    const out = path.join(OUT_DIR, `${name}.webp`);
    await sharp(SRC)
      .extract({ left: 0, top, width, height })
      .toFile(out);
    console.log(`${name}.webp  ${width}x${height}`);
  }
})();
