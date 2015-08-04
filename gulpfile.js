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
var clean = require('gulp-clean');

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
	return gulp.src(['static/js/lib/require.js'])
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify({
			compress: true
		}))
		.pipe(gulp.dest('static/js/lib/'))
});

gulp.task('copy', function() {
	return gulp.src(['public/**'])
		.pipe(gulp.dest('static/'))

});

gulp.task('filter', ['copy'], function() {
	return gulp.src(['static/js/!(lib)/'])
		.pipe(clean())
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

function adapter(moduleName) {
	rjs({
			name: moduleName +'/app',
			baseUrl: 'public/js/',
			out: 'app.js',
			optimize: "uglify",
			optimizeCss: "standard.keepLines",
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
				'module': moduleName
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
		// .pipe(gulp.dest('public/js/'+ moduleName))
		// .pipe(rename({
		// 	suffix: '.min'
		// }))
		.pipe(uglify({
			compress: true
		}))
		.pipe(gulp.dest('static/js/' + moduleName));
}

gulp.task('rjs', function() {
	['user', 'news'].forEach(adapter);
});

gulp.task("default", ['rjs'], function() {
	console.log('finished default task');
})

gulp.task('watch', function() {
	gulp.watch('public/js/**', ['rjs'])
});