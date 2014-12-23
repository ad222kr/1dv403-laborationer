"use strict";

define(
    [
        "mustache",
        "window",
        "require",
        "apps/Memory/MemoryBoard"
    ],
    function(mustache, Window, require){

        // Constructor
    	var Desktop = function(size){
            // Ref to div for passing around
            this.div = document.getElementById("desktop");

            // Getter & Setter for size, might add functionality
            // to change desktop resolution later
            this.setSize = function(_size){
                size = _size;
            };
            this.getSize = function(){
                return size;
            }

            this.getTaskBarSize = function(){
                if(size === "xsmall"){
                    return 800;
                } else if(size ==="small"){
                    return 1024;
                } else {
                    return 1280;
                }
            }

            this.createDesktop(this.div);

        };

        Desktop.prototype.createDesktop = function(div){
            var that = this;
            div.className = this.getSize();

            this.createTaskBar(div);
            

        };

        Desktop.prototype.createTaskBar = function(div){
            var that = this;
            // Creating elements for the footer
            var taskbar = document.createElement("div");
            taskbar.id = "taskbar";
            taskbar.className = this.getTaskBarSize();
            div.appendChild(taskbar);
        }
        return Desktop;
    }
)
