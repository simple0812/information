var Q = require('q');
var _ = require('underscore');
var db = require('./db');
exports.retrieve = function() {
	var deferred = Q.defer();
	db.pool.query('select * from userinfo', function(err, rets) {
		if (err) {
			return deferred.reject(err);
		}
		deferred.resolve(rets);

	});

	return deferred.promise;
};

exports.create = function(model) {
	var deferred = Q.defer();
	db.pool.query('call sp_add_userinfo(?, ?)', [model.name, model.age], function(err, rets) {
		if (err) {
			return deferred.reject(err);
		}

		if (rets.length < 2) {
			return deferred.reject('存储过程结果集错误');
		}
		deferred.resolve(rets[0][0]);

	});

	return deferred.promise;
};

exports.update = function(model) {
	var deferred = Q.defer();
	db.pool.query('SELECT * FROM userinfo WHERE id = ?', [model.id], function(err, docs) {
		if (err) {
			return deferred.reject(err);
		}
		if (docs.length <= 0) {
			return deferred.reject('用户信息不存在');
		}
		db.pool.query('call sp_update_userinfo(?, ?, ?)', [model.name, model.age, model.id], function(err, rets) {
			if (err) {
				return deferred.reject(err);
			}
			deferred.resolve(model);
		});
	});


	return deferred.promise;
};

exports.delete = function(idArr) {
	var deferred = Q.defer();
	var p = ',' + idArr.join(',') + ',';

	db.pool.query('call sp_delete_userinfo(?)', p, function(err, rets) {
		if (err) {
			return deferred.reject(err);
		}
		deferred.resolve();
	});

	return deferred.promise;
};