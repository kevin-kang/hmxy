var gulp = require('gulp'),
    connect = require('gulp-connect'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    copy = require('gulp-copy'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    amdOptimize = require('amd-optimize'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    copyDest = ''; //要拷贝的目录

var destfile = '';

var configPahts = {
    'money': '/js/module/money',
    'verifycreditcard': '/js/module/verifycreditcard',
    'verifyfullname': '/js/module/verifyfullname',
    'fixedIOSActive': '/js/module/fixedIOSActive',
    'clearbtn': '/js/module/clearbtn',
    'mfontsize': '/js/module/mfontsize',
    'goback': '/js/module/goback',
    'js/module/tips': '/js/module/tips'
};


gulp.task('watch', function() { //监听文件变化且自动刷新文件
    var dir = ['*.html', '**/*.{js,scss,css}', '!node_modules/**/*.js'];

    gulp.watch(dir, function(e) {
        destfile = e.path;
        gulp.src(['*.html'])
            .pipe(connect.reload());
    });

    gulp.watch(dir, ['scss', 'copy']);

});

gulp.task('concatjs', function() { //合并requirejs依赖文件到一个文件并压缩 
    return gulp.src('js/**/*.js')
        .pipe(amdOptimize('addcreditcard', {
            paths: configPahts
        }))
        .pipe(concat('addcreditcard.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('js'));
});

gulp.task('uglify', function() {
    return gulp.src(['js/**/*.js'])
        .pipe(uglify().on('error', function(e) {
            console.log(e);
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minifycss', function() {
    return gulp.src(['css/**/*.css'])
        .pipe(minifycss().on('error', function(e) {
            console.log(e);
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('copy', function() {
    if (!copyDest) {
        return false;
    }
    gulp.src(['*', '**'])
        .pipe(copy('../' + copyDest, {
            prefix: 1
        }));
});

gulp.task('scss', function() { //scss文件转css
    console.log(destfile)
    var dir = destfile;

    if (dir.slice(dir.indexOf('.')) !== '.scss') {
        return false;
    }
    gulp.src(['sass/*.scss'])
        .pipe(sass({
            // outputStyle : 'compressed',
            outputStyle: 'compact',
            linefeed: 'cr'
        }).on('error', sass.logError))
        .pipe(gulp.dest('css/'));
});

gulp.task('server', function() { //开启静态服务器 默认端口为：8080
    connect.server({
        port: 8081,
        livereload: true
    });
});

gulp.task('default', function() {
    gulp.start('server', 'watch');
});