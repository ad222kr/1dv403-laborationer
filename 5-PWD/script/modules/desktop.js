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
    div: document.getElementById("desktop"),
    icons:  {
        imgViewer: "pics/taskbar/folder_picture.png",
        memory: "pics/taskbar/controller.png",
        rss: "pics/taskbar/feed.png",      
    },
    width: 1280,
    height: 720,


    init: function(){
        PWD.setDimensions();
        PWD.createTaskBar();
    },

    setDimensions: function(){

        PWD.div.style.height = PWD.height + "px";
        PWD.div.style.width = PWD.width + "px";
        PWD.div.style.backgroundSize = PWD.width + "px " + PWD.height + "px";


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

        taskbar.addEventListener("click", function(e){
            if(!e){e=window.event;}
            e.preventDefault();
            var target = e.target;
            if (target.tagName === "A"){
                target = target.firstChild;
            }
            if(target.tagName === "IMG"){
                switch(target.className){
                    case "memory icon":
                        new Memory("Memory");
                        break;
                    case "imageViewer icon":
                        new ImageViewer("ImageViewer", true, null);
                        break;
                    case "rss icon":
                        new RSSReader("RSS");
                        break;
                }
            }
        });
    }



}

return PWD;
/*

DESKTOP.desktop = function(){
    this.div = document.getElementById("desktop");
    this.icons = {
        imgViewer: "pics/taskbar/folder_picture.png",
        memory: "pics/taskbar/controller.png",
        rss: "pics/taskbar/feed.png",
    }


    this.width = 1280;
    this.height = 720;

    this.createDesktop(this.div);
};

DESKTOP.desktop.prototype.createDesktop = function(div){
    var that = this;
    div.style.height = this.height + "px";
    div.style.width = this.width + "px";
    div.style.backgroundSize = this.width + "px " + this.height + "px";
    this.createTaskBar(div)
};

DESKTOP.desktop.prototype.createTaskBar = function(div){
    var taskbar = document.createElement("div");
    taskbar.id = "taskbar";
    div.appendChild(taskbar);

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

    taskbar.addEventListener("click", function(e){
        if(!e){e=window.event;}
        e.preventDefault();
        var target = e.target;
        if (target.tagName === "A"){
            target = target.firstChild;
        }
        if(target.tagName === "IMG"){
            switch(target.className){
                case "memory icon":
                    new Memory("Memory");
                    break;
                case "imageViewer icon":
                    new ImageViewer("ImageViewer", true, null);
                    break;
                case "rss icon":
                    new RSSReader("RSS");
                    break;
            }
        }
    });
};
return DESKTOP.desktop;
*/

});

