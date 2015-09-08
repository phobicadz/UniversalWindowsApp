// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
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

			MyFirstWUA.paneHiddenInitially = window.innerWidth <= 768;

			args.setPromise(WinJS.UI.processAll().done(function () {

                // Add Events Listeners here
			    splitView = document.querySelector("#root").winControl;
			    splitView.onbeforeclose = function () { WinJS.Utilities.addClass(splitView.element, "hiding"); };
			    splitView.onafterclose = function () { WinJS.Utilities.removeClass(splitView.element, "hiding"); };
			    window.addEventListener("resize", handleResize);
			    handleResize();

               //split view buttons hide/show panel
			    var buttons = document.querySelectorAll(".splitViewButton");
			    for (var i = 0, len = buttons.length; i < len; i++) {
			        buttons[i].addEventListener("click", handleSplitViewButton);
			    }

			}));
			//args.setPromise(WinJS.UI.processAll());
		}
	};

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

    // navigating event handler
    function navigating(eventObject) {
        var url = eventObject.detail.location;
        var host = document.getElementById("contentHost");
        // Call unload and dispose methods on current scenario, if any exist
        if (host.winControl) {
            host.winControl.unload && host.winControl.unload();
            host.winControl.dispose && host.winControl.dispose();
        }
        WinJS.Utilities.disposeSubTree(host);
        WinJS.Utilities.empty(host);
        WinJS.log && WinJS.log("", "", "status");

        var p = WinJS.UI.Pages.render(url, host, eventObject.detail.state).
            then(function () {
                var navHistory = nav.history;
                app.sessionState.navigationHistory = {
                    backStack: navHistory.backStack.slice(0),
                    forwardStack: navHistory.forwardStack.slice(0),
                    current: navHistory.current
                };
                app.sessionState.lastUrl = url;
            });
        p.done();
        eventObject.detail.setPromise(p);
    }

    function handleSplitViewButton() {
        splitView.paneOpened = !splitView.paneOpened;
    }

    function handleResize() {
        if (window.innerWidth > 768) {
            splitView.closedDisplayMode = WinJS.UI.SplitView.ClosedDisplayMode.none;
            splitView.openedDisplayMode = WinJS.UI.SplitView.OpenedDisplayMode.inline;
        } else {
            splitView.closedDisplayMode = WinJS.UI.SplitView.ClosedDisplayMode.none;
            splitView.openedDisplayMode = WinJS.UI.SplitView.OpenedDisplayMode.overlay;
            splitView.closePane();
        }
    }

    nav.addEventListener("navigating", navigating);
    WinJS.UI.processAll();

    app.start();

})();
