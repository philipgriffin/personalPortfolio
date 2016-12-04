(function() {
    angular.module('header')
        .component('pgHeader', {
            templateUrl: 'app/header/header.template.html',
            controller: ['$uibModal', function ($uibModal) {
            this.openModal = function() {
            var modalInstance = $uibModal.open({
            templateUrl: 'app/header/headerModal.template.html',
            size: 'lg',
            controllerAs: '$ctrl',
            controller: ['$uibModalInstance', function($uibModalInstance) {

                this.closeModal = function() {
                  $uibModalInstance.dismiss('cancel');
                }
            }]
            });
            }

            }]
        });
}());
