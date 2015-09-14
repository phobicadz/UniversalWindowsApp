angularApp.controller('gridController', ['$scope', function ($scope) {


    //$scope.usersList = [];
    $scope.usersList = [
       { "firstname": "Adam", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Mabel", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Baxter", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Lindsey", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" }
    ];


    $scope.myGrid = {
        enableSorting: true,
        enableRowSelection: true,
        selectionRowHeaderWidth: '35',
        rowHeight: '35',
        showGridFooter: true,
        columnDefs: [
            { name: 'Firstname', field: 'firstname' },
            { name: 'Lastname', field: 'lastname' },
            { name: 'Email', field: 'email' },
            { name: 'Mobile', field: 'mobile' }
        ],
        data: 'usersList'    
    };

}]);