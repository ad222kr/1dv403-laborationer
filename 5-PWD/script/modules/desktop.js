"use strict";

define(
[
"../modules/window/window",
"require",
"apps/Memory/Memory",
"apps/ImageViewer/ImageViewer",
"apps/RSSReader/RSSReader"
],
function(Window, require, Memory, ImageViewer, RSSReader){

var Desktop = function(size){
    this.div = document.getElementById("desktop");
    this.icons = {
        imgViewer: "pics/taskbar/folder_picture.png",
        memory: "pics/taskbar/controller.png",
        rss: "pics/taskbar/feed.png",
    }
    this.setSize = function(_size){
        size = _size;
    };
    this.getSize = function(){
        return size;
    };

    this.createDesktop(this.div);
    new RSSReader("RSS");
};

Desktop.prototype.createDesktop = function(div){
    var that = this;
    div.className = this.getSize();
    this.createTaskBar(div)
    

   /* Listener for contextmeny
   div.addEventListener("contextmenu", function(e){
        e.preventDefault();
        that.showContextMenu(e);
    })   
    div.addEventListener("click", function(e){

    }) */       

};

Desktop.prototype.createTaskBar = function(div){
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
                    new ImageViewer("ImageViewer", true);
                    break;
                case "rss icon":
                    new RSSReader("RSS");
                    break;
            }
        }
    });
};

/*Desktop.prototype.showContextMenu = function(e){
    // contextmenu implement later?

    var menu = document.createElement("div");
    menu.innerHTML = "TJenare";
    menu.style.display = "block";
    menu.style.position = "absolute";
    menu.style.left = e.pageX - this.div.offsetLeft + "px"; //clientX - no scrolling accounted
    menu.style.top = e.pageY - this.div.offsetTop + "px"; // clientY - no scrolling accounted
    menu.style.visibility = "visible";
    this.div.appendChild(menu);
    console.log(this.div.offsetLeft);
    console.log(this.div.offsetTop);
};*/

return Desktop;
});

