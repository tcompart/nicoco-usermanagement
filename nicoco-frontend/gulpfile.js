/*global __dirname*/

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	useref = require('gulp-useref'),
	revReplace = require('gulp-rev-replace'),
	gulpif = require('gulp-if'),
	lazypipe = require('lazypipe'),
	autoprefixer = require('gulp-autoprefixer'),
	runSequence = require('run-sequence'),
	concat = require('gulp-concat'),
	less = require('gulp-less'),
	csso = require('gulp-csso'),
	uglify = require('gulp-uglify'),
	inject = require('gulp-inject'),
	minifyHtml = require('gulp-minify-html'),
	templateCache = require('gulp-angular-templatecache'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	notify = require('gulp-notify'),
	watch = require('gulp-watch');

var image = require('gulp-image');

var bower = require('gulp-bower'),
	wiredep = require('wiredep').stream;

var connect = require('gulp-connect-php'),
	browserSync = require('browser-sync');
	openResource = require('open');

var del = require('del'),
	rev = require('gulp-rev'),
	rename = require('gulp-rename'),
	path = require('path'),
	join = path.join;

var PORT = 9000,
	LIVE_RELOAD = 34823,
	SRC = './src',
	APP_SRC = './src/app',
	APP_TMP = './.tmp',
	APP_DEST = './dist',
	APP_BASE = '/',
	HTML_MIN_OPTS = {empty: true};

/**
 /* ######## UTIL FUNCTIONS ############### */
/**/
function log(msg) {
	gutil.beep();
	if (msg) {
		gutil.log(gutil.colors.green(msg));
	}
	return gutil.noop();
}

function errorLog(msg) {
	gutil.log(gutil.colors.red(msg));


}

/**/
/* ########### BUILD #################### */
/**/
gulp.task('templates', function () {
	return gulp.src(APP_SRC + '/**/*.html')
		.pipe(minifyHtml(HTML_MIN_OPTS))
		.pipe(templateCache({
			filename: 'template.js',
			module: 'nicoco',
			transformUrl: function (url) {
				var start = url.lastIndexOf('/');
				return url.substring(start);
			}
		}))
		.pipe(gulp.dest(APP_SRC + '/templates'));
});

gulp.task('compile-less', ['clean-tmp', 'install-deps'], function () {
	return gulp.src(SRC + "/less/main.less")
		.pipe(plumber({errorHandler: errorLog}))
		.pipe(less({compress: true}))
		.pipe(plumber.stop())
		.pipe(gulp.dest(APP_TMP));
});

gulp.task('inject', ['compile-less'], function () {
	return gulp.src(SRC + '/*.html')
		.pipe(inject(gulp.src([APP_SRC + '/**/*.js', APP_TMP + '/*.css'], {read: false}), {relative: true}))
		.pipe(gulp.dest(SRC));
});

var buildStyles = lazypipe()
	.pipe(plumber, {errorHandler: errorLog})
	.pipe(csso)
	.pipe(autoprefixer)
	.pipe(rev);

function buildScript(name) {
	return lazypipe().pipe(plumber, {errorHandler: errorLog})
		.pipe(sourcemaps.init)
		.pipe(concat, name)
		.pipe(uglify)
		.pipe(sourcemaps.write, './')
		.pipe(rev)
		.pipe(log, "Finished script " + name)();
}


gulp.task('build-assets', ['install-deps', 'templates', 'inject'], function () {
	var assets = useref.assets();
	return gulp.src(SRC + '/*.html')
		.pipe(assets)
		.pipe(gulpif('*.js', sourcemaps.init()))
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.js', rev()))
		.pipe(gulpif('*.css', buildStyles()))
		.pipe(sourcemaps.write('./'))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(revReplace({canonicalUris: false}))
		.pipe(gulp.dest(APP_DEST));
});

gulp.task('install-deps', function () {
	bower();
	return gulp.src(SRC + '/*.html')
		.pipe(wiredep())
		.pipe(gulp.dest(SRC));
});

gulp.task('build-inject.dev', function () {
	var target = gulp.src(SRC + '/*.html');
	return target.pipe(inject(gulp.src(APP_SRC + '/**/*.js', {read: false}), {relative: true}))
		.pipe(inject(gulp.src(APP_DEST + '/**/*.css', {read: false}), {relative: true}))
		.pipe(gulp.dest(SRC));
});

gulp.task('copy', function (done) {
	return gulp.src([SRC + '/*.*', SRC + '/.*', '!' + SRC + '/*.html'])
		.pipe(gulp.dest(APP_DEST));
});

gulp.task('package-images', function (done) {
	return gulp.src(SRC + '/images/**/*.jpg')
		.pipe(image({
			jpegoptim: true
		}))
		.pipe(gulp.dest(APP_DEST + '/images'));
});

gulp.task('build', ['clean'], function (done) {
	runSequence(['build-assets', 'package-images'], 'copy', done);
});


/**/
/* ########### SERVER #################### */
/**/

function serveContent() {
	connect.server({
		port: PORT,
		hostname: 'localhost',
		base: APP_DEST,
		keepalive: false,
		open: true
	});
}

gulp.task('connect-sync', function () {
	connect.server({}, function () {
		browserSync({
			proxy: 'localhost:' + PORT
		});
	});
});

gulp.task('server', ['build'], function (done) {
	watch(join(APP_SRC, '**'), function (file) {
		runSequence('connect-sync', function () {
			gutil.log('Reloading content because of change on file ' + gutil.colors.blue(file));
		});
	});
	serveContent();
});

/**/
/* ########### CLEAN #################### */
/**/
gulp.task('clean-tmp', function () {
	return del(APP_TMP);
});

gulp.task('clean-dist', function () {
	return del(APP_DEST);
});

gulp.task('clean', ['clean-tmp', 'clean-dist'], function () {
});

gulp.task('clean-templateCache', function () {
	return del(APP_SRC + '/templates');
});

gulp.task('clean-modules', function () {
	return del('./node_modules');
});

gulp.task('clean-components', function () {
	return del('./src/components');
});

gulp.task('clean-all', function (done) {
	runSequence(['clean', 'clean-components', 'clean-templateCache', 'clean-modules'], done);
});

gulp.task('default', ['build'], function () {
});
