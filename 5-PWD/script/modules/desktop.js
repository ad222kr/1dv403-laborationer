"use strict";

define(
    [
        "Mustache",
        "Window", 
        "jquery",
        "Apps/Memory/MemoryBoard",
        "Apps/Memory/random"
    ],
    function(Mustache, Window, $){

        var div = $('#desktop');
        var memory = new MemoryBoard(2, 2, div);


    }
)
