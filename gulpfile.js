var reloadCount = 0;
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    templateCache = require('gulp-angular-templatecache'),
    clean = require('gulp-clean');
    htmlmin = require('gulp-htmlmin'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    clear = require('clear'),
    browserSync = require('browser-sync').create(),
    babel = require('gulp-babel');

var paths = {
    mainModule: 'personalPortfolio',
    srcIndex: 'src/app/index.html',
    srcJsModules: 'src/**/*.module.js',
    srcJsComponents: 'src/**/*.component.js',
    srcJsDirectives: 'src/**/*.directives.js',
    srcJsConfig: 'src/**/*.component.js',
    srcJsAll: 'src/**/*.js',
    srcTemplates: 'src/**/*.html',
    srcImages: 'src/app/assets/images/**/*',
    srcStyles: ['src/app/*.css'],
    srcData: 'src/app/assets/data/**/*',
    tmpTemplates: '.tmp/templates.js',
    dist: 'dist/',
    distJs: 'dist/scripts/',
    distImages: 'dist/images/',
    distData: 'dist/data/',
    temp:  '.tmp/'
};

var vendorJs = [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/ui-router-extras/release/ct-ui-router-extras.js',
    'bower_components/jquery.vibrate.js/build/jquery/jquery.vibrate.js'
];

// TODO: Update the CDN's
var vendorCSS = [
    'extCSS/animate.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css'
];

// MAIN TASKS

gulp.task('build', ['clear', 'vendorJS', 'vendorCSS', 'scripts', 'html', 'css', 'images', 'data', 'clean'], function(){
    gutil.log(gutil.colors.green('Build - Finished!\n'+ ((reloadCount >= 1) ? 'Reload Count: ' + reloadCount : '')));
    reloadCount++;
});

// SUB TASKS

// Common Tasks:
gulp.task('clear', function () {
    clear();
    gutil.log(gutil.colors.green('Clearing console...'));
});
// End Common Tasks.

// Build Tasks:
gulp.task('scripts', ['templatecache'], function () {
    return gulp.src([
            paths.srcJsModules,
            paths.tmpTemplates,
            paths.srcJsComponents,
            paths.srcJsConfig,
            paths.srcJsAll])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('scripts.js'))
       .pipe(gulp.dest(paths.distJs))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.distJs))
        .on('end', function() {
            gutil.log(gutil.colors.blue('Scripts: Minify | Concat | Rename | > '), gutil.colors.green(paths.dist));
        });
});

gulp.task('vendorJS', function () {
    return gulp.src(vendorJs)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(paths.distJs))
        .on('end', function() {
            gutil.log(gutil.colors.blue('VendorJS: Concat | >'), gutil.colors.green(paths.dist));
        });
});

gulp.task('templatecache', function() {
    return gulp.src(['!src/app/index.html', paths.srcTemplates])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(templateCache({
        module: paths.mainModule,
        standAlone: false
    }))
    .pipe(gulp.dest(paths.temp))
    .on('end', function() {
        gutil.log(gutil.colors.blue('Templates: Minify | Template Cache | >'), gutil.colors.green(paths.temp));
    });
});

gulp.task('html', function() {
    return gulp.src(paths.srcIndex)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.dist))
    .on('end', function() {
        gutil.log(gutil.colors.blue('Html: Minify | >'), gutil.colors.green(paths.dist));
    });
});

gulp.task('clean', ['scripts'], function () {
    return gulp.src(paths.temp)
    .pipe(clean({read: false}))
    .on('end', function() {
        gutil.log(gutil.colors.blue('Clean:'), gutil.colors.red(paths.temp));
    });
});

gulp.task('clean-dist', function () {
    return gulp.src(paths.dist)
        .pipe(clean({read: false}))
        .on('end', function() {
            gutil.log(gutil.colors.blue('Clean:'), gutil.colors.red(paths.dist));
        });
});

gulp.task('images', function () {
    return gulp.src(paths.srcImages)
        .pipe(gulp.dest(paths.distImages))
        .on('end', function() {
            gutil.log(gutil.colors.blue('Images >'), gutil.colors.green(paths.distImages));
        });
});

gulp.task('data', function(){
    return gulp.src(paths.srcData)
        .pipe(gulp.dest(paths.distData))
        .on('end', function() {
            gutil.log(gutil.colors.blue('Data >'), gutil.colors.green(paths.distData));
        })
});

gulp.task('css', function () {
    return gulp.src(paths.srcStyles)
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths.dist))
        .on('end', function() {
            gutil.log(gutil.colors.blue('Styles: Concat | >'), gutil.colors.green(paths.dist));
        });
});

gulp.task('vendorCSS', function () {
    return gulp.src(vendorCSS)
        .pipe(concat('vendor.style.css'))
        .pipe(gulp.dest(paths.dist))
        .on('end', function() {
            gutil.log(gutil.colors.blue('VendorCSS Styles: Concat | >'), gutil.colors.green(paths.dist));
        });
});

// End Build Tasks.

gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
    gulp.watch([
        paths.srcIndex,
        paths.srcTemplates,
        paths.srcJsAll,
        paths.srcStyles,
        paths.srcData], ['buildReload']);
});

//INFO: This was implemented to make browserSync wait for tasks to finish then reload
gulp.task('buildReload', ['build'], function(){
    return gulp.src('')
        .on('end', function() {
            browserSync.reload()
        });
});
