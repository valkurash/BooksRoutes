const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");

imagemin(["public/images/*.{jpg,png}"], "public/images/tiny", {
  plugins: [
    imageminJpegtran({ progressive: true }),
    imageminMozjpeg({ quality: 5 }),
    imageminPngquant({ quality: "65-80" })
  ]
}).then(files => {
  console.log(files);
  //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
});
