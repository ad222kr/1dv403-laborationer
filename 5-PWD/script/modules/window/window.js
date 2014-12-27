"use strict";
define(function(){
    
    var Window = function(appID){

        this.height = 300;
        this.width = 280;

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
    };

    Window.prototype.createMain = function () {
        var windowDiv = document.createElement("div"); 
        windowDiv.id = this.windowId;    
        windowDiv.className = "window";
        windowDiv.style.width = this.width + "px";
        windowDiv.style.height = this.height + "px";
       
        return windowDiv;       
    };

    Window.prototype.createContentArea = function(){
        var contentDiv = document.createElement("div");
        contentDiv.className = "wContent";
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
        return Math.floor(Math.random()*(max-min+1)+min);

    };

    Window.prototype.getOffset = function(){
        // TODO: Fix "bouncing" windows when they reach the bottom of the desktop
        var div = document.getElementById("desktop").lastChild.previousSibling; // LastChild is taskbar 
        
        // If taskbar just return 10
        if (div.id == "taskbar"){
            console.log("shu");
            return { left: 10, top: 10 };

        }
        // If prevSibl is a window get its top & left, parse and return value + 10
        else{
            console.log("fitta");
            var top = parseInt(div.style.top, 10);
            var left = parseInt(div.style.left, 10);

            console.log(div.style.top);


            return { top: top + 10, left: left + 10 };
        }
            
    };


    return Window;  
});