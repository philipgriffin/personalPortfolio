/*
 @desc       TODO
 @example    TODO
 */
(function() {
    angular.module('core')
        .directive('clickVibrate', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                        $(element).vibrate('short');
                }
            };
        });
})();