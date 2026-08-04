/**
 * Re-encodes the source images in public/images in place: caps dimensions to
 * what the layout ever actually renders (see app/globals.css) and re-compresses
 * with mozjpeg, since the originals were saved at near-lossless quality straight
 * out of a camera/export tool. Run with: node scripts/optimize-images.js
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "public", "images");

const jpegJobs = [
  { pattern: /^deal-[1-5]\.jpg$/, maxWidth: 1100, quality: 80 },
  { pattern: /^promo-.*\.jpg$/, maxWidth: 1400, quality: 80 },
  { pattern: /^menu-grid\.jpg$/, maxWidth: 1200, quality: 80 },
  { pattern: /^hero-melts-right\.jpg$/, maxWidth: 2000, quality: 78 },
  { pattern: /^menu-board\.jpg$/, maxWidth: 1800, quality: 84 },
];

async function run() {
  const files = fs.readdirSync(dir);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;
    const before = stat.size;

    const tmpPath = filePath + ".tmp";

    if (file === "logo.png") {
      const buffer = await sharp(filePath)
        .resize(208, 208, { fit: "cover" })
        .png({ compressionLevel: 9, palette: true, quality: 90 })
        .toBuffer();
      fs.writeFileSync(tmpPath, buffer);
      fs.renameSync(tmpPath, filePath);
      const after = buffer.length;
      totalBefore += before;
      totalAfter += after;
      console.log(`${file}\t${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
      continue;
    }

    const job = jpegJobs.find((j) => j.pattern.test(file));
    if (!job) continue;

    const buffer = await sharp(filePath)
      .resize({ width: job.maxWidth, withoutEnlargement: true })
      .jpeg({ quality: job.quality, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(tmpPath, buffer);
    fs.renameSync(tmpPath, filePath);
    const after = buffer.length;
    totalBefore += before;
    totalAfter += after;
    console.log(`${file}\t${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
  }

  console.log(`\nTotal: ${(totalBefore / 1024).toFixed(0)}KB -> ${(totalAfter / 1024).toFixed(0)}KB`);
}

run();
