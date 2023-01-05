const gulp = require('gulp');
const htmlMin = require('gulp-htmlmin');
const jsMin = require('gulp-jsmin');
const sass = require('gulp-sass')(require('sass'));
const cssMin = require('gulp-cssmin');
const gulpCopy = require('gulp-copy');

function fnScss() {
    return gulp.src('./css/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
}

function fnCssMin() {
    return gulp.src('./css/*.css')
        .pipe(cssMin())
        .pipe(gulp.dest('dist/css'));
}
function fnCopy() {
    const interval = (startChar, stopChar) => {
        const start = startChar.charCodeAt(0);
        const stop = stopChar.charCodeAt(0);
        const result = [];
        for (let ch = start; ch <= stop; ch++){
            result.push(`./img/menu/${String.fromCharCode(ch)}*`);
        }
        return result;
    }

    const sourceFiles = ['./menu.json', './img/*'];
    const outputPath = './dist/';

    gulp
        .src(sourceFiles)
        .pipe(gulpCopy(outputPath, {}));

    gulp
        .src(interval('a', 'm'))
        .pipe(gulpCopy(outputPath, {}));

    gulp
        .src(interval('n', 'z'))
        .pipe(gulpCopy(outputPath, {}));
}
function fnJsMin() {
    return gulp.src('js/*.js')
        .pipe(jsMin())
        .pipe(gulp.dest('dist/js'));
}

function fnHtmlMin() {
    return gulp.src('*.html')
        .pipe(htmlMin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
}

gulp.task('file-copy', fnCopy);
gulp.task('js-min', fnJsMin);
gulp.task('scss', fnScss);
gulp.task('css-min', fnCssMin);
gulp.task('html-min', fnHtmlMin);

function defaultTask(cb) {
    fnCopy();
    fnScss();
    fnCssMin();
    fnJsMin();
    fnHtmlMin();
    cb();
}

exports.default = defaultTask