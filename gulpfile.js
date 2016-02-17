"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Abre una URL en un navegador
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); // concatena archivos
var lint = require('gulp-eslint'); //Lint JS files, including JSX

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		css: [
      		'node_modules/bootstrap/dist/css/bootstrap.min.css',
      		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    	],
		dist: './dist',
		mainJs: './src/main.js'
	}
}

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',//los archivos de origen en el directorio
		js: './scr/*.js',
		//js: 'src/*.js',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
		],
		dist: './dist',
		mainJs: './src/main.js'
		//mainJs: 'src/main.js'
	}
};

//Start a local development server
//Arranca un servidor de desarrollo
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});//cada vez que cambian los archivos los actualiza en el navegador

//esta tarrea busca a index html y luego abrirlo en el navegador con esta URL
gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

//IR A BUSCAR LOS ARCHIVOS html, los puso en la ruta de destino
//que hemos definido aqui como .dist y finalmente después de que 
//ud haya hecho, recargar utilizando la conexión
gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

//transforma todos los archivos de JSX en un archivo bundle.js
gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

//Valida el código JS
gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

//es un observador que observa los cambios y los refleja 
//directamente en el navegador.
gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});

//pongo en el array las tareas creadas
gulp.task('default', ['html', 'js', 'css', 'lint', 'open', 'watch']);