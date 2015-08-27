// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.launch) {
			if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
			    // TODO: This application has been newly launched. Initialize your application here.
			 
			} else {
				// TODO: This application was suspended and then terminated.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
			}

			args.setPromise(WinJS.UI.processAll().done(function () {

                // Add Events Listeners here
			    var button1 = document.getElementById("MyButton");
			    button1.addEventListener("click", MyButtonClicked, false);

			}));


			//args.setPromise(WinJS.UI.processAll());
		}
	};


	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

   // move this to web api as a test
    var itemArray = [
        { title: "Marvelous Mint", text: "Gelato", picture: "/images/fruits/60Mint.png" },
        { title: "Succulent Strawberry", text: "Sorbet", picture: "/images/fruits/60Strawberry.png" },
        { title: "Banana Blast", text: "Low-fat frozen yogurt", picture: "/images/fruits/60Banana.png" },
        { title: "Lavish Lemon Ice", text: "Sorbet", picture: "/images/fruits/60Lemon.png" },
        { title: "Creamy Orange", text: "Sorbet", picture: "/images/fruits/60Orange.png" },
        { title: "Very Vanilla", text: "Ice Cream", picture: "/images/fruits/60Vanilla.png" },
        { title: "Banana Blast", text: "Low-fat frozen yogurt", picture: "/images/fruits/60Banana.png" },
        { title: "Lavish Lemon Ice", text: "Sorbet", picture: "/images/fruits/60Lemon.png" }
];

    // use this to connect to web apis....http://blogs.msdn.com/b/zkap/archive/2013/10/02/consume-asp-net-web-api-from-html-application-using-winjs-xhr.aspx
   // WinJS.xhr

    var items = [];

    // Generate 160 items
    for (var i = 0; i < 3; i++) {
        itemArray.forEach(function (item) {
            items.push(item);
        });
    }

    WinJS.Namespace.define("Sample.ListView", {
        data: new WinJS.Binding.List(items)
    });


    function MyButtonClicked(eventInfo) {
        document.getElementById("outputParagraph").innerText = "Click!";
        var contentDialog = document.querySelector(".win-contentdialog").winControl;
        contentDialog.show();
    }


    WinJS.UI.processAll();

    app.start();

})();
