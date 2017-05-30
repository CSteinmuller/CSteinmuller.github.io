var lastScrollOrigin = 0;
var pages = new Array ();
var screenHeight = window.innerHeight.toString () + "px";
var screenWidth = window.innerWidth.toString () + "px";
var pageIndex = 1;

/******************************************************************************************
**
**  Script Initialization
**
*******************************************************************************************/
window.onload = function () {
    // Initialize page element variables
    codeBox = document.getElementById ("frame_background");
    pages[1] = document.getElementById ("page_01");
    pages[2] = document.getElementById ("page_02");
    pages[3] = document.getElementById ("page_03");
    
    pages[1].style.height = screenHeight;
    pages[2].style.height = "0px";
    pages[3].style.height = "0px";
    pages[1].style.transition = "height 1s";
    pages[2].style.transition = "height 1s";
    pages[3].style.transition = "height 1s";
    
    // Load code to type
    initializeTyperCode ();
    
}

window.addEventListener('wheel', function(e) {
    if (e.deltaY < 0) {
        console.log('scrolling up. Index: ' + pageIndex);
        if (pageIndex != 1) {
            pages [pageIndex].style.height = "0px";
            pages [pageIndex - 1].style.height = screenHeight;
            pageIndex--;
        }
    }
    if (e.deltaY > 0) {
        console.log('scrolling down. Index: ' + pageIndex);
        if (pageIndex != 3) {
            pages [pageIndex].style.height = "0px";
            pages [pageIndex + 1].style.height = screenHeight;
            pageIndex++;
        }
    }
});
