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

function jspmBuildSfx (baseUrl, configFile, outputName) {

}

gulp.task('build-jspm', function(cal){
  let builder = new Builder();
  builder.loadConfig(paths.systemConfigJs)
    .then(() => {
      builder.buildStatic(paths.app.entryPoint, `dist/app.js`, {sourceMaps: true})
        .then(() => cal())
        .catch((ex) => cal(new Error(ex)));
    });
});

gulp.task('build-js', () => {
  return gulp.src('dist/app.js')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('build-css', () => {
  return gulp.src('dist/app.css')
    .pipe(minifyCSS())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist'))
});

gulp.task('build-clean', (cal) => {
  del(['./dist/app.css','./dist/app.css.map','./dist/app.js','./dist/app.js.map'], cal);
});

gulp.task('build', (cal) => {
  runSequence(
    'build-jspm',
    ['build-js', 'build-css'],
    'build-clean',
    cal);
});