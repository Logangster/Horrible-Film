var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ngAnnotate = require ('gulp-ng-annotate');

gulp.task('scripts', function() {
	return gulp.src(['./public/app/*.js', './public/app/services/*.js',
			'./public/app/controllers/*.js', './public/app/controllers/**/*.js'])
			.pipe(concat('all.min.js'))
      .pipe(ngAnnotate())
			.pipe(uglify())
			.pipe(gulp.dest('./public/assets/javascript'));
});

gulp.task('default', ['scripts']);
