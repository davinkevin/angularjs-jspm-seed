import gulp from "gulp";
import sass from "gulp-sass"

gulp.task("build-sass", () =>
    gulp.src(['./public/**/*.scss', '!./public/jspm_packages/**/*.scss'])
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./public"))
);
