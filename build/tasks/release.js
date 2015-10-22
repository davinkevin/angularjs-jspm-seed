import gulp from "gulp";
import jspm from 'jspm';
import sourcemaps from 'gulp-sourcemaps';
import ngAnnotate from 'gulp-ng-annotate';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import minifyCSS from 'gulp-minify-css';
import runSequence from 'run-sequence';
import del from 'del';
import Builder from 'systemjs-builder';
import paths from '../paths';

gulp.task('build-jspm', function(cal){
  let builder = new Builder();
  builder.loadConfig(paths.systemConfigJs)
    .then(() => {
      builder.buildStatic(paths.app.entryPoint, `${paths.releaseDir}/${paths.appName}.js`, {sourceMaps: true})
        .then(() => cal())
        .catch((ex) => cal(new Error(ex)));
    });
});

gulp.task('build-js', () => {
  return gulp.src(`${paths.releaseDir}/${paths.app.name}.js`)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.releaseDir))
});

gulp.task('build-css', () => {
  return gulp.src(`${paths.releaseDir}/${paths.app.name}.css`)
    .pipe(minifyCSS())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest(paths.releaseDir))
});

gulp.task('build-clean', (cal) => {
  let targets = [
      `${paths.releaseDir}/${paths.appName}.css`,
      `${paths.releaseDir}/${paths.appName}.css.map`,
      `${paths.releaseDir}/${paths.appName}.js`,
      `${paths.releaseDir}/${paths.appName}.js.map`
  ];
  del(targets, cal);
});

gulp.task('build', (cal) => {
  runSequence(
    'build-jspm',
    ['build-js', 'build-css'],
    'build-clean',
    cal);
});
