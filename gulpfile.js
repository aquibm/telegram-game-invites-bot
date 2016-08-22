const gulp = require('gulp');
const ts = require('gulp-typescript');
const copy = require('gulp-copy');

var config = {
    src: './src/**/*.ts',
    outFile: 'invitesBot.js',
    dist: './dist',
    assets: [
        './src/keys.json',
        './src/users.json'
    ]
};

gulp.task('compile', () => {
    gulp.src(config.src)
        .pipe(ts({
            out: config.outFile
        }))
        .pipe(
            gulp.dest(config.dist)
        );
});

gulp.task('copyAssets', () => {
    gulp.src(config.assets)
        .pipe(
            copy(config.dist, {
                prefix: 1
            })
        );
});

gulp.task('watch', () => {
    gulp.watch(config.src, ['compile', 'copyAssets']);
});

gulp.task('default', ['compile', 'copyAssets', 'watch']);
