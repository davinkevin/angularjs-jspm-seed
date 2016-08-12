/**
  * one-atlas-explorer
  * Created by kdavin on 01/12/2015.
  */

import gulp from 'gulp';
import browserSync from 'browser-sync';
import paths from '../paths';
import { sassTask } from './sass';
import { fontsTask } from './fonts';
import { lintJsTask } from './lint';


const reloadBrower = (done) => {
  browserSync.reload();
  done();
};

export const watchTask = gulp.series(sassTask, fontsTask, lintJsTask, function watchFiles(done) {
  gulp.watch(paths.glob.scss,                       gulp.series(sassTask,   reloadBrower) );
  gulp.watch(paths.glob.js,                         gulp.series(lintJsTask, reloadBrower) );
  gulp.watch([paths.jspm.fonts, paths.glob.fonts],  gulp.series(fontsTask,  reloadBrower) );
  gulp.watch(paths.glob.html,                       gulp.series(reloadBrower));
  done();
});

gulp.task('watch', watchTask);
