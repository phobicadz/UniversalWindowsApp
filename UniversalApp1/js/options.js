(function () {
    "use strict";

    // Sample infrastructure internals
    var currentScenarioUrl = null;

    WinJS.Navigation.addEventListener("navigating", function (evt) {
        currentScenarioUrl = evt.detail.location;
    });

    var lastError, lastStatus;
    WinJS.log = function (message, tag, type) {
        var isError = (type === "error");
        var isStatus = (type === "status");

        if (isError || isStatus) {
            var statusDiv = /* @type(HTMLElement) */ document.getElementById("statusMessage");
            if (statusDiv) {
                statusDiv.innerText = message;
                if (statusDiv.innerText.length > 0) {
                    if (isError) {
                        lastError = message;
                        statusDiv.style.backgroundColor = "red";
                    } else if (isStatus) {
                        lastStatus = message;
                        statusDiv.style.backgroundColor = "green";
                    }
                } else {
                    statusDiv.style.backgroundColor = "";
                }
            }
        }
    };

    var header = WinJS.UI.Pages.define("/html/header.html", {
        processed: function (element, options) {
            return WinJS.Binding.processAll(element);
        }
    });

    // Control that populates and runs the scenario selector
    var ScenarioSelect = WinJS.UI.Pages.define("/html/options.html", {
        ready: function (element, options) {
            var that = this;

            element.addEventListener("selectionchanging", function (evt) {
                if (evt.detail.newSelection.count() === 0) {
                    evt.preventDefault();
                }
            });

            // event listner to change content according to scenario selectio
            element.addEventListener("iteminvoked", function (evt) {
                evt.detail.itemPromise.then(function (item) {
                    that._selectedIndex = item.index;
                    var newUrl = item.data.url;
                    if (currentScenarioUrl !== newUrl) {
                        WinJS.Navigation.navigate(newUrl);
                        var splitView = document.querySelector("#root.win-splitview-openeddisplayoverlay");
                        splitView && splitView.winControl.closePane();
                    }
                });
            });

            element.addEventListener("keyboardnavigating", function (evt) {
                var listview = evt.target.winControl;
                listview.elementFromIndex(evt.detail.newFocus).click();
            });

            this._selectedIndex = 0;

            var lastUrl = WinJS.Application.sessionState.lastUrl;
            MyFirstWUA.scenarios.forEach(function (s, index) {
                s.scenarioNumber = index + 1;
                if (s.url === lastUrl && index !== that._selectedIndex) {
                    that._selectedIndex = index;
                }
            });

            this._listview = element.querySelector(".win-listview").winControl;
            this._listview.selection.set([this._selectedIndex]);
            this._listview.currentItem = { index: this._selectedIndex, hasFocus: true };
        }
    });

    // SDK Sample Test helper
    document.MyFirstWUA = {
        getLastError: function () {
            return lastError;
        },

        getLastStatus: function () {
            return lastStatus;
        },

        selectScenario: function (scenarioID) {
            scenarioID = scenarioID >> 0;
            var scenarioIndex = scenarioID - 1;
            var scenarioControl = document.querySelector("#scenarioControl").winControl;
            scenarioControl.elementFromIndex(scenarioIndex).click();
        }
    };

    var scenarios = [
        { url: "../html/content.html", title: "Show page" },
        { url: "/html/Page1.html", title: "Transition between pages" },
        { url: "/html/enterContent.html", title: "Show content" },
        { url: "/html/transitionContents.html", title: "Transition between content" },
        { url: "/html/expandAndCollapse.html", title: "Expand and collapse" },
        { url: "/html/pointerFeedback.html", title: "Tap and click feedback" },
        { url: "/html/addAndDeleteFromList.html", title: "Add and remove from list" },
        { url: "/html/filterSearchList.html", title: "Filter search list" },
        { url: "/html/fadeInAndOut.html", title: "Fade in and out" },
        { url: "/html/crossfade.html", title: "Crossfade" },
        { url: "/html/reposition.html", title: "Reposition" },
        { url: "/html/dragAndDrop.html", title: "Drag and drop" },
        { url: "/html/dragBetween.html", title: "Drag between to reorder" },
        { url: "/html/showPopupUI.html", title: "Show pop-up UI" },
        { url: "/html/showEdgeUI.html", title: "Show edge UI" },
        { url: "/html/showPanel.html", title: "Show panel" },
        { url: "/html/swipeReveal.html", title: "Reveal ability to swipe" },
        { url: "/html/swipeSelection.html", title: "Swipe select and deselect" },
        { url: "/html/updateBadge.html", title: "Update a badge" },
        { url: "/html/updateTile.html", title: "Update a tile" },
        { url: "/html/customAnimation.html", title: "Run a custom animation" },
        { url: "/html/disableAnimations.html", title: "Disable animations" }
    ];

    WinJS.Namespace.define("MyFirstWUA", {
        scenarios: new WinJS.Binding.List(scenarios)
    });


})();