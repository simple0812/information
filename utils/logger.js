var log4js = require('log4js');
var fs = require('fs');

log4js.configure({
    appenders: [{
        type: 'console'
    }, {
        type: 'file',
        filename: './logs/cheese.log',
        category: 'cheese',
        maxLogSize: 200 * 1024 * 1024
    }]
});

if (!fs.existsSync('./logs'))
    fs.mkdirSync('./logs');

var logger = log4js.getLogger('cheese');
logger.setLevel('error');
logger.log4js = log4js;

module.exports = logger;