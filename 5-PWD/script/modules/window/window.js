"use strict";
define(function(){

var Window = function(settings, appID){
    this.height = settings.height;
    this.width = settings.width;
    this.desktop = document.getElementById("desktop");
    this.windowId = this.getRandomId(1, 9000000); // Random Id for window to select the right window.
    this.icons = {
        ajaxLoader: "pics/window/ajax-loader.gif",
        winSettings: "pics/window/cog.png",
        close: "pics/window/cross.png"
    }
    this.barHeight = 20;
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
    var offX;
    var offY;

    handle.addEventListener("mousedown", mouseDown, false);
    handle.style.cursor = "move";

    function mouseDown(e){
        // Calculates the difference between mouse-pos & windows top & left

        if(!e){e=window.event;}
        offX = e.clientX - parseInt(windowDiv.offsetLeft);
        offY = e.clientY - parseInt(windowDiv.offsetTop);
        console.log();
        desktop.classList.add("noselect");
        desktop.addEventListener("mousemove", mouseMove, false);
    }

    function mouseMove(e){
        // Moves the window to the position of the mouse minus
        // the offset that was calculetade so it gets the right pos
        if(!e){e=window.event;}
        handle.addEventListener("mouseup", mouseUp, false);

        console.log(windowDiv.offsetWidth);
        console.log(desktop.offsetWidth);

        windowDiv.style.top = Math.min((e.clientY - offY), (desktop.offsetHeight - windowDiv.offsetHeight)) + "px";
        windowDiv.style.left = Math.min((e.clientX - offX), (desktop.offsetWidth - windowDiv.offsetWidth)) + "px";   
        
    }

    function mouseUp(e){
        // just removes eventlistener for move on mouseup
        desktop.removeEventListener("mousemove", mouseMove, false);
        desktop.classList.remove("noselect");
    }




};



    

Window.prototype.createMain = function () {
    var that = this;
    var windowDiv = document.createElement("div"); 
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
    var that = this;
    var appImg = document.createElement("img");
    var topBar = document.createElement("div");
    var statusText = document.createElement("span");
    var closeA = document.createElement("a");
    var closeImg = document.createElement("img");

    topBar.className = "wTopBar";
    topBar.style.height = this.barHeight + "px";
    appImg.src = this.settings.icon;
    appImg.className = "appMiniPic";
    statusText.className = "wStatusText";
    statusText.innerHTML = this.getAppId();

    closeA.href = "#";
    closeA.className = "wClose";
    closeImg.src = this.icons.close;
    closeImg.className = "wClosePic";
    
    topBar.appendChild(appImg);
    topBar.appendChild(statusText);
    closeA.appendChild(closeImg);
    topBar.appendChild(closeA);

    closeA.addEventListener("click", function(e){
        e.preventDefault();
        that.close(that.windowId);
    });

    return topBar;
};

Window.prototype.createBottomBar = function(){
    var bottomBar = document.createElement("div");
    bottomBar.className = "wBottomBar";
    bottomBar.style.height = this.barHeight + "px";
    return bottomBar;
};


Window.prototype.close = function(id){
    var div = document.querySelector("#desktop");
    var win = document.getElementById(id);
    div.removeChild(win);
};


Window.prototype.getRandomId = function(max, min){
    // Random ID for windows to solve the problem of always
    // loading pics in same window and removing first window
    return Math.floor(Math.random()*(max-min+1)+min); // http://stackoverflow.com/a/7228322
};

Window.prototype.getOffset = function(){
    var div = document.getElementById("desktop").lastChild.previousSibling; // LastChild is taskbar 
    var desk = document.getElementById("desktop");

    // Top & left of previous window
    var top = div.offsetTop; //parseInt(div.style.top, 10);
    var left = div.offsetLeft; //parseInt(div.style.left, 10);

    // Height & width of desktop
    var deskHeight = parseInt(window.getComputedStyle(desk, null).height);
    var deskWidth = parseInt(window.getComputedStyle(desk, null).width);

    // maxTop & left, so it works with every possible window size
    var maxTop = deskHeight - this.height - 50; // 50 is taskbar + 20px whitespace left
    var maxLeft = deskWidth - this.width - 30;
    
    var offset = {};
    // If taskbar just return 10
    if (div.id == "taskbar"){
        offset.top = 15;
        offset.left = 15;
    }

    else if (top >= maxTop){
        offset.top = 15;
        offset.left = left + 15;
    }
    else if(left >=maxLeft){
        offset.top = top + 45;
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
    if (e.target.className !== "thumbURL" && e.target.className !== "wClosePic"){
        this.desktop.removeChild(windowDiv);
        this.desktop.appendChild(windowDiv);   
    }
};

Window.prototype.setLoading = function(){
    var statusBar = document.getElementById(this.windowId).lastChild;
    var ajaxLoader = document.createElement("img");
    ajaxLoader.className = "ajaxLoader";
    ajaxLoader.src = this.icons.ajaxLoader;
    statusBar.appendChild(ajaxLoader);
};

Window.prototype.setLoaded = function(){
    var statusBar = document.getElementById(this.windowId).lastChild;
    var ajaxLoader = statusBar.firstChild;
    statusBar.removeChild(ajaxLoader);
};



return Window;  
});