import gulp from 'gulp';
import paths from '../paths';
import eslint from 'gulp-eslint';

export const lintJsTask = () => gulp.src([paths.glob.js])
    .pipe(eslint())
    .pipe(eslint.format());

gulp.task('lint-js', lintJsTask);
