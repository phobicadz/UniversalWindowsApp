
angularApp.controller("optionsController", function ($scope, $modal) {

    var optionsController = this;

    $scope.usersList = [
       { "firstname": "Adam", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Mabel", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Baxter", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Lindsey", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Adam", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Mabel", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Baxter", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Lindsey", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Adam", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Mabel", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Baxter", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Lindsey", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Adam", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Mabel", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Baxter", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" },
            { "firstname": "Lindsey", "lastname": "Chamberlain", "email": "adam@hotmail.com", "mobile": "07734439905" }
    ];

    optionsController.contentDialogHidden = true;
  
    optionsController.showContentDialog = function () {
        optionsController.contentDialogHidden = false;
    }

    $scope.addAlert = function () {
        $scope.alerts.push({ msg: 'Another alert!' });
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

     $scope.alerts = [
    { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again. Its broke' },
    { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
     ];

     $scope.open = function (size) {

         var modalInstance = $modal.open({
             templateUrl: 'myModalContent.html',
             controller: 'ModalInstanceCtrl',
             size: size,
             resolve: {
                 userList: function () {
                     return $scope.usersList;
                 }
             }
         });

         modalInstance.result.then(function (selectedItem) {
             $scope.selected = selectedItem;
         }, function () {
             $log.info('Modal dismissed at: ' + new Date());
         });
     };

});


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
angularApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, userList) {

    $scope.items = userList;
    $scope.selected = {
        item: $scope.items[0].firstname
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

