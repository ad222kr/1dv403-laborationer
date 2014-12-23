"uses strict";

require.config({
    "baseUrl": "script/lib",

    paths: {
        "mustache": "mustache",
        "window": "../modules/window/window",
        "require": "../require",
        "apps": "../modules/apps",
        
    }
});

require(["../modules/desktop"], function(desktop){
    var dp = new desktop("xsmall");
});
