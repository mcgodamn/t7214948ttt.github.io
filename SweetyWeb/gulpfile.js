let gulp = require("gulp");
let uglify = require('gulp-uglify-es').default;
 
gulp.task("uglify", function () {
    return gulp.src('Scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('Scripts/minify'));
});