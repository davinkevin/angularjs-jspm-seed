import gulp from "gulp";
import sass from "gulp-sass"
import jspm from 'jspm';
import sourcemaps from 'gulp-sourcemaps';
import ngAnnotate from 'gulp-ng-annotate';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import minifyCSS from 'gulp-minify-css';
import runSequence from 'run-sequence';
import del from 'del';

function jspmBuildSfx (baseUrl, configFile, outputName) {
  return new jspm.Builder(baseUrl, `${baseUrl}/${configFile}`).buildStatic('app', `dist/${outputName}.js`, {sourceMaps: true});
}

gulp.task("build-sass", () =>
    gulp.src(['./public/**/*.scss', '!./public/jspm_packages/**/*.scss'])
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest("./public"))
);

gulp.task('build-jspm', function(cal){
  jspmBuildSfx('public', 'system.config.js', 'app').finally(cal);
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
    'build-sass',
    'build-jspm',
    ['build-js', 'build-css'],
    'build-clean',
    cal);
});