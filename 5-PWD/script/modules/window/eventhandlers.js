"use strict";

define(function(){

var EventHandlers = {


	openApp: function(e){
		if(!e) { e = window.event; }
		console.log(desktop);
		var target = e.target,
			Memory,
			ImageViewer,
			RSSReader;
		e.preventDefault();

		if(target.tagName === "A"){
			target = target.firstChild;
		}

		if(target.tagName === "IMG"){
			switch(target.className){
				case "memory icon":
					Memory = require("apps/Memory/Memory");
					new Memory("Memory");
					break;
				case "imageViewer icon":
					ImageViewer = require("apps/ImageViewer/ImageViewer");
					new ImageViewer("ImageViewer", true, null)
					break;
				case "rss icon":
					RSSReader = require("apps/RSSReader/RSSReader");
					new RSSReader("RSS");
					break;
			}
		}

	},

	draggable: function(e, desktop, windowDiv, handle){
		
	},
	

};


return EventHandlers
	
});