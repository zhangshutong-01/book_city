var gulp = require('gulp');
var server = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var mock = require('./data')
    //起服务
gulp.task('server', ['scss'], function() {
    gulp.src('src')
        .pipe(server({
            open: true,
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false
                }
                if (/\/api/g.test(pathname)) {
                    res.end(JSON.stringify(mock(pathname)))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})
gulp.task('scss', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(gulp.dest('src/css'))
})
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['scss'])
})
gulp.task('default', ['watch', 'server'])