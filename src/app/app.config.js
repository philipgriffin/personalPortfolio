(function () {
    angular.module('personalPortfolio')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('about', {
                    url: '/about',
                    template: '<pg-about></pg-about>'
                })

                .state('development', {
                    url: '/work',
                    template: '<pg-dev></pg-dev>'
                })

                .state('contact', {
                    url: '/contact',
                    template: '<pg-contact></pg-contact>'
                });

            $urlRouterProvider.otherwise('/about');
        }]);
})();
