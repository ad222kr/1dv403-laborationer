"use strict";

define(
[
"modules/window/window",
"require",
"apps/Memory/Memory",
"apps/ImageViewer/ImageViewer",
"apps/RSSReader/RSSReader"
],
function(Window, require, Memory, ImageViewer, RSSReader){

var PWD = {
    settings: {
        width: 1280,
        height: 800,
        taskBarHeight: 30,
    },
    div: document.getElementById("desktop"),
    icons:  {
        imgViewer: "pics/taskbar/folder_picture.png",
        memory: "pics/taskbar/controller.png",
        rss: "pics/taskbar/feed.png",      
    },
    init: function(){
        PWD.setDimensions();
        PWD.createTaskBar();
    },

    setDimensions: function(){
        PWD.div.style.backgroundSize = PWD.settings.width + "px " + PWD.settings.height + "px";
        PWD.div.style.height = PWD.settings.height + "px";
        PWD.div.style.width = PWD.settings.width + "px";
        
    },

    createTaskBar: function(){
        var taskbar = document.createElement("div");
        taskbar.id = "taskbar";
        PWD.div.appendChild(taskbar);

        // Icons for imageviewer
        var imgViewerA = document.createElement("a");
        var imgViewerImg = document.createElement("img");
        imgViewerA.href = "#";
        imgViewerImg.src = this.icons.imgViewer;
        imgViewerImg.className = "imageViewer icon";
        imgViewerA.appendChild(imgViewerImg);
        taskbar.appendChild(imgViewerA);

        var memoryImg = document.createElement("img");
        var memoryA = document.createElement("a");
        memoryA.href = "#";
        memoryImg.src = this.icons.memory;
        memoryImg.className = "memory icon";
        memoryA.appendChild(memoryImg);
        taskbar.appendChild(memoryA);

        var rssImg = document.createElement("img");
        var rssA = document.createElement("a");
        rssA.href = "#";
        rssImg.src = this.icons.rss;
        rssImg.className = "rss icon";
        rssA.appendChild(rssImg);
        taskbar.appendChild(rssA);

        taskbar.addEventListener("click", PWD.openApp, false);       
    },

    openApp: function(e){
        if(!e){ e = window.event; }
        e.preventDefault();
        var target = e.target;

        if(target.tagName === "A") { target = target.firstChild; }
        if(target.tagName === "IMG"){
            switch(target.className){
                case "memory icon":
                    new Memory(PWD.settings);
                    break;
                case "imageViewer icon":
                    new ImageViewer(PWD.settings, true, null);
                    break;
                case "rss icon":
                    new RSSReader(PWD.settings);
                    break;
            }
        }  
    }
}

return PWD;

});