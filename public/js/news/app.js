require.config({
	baseUrl: '/js',
	paths: {
		jquery: 'lib/jquery',
		bootstrap: 'lib/bootstrap',
		angular: 'lib/angular',
		underscore: 'lib/underscore',
		extension: 'lib/extension',
		common: 'lib/common',
		moment: 'lib/moment',
		validator: 'lib/validator',
		backbone: 'lib/backbone',
		pager: 'lib/pager',
		extension: 'lib/extension',
		md5: 'md5',
		'module': 'news'
	},
	shim: {
		'common': ['jquery', 'bootstrap'],
		'validator': ['jquery', 'common'],
		'moment': {
			exports: 'moment'
		},
		'validator': {
			exports: 'validator'
		},
		'bootstrap': ['jquery'],
		'extension': {
			exports: 'extension',
			deps: ['jquery']
		},
		'pager': {
			exports: 'pager'
		}
	}
});

require(['bootstrap', 'validator', 'module/service', 'module/controller', 'module/filter', 'module/editCtrl', 'module/directive'], function() {
	validator.bind();
	angular.module('myApp', ['moduleListCtrl', 'moduleDetailCtrl', 'moduleSvc', 'moduleFilter', 'moduleDirect']);
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['myApp']);
	});
});