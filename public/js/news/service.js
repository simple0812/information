define([
    'lib/angular'
], function () {
    var moduleSvc =  angular.module('moduleSvc', []);

    moduleSvc.factory('svc', ['$http', function($http) {
        return {
            delete: function(ids) {
                var def = $.Deferred();
                var promise = def.promise();

                $.ajax({
                    type: "DELETE",
                    url: "/new",
                    data: JSON.stringify({ids : ids.join(',')}),
                    contentType: "application/json; charset=utf-8"
                }).success(function (json) {
                    if (!json) return def.reject('未知的错误');
                    if (!json.state || json.state == 'error')  return def.reject(json.result);
                    def.resolve();
                });

                return promise;
            },

            update: function(model) {
                var def = $.Deferred();
                var promise = def.promise();
                $http.put('/new', model).success(function(json) {
                    if(!json || json.state == 'error') return def.reject(json?json.result:'未知的错误');
                    def.resolve(json.result);
                });

                return promise;
            },

            create: function(model) {
                var def = $.Deferred();
                var promise = def.promise();
                $http.post('/new', model).success(function(json) {
                    if(!json || json.state == 'error') return def.reject(json?json.result:'未知的错误');
                    def.resolve(json.result);
                });

                return promise;
            },

            retrieve:function() {
                var def = $.Deferred();
                var promise = def.promise();

                $http.get('/news', {params : pager.condition}).success(function(json) {
                    if (!json) return def.reject('未知的错误');
                    if (!json.state || json.state == 'error')  return def.reject(json.result);
                    def.resolve(json);
                });

                return promise;
            }
        };
    }])

});