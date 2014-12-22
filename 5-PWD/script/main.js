"uses strict";

require.config({
    baseUrl: 'script/lib',

    paths: {
        Mustache: 'mustache',
        Jquery: 'jquery',
        Window: '../modules/window/window',
        Apps: '../modules/apps',
        
    }
});

require(["../modules/desktop"], function(desktop){
    //This function is called when scripts/lib/modules/desktop.js is loaded.
    //If desktop.js calls define(), then this function is not fired until
    //desktops's dependencies have loaded, and the desktop argument will hold
    //the module value for "modules/desktop".
});