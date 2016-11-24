// Component
(function () {
    angular.module('development')
        .component('pgDev', {
            templateUrl: 'app/development/development.template.html',
            controller: ['$uibModal', 'workList', function ($uibModal, workList) {

                workList.getWorkItems().then(d => {
                    this.work = d;
            });
            this.openModal = function(workItem) {
            var modalInstance = $uibModal.open({
            templateUrl: 'app/development/developmentModal.template.html',
            size: 'lg',
            controllerAs: '$ctrl',
            controller: ['$uibModalInstance', function($uibModalInstance) {
                this.work = workItem;

                this.closeModal = function() {
                  $uibModalInstance.dismiss('cancel');
                }
            }]
            });
            }

            }]
        })
}());
