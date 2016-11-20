(function() {
    angular.module('contact')
        .component('pgContact', {
            templateUrl: 'app/contact/contact.template.html',
            controller: function() {
                this.hello = function() {
                    alert('hello world');
                }
            }
        });
}());