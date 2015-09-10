// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509


// declare an angular module for this page with angular winjs module included
var appRoot =  angular.module('main', ['winjs']);   

appRoot.controller('splitViewController', function ($scope) {

        var splitViewController = this;

        splitViewController.toggle = function () {
            $scope.splitViewControl.paneOpened = !$scope.splitViewControl.paneOpened;
        }

      //  $scope.splitViewControl.onbeforeclose = function () { WinJS.Utilities.addClass($scope.splitViewControl.element, "hiding"); };
      //  $scope.splitViewControl.onafterclose = function () { WinJS.Utilities.removeClass($scope.splitViewControl.element, "hiding"); };

        splitViewController.gotoHome = function ()
        {
            // Change the view here...
        }

        //function handleResize() {
        //    if (window.innerWidth > 768) {
        //        splitView.closedDisplayMode = WinJS.UI.SplitView.ClosedDisplayMode.none;
        //        splitView.openedDisplayMode = WinJS.UI.SplitView.OpenedDisplayMode.inline;
        //    } else {
        //        splitView.closedDisplayMode = WinJS.UI.SplitView.ClosedDisplayMode.none;
        //        splitView.openedDisplayMode = WinJS.UI.SplitView.OpenedDisplayMode.overlay;
        //        splitView.closePane();
        //    }
        //}

    });

// WinJS Code
(function () {
    "use strict";

	var app = WinJS.Application;
	var nav = WinJS.Navigation;
	var activation = Windows.ApplicationModel.Activation;
	var splitView;

    // define page variables ???
	WinJS.Namespace.define("MyFirstWUA", {
	    paneHiddenInitially: false
	});

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.launch) {
			if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
			    // TODO: This application has been newly launched. Initialize your application here.
			 
			} else {
				// TODO: This application was suspended and then terminated.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
			}
			args.setPromise(WinJS.UI.processAll());
		}
	};

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

    WinJS.UI.processAll();

    app.start();

})();

