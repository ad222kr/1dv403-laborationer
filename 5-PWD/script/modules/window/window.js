"use strict";
define(function(){
    
    var Window = function(appID){

        this.height = 300;
        this.width = 280;
        this.barHeight = 20; // Height of bars

        

        this.getAppId = function(){
            return appID;
        }
        this.createWindow();
        this.contentDiv = document.querySelector(".wContent");

        console.log(this.contentDiv);
        
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
        
    };

    Window.prototype.createMain = function () {
        var windowDiv = document.createElement("div");      
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

        closeA.addEventListener("click", that.close, false);

        return topBar;

    };

    Window.prototype.createBottomBar = function(){
        var bottomBar = document.createElement("div");

        bottomBar.className = "wBottomBar";

        return bottomBar;
    };


    Window.prototype.close = function(){
        var div = document.querySelector("#desktop");
        var win = document.querySelector(".window");
        desktop.removeChild(win);
    };

    return Window;  
});