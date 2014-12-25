"use strict";
define(function(){
    
    var Window = function(appID){
        this.height = 200;
        this.width = 200;

        this.getAppId = function(){
            return appID;
        }
        this.createWindow();
        
    };


    Window.prototype.createWindow = function(){
        var div = document.getElementById("desktop"),
            windowDiv = this.createMain(),
            topBar = this.createTopBar();


        div.appendChild(windowDiv);
        windowDiv.appendChild(topBar);
        
    };

    Window.prototype.createMain = function () {
        var windowDiv = document.createElement("div");      
        windowDiv.className = "window";
        windowDiv.style.width = this.width + "px";
        windowDiv.style.height = this.height + "px";
        //windowDiv.setAttribute("width", this.width + "px");
        
        return windowDiv;
        
    };

    Window.prototype.createTopBar = function(){
        var topBar = document.createElement("div");
        var statusText = document.createElement("span");

        topBar.className = "wTopBar";
        statusText.className = "wStatusText";
        statusText.innerHTML = this.getAppId();
        topBar.appendChild(statusText);

        return topBar;

    };

    Window.prototype.createBottomBar = function(){
        var bottomBar = document.createElement("div");
        


    };

    return Window;  
});