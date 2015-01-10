"use strict";
define(["modules/window/window"],
function(Window){

var ImageViewer = function(desktopSettings, isGallery, imgObject){

    this.settings = {
        height: imgObject !== null ? (imgObject.height + 40) : 300,
        width: imgObject !== null ? imgObject.width  : 500,
        icon: "pics/taskbar/folder_picture.png",
        appID : "ImageViewer"
    };
    Window.call(this, desktopSettings);
    

    this.getIsGallery = function(){
        return isGallery;
    }

    this.getImgObject = function(){
        return imgObject;
    }
    this.checkIfGallery();
};

ImageViewer.prototype = Object.create(Window.prototype);

ImageViewer.prototype.url = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/"

ImageViewer.prototype.checkIfGallery = function(){
    if(this.getIsGallery() === true){
        this.setLoading();
        this.getPics(this.winDiv);
    }
    else{
        this.showFullPic(this.windowId, this.getImgObject());
    }
}

ImageViewer.prototype.getPics = function(div){
    var that = this;
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                that.renderThumbs(JSON.parse(xhr.responseText), div);
                that.setLoaded();               
            }
            else{
                console.log("Läsfel, status: "+xhr.status);
            }
        }
    };

    xhr.open("GET", this.url, true);
    xhr.send(null);
};

ImageViewer.prototype.renderThumbs = function(imgArr, winDiv){

    var maxThumbHeight = 0,
        maxThumbWidth = 0,
        that = this,
        contentDiv = document.getElementById(this.windowId).querySelector(".wContent");

    // Getting the highest thumbwidth/height
    imgArr.forEach(function(element){
        if (maxThumbWidth < element.thumbWidth){
            maxThumbWidth = element.thumbWidth;
        }
        if (maxThumbHeight < element.thumbHeight){
            maxThumbHeight = element.thumbHeight;
        }
    });

    imgArr.forEach(function(element, index){

        // Creates each element for the thumbpic.
        var div = document.createElement("div"),
            a = document.createElement("a"),
            img = document.createElement("img");
        div.style.width = maxThumbWidth+"px";
        div.style.height = maxThumbHeight+"px";
        contentDiv.appendCh

        
        a.href = "#";
        div.className = "thumbDiv";
        img.className = "thumbURL";

        img.src = element.thumbURL;
        contentDiv.appendChild(div);
        div.appendChild(a);
        a.appendChild(img);

        // Fix on table & check 
        a.addEventListener("click", function(){
            that.clickFunc(imgArr[index]);
        }, false);          
    });

};

ImageViewer.prototype.clickFunc = function(imgObject){
    new ImageViewer(this.getPWDSettings(), false, imgObject);
};

ImageViewer.prototype.showFullPic = function(id, imgObject){
    var div = document.getElementById(id),
        content = div.firstChild.nextSibling, // Firstchild is topbar
        img = document.createElement("img");
    
    img.src = imgObject.URL;
    content.appendChild(img);

};

return ImageViewer;
});