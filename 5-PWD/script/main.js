"uses strict";

require.config({
    "baseUrl": "script/lib",

    paths: {
        "require": "../require",
        "apps": "../modules/apps",
        "modules": "../modules/"
        
    }
});

require(["../modules/desktop"], function(desktop){
    var dp = new desktop("large");
});
