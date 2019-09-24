var gulp=require('gulp'), browserSync=require('browser-sync').create(), sass=require('gulp-sass'), autoprefixer=require('gulp-autoprefixer');
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "../Trash"
    });
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("documents/*.html").on('change', browserSync.reload);
    gulp.watch("script/*.js").on('change', browserSync.reload);
});

gulp.task('sass', function() {
  gulp.src('scss/*.scss')
  // gulp.src('../scss/*.scss')
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream());
});
//gulp.task('default', ['serve']);
gulp.task('default', ['serve'],() =>
    gulp.src('css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 10', 'opera 12.1', 'ios 7', 'android 4'],
            cascade: false,
        }))
        .pipe(gulp.dest('css/autoprefixer'))
);