const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notifier = require('node-notifier');

sass.compiler = require('node-sass');

function mySassError(err) {
    console.log(err.messageFormatted);
    notifier.notify({
        title: 'Blad komplilacji SASS',
        message: err.messageFormatted
    });
}

function server(cb) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    cb();
}


function css() {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "expanded" //nested expanded compact compressed
        }).on('error', mySassError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream())
}

function watch() {
    gulp.watch('./scss/**/*.scss', gulp.series(css));
    gulp.watch("./*.html").on('change', browserSync.reload);
}



exports.css = css;
exports.default = gulp.series(css, server, watch, );