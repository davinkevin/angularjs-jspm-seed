import gulp from "gulp";
import jspm from 'jspm';
import sourcemaps from 'gulp-sourcemaps';
import ngAnnotate from 'gulp-ng-annotate';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import minifyCSS from 'gulp-minify-css';
import inject from 'gulp-inject';
import runSequence from 'run-sequence';
import del from 'del';
import paths from '../paths';
import flatten from 'gulp-flatten';
import gzip from 'gulp-gzip';
import '../utils';

let prodFiles = ['css', 'js'].map(ext => `${paths.releaseDir}/${paths.app.name}.min.${ext}`);
let filesToDelete = ['css', 'js']
  .flatMap(ext => [ext, `${ext}.map`, `${ext}.map.gz`, `${ext}.gz`])
  .map(ext => `${paths.releaseDir}/${paths.app.name}.${ext}`);

gulp.task('build-jspm', (cb) => {
  new jspm.Builder().buildStatic(paths.app.entryPoint, `${paths.releaseDir}/${paths.app.name}.js`, {sourceMaps: true})
    .then(() => cb())
    .catch((ex) => cb(new Error(ex)));
});

gulp.task('build-js', () => {
  return gulp.src(`${paths.releaseDir}/${paths.app.name}.js`)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.releaseDir))
    .pipe(gzip())
    .pipe(gulp.dest(paths.releaseDir))
});

gulp.task('build-css', () => {
  return gulp.src(`${paths.releaseDir}/${paths.app.name}.css`)
    .pipe(minifyCSS())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest(paths.releaseDir))
    .pipe(gzip())
    .pipe(gulp.dest(paths.releaseDir))
});

gulp.task('build-index-html', () => {
  let sources = gulp.src(prodFiles, {read: false});
  return gulp.src(`${paths.srcDir}/index.html`)
    .pipe(inject(sources, { ignorePath: paths.releaseDirName }))
    .pipe(gulp.dest(paths.releaseDir))
});

gulp.task('build-fonts', () => {
  gulp.src([paths.jspm.fonts, paths.glob.projectFonts, '!'+paths.glob.fonts])
    .pipe(flatten())
    .pipe(gulp.dest(paths.release.fonts));
});

gulp.task('build-pre-clean', (cb) => {
    return del ([`${paths.releaseDir}/**/*`, `!${paths.releaseDir}/.keep`], cb)
  }
);

gulp.task('build-clean', (cal) => {
  return del(filesToDelete, cal);
});

gulp.task('build', (cal) => {
  return runSequence(
    ['build-pre-clean'],
    'build-jspm',
    ['build-js', 'build-css', 'build-fonts'],
    'build-index-html',
    'build-clean',
    cal);
});
