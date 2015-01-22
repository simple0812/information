var Q = require('q');
var _ = require('underscore');
var db = require('./db');

exports.retrieve = function () {
	var deferred = Q.defer();
	db.pool.query('select n.*, u.name from news n left join userinfo u on n.userid = u.id ', function(err, rets) {
		if(err) return deferred.reject(err);
		deferred.resolve(rets);

	})

	return deferred.promise;
}

exports.create = function(model) {
	var deferred = Q.defer();
	db.pool.query('call sp_add_news(?, ?, ?)', [model.title, model.content, model.userid],  function(err, rets) {
		if(err) return deferred.reject(err);
		
		if(rets.length < 2) return deferred.reject('存储过程结果集错误');
		deferred.resolve(rets[0][0]);
	})

	return deferred.promise;
}

exports.update = function(model) {
	var deferred = Q.defer();
	db.pool.query('call sp_update_news(?, ?, ?)', [model.title, model.content, model.id],  function(err, rets) {
		if(err) return deferred.reject(err);
		deferred.resolve(model);
	})

	return deferred.promise;
}

exports.delete = function(idArr) {
	var deferred = Q.defer();
	var p = "," + idArr.join(',') + ','

	db.pool.query('call sp_delete_news(?)', p,  function(err, rets) {
		if(err) return deferred.reject(err);
		deferred.resolve();
	})

	return deferred.promise;
}