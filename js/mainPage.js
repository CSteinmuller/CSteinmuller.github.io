var lastScrollOrigin = 0;
var screenHeight = window.innerHeight.toString () + "px";
var screenWidth = window.innerWidth.toString () + "px";
var pageIndex = 0;
var muteWheelListener = false;
var codeBox;
var pages;

/******************************************************************************************
**
**  Script Initialization
**
*******************************************************************************************/
window.onload = function () {
    // Initialize page element variables
    codeBox = document.getElementById ("frame_background");

    // Get all pages
    pages = document.getElementsByClassName ('tile_page');

    for (var i = 0; i < pages.length; i++) {
        pages[i].style.top = "100%";
        pages[i].style.zIndex = i + 1;
    }

    pages[0].style.top = "0%";

    // Load code to type
    initializeTyperCode ();
}

window.addEventListener('wheel', function(e) {
    // Scrolled up
    if (e.deltaY < 0 && !muteWheelListener) {
        if (pageIndex != 0) {
            pages [pageIndex].style.top = "100%";
            pageIndex--;

            // Mute future mouse wheel events until the current window has finished expanding
            muteWheelListener = true;
            setTimeout (muteListener, 1000);
        }
    // Scrolled down
    } else if (e.deltaY > 0 && !muteWheelListener) {
        if (pageIndex != (pages.length - 1)) {
            pages [pageIndex + 1].style.top = "0%";
            pageIndex++;

            // Mute future mouse wheel events until the current window has finished expanding
            muteWheelListener = true;
            setTimeout (muteListener, 1000);
        }
    }
});

function muteListener () {
    muteWheelListener = false;
}
