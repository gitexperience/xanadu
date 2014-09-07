
/*************** old stuff ***************/

var popupwindow;

function openBrWindow(theURL,winName,features) { //v2.0
  popupwindow = window.open(theURL,winName,features);
  popupwindow.focus();
}

function pageChange(url) {
  if (url != "") {
    document.location = url;
  }
}

function openWin(url) {
  openBrWindow(url,'popupwindow','scrollbars=yes,modal=yes,width=480,height=500,toolbar=yes,resizable=yes,status=yes,menubar=yes');
}

function deleteRec(url) {
  if (confirm("Are you sure you want to delete this record?")) {
    document.location = url;
  }
}

function deleteRec2(msg,url) {
  if (confirm(msg)) {
    document.location = url;
  }
}

var pic = '';
var t_url;
var t_w;
var t_h;

function viewImage(url,w,h) {
  if (screen.width < w) {
    w = screen.width;
  }
  if (screen.height < h) {
    h = screen.height;
  }
   openpic(url+'&embed=yes',w,h);
}

function viewThumb(id,w,h) {
  var maxwidth = w;
  var maxheight = h;
  if (window.innerWidth < w) {
//    maxwidth = screen.availWidth;
//    alert("width reduced to "+w);
    maxwidth= window.innerWidth - 100;
  }
  if (window.innerWidth < h) {
//    maxheight = screen.availHeight;
//    alert("height reduced to "+h);
    maxheight = window.innerHeight - 100;
  }
  var max = w;
  if (maxwidth < maxheight) {
    max = maxheight;
  } else {
    max = maxwidth;
  }
  var aspectratio = 1;
  if ((h > max) || (w > max))  {
    if (maxheight > maxwidth) {
      aspectratio = (max / h);
    } else {
      aspectratio = (max / w) ;
    }
  } else {
    aspectratio = 1;
  }

  w = Math.round(w * aspectratio);
  h = Math.round(h * aspectratio);

  var url = '/thumbnail.php?id='+id+'&max='+max+'&embed=no&resize=yes&w='+w+'&h='+h;
  openpic(url,w,h);
}

function openpic(url,w,h) {
  var agt=navigator.userAgent.toLowerCase();
  var mac    = (agt.indexOf("mac")!=-1);
  var isie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
  if (w == null || w == 0) {
    w = 120;
  }
  if (h == null || h == 0){
    h = 120;
  }
  if (pic && !pic.closed){
    pic.close();
    pic = '';
    t_url = url;
    t_w = w;
    t_h = h;
    setTimeout("openit()",150);
  } else {
    do_openpic(url,w,h);
  }
}

function openit() {
  do_openpic(t_url,t_w,t_h);
  t_url = null;
  t_w = null;
  t_h = null;
}

function do_openpic(url,w,h) {
  w +=30;
  h +=30;
  //var features = "scrollbars=auto,toolbar=yes,location=yes,menubar=yes,screenx=150,screeny=150";
  var features = "dependent=yes,width=" + w + ",height=" + h + ",noresize,scrollbars=auto,toolbar=no,location=no,menubar=no,screenx=150,screeny=150";
  pic = window.open(url,"picwin",features);
  if (window.focus) {pic.focus()}
}

function createContent(){
    if (!pic.document){
  setTimeout("createContent()",100);
    } else {
  var url ="aaa";
  var w=100;
  var h=200;
  pic.document.write('<html><head><style>body{margin:0}</style></head><body>');
  pic.document.write('<table width=100% height=100%><td>td align="center" valign="middle"><img border=0 src=\"');
  pic.document.write(url);
  pic.document.write('\" width=');
  pic.document.write(w);
  pic.document.write(' height=');
  pic.document.write(h);
  pic.document.write('></td></tr></table></body></html>');
  if (window.focus){pic.focus();}
    }
}
function help(loc) {
  if (helpwin == "object" || (helpwin != null && helpwin.document != null)) {
      helpwin.close();
      helpwin = null;
      t_url = url;
      t_w = w;
      t_h = h;
      setTimeout("openhelp(loc)",500)
  } else
    openhelp(loc);
}

function openhelp(loc) {
  helpwin=window.open(loc,"help",'screenX=100,screenY=100,width=350,height=350,scrollbars=yes');
}
