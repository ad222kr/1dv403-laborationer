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
        // Loops through the tiles array to check if the clicked picture classname
        // matches with any position. When it finds a match, it sets src to the appropriate picture
        for(var i = 0; i <= that.tiles.length; i++){
            
            if(flippedCount <= 2 && target.className == that.tiles[i]){
                target.src = "pics/" + that.tiles[i] + ".png";
                
            }
        }
        // Pushed the image to an array that will hold the two clicked
        // to compare their classnames to find a match
        if(flippedCount <= 2){
            flippedArr.push(target);    
        }
        
        // calls the checkMatch and resets the array and count for flipped images
        if(flippedCount == 2){
            
            that.checkMatch(flippedArr);
            flippedArr = [];
        }
        
    };
    
    this.checkMatch = function(flippedArr){

        
            // checks if the two flipped images are the same
        if(flippedArr[0].className == flippedArr[1].className){
            alert("MATCH");
            numberOfMatches++;
        }
        
        
        
        // if not, flips them back
        else {
            setTimeout(function() {
            
            for (var i = 0; i < flippedArr.length; i++){
              
                flippedArr[i].src = "pics/0.png";
            }
            flippedCount = 0;
        }, 1000);
        }
        
        
        // checks if victory, probably move this to own function later
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
        
        // Eventlistener only when count is less than 2
        if (flippedCount < 2){
            table.addEventListener("click", function(e){
            if (!e){ e = window.event}
            console.log(e.target.tagName);
            // Checks for tagname so flipTale is only called when img is clicked
            // since eventlistener is on the whole table
            if(e.target.tagName == "IMG"){
                that.flipTile(e);
            }
            
        });}
        // if count is 2, remove eventlistener to prevent more images from being flipped
        // before they are flipped back to face down
        else if(flippedCount == 2){
            table.removeEventListener("click");
        }
        
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