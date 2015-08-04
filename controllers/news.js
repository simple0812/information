var jsonHelper = require('../utils/jsonHelper');
var proxy = require('../proxy');

exports.retrieve = function(req, res, next) {
	proxy.News.retrieve().then(function(rets) {
		return res.json(jsonHelper.getSuccess(rets));
	}).fail(function(err) {
		return res.json(jsonHelper.getError(err));
	});
};

exports.create = function(req, res, next) {
	var model = req.body;
	proxy.News.create(model).then(function(doc) {
		return res.json(jsonHelper.getSuccess(doc));
	}).fail(function(err) {
		return res.json(jsonHelper.getError(err));
	});
};

exports.update = function(req, res, next) {
	var model = req.body;
	proxy.News.update(model).then(function(doc) {
		return res.json(jsonHelper.getSuccess(doc));
	}).fail(function(err) {
		return res.json(jsonHelper.getError(err));
	});
};

exports.delete = function(req, res, next) {
	var ids = req.body.ids;
	if (!ids || ids.length <= 0) {
		return res.json(jsonHelper.getError('请选择需要删除的信息的编号'));
	}
	proxy.News.delete(ids.split(',')).then(function() {
		return res.json(jsonHelper.getSuccess('删除成功'));
	}).fail(function(err) {
		return res.json(jsonHelper.getError(err));
	});
};