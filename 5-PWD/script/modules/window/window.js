"use strict";
define(["modules/window/eventhandlers"],function(EventHandlers){

var Window = function(desktopSettings){
    
    this.PWDdiv = document.getElementById("desktop");
    this.height = this.settings.height > desktopSettings.height ? desktopSettings.height - 50 : this.settings.height; // Makes sure the window isnt bigger than the desk
    this.width = this.settings.height > desktopSettings.height ? this.settings.width + 17 : this.settings.width; // To remove bottom scrollbar. probably need func to calc this instead of hardcode
    this.windowId = this.getRandomId(1, 9000000); // Random Id for window to select the right window.
    this.barHeight = 20;
    this.offTop = 0;
    this.offLeft = 0;

    this.getPWDSettings = function(){
        return desktopSettings;
    }

    this.createWindow();
    console.log(desktopSettings);

};


// THese properties are always the same for each window
// WHy create them everytime? Better on prototype?
Window.prototype.icons = {
    ajaxLoader: "pics/window/ajax-loader.gif",
    close: "pics/window/cross.png",
    max: "pics/window/maximize.png",
    min: "pics/window/minimize.png",
    settings: "pics/window/cog.png"
};


Window.prototype.createWindow = function(){

    var that = this,
        windowDiv = this.createMain(),
        topBar = this.createTopBar(windowDiv),
        contentDiv = this.createContentArea(),
        bottomBar = this.createBottomBar(),
        PWDSettings = this.getPWDSettings();

    this.PWDdiv.appendChild(windowDiv);
    windowDiv.appendChild(topBar);
    windowDiv.appendChild(contentDiv); 
    windowDiv.appendChild(bottomBar);
    windowDiv.style.left = this.getOffset().left + "px";
    windowDiv.style.top = this.getOffset().top + "px";
    console.log(this);
    windowDiv.addEventListener("click", function(e){
        that.handlers.giveFocus.call(that, e, windowDiv);    
    }, false); 
      
};

Window.prototype.addListeners = function(windowDiv, topBar, contentDiv) {
    // body...
};

Window.prototype.handlers = {

    giveFocus: function(e, windowDiv){
        if(!e) { e = window.event; }
        e.preventDefault();
        var target = e.target;
        if(target.tagName === "A"){
            target = target.firstChild;
        }
        if(!target.classList.contains("thumbURL") && !target.classList.contains("close")){
            this.PWDdiv.removeChild(windowDiv);
            this.PWDdiv.appendChild(windowDiv);
        }
    },

    close: function (windowDiv) {
        this.PWDdiv.removeChild(windowDiv);    
    }

    maxOrMinimize: function(windowDiv){
        var topBar = windowDiv.firstChild,
            contentDiv = topBar.nextSibling,
            maxIcon = windowDiv.querySelector(".maximize"),
            width = parseInt(windowDiv.style.width, 10),
            height = parseInt(windowDiv.style.height, 10),
            PWDSettings = this.getPWDSettings();

        if (!windowDiv.classList.contains("maximized")){
            windowDiv.classList.remove("movable");
            windowDiv.classList.add("maximized");
            maxIcon.src = this.icons.min;
            this.offTop = parseInt(windowDiv.style.top, 10);
            this.offLeft = parseInt(windowDiv.style.left, 10);
            windowDiv.style.width = PWDSettings.height - PWDSettings.taskBarHeight + "px";
            windowDiv.style.width = PWDSettings.width + "px";
            windowDiv.style.top = 0;
            windowDiv.style.left = 0;

        }
        else if (windowDiv.classList.contains("maximized")){
            windowDiv.classList.add("movable");
            windowDiv.classList.remove("maximized");
            maxIcon.src = this.icon.max;
            windowDiv.style.height = this.height + "px";
            windowDiv.style.width = this.width + "px";
            windowDiv.style.top = this.offTop + "px";
            windowDiv.style.left = this.offLeft + "px";
            contentDiv.style.height = this.height - this.barHeight * 2 + "px";
            contentDiv.style.overflow = "auto";

        }

    }
};


/*Window.prototype.handlers = function(){


        Window.prototype.maxOrMinimize = function(id){
        var windowDiv = document.getElementById(id),
            topBar = windowDiv.firstChild,
            contentDiv = windowDiv.firstChild.nextSibling,
            maxIcon = windowDiv.querySelector(".maximize"),
            width = parseInt(windowDiv.style.width, 10),
            height = parseInt(windowDiv.style.height, 10),
            PWDSettings = this.getPWDSettings();
            console.log(width);
            console.log(height);
            console.log(PWDSettings.height);
            console.log(PWDSettings.width);
            console.log(PWDSettings);

        if (height < (PWDSettings.height - PWDSettings.taskBarHeight) || width < PWDSettings.width){
            // If window is smaller than desktop, set styles so it takes up whole
            // desktop. Save windows top & left styles so it has the same position
            // when it's minimized.
            windowDiv.classList.remove("movable");
            windowDiv.classList.add("maximized");
            maxIcon.src = this.icons.min;
            this.offTop = parseInt(windowDiv.style.top, 10);
            this.offLeft = parseInt(windowDiv.style.left, 10);

            windowDiv.style.height = PWDSettings.height - PWDSettings.taskBarHeight + "px";
            windowDiv.style.width = PWDSettings.width + "px";
            windowDiv.style.top = 0;
            windowDiv.style.left = 0;


            contentDiv.style.height = (PWDSettings.height - PWDSettings.taskBarHeight) - PWDSettings.barHeight * 2 + "px";   
        }
        else if (height == PWDSettings.height - PWDSettings.taskBarHeight && width == PWDSettings.width){
            // If window is as big as desktop (-30 to take taskbar to account, keep or remove?)
            // minimize it to normal size again & set top & left styles to the position it had before
            windowDiv.classList.add("movable");
            windowDiv.classList.remove("maximized");
            windowDiv.style.height = this.height + "px";
            windowDiv.style.width = this.width + "px";
            windowDiv.style.top = this.offTop + "px";
            windowDiv.style.left = this.offLeft + "px";
            maxIcon.src = this.icons.max;
            contentDiv.style.height = this.height - this.barHeight * 2 + "px";
            contentDiv.style.overflow = "auto";           
        }
    }*/

    /*var offX,
            offY,
            scrollPos,
            maxOffsetTop = this.PWD.height - windowDiv.offsetHeight,
            maxOffsetLeft = this.PWD.width - windowDiv.offsetWidth,
            contentDiv = windowDiv.firstChild.nextSibling;

        handle.style.cursor = "move";
        handle.addEventListener("mousedown", mouseDown, false);
        
        function mouseDown(e){
            // Calculates the difference between mouse-pos & windows top & left
            // So movement of the window is correct w/e you put the mouse
            if(!e) { e = window.event; }
            var target = e.target;

            if(target.tagName === "A"){
                target = target.firstChild;
            }

            offX = e.clientX - parseInt(windowDiv.offsetLeft);
            offY = e.clientY - parseInt(windowDiv.offsetTop);
            desktop.classList.add("noselect");
            // Prevents the window from being moved by pressing & holding the icons
            // for settings, maximize & close
            if (!target.classList.contains("topBarPics")){
                desktop.addEventListener("mousemove", mouseMove, false);   
            }      
        }

        function mouseMove(e){
            // Moves the window to the position of the mouse minus the offset that was
            // calculatade so it gets the right pos. Checks first which of clientY-offY
            // & maxOffset is the least, then checks which of that && 0 is the biggest

            if(!e){ e = window.event; }
            e.preventDefault();
            

            window.addEventListener("mouseup", mouseUp, false);


            // Keeps the window whithin the desktop. Checks which is smalles of clientX/Y & maxOffset 
            // to keep it in desktop div at the bottom & right boundries. Then checks which of that 
            // & 0 is the biggest to keep it within the boundries at the top & left.
            if (windowDiv.classList.contains("movable") ){

                windowDiv.style.top = Math.max(Math.min((e.clientY - offY), maxOffsetTop), 0) + "px";
                windowDiv.style.left = Math.max(Math.min((e.clientX - offX), maxOffsetLeft), 0) + "px";    
            }
                  
        }

        function mouseUp(e){
            desktop.removeEventListener("mousemove", mouseMove, false);
            desktop.classList.remove("noselect");
        }*/



Window.prototype.movable = function(desktop, windowDiv, handle){

 
} 

Window.prototype.createMain = function () {
    var that = this,
        windowDiv = document.createElement("div"); 

    windowDiv.id = this.windowId;    
    windowDiv.className = "window movable " + this.settings.appID;
    windowDiv.style.width = this.width + "px";
    windowDiv.style.height = this.height + "px";

    
   
    return windowDiv;       
};

Window.prototype.createContentArea = function(){
    var contentDiv = document.createElement("div");

    contentDiv.className = "wContent";
    contentDiv.style.height = this.height - this.barHeight * 2 + "px"; // total height minus 2 bars

    return contentDiv;
};



Window.prototype.createTopBar = function(windowDiv){
    var that = this,
        appImg = document.createElement("img"),
        topBar = document.createElement("div"),
        statusText = document.createElement("span"),
        closeA = document.createElement("a"),
        closeImg = document.createElement("img"),
        maxA = document.createElement("a"),
        maxImg = document.createElement("img"),
        settingsA = document.createElement("a"),
        settingsImg = document.createElement("img");

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

    settingsA.appendChild(settingsImg);
    closeA.appendChild(closeImg);
    maxA.appendChild(maxImg);
    topBar.appendChild(appImg);
    topBar.appendChild(statusText);  
    topBar.appendChild(closeA);
    topBar.appendChild(maxA);

    // ImageViewer doesnt need settings icon cus what
    // settings could it possibly have?
    if(!windowDiv.classList.contains("ImageViewer")){
        settingsA.href = "#";
        settingsA.className = "wSettings";
        settingsImg.src = this.icons.settings;
        settingsImg.className = "topBarPics settings"; 
        topBar.appendChild(settingsA);      
    }
};

Window.prototype.createBottomBar = function(){
    var bottomBar = document.createElement("div");

    bottomBar.className = "wBottomBar";
    bottomBar.style.height = this.barHeight + "px";

    return bottomBar;
};

Window.prototype.getRandomId = function(max, min){
    // http://stackoverflow.com/a/7228322
    return Math.floor(Math.random()*(max-min+1)+min); 
};

Window.prototype.getOffset = function(){
    var div = this.PWDdiv.lastChild.previousSibling,
        PWDSettings = this.getPWDSettings(), // LastChild is taskbar 
        top = div.offsetTop, // Top & left of previous window
        left = div.offsetLeft,      
        maxTop = PWDSettings.height - this.height - PWDSettings.taskBarHeight, // maxTop & left, so it works with every possible window size
        maxLeft = PWDSettings.width - this.width - PWDSettings.taskBarHeight,  
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





return Window;  
});

   