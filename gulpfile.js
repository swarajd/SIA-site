var gulp        = require('gulp');
var harp        = require('harp')
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('serve', function() {
    harp.server(__dirname + '/public', {
        port: 9000
    }, function() {
        browserSync.init(   {
            proxy: "localhost:9000",
            open: false
        });

        gulp.watch(["public/*.ejs", "public/*.css"]).on("change", function() {
            reload();
        });
    });
});

gulp.task('build', function() {
    harp.compile(__dirname + '/public', function() {
        var path = require('path');
        var swPrecache = require('sw-precache');
        var rootDir = 'public/www';
        swPrecache.write(path.join(rootDir, 'service-worker.js'), {
            staticFileGlobs: [rootDir + '/**/*.{css,png,woff2}'],
            stripPrefix: rootDir,
        }, () => {})
    })
})

gulp.task('default', ['serve']);