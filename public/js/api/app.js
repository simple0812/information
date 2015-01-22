require.config({
    baseUrl: '/js'
});

require(['lib/validator', 'lib/bootstrap', 'api/service', 'api/controller', 'api/filter', 'api/editCtrl', 'api/directive'], function() {
    validator.bind();
    angular.module('myApp', ['moduleListCtrl', 'moduleDetailCtrl', 'moduleSvc', 'moduleFilter', 'moduleDirect']);
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['myApp']);
    });
})
