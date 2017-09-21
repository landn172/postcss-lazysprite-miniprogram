const gulp = require('gulp')
const postcss = require('gulp-postcss')
const lazysprite = require('./index.js')
const mocha = require('gulp-mocha')
const sourcemaps = require('gulp-sourcemaps')

const files = ['index.js']
const watchFiles = ['index.js', 'gulpfile.js', 'examples/src/**/**', 'test/src/**/**']

gulp.task('lint', function () {
  const eslint = require('gulp-eslint')
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('examples', function () {
  return gulp.src('examples/*.js', {read: false})
    .pipe(mocha({timeout: 1000000}))
})

gulp.task('htmlcopy', function () {
  return gulp.src(['./examples/src/html/index.html'], {base: './examples/src/html/'})
    .pipe(gulp.dest('./examples/dist/html/'))
})

gulp.task('test', function () {
  return gulp.src('test/*.js', {read: false})
    .pipe(mocha({timeout: 1000000}))
})

gulp.task('css', function () {
  return gulp.src('./examples/src/css/**/*.css')
  // .pipe(sourcemaps.init())
    .pipe(postcss([lazysprite({
      imagePath: './examples/src/slice',
      stylesheetInput: './examples/src/css',
      stylesheetRelative: './examples/dist/css',
      spritePath: './examples/dist/sprites',
      outputExtralCSS: true,
      smartUpdate: true,
      nameSpace: 'icon-',
      logLevel: 'debug'
    })]))
    // .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./examples/dist/css'))
})

gulp.task('default', ['htmlcopy', 'css', 'watch'])

gulp.task('watch', function () {
  // gulp.watch(watchFiles, ['css', 'test', 'lint']);
  gulp.watch(watchFiles, ['css', 'lint'])
})
