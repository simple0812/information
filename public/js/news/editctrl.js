define([
    'lib/angular'
], function () {
    var moduleDetailCtrl =  angular.module('moduleDetailCtrl', []);
    moduleDetailCtrl.controller('editCtrl',['$scope', '$http', '$window', 'svc', editCtrl]);

    function editCtrl($scope, $http, $window, svc) {
        $scope.model = {
            name : '',
            age : ''
        };

        function initScope() {
            $scope.model = {
                name : '',
                logo:''
            };
        }

        $scope.save = function() {
            if(!validator.validateAll('#createUserModal')) return;
            var saveType = $('#btnSave').data('save-type');
            if(saveType == 'edit') update();
            else if(saveType == 'create') create();
        };

        function create() {
            svc.create($scope.model).done(function(p) {
                $scope.model.id = p.id
                var scope = $('#user').scope();
                scope.models.push($scope.model);

                $('#createUserModal').modal('hide');
                $('#btnSave').data('save-type', '');
            }).fail(function() {
                $('#createUserModal').modal('hide');
                $('#btnSave').data('save-type', '');
            });

        }

        function update() {
            svc.update($scope.model).done(function() {
                var scope = $('#user').scope();
                var model = _.find(scope.models, function(item) {return item.id == $scope.model.id;});

                for(var each in $scope.model)
                    model[each] = $scope.model[each]

                $('#createUserModal').modal('hide');
                $('#btnSave').data('save-type', '');
            }).fail(function() {
                $('#createUserModal').modal('hide');
                $('#btnSave').data('save-type', '');
            });

        }

        $('#createUserModal').on('hidden.bs.modal', function (e) {
            initScope();
        })
    }
});