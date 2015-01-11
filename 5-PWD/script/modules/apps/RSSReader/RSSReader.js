"use strict";

define(
["modules/window/window"],
 function(Window){

var RSSReader = function(desktopSettings){

    this.xhr = new XMLHttpRequest();
    this.settings = {
        height: 550,
        width: 400,
        icon: "pics/taskbar/feed.png",
        appID: "RSS"
    };

    Window.call(this, desktopSettings);
    this.getFeed(this.xhr, this.feeds.DN.URL);
    this.addFeedsToStatusBar();
}

RSSReader.prototype = Object.create(Window.prototype);

RSSReader.prototype.rssproxyURL = "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=";


RSSReader.prototype.feeds = {
    AB: {
        name: "Aftonbladet",
        URL: "http://www.aftonbladet.se/rss.xml",
        cssClass: "AB"
    },
    DN: {
        name: "Dagens Nyheter",
        URL: "http://www.dn.se/m/rss/senaste-nytt",
        cssClass: "DN"
    }
};

RSSReader.prototype.addFeedsToStatusBar = function(){
    var that = this,
        bottomBar = document.getElementById(this.windowId).querySelector(".wBottomBar");

    console.log(bottomBar);

    Object.keys(this.feeds).forEach(function(key){
        var a = document.createElement("a");
        a.href = "#"
        a.className = that.feeds[key].cssClass + " feed";
        a.innerHTML = that.feeds[key].name;
        bottomBar.appendChild(a);
    })

    bottomBar.addEventListener("click", function(e){
        that.changeFeed();
    }, false);
}

RSSReader.prototype.changeFeed = function(e, url){
    if(!e) { e = window.event; };
    e.preventDefault();
    var target = e.target;
    console.log(target);
    if(target.tagName === "A"){
        switch(target.className){
            case "AB feed":
                this.getFeed(this.xhr, this.feeds.AB.URL);
                break;
            case "DN feed": 
                this.getFeed(this.xhr, this.feeds.DN.URL);
        }
    }
}


RSSReader.prototype.getFeed = function(xhr, url){
    var that = this;
    var content = document.getElementById(this.windowId).firstChild.nextSibling;
    var response;

    this.setLoading();
    xhr.onreadystatechange = function(e){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                content.innerHTML = xhr.responseText;
                that.setLoaded();
                console.log(xhr.status);    
            }
            else{
                console.log("Läsfel, status: " + xhr.status);
            }               
        }    
    };
    xhr.open("GET", this.rssproxyURL+escape(url), true);
    xhr.send(null);
};

RSSReader.prototype.settingsMenu = function(){
    alert("RSS Settings Clicked!");
};

return RSSReader;
})