import gulp from "gulp";
import jspm from 'jspm';
import sourcemaps from 'gulp-sourcemaps';
import ngAnnotate from 'gulp-ng-annotate';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cssnano from 'gulp-cssnano';
import inject from 'gulp-inject';
import del from 'del';
import paths from '../paths';
import flatten from 'gulp-flatten';
import replace from 'gulp-replace';
import mkdirp from 'mkdirp';
import cacheBust from 'gulp-cache-bust';
import insert from 'gulp-insert';

import pkg from '../../package.json';
import { sassTask } from './sass';

let prodFiles = ['min.css', 'min.js'].map(ext => `${paths.releaseDir}/${paths.app.name}.${ext}`);
let filesToDelete = ['css', 'css.map', 'js', 'js.map'].map(ext => `${paths.releaseDir}/${paths.app.name}.${ext}`);

gulp.task('build:create-folder', (cal) =>
    mkdirp(paths.release.root, (err) => (err) ?  cal(new Error(err)) : cal())
);

gulp.task('build:jspm', (cb) => {
  new jspm.Builder().buildStatic(paths.app.entryPoint, `${paths.releaseDir}/${paths.app.name}.js`, {sourceMaps: true, format : 'global'})
      .then(() => cb())
      .catch((ex) => cb(new Error(ex)));
});

gulp.task('build:js', () =>
    gulp.src(`${paths.releaseDir}/${paths.app.name}.js`)
        .pipe(insert.prepend(`/*! Version v${pkg.version} */
    `))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(ngAnnotate())
        .pipe(uglify({compress: false, preserveComments : 'some'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.releaseDir))
);

gulp.task('build:css', () =>
    gulp.src(`${paths.releaseDir}/${paths.app.name}.css`)
        .pipe(cssnano())
        .pipe(replace(/url\([^\)]*jspm_packages[^\)]*\/fonts\/([^\)]*)\)/g, 'url(/fonts/$1)'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.releaseDir))
);

gulp.task('build:images', () =>
    gulp.src(paths.glob.images)
        .pipe(gulp.dest(paths.release.images))
);

gulp.task('build:index-html', () => {
  let sources = gulp.src(prodFiles, {read: false});
  return gulp.src(`${paths.srcDir}/index.html`)
      .pipe(inject(sources, {ignorePath: paths.releaseDirName}))
      .pipe(cacheBust())
      .pipe(gulp.dest(paths.releaseDir))
});

gulp.task('build:fonts', () =>
    gulp.src([paths.jspm.fonts, paths.glob.projectFonts, '!' + paths.glob.fonts])
        .pipe(flatten())
        .pipe(gulp.dest(paths.release.fonts))
);

gulp.task('build:pre-clean', (cb) =>
    del([`${paths.releaseDir}/**/*`], cb)
);

gulp.task('build:clean', (cal) =>
    del(filesToDelete, cal)
);

gulp.task('build', gulp.series(
    sassTask,
    'build:create-folder',
    'build:pre-clean',
    'build:jspm',
    gulp.parallel('build:js', 'build:css', 'build:fonts', 'build:images'),
    'build:index-html',
    'build:clean'
));