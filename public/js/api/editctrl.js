define([
    'lib/angular'
], function () {
    var moduleDetailCtrl =  angular.module('moduleDetailCtrl', []);
    moduleDetailCtrl.controller('editCtrl',['$scope', '$http', '$window', 'svc', editCtrl]);

    function editCtrl($scope, $http, $window, svc) {
        $scope.model = {
            url : '',
            name : '',
            desc :'',
            params :''
        };

        function initScope() {
            $('.jsonResult').html('');
            $scope.model = {
                url : '',
                name:'',
                desc:'',
                params:'',
            };
        }

        $scope.invoke = function() {
            console.log(1)
            if(!validator.validateAll('#createUserModal')) return;
            console.log(2)

            console.log($scope.model)

            svc.invoke($scope.model).done(function(json) {
                $('.jsonResult').html(JSON.stringify(json, null, 2));

                // $('#createUserModal').modal('hide');
                $('#btnSave').data('save-type', '');
            }).fail(function() {
                $('#createUserModal').modal('hide');
                // $('#btnSave').data('save-type', '');
            });
        };

       
        $('#createUserModal').on('hidden.bs.modal', function (e) {
            initScope();
        })
    }
});