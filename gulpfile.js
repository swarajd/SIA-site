var gulp        = require('gulp');
var harp        = require('harp')
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');

var devCssPath = "public/";
var prodCssPath = "public/www/";

gulp.task('serve', function() {
    processCss(devCssPath);
    harp.server(__dirname + '/public', {
        port: 9000
    }, function() {
        browserSync.init(   {
            proxy: "localhost:9000",
            open: false
        });

        gulp.watch(["public/**/*.ejs"]).on("change", function() {
            reload();
        });

        gulp.watch("public/style-*.css").on("change", function() {
            processCss(devCssPath);
            reload();
        })
    });
});

gulp.task('build', function() {
    harp.compile(__dirname + '/public', function() {
        var path = require('path');
        var swPrecache = require('sw-precache');
        var rootDir = 'public/www';
        swPrecache.write(path.join(rootDir, 'service-worker.js'), {
            staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,svg,eot,ttf,woff,woff2}'],
            stripPrefix: rootDir,
        }, () => {})
        processCss(prodCssPath);
    })
})

function processCss(path) {
    gulp.src(path + "style-*.css")
        .pipe(concatCss("bundle.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest(path))
}

gulp.task('default', ['serve']);