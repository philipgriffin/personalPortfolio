(function() {
    angular.module('header')
        .component('prefixHeader', {
            templateUrl: 'app/header/header.template.html',
            controller: function() {
                this.hello = function() {
                    alert('hello world');
                }
            }
        });
}());