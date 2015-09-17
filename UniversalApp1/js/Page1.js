angularApp.controller("listViewController", function ($scope, Restangular,$timeout) {

    // listView event handlers
    this.itemSelected = function ($event) {
        }

    // declare selection array
    $scope.selection = [];


    $scope.users = new Restangular.all("user").getList().$object;
   
    // wait for API to finish
    // need to create list as a special binding list
    $timeout(function () {
        $scope.listdata = new WinJS.Binding.List($scope.users);
    });
    
});

