angularApp.controller("listViewController", function ($scope) {

    // listView event handlers
    this.itemSelected = function ($event) {
        
    }

    // declare selection array
    $scope.selection = [];
   
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

    var items = [];

    // Generate 24 items
    for (var i = 0; i < 3; i++) {
        itemArray.forEach(function (item) {
            items.push(item);
        });
    }

    // need to create list as a special binding list
    $scope.listdata = new WinJS.Binding.List(items);
});

