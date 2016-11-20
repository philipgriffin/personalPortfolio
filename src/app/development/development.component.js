(function() {
    angular.module('development')
        .component('pgDev', {
            templateUrl: 'app/development/development.template.html',
            controller: function() {
                this.hello = function() {
                    alert('hello world');
                }
            }
        });
}());