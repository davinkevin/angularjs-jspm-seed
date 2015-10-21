
import gulp from 'gulp';
import util from 'gulp-util';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import modRewrite  from 'connect-modrewrite';

function browerSync(directoryBase, files, browser) {
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

gulp.task('serve', () => {
  return browerSync(['public', './' ]);
});