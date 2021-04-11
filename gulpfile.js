var gulp = require("gulp");
var header = require("gulp-header");
var minifyCss = require("gulp-clean-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var { version } = require("./package.json");

let headerText = "/*\n";
headerText += ` * data-table${version ? " "+version : ""}\n`;
headerText += " * (c) 2021 Asher Morgan (MIT)\n";
headerText += " * https://github.com/ashermorgan/data-table\n";
headerText += " */\n";

gulp.task("css", function() {
    return gulp.src("./src/data-table.css")
        .pipe(minifyCss())
        .pipe(rename({suffix: ".min"}))
        .pipe(header(headerText))
        .pipe(gulp.dest("./dist"));
});

gulp.task("js", function() {
    return gulp.src("./src/data-table.js")
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(header(headerText))
        .pipe(gulp.dest("./dist"));
});

gulp.task("default", gulp.series("css", "js"));
