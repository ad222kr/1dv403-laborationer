"use strict";
define(function(){
    
    var Window = function(appID){

        this.height = 300;
        this.width = 280;
        this.positionTop = 0;
        this.positionLeft = 0;
        this.barHeight = 20; // Height of bars
        this.zIndex = 0;
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
            bottomBar = this.createBottomBar();


        div.appendChild(windowDiv);
        windowDiv.appendChild(topBar);
        windowDiv.appendChild(contentDiv); 
        windowDiv.appendChild(bottomBar);

        console.log(windowDiv);
        windowDiv.style.left = this.positionLeft + 10 + "px";
        windowDiv.style.top = this.positionTop + 10 + "px";
        windowDiv.style.zIndex = this.zIndex;
    };

    Window.prototype.createMain = function () {
        var windowDiv = document.createElement("div"); 
        windowDiv.id = this.windowId;    
        windowDiv.className = "window";
        windowDiv.style.width = this.width + "px";
        windowDiv.style.height = this.height + "px";
        //windowDiv.setAttribute("width", this.width + "px");
        
        return windowDiv;
        
    };

    Window.prototype.createContentArea = function(){
        var contentDiv = document.createElement("div");
        contentDiv.className = "wContent";
        contentDiv.style.height = this.height - this.barHeight * 2 + "px";
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

    return Window;  
});