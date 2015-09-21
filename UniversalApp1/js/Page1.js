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
    // delete the item
    $scope.itemSelected = function ($event) {

        user = $rootScope.users[$event.detail.itemIndex];

        user.remove().then(function() {

          $rootScope.users.splice($event.detail.itemIndex, 1);
          $scope.listdata = new WinJS.Binding.List($rootScope.users);

        });

    };
  
});

