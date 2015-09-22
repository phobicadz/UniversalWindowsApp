
angularApp.controller("optionsController", function ($scope, $modal) {


    var socket = io('http://adamandlindsey.co.uk:3000');
    var picker = new Windows.ApplicationModel.Contacts.ContactPicker();
    picker.commitButtonText = "Select";

    function pushAlert(message)
    {
        $scope.alerts.push({ msg: message });
    }

    $scope.popToast = function showToast()
    {
        var notifications = Windows.UI.Notifications;
        var template = notifications.ToastTemplateType.toastImageAndText01;
        var toastXml = notifications.ToastNotificationManager.getTemplateContent(template);
      
        var toastTextElements = toastXml.getElementsByTagName("text");
        toastTextElements[0].appendChild(toastXml.createTextNode("Hi Everybody!"));
        var toastImageElements = toastXml.getElementsByTagName("image");

        toastImageElements[0].setAttribute("src", "https://www.microsoft.com/library/errorpages/Images/20120613_Icon_Windows_jm.png");
        toastImageElements[0].setAttribute("alt", "red graphic");

        var toast = new notifications.ToastNotification(toastXml);

        var toastNotifier = notifications.ToastNotificationManager.createToastNotifier();
        toastNotifier.show(toast);

    }

    $scope.pickContacts = function()
    {
        
            // Create the picker
            var picker = new Windows.ApplicationModel.Contacts.ContactPicker();
            picker.commitButtonText = "Select";
            picker.desiredFieldsWithContactFieldType.append(
                   Windows.ApplicationModel.Contacts.ContactFieldType.Email);

            var emailsPromise = new WinJS.Promise(function (complete, error, progress) {

                // Open the picker for the user to select contacts
                picker.pickContactsAsync().then(function (contacts) {
                    if (contacts.length > 0) {
                        // Iterate through the contacts collection and do something
                        pushAlert(contacts[0].firstName);
                       
                       complete(); // Call complete to exit the promise
                    } else {
                       complete(); // Call complete to exit the promise
                    }
                });
          });

            return emailsPromise;
    }

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

    $scope.contentDialogHidden = true;
  
    $scope.showContentDialog = function () {
        $scope.contentDialogHidden = false;
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

     $scope.send = function()
     {
         socket.emit('chat message', $('#messageText').val());
         $('#messageText').val('');
         return false;
     }

     socket.on('chat message', function (msg) {
         $('#messages').append($('<li>').text(msg));
     });

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

