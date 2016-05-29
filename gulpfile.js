var gulp        = require('gulp');
var harp        = require('harp')
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('serve', function() {
    harp.server(__dirname, {
        port: 9000
    }, function() {
        browserSync.init(   {
            proxy: "localhost:9000",
            open: false
        });

        gulp.watch(["*.ejs", "*.css"]).on("change", function() {
            reload();
        });
    });
});

gulp.task('default', ['serve']);