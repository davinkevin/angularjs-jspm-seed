var gulp = require("gulp"),
    sass = require("gulp-sass");

gulp.task("build-sass", function() {
    gulp.src("./public/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./public"));
});
