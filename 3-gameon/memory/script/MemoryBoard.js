"use strict";

function MemoryBoard(rows, cols, gameID){

    var that = this;

    var div = document.querySelector("#" + gameID);
    var maxNumberOfMatches = (rows * cols) / 2;
    var numberOfMatches = 0;
    var flippedCount = 0;
    var flippedArr = [];
    var numberOfTries = 0;
<<<<<<< HEAD

=======
>>>>>>> d87bd486ce95ecaf8e1b7ca9576a861ac0d218c2
    this.tiles = [];

    this.start = function(){
        // Starts the game
        this.tiles = RandomGenerator.getPictureArray(cols, rows);
        this.generateTable();

    };
<<<<<<< HEAD

=======
>>>>>>> d87bd486ce95ecaf8e1b7ca9576a861ac0d218c2
    this.flipTile = function(e){
        // Function for flipping a card

        var target = e.target;
<<<<<<< HEAD

        // Loops through the tiles array to check if the clicked picture classname
        // matches with any position. When it finds a match, it sets src to the appropriate picture

=======
>>>>>>> d87bd486ce95ecaf8e1b7ca9576a861ac0d218c2

        if (!target.classList.contains("clicked" && flippedCount < 2)){
            // Loops through the tiles array to check if the clicked picture classname
            // matches with any position. When it finds a match, it sets src to the appropriate picture
            for(var i = 0; i <= this.tiles.length; i++){

<<<<<<< HEAD
            if(target.className == this.tiles[i]){

                target.src = "pics/" + this.tiles[i] + ".png";
            }

        }

        // Pushed the image to an array that will hold the two clicked
        // to compare their classnames to find a match
        // asD
        if(flippedCount <= 2){

            // prevents pushing to the array if the target has already been clicked
            if (!target.classList.contains("clicked")){

                flippedArr.push(target);
                target.classList.add("clicked");
                flippedCount++;
=======
                if(target.className == this.tiles[i]){

                    target.src = "pics/" + this.tiles[i] + ".png";
                }
>>>>>>> d87bd486ce95ecaf8e1b7ca9576a861ac0d218c2
            }
            // Pushed the image to an array that will hold the two clicked
            // to compare their classnames to find a match
            flippedArr.push(target);
            target.classList.add("clicked");
            flippedCount++;
        }

        // calls the checkMatch and resets the array and count for flipped images
        if(flippedArr.length === 2){

            this.checkMatch(flippedArr);
            flippedArr = [];
        }
    };

    this.checkMatch = function(flippedArr){

        numberOfTries++;
        // checks if the two flipped images are the same
        if(flippedArr[0].className == flippedArr[1].className){

            numberOfMatches++;

<<<<<<< HEAD
            // Sets classname of the matched
=======
            // Sets classname of the matched to pair to prevent
            // user from clicking those images again
>>>>>>> d87bd486ce95ecaf8e1b7ca9576a861ac0d218c2
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

        // checks if victory, probably move this to own function later
<<<<<<< HEAD
        if(numberOfMatches == maxNumberOfMatches){

            alert("VICTORY");
        }
=======
        this.checkVictory();
>>>>>>> d87bd486ce95ecaf8e1b7ca9576a861ac0d218c2
    };

    this.generateTable = function(){
        // Creating the table
        var cellCount = 0;
        var table = document.createElement("table");
        var header = document.createElement("h1");
        div.appendChild(header).innerHTML = "memory";
        div.appendChild(table);


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
                img.className = this.tiles[cellCount];
                cellCount++;
            }
        }
        // Adding eventlistener for click to the table
        table.addEventListener("click", function(e){ that.clickFunction(e); });
    };

<<<<<<< HEAD

=======
>>>>>>> d87bd486ce95ecaf8e1b7ca9576a861ac0d218c2
    this.clickFunction = function(e){

        if (!e){ e = window.event}

        // Checks for tagname so flipTale is only called when img is clicked
        // since eventlistener is on the whole table.
        if(e.target.tagName == "IMG" && e.target.className != "pair" && flippedCount < 2){
            that.flipTile(e);
        }
    };

    this.checkVictory = function(){

        if(numberOfMatches == maxNumberOfMatches){
            var p = document.createElement("p")
            p.innerHTML = "Grattis! Det tog dig "+numberOfTries+" att klara spelet!";
            div.appendChild(p);
        }
    }

}
