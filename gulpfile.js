// Подключение галп
const gulp = require('gulp');
// Объединение файлов
const concat = require('gulp-concat');
// Добавление префиксов
const autoprefixer = require('gulp-autoprefixer');
// Оптимизация стилей
const cleanCSS = require('gulp-clean-css');
// Оптимизация скриптов
const uglify = require('gulp-uglify');
// Удаление файлов
const del = require('del');
// Синхронизация с браузером
const browserSync = require('browser-sync').create();
// Карта для препроцессоров стилей
const sourcemaps = require('gulp-sourcemaps');
// Препроцессор Sass
const sass = require('gulp-sass');
// Оптимизация изображений
const imagemin = require('gulp-imagemin');
// Добавление в название .min
const rename = require("gulp-rename");

const styleFiles = [
  './src/css/normalize.scss',
  './src/css/jquery-ui.min.scss',
  './src/css/main.scss',
  './src/css/media.scss',
]

const scriptFiles = [
  './src/js/jquery-3.4.1.min.js',
  './src/js/jquery-ui.min.js',
  './src/js/main.js',
]

// Таск на стили CSS
gulp.task('styles', () => {
  return gulp.src(styleFiles)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 version'],
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});

// Таск на скрипты JS
gulp.task('scripts', () => {
  return gulp.src(scriptFiles)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
});

gulp.task('del', () => {
  return del(['build/*'])
});

gulp.task('img-compress', () => {
  return gulp.src('./src/img/**')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./build/img/'));
});

gulp.task('watch', () => {
  browserSync.init({
    server: {
        baseDir: "./"
    }
  });
  gulp.watch('./src/img/**', gulp.series('img-compress'))
  gulp.watch('./src/css/**/*.scss', gulp.series('styles'))
  gulp.watch('./src/js/**/*.js', gulp.series('scripts'))
  gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.series('del', gulp.parallel('styles', 'scripts', 'img-compress'), 'watch'));