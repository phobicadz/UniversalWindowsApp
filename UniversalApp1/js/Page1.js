angularApp.controller("listViewController", function ($scope, Restangular, $location) {

    var allUsers = Restangular.all('user');

    // listView event handlers
    $scope.itemSelected = function ($event) {
        if ($event.detail != null)  
            var user = Restangular.all('user').get(event.itemIndex);
    };

    $scope.save = function () {
        var newUser = new $scope.user;
        allUsers.post(newUser).then(function (data) {        
            $location.path('/fruit');
        });
    }
    // declare selection array
    $scope.selection = [];

    allUsers.getList().then(function (data) {
        $scope.userlist = data;

        $scope.listdata = new WinJS.Binding.List($scope.userlist);
    });
   
    $scope.Add = function () {
        $location.path ('/new');
    };

  
});

