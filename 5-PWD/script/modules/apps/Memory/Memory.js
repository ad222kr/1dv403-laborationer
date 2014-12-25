"use strict";
define(["modules/window/window"],
	function(Window){

	var Memory = function(appID){
		// Calling Windows constructor, inhereting its props
		Window.call(this, appID);

		var that = this;


	}

	// Inherits functions on Windows prototype
	Memory.prototype = Object.create(Window.prototype);

	return Memory;
})