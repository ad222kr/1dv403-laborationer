"use strict";
function MessageBoard(boardID){
    var that = this;
    var messages = [];
    
    this.init = function(){
        // Init function that initiates the board, creating a button and a textfield
        
        // Reference to the boardID
        var div = document.getElementById(boardID);
        
        // Create a text-field
        var textarea = document.createElement("textarea");
        textarea.className = "textarea";
        div.appendChild(textarea);
        
        // Create a send-button
        var inputButton = document.createElement("input");
        inputButton.type = "button";
        inputButton.value = "skicka";
        inputButton.className = "button";
        div.appendChild(inputButton);
        
        // Add eventlisteners
        inputButton.addEventListener("click", that.createMessage, false);
    };
    
    this.createMessage = function(){
        var input = document.getElementsByClassName("textarea")[0].value;
        var mess = new Message(input, new Date());
        
        // Adds message to array and renders it
        
        
        messages.push(mess);
        console.log(messages);
        
    };


}

MessageBoard.prototype.asd = function(){
    
    
    
    // Create send-button
    var inputButton = document.createElement("input");
    inputButton.type = "button";
    inputButton.value = "skicka";
    inputButton.className = "button"; 
    boardID.appendChild(inputButton);
    
    // Add eventhandlers
    inputButton.addEventListener("click", this.createMessage, false);
    
};

MessageBoard.prototype.createMessage = function(){
    var input = document.querySelector("textarea").value;
    var mess = new Message(input, new Date());
};

MessageBoard.prototype.renderMessage = function(){
    
};



