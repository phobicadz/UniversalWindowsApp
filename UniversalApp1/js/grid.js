angularApp.controller('gridController', function ($scope) {

    $scope.usersList = [];
    $scope.usersList = [
        { firstname: 'Adam', lastname: 'Chamberlain', email: 'adam@hotmail.com', mobile: '07734439905' },
        { firstname: 'Mabel', lastname: 'Chamberlain', email: 'adam@hotmail.com', mobile: '07734439905' },
        { firstname: 'Lindsey', lastname: 'Chamberlain', email: 'adam@hotmail.com', mobile: '07734439905' },
        { firstname: 'Baxter', lastname: 'Chamberlain', email: 'adam@hotmail.com', mobile: '07734439905' }
    ];

    $scope.userGrid = {
        data: 'usersList',
        multiSelect: false,
        enableColumnResize: true,
        columnDefs: [
            { field: 'firstname', displayName: 'First Name', width: '25%' },
            { field: 'lastname', displayName: 'Last Name', width: '25%' },
            { field: 'email', displayName: 'Email', width: '25%' },
            { field: 'mobile', displayName: 'Mobile Number', width: '25%' }
        ]
    };

});