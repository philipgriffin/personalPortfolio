(function() {
    angular.module('about')
        .component('pgAbout', {
            templateUrl: 'app/about/about.template.html',
            controller: function() {
                this.hello = function() {
                    alert('hello world');
                }
            }
        });
}());