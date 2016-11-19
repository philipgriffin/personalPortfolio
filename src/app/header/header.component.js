(function() {
    angular.module('header')
        .component('pgHeader', {
            templateUrl: 'app/header/header.template.html',
            controller: function() {
                this.hello = function() {
                    alert('hello world');
                }
            }
        });
}());