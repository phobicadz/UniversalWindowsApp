angularApp.controller("listViewController", function ($scope, Restangular, $location) {


    // listView event handlers
    $scope.itemSelected = function ($event) { };


    $scope.save = function () {
        Restangular.all('user').post($scope.user).then(function (data) {

            Restangular.all('user').getList().then(function (data) {

                $scope.data = data;

            });


            $location.path('/fruit');
        });
    }

    // declare selection array
    $scope.selection = [];

    Restangular.all('user').getList().then(function (data) {
        $scope.listdata = new WinJS.Binding.List(data);
    });
   
    $scope.Add = function () {
        $location.path ('/new');
    };
  
});

