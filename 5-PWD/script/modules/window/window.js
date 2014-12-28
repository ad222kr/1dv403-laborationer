"use strict";
define(function(){
    
    var Window = function(settings, appID){
        this.height = settings.height;
        this.width = settings.width;
        this.desktop = document.getElementById("desktop");
        this.barHeight = 20; // Height of bars
        this.windowId = this.getRandomId(1, 9000000); // Random Id for window to select the right window.

        this.getAppId = function(){
            return appID;
        }
        this.createWindow(); 
    };


    Window.prototype.createWindow = function(){
        var div = document.getElementById("desktop"),
            windowDiv = this.createMain(),
            topBar = this.createTopBar(),
            contentDiv = this.createContentArea(),
            bottomBar = this.createBottomBar(),
            taskBar = document.getElementById("taskbar");


        div.appendChild(windowDiv);
        windowDiv.appendChild(topBar);
        windowDiv.appendChild(contentDiv); 
        windowDiv.appendChild(bottomBar);
        windowDiv.style.left = this.getOffset().left + "px";
        windowDiv.style.top = this.getOffset().top + "px"; 
        this.makeMovable(contentDiv);        
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
        contentDiv.className = "wContent " + this.windowId;
        contentDiv.style.height = this.height - this.barHeight * 2 + "px"; // total height minus 2 bars
        return contentDiv;
    }

    Window.prototype.createTopBar = function(){
        var that = this;
        var topBar = document.createElement("div");
        var statusText = document.createElement("span");
        var closeA = document.createElement("a");
        var closeImg = document.createElement("img");

        topBar.className = "wTopBar";
        statusText.className = "wStatusText";
        statusText.innerHTML = this.getAppId();

        closeA.href = "#";
        closeA.className = "wClose";
        closeImg.src = "pics/window/stop32.png";
        closeImg.className = "wClosePic";
        
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
        // TODO add functions that inserts ajax-loader and remove
        // it when ajax-obj is retrieved from server to bot-bar
        var bottomBar = document.createElement("div");

        bottomBar.className = "wBottomBar";

        return bottomBar;
    };


    Window.prototype.close = function(id){
        var that = this;
        var div = document.querySelector("#desktop");
        var win = document.getElementById(id);
        console.log(id);
        div.removeChild(win);
    };


    Window.prototype.getRandomId = function(max, min){
        // Random ID for windows to solve the problem of always
        // loading pics in same window and removing first window
        return Math.floor(Math.random()*(max-min+1)+min); // http://stackoverflow.com/a/7228322

    };

    Window.prototype.getOffset = function(){
        // Fic func to get the max left & top values instead of hardcoding
        var div = document.getElementById("desktop").lastChild.previousSibling; // LastChild is taskbar 
        var desk = document.getElementById("desktop");

        // Top & left of previous dude
        var top = parseInt(div.style.top, 10);
        var left = parseInt(div.style.left, 10);

        // Height & width of desktop
        var deskHeight = parseInt(window.getComputedStyle(desk, null).height);
        var deskWidth = parseInt(window.getComputedStyle(desk, null).width);

        // maxTop & left, so it works with every possible window size
        var maxTop = deskHeight - this.height - 50; // 50 is taskbar + 20px whitespace left
        var maxLeft = deskWidth - this.width - 30;
        
        var retObj = {};
        // If taskbar just return 10
        if (div.id == "taskbar"){
            retObj.top = 15;
            retObj.left = 15;
        }

        else if (top >= maxTop){
            retObj.top = 10;
            retObj.left = left + 20;
        }
        else if(left >=maxLeft){
            retObj.top = top + 20;
            retObj.left = 10;
        }
        else {
            retObj.top = top + 20;
            retObj.left = left + 20;
        }
                  
       
        return retObj;    
    };

    Window.prototype.giveFocus = function(windowDiv, e){
        // Ty robin for suggesting this on slack
        var nodeList = document.querySelectorAll(".window");
        if (e.target.tagName !== "IMG"){
            this.desktop.removeChild(windowDiv);
            this.desktop.appendChild(windowDiv);   
        }
        
        
        /*
        for (var i = 0; i < nodeList.length; ++i) {
                nodeList[i].style.zIndex = 0;                
        }
        if (e.target.tagName !== "IMG"){
            windowDiv.style.zIndex = 2;    
        }*/
        
    };

    Window.prototype.makeMovable = function(div){


    };


    return Window;  
});