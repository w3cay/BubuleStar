var gulp = require('gulp');
var argv = require('yargs').argv;
var git = require('gulp-git');
var runSequence = require('run-sequence');

gulp.task('init', function() {
    console.log(argv.m);
});

gulp.task('add', function() {
    console.log('添加到暂存区...');
    return gulp.src('.')
        .pipe(git.add());
});

gulp.task('commit', function() {
    console.log('正在提交...');
    if (argv.m) {
        return gulp.src('.')
            .pipe(git.commit(argv.m));
    }
});

gulp.task('pull', function() {
    console.log('正在获取最新代码...');
    git.pull('origin', '', function(err) {
        if (err) throw err;
    });
});

gulp.task('push', function() {
    console.log('正在推送到远程...');
    git.push('origin', 'master', function(err) {
        if (err) {
            throw err
        } else {
            console.log('完成任务')
        };
    });
});

gulp.task('gitsend', function() {
    runSequence('add', 'commit', 'pull', 'push');
});
