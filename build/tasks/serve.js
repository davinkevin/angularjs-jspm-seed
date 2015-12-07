import gulp from 'gulp';
import browserSync from 'browser-sync';
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

gulp.task('serve', ['watch'], () => {
  startBrowserSync([paths.srcDir, './']);
});
