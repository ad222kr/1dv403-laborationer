"use strict";

function MemoryBoard(rows, cols, gameID){
    
    var that = this;
    
    // Gets reference to the gameboard, setting float so boards line up next to eachother
    var div = document.querySelector("#" + gameID);
    div.style.float = "left";
    
    
    // Randomizes array for the pictures
    this.tiles = RandomGenerator.getPictureArray(cols, rows);
    
    this.start = function(){
        // Starts the game
        
        // Create a header
        
        this.generateTable();    
        
    };
    
    this.generateTable = function(){
        
        // Generates the table for the game
        var table = document.createElement("table");
        var header = document.createElement("h1");
        div.appendChild(header).innerHTML = "memory";
        div.appendChild(table);
        for(var i = 1; i <= rows; i++){
            
            var row = document.createElement("tr");
            table.appendChild(row);
            
            for(var j = 1; j <= cols; j++){
                
                var cell = document.createElement("td");
                row.appendChild(cell);
            }
        }
    };
    
    
}