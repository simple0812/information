var jsonHelper = require('../utils/jsonHelper');
var proxy = require('../proxy');

exports.retrieve = function(req, res, next) {
	proxy.User.retrieve().then(function(rets) {
		return res.json(jsonHelper.getSuccess(rets));
	}).fail(function(err) {
		return res.json(jsonHelper.getError(err));
	});
};

exports.create = function(req, res, next) {
	var user = req.body;
	proxy.User.create(user).then(function(doc) {
		return res.json(jsonHelper.getSuccess(doc));
	}).fail(function(err) {
		return res.json(jsonHelper.getError(err));
	});
};

exports.update = function(req, res, next) {
	var user = req.body;
	proxy.User.update(user).then(function(doc) {
		return res.json(jsonHelper.getSuccess(doc));
	}).fail(function(err) {
		return res.json(jsonHelper.getError(err));
	});
};

exports.delete = function(req, res, next) {
	var ids = req.body.ids;
	if (!ids || ids.length <= 0) {
		return res.json('请选择需要删除的用户');
	}
	proxy.User.delete(ids.split(',')).then(function() {
		return res.json(jsonHelper.getSuccess('删除成功'));
	}).fail(function(err) {
		return res.json(jsonHelper.getError(err));
	});
};