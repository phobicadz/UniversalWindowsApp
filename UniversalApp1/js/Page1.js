angularApp.controller("listViewController", function ($scope, Restangular, $location, $rootScope) {

    // define api object
    var userService = Restangular.all('user');

    // get user data if we haven't already
    if ($rootScope.users == null) {
        userService.getList().then(function (data) {
            $rootScope.users = data;
            // bind to listview
            $scope.listdata = new WinJS.Binding.List($rootScope.users);
        });
    }
    else
    {
        $scope.listdata = new WinJS.Binding.List($rootScope.users);
    }

    // declare selection array
    $scope.selection = [];

    $scope.Add = function () {
        $location.path ('/new');
    };

    $scope.save = function () {
        $rootScope.users.post($scope.user).then(function (user) {
            // add it to the scope on root possibly because two views are sharing same controller
            $rootScope.users.push(user);
            $location.path('/fruit');
        });
    }

    // listView event handlers
    $scope.itemSelected = function ($event) { };
  
});

