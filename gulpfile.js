var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ngAnnotate = require ('gulp-ng-annotate');
var nodemon	= require('gulp-nodemon');
var gulpIgnore = require('gulp-ignore');

gulp.task('scripts', function() {
	return gulp.src([
		 './public/app/socket.min.js',
		 './public/app/app.module.js',
		 './public/app/app.routes.js', './public/app/mainCtrl.js',
		 './public/app/components/**/*Service.js', 	 
		 './public/app/components/**/*Ctrl.js',
		 '!./public/app/components/**/*Spec.js', 
		 './public/app/app.config.js'])
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

