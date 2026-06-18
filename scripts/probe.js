const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const SRC = path.join(__dirname, '..', 'public', 'images', 'template1.webp');
const OUT = path.join(__dirname, '..', 'public', 'images', 'probe');
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const step = 400;
  const total = 2999;
  for (let y = 0; y < total; y += step) {
    const h = Math.min(step, total - y);
    await sharp(SRC).extract({ left: 0, top: y, width: 640, height: h })
      .toFile(path.join(OUT, `y${y}-${y+h}.webp`));
  }
})();
