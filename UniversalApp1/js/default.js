// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509


// declare an angular module for this page with angular winjs module included
var angularApp = angular.module('main', ['winjs','restangular', 'ngRoute', 'ui.grid', 'ui.grid.selection', 'ui.bootstrap'])


angularApp
    .config(['$routeProvider','RestangularProvider', function ($routeProvider, RestangularProvider) {
        //Setup routes to load partial templates from server. TemplateUrl is the location for the server view (in this case partial html files)
        $routeProvider
       //     .when('/', { templateUrl: '/', controller: 'splitViewController' })
            .when('/fruit', { templateUrl: 'html/Page1.html', controller: 'listViewController' })
            .when('/options', { templateUrl: 'html/options.html', controller: 'optionsController' })
            .when('/grid', { templateUrl: 'html/grid.html', controller: 'gridController' })
            .when('/new', { controller: 'listViewController', templateUrl: 'detail.html' })
            .otherwise({ redirectTo: '/' });

        RestangularProvider.setBaseUrl('http://adamandlindsey.co.uk:7000');
        //   RestangularProvider.setDefaultRequestParams({ apiKey: '4f847ad3e4b08a2eed5f3b54' })

        // needed for mongodb id fields
        RestangularProvider.setRestangularFields({
            id: '_id'
          });

       //  RestangularProvider.setDefaultHttpFields({ cache: false });

        RestangularProvider.setRequestInterceptor(function (elem, operation, what) {

            if (operation === 'put') {
                elem._id = undefined;
                return elem;
            }
            return elem;
        })

    }])
    .controller('RootController', ['$scope', '$route', '$routeParams', '$location', function ($scope, $route, $routeParams, $location) {
        $scope.$on('$routeChangeSuccess', function (e, current, previous) {
            $scope.activeViewPath = $location.path();
        });
    }]);

    angularApp.controller('splitViewController', function ($scope, $location,Restangular) {

        var splitViewController = this;

        splitViewController.toggle = function () {
            $scope.splitViewControl.paneOpened = !$scope.splitViewControl.paneOpened;
        }

        splitViewController.gotoHome = function ()
        {
            $location.path('/fruit');
        }

        splitViewController.gotoOptions = function ()
        {
            $location.path('/options');
        }

         splitViewController.gotoGrid = function ()
         {
             $location.path('/new');
         }

        function resize()
        {
            if (window.innerWidth > 768) {
                $scope.splitViewControl.closedDisplayMode = WinJS.UI.SplitView.ClosedDisplayMode.inline;
                $scope.splitViewControl.openedDisplayMode = WinJS.UI.SplitView.OpenedDisplayMode.inline;
            } else {
                $scope.splitViewControl.closedDisplayMode = WinJS.UI.SplitView.ClosedDisplayMode.inline;
                $scope.splitViewControl.openedDisplayMode = WinJS.UI.SplitView.OpenedDisplayMode.overlay;
                $scope.splitViewControl.closePane();
            } 
        }

        $(window).resize(resize)

    //    resize();

    });

// WinJS Code
(function () {
    "use strict";

	var app = WinJS.Application;
	var nav = WinJS.Navigation;
	var activation = Windows.ApplicationModel.Activation;

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

