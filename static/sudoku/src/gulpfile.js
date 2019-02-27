const gulp = require('gulp')
const less = require('gulp-less')

const webpackTask = gulp.task('webpack', () => {
    const webpack = require('webpack-stream')
    const config = require('./webpack.config.js')
    return gulp.src('./js/**/*.ts')
        .pipe(webpack(config))
        .pipe(gulp.dest('../www/js'))
})

const lessTask = gulp.task('less', () => {
    return gulp.src('./less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('../www/css'))
})

gulp.task('default', gulp.parallel('webpack', 'less'))

gulp.task('watch', () => {
    gulp.watch('less/**/*.less', lessTask)
    gulp.watch('js/**/*.js', webpackTask)
})
