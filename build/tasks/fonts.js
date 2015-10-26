import gulp from 'gulp';
import flatten from 'gulp-flatten';

let ext = ['eot', 'woff2', 'woff', 'ttf', 'svg'];

gulp.task('fonts', () =>
    gulp.src(ext.map(ext => `./jspm_packages/**/*.${ext}`))
      .pipe(flatten())
      .pipe(gulp.dest('./public/fonts/'))
);