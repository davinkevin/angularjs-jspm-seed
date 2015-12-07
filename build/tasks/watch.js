/**
  * one-atlas-explorer
  * Created by kdavin on 01/12/2015.
  */

import gulp from 'gulp';
import browserSync from 'browser-sync';
import paths from '../paths';

gulp.task('watch', ['sass', 'fonts', 'lint-js'], () => {
  gulp.watch(paths.glob.scss,                       ['sass',    browserSync.reload ]);
  gulp.watch(paths.glob.js,                         ['lint-js', browserSync.reload ]);
  gulp.watch([paths.jspm.fonts, paths.glob.fonts],  ['fonts',   browserSync.reload ]);
  gulp.watch(paths.glob.html,                       browserSync.reload);
});