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

    apps: [
        {
            name: "imageViewer",
            icon: "pics/taskbar/folder_picture.png",
        },
        {
            name: "memory",
            icon: "pics/taskbar/controller.png"
        },
        {
            name: "rss",
            icon: "pics/taskbar/feed.png"
        }
    ],



    init: function(){
        PWD.setDimensions();
        PWD.createTaskBar();
        console.log(PWD.apps);
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

        PWD.apps.forEach(function(element, index){
            var a = document.createElement("a"),
                img = document.createElement("img");

            a.href = "#";
            img.src = element.icon;
            img.className = element.name + " icon";
            
            a.appendChild(img);
            taskbar.appendChild(a);
        });

        taskbar.addEventListener("click", PWD.openApp, false);       
    },

    openApp: function(e){
        if(!e){ e = window.event; }
        e.preventDefault();
        var target = e.target;
        console.log(Memory);

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