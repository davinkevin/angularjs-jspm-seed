import gulp from 'gulp';
import paths from '../paths';
import eslint from 'gulp-eslint';

gulp.task('lint-js', () => {
  return gulp.src(['public/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});
