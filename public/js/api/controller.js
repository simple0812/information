define([
    'lib/angular',
    'lib/extension',
    'lib/underscore',
    'lib/pager'
], function() {
    var moduleListCtrl = angular.module('moduleListCtrl', []);
    moduleListCtrl.controller('modelsCtrl', ['$scope', '$window', 'svc', modelsCtrl]);

    function modelsCtrl($scope, $window, svc) {
        $scope.models = [];

        svc.retrieve().done(function(json) {
            $scope.models = json.result;
            console.log(json.result);
            $('.userList').show();
        });

        $scope.$on('$destroy', function() {
            console.log($scope.models.length + '..')
        });

        $scope.remove = function(scope, obj) {
            if (confirm('确认删除项目吗？')) {
                svc.delete([scope.model.id])
                    .done(function() {
                        $scope.models.removeAt(scope.$index)
                        $scope.$apply();
                    }).fail(function(msg) {
                        common.popBy(obj, msg);
                    });
            }
        };

        $scope.removeModels = function(scope, obj) {
            if ($('.chkItem:checked').length == 0) return common.popBy(obj, '请选择要删除的项目');
            var ids = [];
            $('.chkItem:checked').each(function(i, o) {
                ids.push($(o).val());
            });

            if (confirm('确认删除选中的项目吗？')) {
                svc.delete(ids).done(function() {
                    $scope.models = _.reject($scope.models, function(item) {
                        return ids.indexOf(item.id) != -1;
                    });

                    $scope.$apply();
                    $('#chkAllItems').prop('checked', false);

                }).fail(function(msg) {
                    common.popBy(obj, msg);
                });
            }
        };

        $scope.showEditModal = function(scope, obj) {
            var editScope = $('#createUserModal').scope();

            $('#btnSave').data('save-type', 'edit');
            for (var each in scope.model)
                editScope.model[each] = scope.model[each]
            $('#logoImg').attr('src', scope.model.logo).show();
            $('#createUserModal').modal('show');
        };

        $scope.showCreateModal = function() {
            $('#btnSave').data('save-type', 'create');
            $('#createUserModal').modal('show');
        };

    }
});