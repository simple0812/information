var jsonHelper = require('../utils/jsonHelper');
var proxy = require('../proxy');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var fs = require('fs');
var _ = require('underscore');

exports.retrieve = function(req, res, next) {

	fs.readFile('./docs/apidocs.xml', function(err, doc) {
		if (err) {
			return res.json(jsonHelper.getError(err));
		}

		parser.parseString(doc, function(err, json) {

			var p = json.root.element;

			var x = _.map(p, function(each) {
				var t = {};
				t.desc = _.isArray(each.desc) ? each.desc[0] : each.desc;
				t.url = _.isArray(each.url) ? each.url[0] : each.url;
				t.method = _.isArray(each.url) ? each.method[0] : each.method;

				if (each.params && each.params.length) {
					t.params = _.map(each.params[0].field, function(item) {
						for (var xp in item) {
							if (_.isArray(item[xp])) {
								item[xp] = item[xp][0];
							}
						}
						return item;
					});
				} else {
					t.params = [];
				}

				if (each.result && each.result.length) {
					t.result = _.map(each.result[0].field, function(item) {
						for (var xp in item) {
							if (_.isArray(item[xp])) {
								item[xp] = item[xp][0];
							}
						}
						return item;
					});
				} else {
					t.result = [];
				}

				return t;
			});

			return res.json(jsonHelper.getSuccess(x));
		});
	});
};