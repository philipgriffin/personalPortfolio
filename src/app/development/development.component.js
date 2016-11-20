// Component
(function () {
    angular.module('development')
        .component('pgDev', {
            templateUrl: 'app/development/development.template.html',
            controller: ['workList', function (workList) {
                workList.getWorkItems().then(d => {
                    this.work = d.test;
            });
            }]
        })
}());
