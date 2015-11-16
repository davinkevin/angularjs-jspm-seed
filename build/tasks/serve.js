import gulp from 'gulp';
import util from 'gulp-util';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import modRewrite  from 'connect-modrewrite';
import paths from '../paths';

function startBrowserSync(directoryBase, files, browser) {
  browser = browser === undefined ? 'default' : browser;
  files = files === undefined ? 'default' : files;

  browserSync({
    files: files,
    open: true,
    port: 8000,
    notify: true,
    server: {
      baseDir: directoryBase,
      middleware: [
        modRewrite(['!\\.\\w+$ /index.html [L]']) // require for HTML5 mode
      ]
    },
    browser: browser
  });
}

gulp.task('serve', ['sass', 'fonts', 'lint-js'], () => {

  startBrowserSync([paths.srcDir]);

  gulp.watch(paths.glob.scss,                       ['sass',    browserSync.reload ]);
  gulp.watch(paths.glob.js,                         ['lint-js', browserSync.reload ]);
  gulp.watch([paths.jspm.fonts, paths.glob.fonts],  ['fonts',   browserSync.reload ]);

});
