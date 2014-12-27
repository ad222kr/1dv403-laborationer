"uses strict";

require.config({
    "baseUrl": "script/lib",

    paths: {
        "mustache": "mustache",
        "require": "../require",
        "apps": "../modules/apps",
        "modules": "../modules/"
        
    }
});

require(["../modules/desktop"], function(desktop){
    var dp = new desktop("large");
});
