var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ngAnnotate = require ('gulp-ng-annotate');
var nodemon	= require('gulp-nodemon');

gulp.task('scripts', function() {
	return gulp.src(['./public/app/app.js', './public/app/app.routes.js', './public/app/mainCtrl.js',
		 './public/app/components/**/*.js'])
			.pipe(concat('all.min.js'))
      .pipe(ngAnnotate())
			.pipe(uglify())
			.pipe(gulp.dest('./public/assets/javascript'));
});

gulp.task('default', function() {
	nodemon({ 
		script: 'server.js',
		ext: 'html js',
		tasks: ['scripts']
	})
	.on('restart', function() {
		console.log('restarted!');
	});
});

