const Jimp = require('jimp');
const path = require('path');

const image_path = (filename) => {
  return path.join(__dirname, "/../uploads/images/", filename);
}

const wm_image_path = (filename) => {
  return path.join(__dirname, "/../uploads/", filename);
}

const makePaths = (rows) => {
  rows.forEach((row, i) => {
    rows[i].image_filename = `/uploads/${row.image_filename}`;
  });
  return rows;
}

async function waterMark(src, dest) {
  const image = await Jimp.read(src);
  const watermark = await Jimp.read('./resources/watermarking.png');

  image.composite(watermark, 0, 0, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacityDest: 1,
    opacitySource: .95
  })

  await image.writeAsync(dest);
}

module.exports = {
  image_path: image_path,
  wm_image_path: wm_image_path,
  waterMark: waterMark,
  makePaths: makePaths,
}