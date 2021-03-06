function recalcSelectsStyle() {
    var scount = parseInt(document.getElementById("slotcount").value);
    for (var i=scount;i<12;i++){
        document.getElementsByTagName("select")[i].style.display = "none";
        document.getElementsByClassName("label")[i].style.display = "none";
    }
    for (var i=0;i<scount;i++){
        document.getElementsByTagName("select")[i].style.display = "inline-block";
        document.getElementsByClassName("label")[i].style.display = "inline-block";
    }
    document.getElementById("slotselects").style.height = 25*Math.ceil(scount/4)+8*Math.ceil(scount/4)+"px";
}
var map = {
    fb:"http://www.facebook.com",
    gp:"https://plus.google.com",
    yt:"http://www.youtube.com",
    ng:"http://9gag.com",
    gm:"https://mail.google.com",
    rd:"http://www.reddit.com",
    gg:"https://www.google.com",
    yh:"http://www.yahoo.com",
    gd:"https://drive.google.com",
    dg:"http://digg.com",
    vg:"http://www.theverge.com",
    tw:"https://twitter.com",
    pk:"http://getpocket.com/a/queue",
    gk:"https://drive.google.com/keep"
}

var bgPreview = document.getElementById("bgpreview");
var bgPresetsSelect = document.getElementById("bgopt");
var bgURL = document.getElementById("custombg");
var bgLocal = document.getElementById("bglocal");

var checked = 0;
document.getElementById("slot1-i").value = localStorage.slot1i || "fb";
document.getElementById("slot2-i").value = localStorage.slot2i || "ng";
document.getElementById("slot3-i").value = localStorage.slot3i || "yt";
document.getElementById("slot4-i").value = localStorage.slot4i || "rd";
document.getElementById("slot5-i").value = localStorage.slot5i || "gp";
document.getElementById("slot6-i").value = localStorage.slot6i || "gg";
document.getElementById("slot7-i").value = localStorage.slot7i || "yh";
document.getElementById("slot8-i").value = localStorage.slot8i || "pk";
document.getElementById("slot9-i").value = localStorage.slot9i || "tw";
document.getElementById("slot10-i").value = localStorage.slot10i || "gd";
document.getElementById("slot11-i").value = localStorage.slot11i || "gk";
document.getElementById("slot12-i").value = localStorage.slot12i || "vg";
document.getElementById("slotcount").value = localStorage.slotcount || "3";
document.getElementById("showWeather").checked = eval(localStorage.showWeather) || false;
document.getElementById("weathercity").value = localStorage.weather_city || "";
document.getElementById("showfb").checked = eval(localStorage.showFb) || false;
document.getElementById("shownotif").checked = eval(localStorage.showNotif) || false;
document.getElementById("showbookmarks").checked = eval(localStorage.showbookmarks) || false;
document.getElementById("showstumble").checked = eval(localStorage.showStumble) || false;
document.getElementById("topsitecount").value = localStorage.topsitecount || 6;
document.getElementById("showallbookmarks").checked = eval(localStorage.showAllBookmarks) || false;
document.getElementById("bgblur").checked = eval(localStorage.bgblur) || false;
document.getElementById("usefahrenheit").checked = eval(localStorage.usefahrenheit) || false;
document.getElementById("disableanimation").checked = eval(localStorage.disableanimation) || false;
document.getElementById("shownews").checked = eval(localStorage.shownews) || false;
document.getElementById("titletext").value = localStorage.titletext || "New Tab";
document.getElementById("showtum").checked = eval(localStorage.showtum) || false;

eval(localStorage.autoclose) == false ? document.getElementById("autoclose").checked = false : document.getElementById("autoclose").checked = true;

bgPreview.style.backgroundImage = localStorage.backgroundURL || "url(/img/bg.png)";

document.getElementById("save").onclick = function(){
    localStorage.slot1i = document.getElementById("slot1-i").value;
    localStorage.slot2i = document.getElementById("slot2-i").value;
    localStorage.slot3i = document.getElementById("slot3-i").value;
    localStorage.slot4i = document.getElementById("slot4-i").value;
    localStorage.slot5i = document.getElementById("slot5-i").value;
    localStorage.slot6i = document.getElementById("slot6-i").value;
    localStorage.slot7i = document.getElementById("slot7-i").value;
    localStorage.slot8i = document.getElementById("slot8-i").value;
    localStorage.slot9i = document.getElementById("slot9-i").value;
    localStorage.slot10i = document.getElementById("slot10-i").value;
    localStorage.slot11i = document.getElementById("slot11-i").value;
    localStorage.slot12i = document.getElementById("slot12-i").value;
    localStorage.slotcount = document.getElementById("slotcount").value;
    localStorage.titletext = document.getElementById("titletext").value;
    for (var i=1;i<=12;i++) {
        localStorage["slot"+i+"u"] = map[localStorage["slot"+i+"i"]];
    }
    localStorage.showWeather = document.getElementById("showWeather").checked;
    localStorage.weather_city = document.getElementById("weathercity").value;
    localStorage.showFb = document.getElementById("showfb").checked;
    localStorage.showNotif = document.getElementById("shownotif").checked;
    localStorage.showbookmarks = document.getElementById("showbookmarks").checked;
    localStorage.topsitecount = document.getElementById("topsitecount").value;
    localStorage.showStumble = document.getElementById("showstumble").checked;
    localStorage.showAllBookmarks = document.getElementById("showallbookmarks").checked;
    localStorage.bgblur = document.getElementById("bgblur").checked;
    localStorage.usefahrenheit = document.getElementById("usefahrenheit").checked;
    localStorage.disableanimation = document.getElementById("disableanimation").checked;
    localStorage.shownews = document.getElementById("shownews").checked;
    localStorage.showtum = document.getElementById("showtum").checked;
    localStorage.autoclose = document.getElementById("autoclose").checked;
    
    localStorage.backgroundURL = bgPreview.style.backgroundImage;
    
    console.log("Saved options");
    window.top.location.reload();
}
recalcSelectsStyle();
document.getElementById("resetdefaults").onclick = function(){
    this.value = "Click again to confirm";
    this.onclick = function(){
        localStorage.clear();
        localStorage.firstRun = "false";
        window.top.location.reload();
    }
}
document.getElementById("exportsettings").onclick = function(){
    window.top.location = "export.html";
}
document.getElementById("custiconslink").onclick = function(){
    window.top.location = "customicons.html";
}
document.getElementById("slotcount").onchange = recalcSelectsStyle;

// version label next to title
document.querySelector("#vno").innerHTML = "v" + chrome.app.getDetails().version;

// background preview
bgPresetsSelect.onclick = bgPresetsSelect.onchange = function(){
    if (this.value == "bg") {
        bgPreview.style.backgroundImage = "url(/img/bg.png)";
    } else if (this.value == "bg2") {
        bgPreview.style.backgroundImage = "url(/img/bg2.png)";
    }
}

bgURL.oninput = function(){
    if (this.value.indexOf(":") != -1) { // has protocol
        bgPreview.style.backgroundImage = "url("+this.value+")";
    } else { // doesnt have protocol, automatically add
        bgPreview.style.backgroundImage = "url(http://"+this.value+")";
    }
}

bgLocal.onchange = function(){
    var file = this.files[0];
    if (file.type.match("image.*")) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
            if (e.target.readyState == reader.DONE) {
                var dataURL = e.target.result;
                bgPreview.style.backgroundImage = "url("+dataURL+")";
            }
        }
        reader.readAsDataURL(file);
    } else {
        alert("Please use an image file");
    }
}