var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var jasmine = require('gulp-jasmine');

var rjs = require('gulp-requirejs');

//服务端语法检测
gulp.task('jshint', function() {
	return gulp.src(['controllers/*.js', 'models/*.js', 'proxy/*.js', 'utils/*.js'])
		.pipe(plugins.jshint(require('./jshintConf')))
		.pipe(plugins.jshint.reporter('default'));
});

//jasmine
gulp.task('jasmine', function() {
	return gulp.src('test/*.js')
		.pipe(jasmine({
			// reporter: new reporters.JUnitXmlReporter()
		}));
})


//客户端操作
gulp.task('minjs', function() {
	return gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dest/js/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify({
			compress: true
		}))
		.pipe(gulp.dest('dest/js/'))
});

gulp.task('css', function() {
	return gulp.src('src/css/main.scss')
		.pipe(sass('src/css/main.css', {
			style: 'expanded'
		}))
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest('dest/css/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('dest/css/'))
});

gulp.task('rjs', function() {
	rjs({
			name: 'user/app',
			baseUrl: 'public/js/',
			out: 'user.js',
			paths: {
				jquery: 'lib/jquery',
				bootstrap: 'lib/bootstrap',
				angular: 'lib/angular',
				underscore: 'lib/underscore',
				extension: 'lib/extension',
				common: 'lib/common',
				moment: 'lib/moment',
				validator: 'lib/validator',
				backbone: 'lib/backbone',
				pager: 'lib/pager',
				extension: 'lib/extension',
				md5: 'md5',
				'module': 'user'
			},
			shim: {
				'common': ['jquery', 'bootstrap'],
				'validator': ['jquery', 'common'],
				'moment': {
					exports: 'moment'
				},
				'validator': {
					exports: 'validator'
				},
				'bootstrap': ['jquery'],
				'extension': {
					exports: 'extension',
					deps: ['jquery']
				},
				'pager': {
					exports: 'pager'
				}
			}
		})
		.pipe(gulp.dest('publish/js/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify({
			compress: true
		}))
		.pipe(gulp.dest('publish/js/'));
});

gulp.task("default", ['rjs'], function() {
	console.log('finished default task');
})

gulp.task('watch', function() {
	gulp.watch('src/js/*.js', ['hint', 'js'])
});