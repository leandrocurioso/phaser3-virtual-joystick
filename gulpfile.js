const Path = require("path");
const Gulp = require("gulp");
const Concat = require("gulp-concat");
const SourceMaps = require("gulp-sourcemaps");
const MinifyCss = require("gulp-minify-css");
const GulpWatch = require("gulp-watch");

const ENV = { BASE_URL: Path.join(__dirname) };
ENV.CSS_FILENAME = "style.css";
ENV.CSS_FILENAME_MINIFIED = "style.min.css";
ENV.BASE_URL_ORIGIN_FOLDER_CSS = Path.join(ENV.BASE_URL, "src", "css");
ENV.BASE_URL_DESTINATION_FOLDER_CSS = Path.join(ENV.BASE_URL, "public", "css");
ENV.FILEPATH_ORIGIN_CSS = Path.join(ENV.BASE_URL_ORIGIN_FOLDER_CSS, ENV.CSS_FILENAME);
ENV.FILEPATH_DESTINATION_CSS = Path.join(ENV.BASE_URL_DESTINATION_FOLDER_CSS, ENV.CSS_FILENAME_MINIFIED);

Gulp.task("minify-css", () => {
    return Gulp.src(
    [
        ENV.FILEPATH_ORIGIN_CSS
    ])
    //.pipe(SourceMaps.init())
    .pipe(MinifyCss({ compatibility: "ie8" }))
    .pipe(Concat({ path: ENV.CSS_FILENAME_MINIFIED }))
    .pipe(SourceMaps.write("."))
    .pipe(Gulp.dest(ENV.BASE_URL_DESTINATION_FOLDER_CSS));
});

Gulp.task("watch-minify-css", ()  => {
    return GulpWatch(ENV.FILEPATH_ORIGIN_CSS, 
    { 
        ignoreInitial: false,
        verbose: true
     },
     () => {
        Gulp.src(ENV.FILEPATH_ORIGIN_CSS)
            // .pipe(SourceMaps.init())
            .pipe(MinifyCss({ compatibility: "ie8" }))
            .pipe(Concat({ path: ENV.CSS_FILENAME_MINIFIED }))
            .pipe(SourceMaps.write("."))
            .pipe(Gulp.dest(ENV.BASE_URL_DESTINATION_FOLDER_CSS))
        });
});
