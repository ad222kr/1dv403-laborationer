"use strict";

define(
    [
        "mustache",
        "../modules/window/window",
        "require",
        "apps/Memory/Memory",
        "apps/ImageViewer/ImageViewer",
    ],
    function(mustache, Window, require, Memory, ImageViewer){

        // Constructor
    	var Desktop = function(size){
            // Ref to div for passing around
            var div = document.getElementById("desktop");


            // Getter & Setter for size, might add functionality
            // to change desktop resolution later
            this.setSize = function(_size){
                size = _size;
            };
            this.getSize = function(){
                return size;
            };

            this.getIcons = function(){
                var icons = {
                    imgViewer: "pics/taskbar/folder32.png",
                }
                return icons;
            }

            this.createDesktop(div);
            var img = new ImageViewer("ImageViewer");

        };

        Desktop.prototype.createDesktop = function(div){
            var that = this;
            div.className = this.getSize();

            this.createTaskBar(div);            

        };

        Desktop.prototype.createTaskBar = function(div, icons){
            var that = this;
            // Creating elements for the fskbar
            // Setting icons on the taskbar
            var icons = this.getIcons();
            var taskbar = document.createElement("div");
            taskbar.id = "taskbar";
            div.appendChild(taskbar);

            // Icons for imageviewer
            var imgViewerA = document.createElement("a");
            var imgViewerImg = document.createElement("img");
            imgViewerA.href = "#";
            imgViewerImg.src = icons.imgViewer;
            imgViewerA.appendChild(imgViewerImg);
            taskbar.appendChild(imgViewerA);

            // adding listeners
            this.addListeners()

            
        };

        Desktop.prototype.addListeners = function(arrOfIcons){

        };


        return Desktop;
    }
)
