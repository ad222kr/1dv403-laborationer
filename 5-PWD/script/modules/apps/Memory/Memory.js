"use strict";
define(["modules/window/window", "apps/Memory/random"],
function(Window, Random){

var Memory = function(desktopSettings){

    this.settings = {
        height: 200,
        width: 200,
        icon: "pics/taskbar/controller.png",
        appID: "Memory",
    };

    this.rows = 4;
    this.cols = 4;
    this.maxNumberOfMatcher = (this.rows * this.cols) / 2;
    this.numberOfMatches = 0;
    this.flippedCount = 0;
    this.flippedArr = [];
    this.numberOfTries = 0;
    this.tiles = [];

    // Calling Windows constructor, inhereting its props
    Window.call(this, desktopSettings);        
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

    if(this.numberOfMatches === this.maxNumberOfMatcher){
        console.log("YOLO")
        this.victory();
    }
};

Memory.prototype.generateTable = function(){
    var that = this;
    var contentDiv = document.getElementById(this.windowId).firstChild.nextSibling;
    var div = document.createElement("div");
    var cellCount = 0;
    var table = document.createElement("table");
    table.className = "memoryGame";
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
    table.addEventListener("mousedown", function(e){
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

Memory.prototype.victory = function() {
    var that = this,
        p = document.createElement("p"),
        contentDiv = document.getElementById(this.windowId).querySelector(".wContent");

    p.className = "memVictoryMess";
    p.innerHTML = "Grattis! Det tog dig " + this.numberOfTries + " försök att lösa Memoryt!";
    contentDiv.appendChild(p);
};
 
return Memory;
});