"use strict";
define(["modules/window/window"],
	function(Window){

	var ImageViewer = function(appID, isGallery, imgObject){
		

		var url = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/";
		this.settings = {
			height: 400,
			width: 300,
		};
		

		
		this.getUrl = function(){
			return url;
		};
		Window.call(this, this.settings, appID);
		this.winDiv = document.getElementById(this.windowId);
		// Boolean to decide if window should be gallery or big picture
		if (isGallery){
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

		var maxThumbHeight = 0;
		var maxThumbWidth = 0;
		var that = this;
		var contentDiv = winDiv.firstChild.nextSibling;

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
		var div = document.getElementById(id);
		var content = div.firstChild.nextSibling; // Firstchild is topbar
		var img = document.createElement("img");
		div.style.width = imgObject.width + "px";
		div.style.height = imgObject.height + this.barHeight * 2 + "px";
		content.style.height = "auto"; // Tried setting heigh to imgObject.height but scrollbars visible then?
		img.src = imgObject.URL;
		content.appendChild(img);
	};

	

	return ImageViewer;
});