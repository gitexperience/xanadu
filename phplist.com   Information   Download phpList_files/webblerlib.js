
/* generic JS library for frontend pages */


// HTTPObject (Ajax)

function getHTTPObject() {
  var xhr = false;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch(e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch(e) {
        xhr = false;
      }
    }
  }
  return xhr;
}

function clearErrors(){
  if (!document.getElementById("searchError")) return false;
  if (document.getElementById("searchError").firstChild == null) return false;
  var getError = document.getElementById("searchError");
  var getSpan = getError.firstChild;
  getError.removeChild(getSpan);
}

/* Search */

function quickSearchSubmit(){
  // check first if the quick search form exists
  if (!document.getElementById("search")) return false;
  if (!document.forms["search"]) return false;
  document.forms["search"].onsubmit = checkSearch;
  return true;
}


function checkSearch(){
  if(this.query.value == this.query.defaultValue){
    if (!document.getElementById("searchError")){
      alert("Please enter a search term");
      return false;
  } else {
    clearErrors();
    var errorSpan = document.createElement("span");
    var errorID = document.getElementById("searchError");
    errorID.appendChild(errorSpan);
    var errorMessage = document.createTextNode("Please enter a search term");
    errorSpan.appendChild(errorMessage);

    // yellow fade technique
    fadeUpTextback();
    return false;
  }
    } else {
      clearErrors();
      return true;
    }
}

//Get elements by classname function

document.getElementsByClassName = function(name) {
  var results = new Array();
  var elems = document.getElementsByTagName("*");
  for (var i=0; i<elems.length; i++) {
    if (elems[i].className.indexOf(name) != -1) {
      results[results.length] = elems[i];
    }
  }
  return results;
};



/************* FORMS clearing Stuff ************/

/* google maps messes about with window.onload, so it should load last */

var LoadWebblerEvents = Array();
var LoadGoogleEvents = Array();
var GoogleDone = false;

function addWebblerGoogleLoadEvent(func) {
  LoadGoogleEvents.push(func);
}

function loadGoogle() {
  if (GoogleDone) return;
  for (var i = 0;i<LoadGoogleEvents.length;i++) {
    LoadGoogleEvents[i]();
  }
  GoogleDone = true;
}

function addWebblerUnloadEvent(func) {
}

function addWebblerLoadEvent(func) {
  if (typeof(func) == "undefined") return;
  LoadWebblerEvents.push(func);
}

function WebblerLoad() {
  for (var i = 0;i<LoadWebblerEvents.length;i++) {
    LoadWebblerEvents[i]();
  }
  loadGoogle();
}

// Resets Form items to preset text

function resetFields(whichform) {
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.type == "submit") continue;
    if (element.type == "img") continue;
    if (element.type == "radio") continue;
    if (element.type == "hidden") continue;
    if (!element.defaultValue) continue;
    if (element.className.match("autoclear")) {
      element.onfocus = function() {
        if (this.value == this.defaultValue) {
          this.value = "";
        }
      }
      element.onblur = function() {
        if (this.value == "") {
          this.value = this.defaultValue;
        }
      }
    } else if (element.className.match("autoselect")) {
      element.onfocus = function() {
        if (this.value == this.defaultValue) {
          this.select();
        }
      }
      element.onblur = function() {
        if (this.value == "") {
          this.value = this.defaultValue;
        }
      }
    }
  }
}

function prepareForms() {
  for (var i=0; i<document.forms.length; i++) {
    var thisform = document.forms[i];
    resetFields(thisform);
  }
}

//
// Fade-up higlighted text and error messages

function fadeUp(element,red,green,blue) {
  if (element.fade) {
    clearTimeout(element.fade);
  }
  if (red == 255 && green == 255 && blue == 255) {
    element.style.backgroundColor = "transparent";
    return;
  }
  var newred = red + Math.ceil((255 - red)/10);
  var newgreen = green + Math.ceil((255 - green)/10);
  var newblue = blue + Math.ceil((255 - blue)/10);
  element.style.backgroundColor = "rgb("+newred+","+newgreen+","+newblue+")";
  element.fade = setTimeout(function() { fadeUp(element,newred,newgreen,newblue) },100);
}
function fadeUpTextback() {
  var feedback = document.getElementsByClassName("fadeup");
  for (var i=0 ; i<feedback.length; i++) {
    fadeUp(feedback[i],255,255,115);
  }
}

function addPrintLink() {
  if (!document.getElementById || !document.createTextNode) {return;}
  if (!document.getElementById("print-link")) {return;}
  if (!window.print) {return;}
  var linkTarget = document.getElementById("print-link");
  var createLink = document.createElement("a");
  createLink.className = "print";
  createLink.href = '#';
  createLink.title = 'print this page';
  createLink.appendChild(document.createTextNode("Print this page"));
  createLink.onclick = function() {
    window.print();
    return false;
  }
  linkTarget.appendChild(createLink);
}

function addEmailLink() {
  if (!document.getElementById || !document.createTextNode) {return;}
  if (!document.getElementById("email-link")) {return;}
  var linkTarget = document.getElementById("email-link");
  var createLink = document.createElement("a");
  createLink.className = "mailafriend";
  createLink.href = '#';
  createLink.title = 'Email a Friend (opens a pop-up window)';
  createLink.appendChild(document.createTextNode("Email a Friend"));
  createLink.onclick = function() {
  window.open("/mailafriend?uri="+escape(document.location),"Mail a Friend","width=400,height=420,toolbar=no,location=no,directories=no,status=no menubar=no;scrollbars=no,copyhistory=no,resizable=no,screenx=100,screeny=100,left=100,top=100");
    return false;
  }
  linkTarget.appendChild(createLink);
}

function mdpl(cds) { for (i=0;i<cds.length;i++) {document.write(String.fromCharCode(cds[i]));}};

addWebblerLoadEvent(addPrintLink);
addWebblerLoadEvent(addEmailLink);
addWebblerLoadEvent(prepareForms);
addWebblerLoadEvent(quickSearchSubmit);

window.onload = WebblerLoad;
