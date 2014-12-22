"use strict";

function MemoryBoard(rows, cols, gameID){

    var that = this;

    var div = $(gameID);
    var maxNumberOfMatches = (rows * cols) / 2;
    var numberOfMatches = 0;
    var flippedCount = 0;
    var flippedArr = [];
    var numberOfTries = 0;
    this.tiles = [];

    this.start = function(){
        // Starts the game
        this.tiles = RandomGenerator.getPictureArray(cols, rows);
        this.generateTable();
        console.log(this.tiles);



    };
    this.flipTile = function(target){
        
        // Function for flipping a card
        if (!target.classList.contains("clicked")){
            // Loops through the picarray and checks agains i to find the appropriate 
            // pictures index
            for(var i = 0; i < this.tiles.length; i++){

                if(target.className == i){

                    target.src = "pics/" + this.tiles[i] + ".png";
                }
            }
            // Pushed the image to an array that will hold the two clicked
            // to compare their classnames to find a match
            flippedArr.push(target);
            target.classList.add("clicked");
            flippedCount++;
        }

        // Calls the checkMatch and resets the array and count for flipped images
        if(flippedArr.length === 2){

            this.checkMatch(flippedArr);
            flippedArr = [];
        }
    };

    this.checvkMatch = function(flippedArr){

        // Adds a try, then checks if the images match       
        numberOfTries++;
        if(flippedArr[0].src === flippedArr[1].src){

            numberOfMatches++;

            // Sets classname of the matched to pair to prevent
            // user from clicking those images again
            for(var i = 0; i < flippedArr.length; i++){

                flippedArr[i].className = "pair";
            }
            flippedCount = 0;   
        }

        // if not, flips them back
        else {
            setTimeout(function() {

                for (var i = 0; i < flippedArr.length; i++){

                    flippedArr[i].src = "pics/0.png";
                    flippedArr[i].classList.remove("clicked");
                }
                flippedCount = 0;
            }, 1000);
        }
        

        this.checkVictory();
    };

    this.generateTable = function(){
        // Creating the table
        var cellCount = 0;
        var table = document.createElement("table");
        var header = document.createElement("h1");
        div.append(header).innerHTML = "memory";
        div.append(table);


        // Generating cells and populating with the face-down image
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
                img.className = cellCount;
                cellCount++;
                
            }
        }
        // Eventlistener on the whole table
        table.addEventListener("click", function(e){
                    that.clickFunction(e);
                });
        table.addEventListener("keydown", function(e){
            if(e.keyCode === 13){
                e.preventDefault(); // Prevents the second tile from flipping back even when it's a pair when using enter, why?
                that.clickFunction(e);
            }
        });

    };

    this.clickFunction = function(e){
        if(!e){ e = window.event; }
        var target = e.target;
        
        // For playing the game with tab and enter, since it tabs on the a-tags
        // target needs to be IMG
        if(target.tagName !== "IMG"){
            target = target.firstElementChild;
        }
        
        if(target.tagName === "IMG" && e.target.className != "pair" && flippedCount < 2){
                this.flipTile(target);
        }        
    };  

    this.checkVictory = function(){

        if(numberOfMatches == maxNumberOfMatches){
            var p = document.createElement("p")
            p.innerHTML = "Grattis! Det tog dig "+numberOfTries+" att klara spelet!";
            div.appendChild(p);
        }
    };

    this.start();
}