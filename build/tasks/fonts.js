import gulp from 'gulp';
import flatten from 'gulp-flatten';
import paths from '../paths';

export const fontsTask = () => gulp.src([paths.jspm.fonts, paths.glob.projectFonts, '!'+paths.glob.fonts])
    .pipe(flatten())
    .pipe(gulp.dest('./public/fonts/'));

gulp.task('fonts', fontsTask);