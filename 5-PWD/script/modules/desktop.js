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

        // TODO: Event delegation? Click on whole desktop && check for windows ID etc
    	var Desktop = function(size){

            this.div = document.getElementById("desktop");

            // Getter & Setter for size, might add functionality
            // to change desktop resolution later
            this.setSize = function(_size){
                size = _size;
            };
            this.getSize = function(){
                return size;
            };

            this.getIcons = function(){
                // Icon-array to iterate over it when creating toolbar?
                var icons = {
                    imgViewer: "pics/taskbar/folder32.png",
                }
                return icons;
            }

            this.createDesktop(this.div);
            var mem = new Memory("Memory");

        };

        Desktop.prototype.createDesktop = function(div){
            var that = this;
            div.className = this.getSize();
            this.createTaskBar(div); 


           /* Listener for contextmeny
           div.addEventListener("contextmenu", function(e){
                e.preventDefault();
                that.showContextMenu(e);
            })   
            div.addEventListener("click", function(e){

            }) */       

        };

        Desktop.prototype.createTaskBar = function(div, icons){
            var that = this;
            // Creating elements for the fskbar
            // Setting icons on the taskbar
            var icons = this.getIcons();
            var taskbar = document.createElement("div");
            taskbar.id = "taskbar";
            taskbar.style.zIndex = 5;
            div.appendChild(taskbar);

            // Icons for imageviewer
            var imgViewerA = document.createElement("a");
            var imgViewerImg = document.createElement("img");
            imgViewerA.href = "#";
            imgViewerImg.src = icons.imgViewer;
            imgViewerA.appendChild(imgViewerImg);
            taskbar.appendChild(imgViewerA);

            // adding listeners, move to function when more apps?
            imgViewerA.addEventListener("click", function(e){
                e.preventDefault();
                var img = new ImageViewer("ImageViewer", true);

            })

            
        };

        Desktop.prototype.addListeners = function(arrOfIcons){

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
    }
)
