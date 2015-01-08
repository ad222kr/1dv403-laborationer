"use strict";

define(
["modules/window/window"],
 function(Window){

var RSSReader = function(desktopSettings){

    var xhr = new XMLHttpRequest();
    this.settings = {
        height: 550,
        width: 400,
        icon: "pics/taskbar/feed.png",
        appID: "RSS"
    };

    Window.call(this, desktopSettings);
    this.getFeed(xhr);
}

RSSReader.prototype = Object.create(Window.prototype);

RSSReader.prototype.feeds = {
    DN: "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url="+escape("http://www.dn.se/m/rss/senaste-nytt"),

}

RSSReader.prototype.getFeed = function(xhr){
    var that = this;
    var content = document.getElementById(this.windowId).firstChild.nextSibling;
    var response;

    this.setLoading();
    xhr.onreadystatechange = function(e){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                content.innerHTML = xhr.responseText;
                that.setLoaded();
            }
            else{
                console.log("Läsfel, status: " + xhr.status);
            }
        }
        
    };
    xhr.open("GET", this.feeds.DN, true);
    xhr.send(null);
};

RSSReader.prototype.settingsMenu = function(){
    alert("RSS Settings Clicked!");
};

return RSSReader;
})