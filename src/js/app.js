var myApp = angular.module('myApp', []);
myApp.controller('myController', function ($scope, $http, $q, $filter) {

    $scope.games = [];

    $scope.init = function () {
        getData();
    }

    getData = () =>  {
        var file = 'data/games.json';

        $http.get(file)
        .then(function(response) {
            $scope.games = response.data.games;
            $scope.generatePivot();
        });
    };

    $scope.generatePivot = () => {
        
        $scope.data = $scope.games.map(game => game.players);
        var data = [].concat.apply([], $scope.data);

        if ($scope.ui) {
            $("#output").pivotUI(
                data,
                {
                    rows: ["name"],
                    cols: ["position"]
                }
            );
        } else {
            $("#output").pivot(
                data,
                {
                    rows: ["name"],
                    cols: ["position"]
                }
            );
        }

    }

    $scope.init();
});

myApp.filter('toDate', function() {
    return function(items) {
        return new Date(items);
    };
});
