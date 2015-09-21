angularApp.controller("listViewController", function ($scope, Restangular, $location, $rootScope) {


    function BindList() {
        $scope.listdata = new WinJS.Binding.List($rootScope.users);
    }

    // define api object
    var userService = Restangular.all('user');

    // get user data if we haven't already
    if ($rootScope.users == null) {
        userService.getList().then(function (data) {
            $rootScope.users = data;
            BindList();
        });
    }
    else
    { BindList(); }

  
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

        var index = $event.detail.itemIndex;

        user = $rootScope.users[index];
        user.remove().then(function() {
            $rootScope.users.splice(index, 1);

            // var retVal = window.setImmediate(BindList);

            // remove from listView
            myList.winControl.itemDataSource.list.splice(index, 1);

        });
    };
  
});

