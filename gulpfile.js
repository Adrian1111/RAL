var gulp = require('gulp');
var shorthand = require('gulp-shorthand');
 
gulp.task('default', function () {
    return gulp.src('src/styles.css')
        .pipe(shorthand())
        .pipe(gulp.dest('dest'));
});