"use strict";
define(function(){

var Window = function(desktopSettings){
    
    this.PWDdiv = document.getElementById("desktop");
    this.barHeight = 20;
    this.windowId = this.getRandomId(1, 9000000);
    this.movable = true;
    this.maximized = false;

    // Makes sure the window is not higher than the desktop. When clicking 
    // up big pic, if deskheight is less than pic-height, it gets scrollable
    this.height = this.settings.height > desktopSettings.height ? desktopSettings.height - desktopSettings.taskBarHeight * 1.5 : this.settings.height;

    // 17 is scroll-bar width, ugly but else window gets a horizontal 
    // scrollbar if it has a vertical scroll.
    this.width = this.settings.height > desktopSettings.height ? this.settings.width + 17 : this.settings.width;
    
    // For saving the windows top & left when maximizing it, retaining it's 
    // previous position when minimized again 
    this.offTop = 0;
    this.offLeft = 0;
   
    this.getPWDSettings = function(){
        return desktopSettings;
    }

    this.createWindow();
};

Window.prototype.icons = {
    ajaxLoader: "pics/window/ajax-loader.gif",
    close: "pics/window/cross.png",
    max: "pics/window/maximize.png",
    min: "pics/window/minimize.png",
};

Window.prototype.createWindow = function(){

    var windowDiv = this.createMain(),
        topBar = this.createTopBar(windowDiv),
        contentDiv = this.createContentArea(),
        bottomBar = this.createBottomBar(),
        PWDSettings = this.getPWDSettings(),
        offset;

    this.PWDdiv.appendChild(windowDiv);
    windowDiv.appendChild(topBar);
    windowDiv.appendChild(contentDiv); 
    windowDiv.appendChild(bottomBar);

    offset = this.getOffset();
    windowDiv.style.left = offset.left + "px";
    windowDiv.style.top = offset.top + "px";

    if(windowDiv.previousSibling.id != "taskbar"){
        windowDiv.style.zIndex = parseInt(windowDiv.previousSibling.style.zIndex) + 1;   
    }   
    this.addListeners(windowDiv, topBar, contentDiv);      
};

Window.prototype.createMain = function () {

    var windowDiv = document.createElement("div");

    windowDiv.id = this.windowId;    
    windowDiv.className = "window movable " + this.settings.appID;
    windowDiv.style.width = this.width + "px";
    windowDiv.style.height = this.height + "px";

    return windowDiv;       
};

Window.prototype.createContentArea = function(){
    var contentDiv = document.createElement("div");

    contentDiv.className = "wContent";

    return contentDiv;
};

Window.prototype.createTopBar = function(windowDiv){

    var appImg = document.createElement("img"),
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
    statusText.innerHTML = this.settings.appID;

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

    return topBar;
};

Window.prototype.createBottomBar = function(){
    var bottomBar = document.createElement("div");

    bottomBar.className = "wBottomBar";
    bottomBar.style.height = this.barHeight + "px";

    return bottomBar;
};

Window.prototype.addListeners = function(windowDiv, topBar, contentDiv) {
    var that = this,
        target;

    windowDiv.addEventListener("mousedown", function(e){
        if (!e) { e = window.event; }
        target = e.target;
        that.handlers.giveFocus.call(that, e, windowDiv, target);
    }, false)  


    topBar.addEventListener("mousedown", function(e){
        if (!e) { e = window.event; }
        target = e.target;
        switch(target.className){
            case "topBarPics close":
                that.handlers.close.call(that, windowDiv);
                break;
            case "topBarPics maximize":
                that.handlers.maxOrMinimize.call(that, windowDiv);
                break;
        }
    }, false)
    
    this.handlers.draggable.call(this, windowDiv, topBar, this.getPWDSettings());       
};

Window.prototype.getRandomId = function(max, min){
    // http://stackoverflow.com/a/7228322
    return Math.floor(Math.random()*(max-min+1)+min); 
};

Window.prototype.getOffset = function(){
    // Calculates the windows position by getting the top & left styles from previous 
    // window and adding to those numbers, returning an object with a number for left
    // and top. Also calculates the max for top & left, if they are breached, reset.
    
    var div = document.getElementById(this.windowId).previousSibling,
        PWDSettings = this.getPWDSettings(), 
        top = div.offsetTop, 
        left = div.offsetLeft,      
        maxTop = PWDSettings.height - this.height - PWDSettings.taskBarHeight, 
        maxLeft = PWDSettings.width - this.width - PWDSettings.taskBarHeight,  
        offset = {};

    if (div.id == "taskbar"){
        offset.top = 5;
        offset.left = 5;
    }
    else if (top >= maxTop){
        offset.top = 5;
        offset.left = left + 20; 
    }
    else if(left >=maxLeft){
        offset.top =  top + 60;
        offset.left = 5;
    }
    else {
        offset.top = top + 20;
        offset.left = left + 20;
    }   

    return offset;    
};

Window.prototype.setLoading = function(){

    var statusBar = document.getElementById(this.windowId).querySelector(".wBottomBar"),
        ajaxLoader = document.createElement("img");

    ajaxLoader.className = "ajaxLoader";
    ajaxLoader.src = this.icons.ajaxLoader;

    statusBar.appendChild(ajaxLoader);
};

Window.prototype.setLoaded = function(){
    var statusBar = document.getElementById(this.windowId).lastChild,
        ajaxLoader = statusBar.querySelector(".ajaxLoader");

    statusBar.removeChild(ajaxLoader);
};

Window.prototype.handlers = {

    giveFocus: function(e, windowDiv, target){
        // Gets nodelist of all windows, sets z-index to zero,
        // then sets this windows z-index to 1
        if(!target.classList.contains("thumbURL") && !target.classList.contains("close")){
            var nodeList = document.getElementsByClassName("window"),
                windowDiv = document.getElementById(this.windowId),
                zIndexMax = 0;

            for(var i = 0; i < nodeList.length; i++){
                if(parseInt(nodeList[i].style.zIndex) > zIndexMax){
                     zIndexMax = parseInt(nodeList[i].style.zIndex);
                }
            }
            windowDiv.style.zIndex = ++zIndexMax;
        }
    },

    close: function (windowDiv) {
        this.PWDdiv.removeChild(windowDiv);    
    },

    maxOrMinimize: function(windowDiv){
        var contentDiv = windowDiv.querySelector(".wContent"),         
            maxIcon = windowDiv.querySelector(".maximize"),
            width = parseInt(windowDiv.style.width, 10),
            height = parseInt(windowDiv.style.height, 10),
            PWDSettings = this.getPWDSettings();

        if (!this.maximized){
            this.movable = false;
            this.maximized = true;
            this.offTop = parseInt(windowDiv.style.top, 10);
            this.offLeft = parseInt(windowDiv.style.left, 10);
            windowDiv.style.height = PWDSettings.height - PWDSettings.taskBarHeight + "px";
            windowDiv.style.width = PWDSettings.width + "px";
            windowDiv.style.top = 0;
            windowDiv.style.left = 0;
            maxIcon.src = this.icons.min;

        }
        else {
            this.movable = true;
            this.maximized = false;            
            windowDiv.style.height = this.height + "px";
            windowDiv.style.width = this.width + "px";
            windowDiv.style.top = this.offTop + "px";
            windowDiv.style.left = this.offLeft + "px";
            maxIcon.src = this.icons.max;
        }

    },

    draggable: function(windowDiv, handle, PWDSettings){

        var that = this,
            offX,
            offY,
            maxOffsetTop = PWDSettings.height - windowDiv.offsetHeight,
            maxOffsetLeft = PWDSettings.width - windowDiv.offsetWidth,
            contentDiv = windowDiv.firstChild.nextSibling,
            target;

        handle.style.cursor = "move";
        handle.addEventListener("mousedown", mouseDown, false);
        window.addEventListener("mouseup", function(e){
            desktop.removeEventListener("mousemove", mouseMove, false);
            desktop.classList.remove("noselect");
        }, false);

        function mouseDown(e){
            // Calculates the difference between mouse-pos & windows top & left
            // So movement of the window is correct w/e you put the mouse
            if(!e) { e = window.event; }
            target = e.target;
            
            if(target.tagName === "A"){
                target = target.firstChild;
            }

            offX = e.clientX - parseInt(windowDiv.offsetLeft);
            offY = e.clientY - parseInt(windowDiv.offsetTop);

            desktop.classList.add("noselect");
            desktop.addEventListener("mousemove", mouseMove, false);      
        }

        function mouseMove(e){
            // Moves the window to the position of the mouse minus the offset that was
            // calculatade so it gets the right pos. Checks first which of clientY-offY
            // & maxOffset is the least, then checks which of that && 0 is the biggest
            if(!e){ e = window.event; }

            if (that.movable){
                windowDiv.style.top = Math.max(Math.min((e.clientY - offY), maxOffsetTop), 0) + "px";
                windowDiv.style.left = Math.max(Math.min((e.clientX - offX), maxOffsetLeft), 0) + "px";    
            }                  
        }
    }
};

return Window;  
});   