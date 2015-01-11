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

    settings: {
        width: 1280,
        height: 640,
        taskBarHeight: 30,
    },
    
    apps: {
        img : {
            constructor: ImageViewer,
            cssClass: "imageViewer icon",
            icon: "pics/taskbar/folder_picture.png"
        },
        mem: {
            constructor: Memory,
            cssClass: "memory icon",
            icon: "pics/taskbar/controller.png",
        },
        rss: {
            constructor: RSSReader,
            cssClass: "rss icon",
            icon: "pics/taskbar/feed.png"
        }
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
        // Creates the taskbar, loops through our applications-array.
        // For each app, creates neccesary elements. 
        var taskbar = document.createElement("div");            
        taskbar.id = "taskbar";
        PWD.div.appendChild(taskbar);

        Object.keys(PWD.apps).forEach(function(key){
            var a = document.createElement("a"),
                img = document.createElement("img");

            a.href = "#";
            img.src = PWD.apps[key].icon;
            img.className = PWD.apps[key].cssClass;

            a.appendChild(img);
            taskbar.appendChild(a);
        });

        taskbar.addEventListener("click", function(e){
            PWD.openApp(e, PWD.apps);
        }, false);       
    },

    openApp: function(e, apps){
        // Opens an application. Param is app-object. Loops through it & checks
        // for similarity in classname. If true, calls apps constructor which is 
        // referenced by the constructor-property on the application-object
        if(!e){ e = window.event; }
        e.preventDefault();
        var target = e.target;

        if(target.tagName === "A") { target = target.firstChild; }
        if(target.tagName === "IMG"){
            Object.keys(apps).forEach(function(key){
                if(apps[key].cssClass === target.className){
                    // Since ImageViewer is the only app that takes 3 args, can 
                    // send them to other aswell. Or check with if-statement?
                    new apps[key].constructor(PWD.settings, true, null);
                }
            });
        }       
    }
}
return PWD;
});