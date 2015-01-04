"use strict";
define(function(){

var Window = function(settings, appID){
    this.height = settings.height;
    this.width = settings.width;
    this.desktop = document.getElementById("desktop");
    this.windowId = this.getRandomId(1, 9000000); // Random Id for window to select the right window.
    this.barHeight = 20;
    this.offTop = 0;
    this.offLeft = 0;
    this.icons = {
        ajaxLoader: "pics/window/ajax-loader.gif",
        winSettings: "pics/window/cog.png",
        close: "pics/window/cross.png",
        max: "pics/window/maximize.png",
        min: "pics/window/minimize.png"
    }

    this.getAppId = function(){
        return appID;
    };

    this.createWindow();
};

Window.prototype.createWindow = function(){
    var div = document.getElementById("desktop"),
        windowDiv = this.createMain(),
        topBar = this.createTopBar(),
        contentDiv = this.createContentArea(),
        bottomBar = this.createBottomBar();

    div.appendChild(windowDiv);
    windowDiv.appendChild(topBar);
    windowDiv.appendChild(contentDiv); 
    windowDiv.appendChild(bottomBar);
    windowDiv.style.left = this.getOffset().left + "px";
    windowDiv.style.top = this.getOffset().top + "px";
    this.movable(div, windowDiv, topBar);
    
};


Window.prototype.movable = function(desktop, windowDiv, handle){
    var offX,
        offY,
        scrollPos,
        maxOffsetTop = desktop.offsetHeight - windowDiv.offsetHeight,
        maxOffsetLeft = desktop.offsetWidth - windowDiv.offsetWidth,
        contentDiv = windowDiv.firstChild.nextSibling;

    handle.style.cursor = "move";
    handle.addEventListener("mousedown", mouseDown, false);
    
    function mouseDown(e){
        // Calculates the difference between mouse-pos & windows top & left
        // So movement of the window is correct w/e you put the mouse

        if(!e) { e = window.event; }

        offX = e.clientX - parseInt(windowDiv.offsetLeft);
        offY = e.clientY - parseInt(windowDiv.offsetTop);
        desktop.classList.add("noselect");
        desktop.addEventListener("mousemove", mouseMove, false);
    }

    function mouseMove(e){
        // Moves the window to the position of the mouse minus
        // the offset that was calculetade so it gets the right pos
        // Checks first which of clientY-offY & maxOffset is the least, 
        // then checks which of that && 0 is the biggest

        if(!e){ e = window.event; }
        e.preventDefault();

        document.body.addEventListener("mouseup", mouseUp, false);
        
        windowDiv.style.top = Math.max(Math.min((e.clientY - offY), maxOffsetTop), 0) + "px";
        windowDiv.style.left = Math.max(Math.min((e.clientX - offX), maxOffsetLeft), 0) + "px";       
    }

    function mouseUp(e){
        desktop.removeEventListener("mousemove", mouseMove, false);
        desktop.classList.remove("noselect");
    }
};

Window.prototype.createMain = function () {
    var that = this,
        windowDiv = document.createElement("div"); 

    windowDiv.id = this.windowId;    
    windowDiv.className = "window";
    windowDiv.style.width = this.width + "px";
    windowDiv.style.height = this.height + "px";

    windowDiv.addEventListener("click", function(e){
        that.giveFocus(windowDiv, e);
    });
   
    return windowDiv;       
};

Window.prototype.createContentArea = function(){
    var contentDiv = document.createElement("div");

    contentDiv.className = "wContent";
    contentDiv.style.height = this.height - this.barHeight * 2 + "px"; // total height minus 2 bars

    return contentDiv;
};

Window.prototype.createTopBar = function(){
    var that = this,
        appImg = document.createElement("img"),
        topBar = document.createElement("div"),
        statusText = document.createElement("span"),
        closeA = document.createElement("a"),
        closeImg = document.createElement("img"),
        maxA = document.createElement("a"),
        maxImg = document.createElement("img");

    topBar.className = "wTopBar";
    topBar.style.height = this.barHeight + "px";

    appImg.src = this.settings.icon;
    appImg.className = "appMiniPic";

    statusText.className = "wStatusText";
    statusText.innerHTML = this.getAppId();

    closeA.href = "#";
    closeA.className = "wClose";
    closeImg.src = this.icons.close;
    closeImg.className = "topBarPics close";

    maxA.href = "#";
    maxA.className = "wMax";
    maxImg.src = this.icons.max;
    maxImg.className = "topBarPics maximize";
    
    closeA.appendChild(closeImg);
    maxA.appendChild(maxImg);
    topBar.appendChild(appImg);
    topBar.appendChild(statusText);
    topBar.appendChild(closeA);
    topBar.appendChild(maxA); 

    topBar.addEventListener("click", function(e){
        if (!e) { e = window.event; }
        e.preventDefault();
        var target = e.target;
        if (target.tagName === "A"){
            target = target.firstChild;
        }
        if (target.tagName === "IMG"){
            switch(target.className){
                case "topBarPics close":
                    that.close(that.windowId);
                    break;
                case "topBarPics maximize":
                    that.maxOrMinimize(that.windowId);
                    break;
            }
        }
    })

    return topBar;
};

Window.prototype.createBottomBar = function(){
    var bottomBar = document.createElement("div");

    bottomBar.className = "wBottomBar";
    bottomBar.style.height = this.barHeight + "px";

    return bottomBar;
};


Window.prototype.close = function(id){
    var dektop = document.querySelector("#desktop"),
        windowDiv = document.getElementById(id);
    desktop.removeChild(windowDiv);
};


Window.prototype.getRandomId = function(max, min){
    // Random ID for windows to solve the problem of always
    // loading pics in same window and removing first window
    return Math.floor(Math.random()*(max-min+1)+min); // http://stackoverflow.com/a/7228322
};

Window.prototype.getOffset = function(){
    var div = document.getElementById("desktop").lastChild.previousSibling, // LastChild is taskbar 
        desktop = document.getElementById("desktop"),
        top = div.offsetTop, // Top & left of previous window
        left = div.offsetLeft,      
        maxTop = desktop.offsetHeight - this.height - 50, // maxTop & left, so it works with every possible window size
        maxLeft = desktop.offsetWidth - this.width - 30,  
        offset = {};

    if (div.id == "taskbar"){
        offset.top = 15;
        offset.left = 15;
    }

    else if (top >= maxTop){
        offset.top = 15;
        offset.left = left + 15; 
    }
    else if(left >=maxLeft){
        offset.top =  top + 75;
        offset.left = 15;
    }
    else {
        offset.top = top + 15;
        offset.left = left + 15;
    }   

    return offset;    
};

Window.prototype.giveFocus = function(windowDiv, e){
    // Ty robin for suggesting this on slack
    // thumbURL to not give gallery focus when clicking on pic,
    // wClosePic to not get error when closing a window
    if (e.target.className !== "thumbURL" && !e.target.classList.contains("topBarPics")){
        this.desktop.removeChild(windowDiv);
        this.desktop.appendChild(windowDiv);   
    }
};

Window.prototype.setLoading = function(){
    var statusBar = document.getElementById(this.windowId).lastChild,
        ajaxLoader = document.createElement("img");

    ajaxLoader.className = "ajaxLoader";
    ajaxLoader.src = this.icons.ajaxLoader;

    statusBar.appendChild(ajaxLoader);
};

Window.prototype.setLoaded = function(){
    var statusBar = document.getElementById(this.windowId).lastChild,
        ajaxLoader = statusBar.firstChild;

    statusBar.removeChild(ajaxLoader);
};

Window.prototype.maxOrMinimize = function(id){
    var windowDiv = document.getElementById(id),
        desktop = document.getElementById("desktop"),
        contentDiv = windowDiv.firstChild.nextSibling,
        maxIcon = windowDiv.firstChild.lastChild.firstChild,
        width = parseInt(windowDiv.style.width, 10),
        height = parseInt(windowDiv.style.height, 10);

    if (height < (desktop.offsetHeight - 30) || width < desktop.offsetWidth){
        maxIcon.src = this.icons.min;
        this.offTop = parseInt(windowDiv.style.top, 10);
        this.offLeft = parseInt(windowDiv.style.left, 10);

        windowDiv.style.height = (desktop.offsetHeight - 30) + "px";
        windowDiv.style.width = desktop.offsetWidth + "px";
        windowDiv.style.top = 0;
        windowDiv.style.left = 0;
        contentDiv.style.height = (desktop.offsetHeight - 30) - this.barHeight * 2 + "px";
   
    }
    else if (height == (desktop.offsetHeight - 30) && width == desktop.offsetWidth){
        windowDiv.style.height = this.height + "px";
        windowDiv.style.width = this.width + "px";
        windowDiv.style.top = this.offTop + "px";
        windowDiv.style.left = this.offLeft + "px";
        maxIcon.src = this.icons.max;
        contentDiv.style.height = this.height - this.barHeight * 2 + "px";
        
    }
}

return Window;  
});