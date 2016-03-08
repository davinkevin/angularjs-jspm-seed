import gulp from 'gulp';
import browserSync from 'browser-sync';
import modRewrite  from 'connect-modrewrite';
import paths from '../paths';

function startBrowserSync(directoryBase, files = 'default', browser = 'default', port = 8000, ghostMode = true) {
  browserSync({
    files: files,
    open: true,
    port: port,
    notify: true,
    server: {
      baseDir: directoryBase,
      middleware: [
        modRewrite(['!\\.\\w+$ /index.html [L]']) // require for HTML5 mode
      ]
    },
    browser: browser,
    ghostMode: ghostMode
  });
}

gulp.task('serve', ['watch'], () => {
  startBrowserSync([paths.srcDir, './']);
});
