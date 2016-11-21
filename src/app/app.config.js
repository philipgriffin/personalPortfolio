(function () {
    angular.module('personalPortfolio')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('about', {
                    sticky: true,
                    url: '/about',
                    template: '<pg-about></pg-about>'
                })

                .state('development', {
                    sticky: true,
                    url: '/work',
                    template: '<pg-dev></pg-dev>'
                })

                .state('contact', {
                    sticky: true,
                    url: '/contact',
                    template: '<pg-contact></pg-contact>'
                });

            $urlRouterProvider.otherwise('/about');
        }]);
})();
