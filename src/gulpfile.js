var gulp          = require('gulp');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var sourcemaps    = require('gulp-sourcemaps');
var browserSync   = require('browser-sync');
var useref        = require('gulp-useref');
var uglify        = require('gulp-uglify');
var gulpIf        = require('gulp-if');
var cssnano       = require('cssnano');
var concat        = require('gulp-concat');
var gutil         = require('gulp-util');
var imagemin      = require('gulp-imagemin');
var cache         = require('gulp-cache');
var del           = require('del');
var runSequence   = require('run-sequence');
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var pug           = require('gulp-pug');

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'build'
    },
    logPrefix: 'Schrodinger-cat-box',
    open: false,
    port: 666
  })
})

gulp.task('sass', function() {
  var processors = [
      autoprefixer,
      cssnano
  ];
  return ugulp.src('src/media/css/style.sass') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) // Passes it through a gulp-sass
    .pipe(postcss(processors))
    .pipe(gulp.dest('static/assets/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

gulp.task('pug', function() {
 
  gulp.src('./src/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }))
});

gulp.task('js', function() {
  return gulp.src('src/media/js/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('main.js'))
      //only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static/assets/js'))
});

// Watchers
gulp.task('watch', function() {
  gulp.watch('src/media/css/**/*.sass', ['sass']);
  gulp.watch('src/media/js/**/*.js', ['js']);
  gulp.watch('src/media/img/**/*.*', ['images']);
})

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function() {
  return gulp.src('src')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('build'));
});

// Optimizing Images 
gulp.task('images', function() {
  return gulp.src('src/media/img/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('static/assets/img'))
});

// Copying fonts 
gulp.task('fonts', function() {
  return gulp.src('src/media/fonts/**/*')
    .pipe(gulp.dest('static/assets/fonts'))
})

// Cleaning 
gulp.task('clean', function() {
  return del.sync('build').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:build', function() {
  return del.sync(['static/assets/**/*', '!static/assets/img', '!static/assets/img/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass', 'js', 'images', 'watch'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:build',
    'sass',
    'js',
    ['useref', 'images', 'fonts'],
    callback
  )
})
