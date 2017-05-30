var typerCode = "";     // The code to be read
var typerIndex = 0;     // Letter index within typerCode
var maxIndex;           // The maximum index of typerCode
var letterTiming = 80;  // Time it takes to type 1 character
var typerFile = "typerFile.txt";    // Name of the file containing code to write

/******************************************************************************************
**
**  Script Initialization
**
*******************************************************************************************/
window.onload = function () {
    // Initialize page element variables
    codeBox = document.getElementById ("frame_background");
    
    // Load code to type
    initializeTyperCode ();
}

/*******************************************************************************************
**
**  Load code typer text.
**
**  Requests the code file via HTTP request using file name typerFile. Uses callback
**  initializeTyperCode_handle () to process response.
**
********************************************************************************************/
function initializeTyperCode () {
    // Create new request
    var resp = new XMLHttpRequest ();
    
    // Event trigger on response answer received or timeout
    resp.onreadystatechange = function() {
        // Answer received 
        if (resp.readyState == 4) {
            // Success
            if (resp.status == 200) {
                // Send response text to helper
                initializeTyperCode_handle (resp.responseText);
            // Fail
            } else {
                // Send null (failure) to helper
                initializeTyperCode_handle (null);
            }
        }
    };
    
    // Send request
    resp.open ("GET", typerFile);
    resp.send ();
}
function initializeTyperCode_handle (data) {
    // Check for null input
    if (!data) {
        // Failure; exit
        return;
    }
    
    // Place text into typerCode global
    typerCode = data;
    
    // Start typing the text
    type ();
}

/*******************************************************************************************
**
**  Type out the code file.
**
**  Set up the intervals at which the background will be updated. typeHelper will process
**  and update the innerHTML (text) of the background division element.
**
********************************************************************************************/
function type () {
    // Find the maximum number of characters in code file so as not to go over
    maxIndex = typerCode.length;

    // Set up typeHelper call intervals to be letterTiming, or the timing between each
    // letter being printed
    setInterval (typeHelper, letterTiming);
}
function typeHelper () {
    // Reset character index and blank the window if we go over the maximum
    if (typerIndex >= maxIndex) {
        codeBox.innerHTML = "";
        // Reset to -1 so as to have it = to 0 by the end of this function
        typerIndex = -1;
    }
    
    // Add a line break (</br>) if a newline is found
    if (typerCode [typerIndex] == '\n') {
        codeBox.innerHTML += "</br>";
    // Add a non-breaking space (&nbsp;) if a space is found
    } else if (typerCode [typerIndex] == ' ') {
        codeBox.innerHTML += "&nbsp;";
    // Else: just copy the letter @ typerIndex
    } else {
        codeBox.innerHTML += typerCode [typerIndex];
    }
    typerIndex++;
    
    // Keep division scrolled to the bottom of available scrollbar space
    codeBox.scrollTop = codeBox.scrollHeight;
}