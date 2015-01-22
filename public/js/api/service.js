define([
    'lib/angular'
], function () {
    var moduleSvc =  angular.module('moduleSvc', []);

    moduleSvc.factory('svc', ['$http', function($http) {
        return {

            invoke: function(model) {
                var def = $.Deferred();
                var promise = def.promise();
                var data = {}
                _.each(model.params, function(item) {
                    data[item.name] = item.value;
                })

                $.ajax({
                    type: model.method.toUpperCase(),
                    url: model.url,
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8"
                }).success(function (json) {
                    def.resolve(json);
                });

                return promise;
            },

            retrieve:function() {
                var def = $.Deferred();
                var promise = def.promise();

                $http.get('/apis', {params : pager.condition}).success(function(json) {
                    if (!json) return def.reject('未知的错误');
                    if (!json.state || json.state == 'error')  return def.reject(json.result);
                    def.resolve(json);
                });

                return promise;
            }
        };
    }])

});