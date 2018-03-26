const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg'); // need to run 'brew install libpng'
const imageminGiflossy = require('imagemin-giflossy');

gulp.task('esketit', () =>
  gulp.src(['src/**/*.{gif,png,jpg,jpeg,svg}'])
    .pipe(imagemin([
    // png
      imageminPngquant({
        speed: 1,
        quality: 98 // lossy settings
      }),
      imageminZopfli({
        more: true
      }),
      imageminGiflossy({
        optimizationLevel: 3,
        optimize: 3, // keep-empty: Preserve empty transparent frames
        lossy: 2
      }),
      // svg
      imagemin.svgo({
        plugins: [
          {
            cleanupListOfValues: true
          },
          {
            sortAttrs: true
          }
        ]
      }),
      // jpg lossless
      imagemin.jpegtran({
        progressive: true
      }),
      // jpg very light lossy, use vs jpegtran
      imageminMozjpeg({
        quality: 90
      })
    ]))
    .pipe(gulp.dest('dist'))
);
