//创建连接池
var  config = require('../config');
exports.pool = require('mysql').createPool(config.DB_SETTING);
// exports.cache = require("redis").createClient();

