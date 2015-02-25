express = require('express');
app = express();
var config = require('./config');
var bodyParser = require('body-parser');

//coffee模版设置
app.set('view engine', 'coffee');
app.engine('coffee', require('kupfilter').__express);

//ejs模版设置
// var partials = require('express-partials');
// app.set('views', "" + __dirname + "/views");
// app.set('view engine', 'ejs');
// var ejs = require('ejs');
// ejs.open = '{{';
// ejs.close = '}}';
// app.set('view options', {
// 	defaultLayout: 'layout'
// });
// app.use(partials());

//中间件设置
app.use(require('morgan')('dev'));


app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(require('cookie-parser')());
app.use(require('cookie-session')({
	secret: 'xish'
}));

//发布的时候要将public的js文件和css文件合并压缩到publish文件
var staticPath = config.DEBUG ? "/public" : "/publish";
app.use(express["static"](__dirname + staticPath));

//日志
var logger = require('./utils/logger');
app.use(logger.log4js.connectLogger(logger, {
	level: 'auto',
	format: ':method :status :url'
}));


require("./routers/")(app);

if (config.DEBUG) {
	app.use(require('errorhandler')());
} else {
	app.use(function(err, req, res, next) {
		return res.status(500).send('500 status');
	});
}

// app.listen(config.PORT, function() {
// 	console.log("listening on port " + config.PORT);
// });

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	require('os').cpus().forEach(function() {
		cluster.fork().on('message', function(msg) {
			console.log(msg);
		});
	});
	cluster.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
	});
	cluster.on('listening', function(worker, address) {
		//console.log("A worker with #" + worker.id + " is now connected to " + address.address + ":" + address.port);
	});
} else {

	app.get('/test', function(req, res) {
		// process.send('msg..................')
		console.log('_______________________')

		res.json({worker : cluster.worker.id})
		// res.end("worker" + cluster.worker.id);
	})

	app.listen(config.PORT, function() {
		console.log('Worker #' + cluster.worker.id + ' make a response');
		console.log("listening on port " + config.PORT);
	});
}