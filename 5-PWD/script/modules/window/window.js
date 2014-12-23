"use strict";
define(function(){
    
    var Window = function(appID){
        this.height = 300;
        this.width = 300;

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
        
        return windowDiv;
        
    };

    Window.prototype.createTopBar = function(){
        var topBar = document.createElement("div");
        var statusText = document.createElement("span");

        topBar.className = "wTopBar";
        statusText.className = "wStatusText";

        topBar.appendChild(statusText);

        return topBar;

    };

    Window.prototype.createBottomBar = function(){
        var bottomBar = document.createElement("div");
        var 


    };






    return Window;  
});