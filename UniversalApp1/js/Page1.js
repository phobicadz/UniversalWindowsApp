(function () {
    "use strict";

    //var button1 = document.getElementById("MyButton");
    //button1.addEventListener("click", MyButtonClicked, false);
      var page = WinJS.UI.Pages.define("/html/Page1.html", {
        ready: function (element, options) {
        
            ctlDialog.addEventListener("afterhide", DialogDismissed, false);

            listView.addEventListener("selectionchanged", SelectionChanged, false);

            MyButton.addEventListener("click",MyButtonClicked,false);

       //     buttonOK.addEventListener("click", OKButtonClicked, false);
        }
    });

  function DialogDismissed(eventInfo) {
    // find out which button was pressed
    var Disimissal = eventInfo.detail.result;

    // bit of jQuery to set output paragraph
    $("#outputParagraph").html(Disimissal);
    $("#pictureHolder").css('background-image', 'url("")');
}

function SelectionChanged(eventInfo) {

    var lView = $("#listView")[0].winControl;

    lView.selection.getItems().then(function (items) {
        // do something with the selected item
        $("#outputParagraph").html(items[0].data.title);
        $("#pictureHolder").css('background-image', 'url(' + items[0].data.picture + ')');
    });
}

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

    $("#outputParagraph").html("Clicked!");

    var contentDialog = document.querySelector(".win-contentdialog").winControl;
    contentDialog.show();
}

})();