"use strict";

function MemoryBoard(rows, cols, gameID){
    
    var that = this;

    var div = document.querySelector("#" + gameID);

    this.tiles = [];
    
    
    this.start = function(){
        // Starts the game
        this.tiles = RandomGenerator.getPictureArray(cols, rows);
        this.generateTable();  
        console.log(this.tiles);
        
    };
    
    this.generateTable = function(){
        // Generates the table for the game
        var cellCount = 0;
        var table = document.createElement("table");
        var header = document.createElement("h1");
        div.appendChild(header).innerHTML = "memory";
        div.appendChild(table);
        // Populates each cell with the facedown-image
        for(var i = 0; i < rows; i++){
            
            var row = document.createElement("tr");
            table.appendChild(row);
            
            for(var j = 0; j < cols; j++){
                // Creates cells with a-tag that holds an img-tag
                var cell = document.createElement("td");
                var a = document.createElement("a");
                var img = document.createElement("img");
                a.href = "#";
                img.src = "pics/0.png";
                a.appendChild(img);
                cell.appendChild(a);
                row.appendChild(cell);
                a.className = this.tiles[cellCount];
                cellCount++;
            }
        }
        
        // Eventlistener
        table.addEventListener("click", that.flipTile, false);
    };
    
    this.flipTile = function(e){
        var classname = e.className;
        
        console.log(classname);
        
        
    };
    
    
    
    
    
}