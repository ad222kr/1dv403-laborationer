"use strict";
define(["modules/window/window"],
	function(Window){

	var ImageViewer = function(appID){
		Window.call(this, appID);

		var url = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/";
		this.getUrl = function(){
			return url;
		}

	}
	ImageViewer.prototype = Object.create(Window.prototype);


	ImageViewer.prototype.getPics = function(){
		var xhr = new XMLHttpRequest();
		var response;

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					response = JSON.parse(xhr.responseText);
					console.log(response);
					
					
				}
				else{
					console.log("Läsfel, status: "+xhr.status);
				}
			}
		}

		xhr.open("GET", this.getUrl(), true);
		xhr.send(null);

		



	};

	

	return ImageViewer;
})