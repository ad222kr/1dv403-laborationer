"use strict";

function MemoryBoard(rows, cols, gameID){
    
    var that = this;

    var div = document.querySelector("#" + gameID);
    var maxNumberOfMatches = (rows * cols) / 2;
    var numberOfMatches = 0;
    var flippedCount = 0;
    var flippedArr = [];

    this.tiles = [];
    
    
    this.start = function(){
        // Starts the game
        this.tiles = RandomGenerator.getPictureArray(cols, rows);
        this.generateTable();  
        console.log(this.tiles);
        
    };
    
    this.flipTile = function(e){
        var target = e.target;
         flippedCount++;
        for(var i = 0; i <= that.tiles.length; i++){
            
            if(flippedCount <= 2 && target.className == that.tiles[i]){
                target.src = "pics/" + that.tiles[i] + ".png";
                
            }
            
            
        }
        if(flippedCount <= 2){
            flippedArr.push(target);    
        }
        
        console.log(flippedCount);
        console.log(flippedArr);
        
        if(flippedCount == 2){
            
            that.checkMatch(flippedArr);
            flippedArr = [];
            flippedCount = 0;
        }
        
        
       
    };
    
    this.checkMatch = function(flippedArr){
        if(flippedArr[0].className == flippedArr[1].className){
            
            alert("MATCH");
            numberOfMatches++;
            
        } 
        else
        {
          for (var i = 0; i < flippedArr.length; i++){
              
              flippedArr[i].src = "pics/0.png";
          }
        }
        
        if(numberOfMatches == maxNumberOfMatches){
            
            alert("VICTORY");
        }
        
        
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
                img.className = this.tiles[cellCount];
                cellCount++;
            }
        }
        
        // Eventlistener
        table.addEventListener("click", function(e){
            
            that.flipTile(e);    
        });
    };
    
    
}

// alternative this.flipTile
// switch (target.className) {
        //     case "1":
        //         target.src ="pics/1.png";
        //         break;
        //     case "2":
        //         target.src ="pics/2.png";
        //         break;
        //     case "3":
        //         target.src ="pics/3.png";
        //         break;
        //     case "4":
        //         target.src ="pics/4.png";
        //         break;
        //     case "5":
        //         target.src ="pics/5.png";
        //         break;
        //     case "6":
        //         target.src ="pics/6.png";
        //         break;
        //     case "7":
        //         target.src ="pics/7.png";
        //         break;
        //     case "8":
        //         target.src ="pics/8.png";
        //         break;
        //}