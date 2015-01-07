"use strict";
define(["modules/window/window", "apps/Memory/random"],
function(Window, Random){

var Memory = function(appID){

    this.settings = {
        height: 250,
        width: 200,
        icon: "pics/taskbar/controller.png",
    };

    this.rows = 4;
    this.cols = 4;
    this.maxNumberOfMatcher = (this.rows / this.cols) / 2;
    this.numberOfMatches = 0;
    this.flippedCount = 0;
    this.flippedArr = [];
    this.numberOfTries = 0;
    this.tiles = [];

    // Calling Windows constructor, inhereting its props
    Window.call(this, appID);        
    this.startGame();
};
// Inherits functions on Windows prototype
Memory.prototype = Object.create(Window.prototype);

Memory.prototype.startGame = function(){
    this.tiles = Random.getPictureArray(this.cols, this.rows);
    this.generateTable();
};

Memory.prototype.settingsMenu = function(){
    alert("Memory Settings clicked!");
};

Memory.prototype.flipTile = function(target){
    if (!target.classList.contains("clicked")  && this.flippedCount < 2){

        for(var i = 0; i < this.tiles.length; i++){
            if(target.className == i){
                target.src = "pics/memory/" + this.tiles[i] + ".png";
            }
        }
        this.flippedArr.push(target);
        target.classList.add("clicked");
        this.flippedCount++;
    }
    
    if(this.flippedArr.length === 2){
        this.checkMatch(this.flippedArr);
        this.flippedArr = [];           
    }
};

Memory.prototype.checkMatch = function(flippedArr){
    var that = this;
    this.numberOfTries++;

    if(flippedArr[0].src === flippedArr[1].src){
        this.numberOfMatches++;
        for(var i = 0; i < flippedArr.length; i++){
            flippedArr[i].className = "pair";   
        }
        this.flippedCount = 0;
    }
    else{
        setTimeout(function(){
            for(var i = 0; i < flippedArr.length; i++){
                flippedArr[i].src = "pics/memory/0.png";
                flippedArr[i].classList.remove("clicked");  
            }
            that.flippedCount = 0;
        }, 1000);
    }
};

Memory.prototype.generateTable = function(){
    var that = this;
    var contentDiv = document.getElementById(this.windowId).firstChild.nextSibling;
    var div = document.createElement("div");
    var cellCount = 0;
    var table = document.createElement("table");
    div.className = "memoryGame";
    div.style.width = this.rows * 24 + "px";
    contentDiv.appendChild(div);
    div.appendChild(table);
    
    for(var i = 0; i < this.rows; i++){

        var row = document.createElement("tr");
        table.appendChild(row);

        for(var j = 0; j < this.cols; j++){
            // Creates cells with a-tag that holds an img-tag
            var cell = document.createElement("td");
            var a = document.createElement("a");
            var img = document.createElement("img");
            a.href = "#";
            img.src = "pics/memory/0.png";
            a.appendChild(img);
            cell.appendChild(a);
            row.appendChild(cell);
            img.className = cellCount;
            cellCount++;                
        }
    }
    // Eventlistener on the whole table
    table.addEventListener("click", function(e){
                that.clickFunc(e);
            });
    table.addEventListener("keydown", function(e){
        if(e.keyCode === 13){
            e.preventDefault(); // Prevents the second tile from flipping back even when it's a pair when using enter, why?
            that.clickFunc(e);
        }
    });
};

Memory.prototype.clickFunc = function(e){
    if (!e) { e = window.event; }
    var target = e.target;

    if (target.tagName !== "IMG"){
        target = target.firstElementChild;
    }
    if (target.tagName === "IMG" && target.className != "pair"){
        this.flipTile(target);
    }
};

/*Memory.prototype.timer = function(){
    var contentDiv = document.getElementById(this.windowId).firstChild.nextSibling;
    var timerDiv = document.createElement("div");

    contentDiv.appendChild(timerDiv);

    var seconds = 0;
    var minutes = 0;

    if (this.numberOfMatches < this.maxNumberOfMatcher){
        setInterval(function(){
            if (seconds <= 59){
                seconds++;
            }
            else{
                minutes++;
                seconds = 0;
            }
            timerDiv.innerHTML = "Time: " + (minutes < 10 ? "0"+minutes : minutes) + ":" + (seconds < 10 ? "0"+seconds : seconds);

        }, 1000)
    }
    else{
        timerDiv.innerHTML = timerDiv.innerHTML = "Time: " + (minutes < 10 ? "0"+minutes : minutes) + ":" + (seconds < 10 ? "0"+seconds : seconds);
    }
}*/ 
return Memory;
});