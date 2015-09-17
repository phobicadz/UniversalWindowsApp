angularApp.controller('gridController', ['$scope','Restangular','$timeout', function ($scope,Restangular,$timeout) {


    // get all users from rest function
    $scope.usersList = Restangular.all("user").getList().$object;

    $scope.myGrid = {
        enableFullRowSelection: true,
        enableSelectAll: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        showGridFooter: false,
        multiSelect: false,

        columnDefs: [
            { name: 'Firstname', field: 'fname' },
            { name: 'Lastname', field: 'lname' },
            { name: 'Email', field: 'email' }
        ],
        data: 'usersList'    
    };

  
}]);