import gulp from 'gulp';
import sass from 'gulp-sass'
import modifyCssUrl from 'gulp-modify-css-urls';
import paths from '../paths';

let modifyUrlOfFontUrl = {modify : (url) => '/fonts' + url.substr(url.lastIndexOf('/'))};

gulp.task('sass', () =>
    gulp.src(paths.glob.scss)
      .pipe(sass().on('error', sass.logError))
      .pipe(modifyCssUrl(modifyUrlOfFontUrl))
      .pipe(gulp.dest('./public'))
);