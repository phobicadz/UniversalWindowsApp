
angularApp.controller("optionsController", function ($scope) {

    var optionsController = this;

    optionsController.contentDialogHidden = true;
  
    optionsController.showContentDialog = function () {
        optionsController.contentDialogHidden = false;
    }

});

