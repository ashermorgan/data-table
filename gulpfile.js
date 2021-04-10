var gulp = require("gulp");
var minifyCss = require("gulp-clean-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");

gulp.task("css", function() {
    return gulp.src("./src/data-table.css")
        .pipe(minifyCss())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("./dist"));
});

gulp.task("js", function() {
    return gulp.src("./src/data-table.js")
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("./dist"));
});

gulp.task("default", gulp.series("css", "js"));
