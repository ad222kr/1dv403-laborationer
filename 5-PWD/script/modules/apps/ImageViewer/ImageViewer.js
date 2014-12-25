"use strict";
define(["modules/window/window"],
	function(Window){

	var ImageViewer = function(appID){
		// Calling Windows constructor, inhereting props
		Window.call(this, appID);

	}


	// Inherits functions on Window prototype
	ImageViewer.prototype = Object.create(Window.prototype);

	return ImageViewer;
})