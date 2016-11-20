(function () {
    angular.module("development").factory("workList", ["$http",
        function ($http) {
            return {
                getWorkItems: function () {
                    return $http.get("data/worklist/worklist.json").then(function (d) {
                        return d.data;
                    });
                }
            }
        }])
})();