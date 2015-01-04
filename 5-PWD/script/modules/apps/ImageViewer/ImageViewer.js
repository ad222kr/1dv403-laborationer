"use strict";
define(["modules/window/window"],
function(Window){

var ImageViewer = function(appID, isGallery, imgObject){

	var url = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/";
	this.settings = {
		height: 300,
		width: 500,
		icon: "pics/taskbar/folder_picture.png",
	};

	this.getUrl = function(){
		return url;
	};

	Window.call(this, this.settings, appID);
	this.winDiv = document.getElementById(this.windowId);
	// Boolean to decide if window should be gallery or big picture
	if (isGallery){
		this.setLoading();
		this.getPics(this.winDiv);	
	}
	else{
		this.showFullPic(this.windowId, imgObject);
	}
};

ImageViewer.prototype = Object.create(Window.prototype);

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

	xhr.open("GET", this.getUrl(), true);
	xhr.send(null);
};

ImageViewer.prototype.renderThumbs = function(imgArr, winDiv){

	var maxThumbHeight = 0,
		maxThumbWidth = 0,
		that = this,
		contentDiv = winDiv.firstChild.nextSibling;

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
		var div = document.createElement("div");
		var a = document.createElement("a");
		var img = document.createElement("img");

		div.className = "thumbDiv";
		a.href = "#";
		img.className = "thumbURL";

		img.src = element.thumbURL;

		div.style.width = maxThumbWidth+"px";
		div.style.height = maxThumbHeight+"px";
		contentDiv.appendChild(div);
		div.appendChild(a);
		a.appendChild(img);

		a.addEventListener("click", function(){
			that.clickFunc(imgArr[index]);
		}, false);			
	});

};

ImageViewer.prototype.clickFunc = function(imgObject){
	new ImageViewer("ImageViewer", false, imgObject);
};

ImageViewer.prototype.showFullPic = function(id, imgObject){
	var div = document.getElementById(id),
		content = div.firstChild.nextSibling, // Firstchild is topbar
		img = document.createElement("img");

	div.style.width = imgObject.width + "px";
	div.style.height = (imgObject.height + this.barHeight * 2 ) + "px";
	content.style.height = imgObject.height + "px"; // Tried setting heigh to imgObject.height but scrollbars visible then?
	content.style.overflow = "hidden"; // w/o this scrollbars are visible even though they are not needed
	console.log(content);
	img.src = imgObject.URL;
	content.appendChild(img);
};

return ImageViewer;
});