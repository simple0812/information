module.exports = function (app) {
	app.use(require('./views'));
	app.use(require('./user'));
	app.use(require('./news'));
	app.use(require('./api'));
	// app.use('/api', require('./api'));
}