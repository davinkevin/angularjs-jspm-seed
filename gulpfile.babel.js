import gulp from "gulp";
import sass from "gulp-sass"
import jspm from 'jspm';
import systemjs from 'systemjs';


gulp.task("build-sass", () =>
    gulp.src(['./public/**/*.scss', '!./public/jspm_packages/**/*.scss'])
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./public"))
);

gulp.task('build', function(){
  let builder = new jspm.Builder('public', 'public/system.config.js');
  return builder.buildStatic('app', 'dist/app.js');
    /*.then(function(output) {
      console.log(output.source);
    });*/


  /*builder.config({baseURL : 'public'});
  return builder.loadConfig('public/system.config.js')
    .then(function() {
        sourceMaps: true
      });
    });*/
});