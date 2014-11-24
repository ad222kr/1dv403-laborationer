"use strict";
function MessageBoard(boardID){
    // getter for boardID
    this.getId = function(){
        return boardID;
    }
    
    var messages =  [];
    
   
    
}

MessageBoard.prototype.init = function(){
    
    // Reference to board id div-tag   
    var boardID = document.getElementById(this.getId());
    
    // Create text-field
    var textField = document.createElement("textarea");
    textField.className = "textarea";
    boardID.appendChild(textField);
    // Create send-button
    var inputButton = document.createElement("input");
    inputButton.type = "button";
    inputButton.value = "skicka";
    inputButton.className = "button"; 
    boardID.appendChild(inputButton);
    
    
       
    
};




