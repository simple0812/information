require.config({
	baseUrl: '/js'
});

require(['lib/bootstrap', 'lib/validator', 'news/service', 'news/controller', 'news/filter', 'news/editCtrl', 'news/directive'], function() {
	validator.bind();
	angular.module('myApp', ['moduleListCtrl', 'moduleDetailCtrl', 'moduleSvc', 'moduleFilter', 'moduleDirect']);
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['myApp']);
	});
});