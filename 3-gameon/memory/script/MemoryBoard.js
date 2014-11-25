"use strict";

function MemoryBoard(rows, cols, gameID){
    
    this.tiles = RandomGenerator.getPictureArray(cols, rows);
    
    
    this.start = function(){
        
        console.log  (this.tiles);     
        
    };
    
    
}