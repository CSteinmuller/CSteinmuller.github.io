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
    // Init page element variables
    codeBox = document.getElementById ("frame_background");
    
    // load code to type
    initializeTyperCode ();
    console.log ("Code initialized.");
}

function initializeTyperCode () {
    var resp = new XMLHttpRequest ();
    
    resp.onreadystatechange = function() {
        if (resp.readyState == 4) {
            // The request is done; did it work?
            if (resp.status == 200) {
                // ***Yes, use `resp.responseText` here***
                initializeTyperCode_handle (resp.responseText);
            } else {
                // ***No, tell the callback the call failed***
                initializeTyperCode_handle (null);
            }
        }
    };
    
    resp.open ("GET", typerFile);
    resp.send ();
}

function initializeTyperCode_handle (data) {
    if (!data) {
        return;
    }
    
    typerCode = data;
    
    type ()
}

function type () {
    maxIndex = typerCode.length;

    setInterval (typeHelper, letterTiming);
}
function typeHelper () {
    if (typerIndex >= maxIndex) {
        typerIndex = 0;
    }
    
    if (typerCode [typerIndex] == '\n') {
        codeBox.innerHTML += "</br>";
    } else {
        codeBox.innerHTML += typerCode [typerIndex];
    }
    typerIndex++;
    
    codeBox.scrollTop = codeBox.scrollHeight;
}