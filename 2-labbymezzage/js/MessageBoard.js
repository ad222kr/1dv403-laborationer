"use strict";
function MessageBoard(boardID){
    var that = this;
    var messages = [];
    var div = document.getElementById(boardID);
    
    this.init = function(){
        // Init function that initiates the board, creating a button and a textfield
        

        // Create form to use the form.reset
        var form = document.createElement("form");
        form.className = "form";
        div.appendChild(form)
        
        // Create a text-field
        var textarea = document.createElement("textarea");
        textarea.className = "textarea";
        form.appendChild(textarea);
        
        // Create a send-button
        var inputButton = document.createElement("input");
        inputButton.type = "button";
        inputButton.value = "skicka";
        inputButton.className = "button";
        form.appendChild(inputButton);
        
        
        
        // Add eventlisteners
        inputButton.addEventListener("click", that.createMessage, false);
        textarea.addEventListener("keypress", function(e) {
            if (!e) var e = window.event;
            if (e.keyCode == 13 && !e.shiftKey){
                e.preventDefault();
                that.createMessage();
            }
            
        });
    };
    
    this.createMessage = function(){
        var input = document.getElementsByClassName("textarea")[0].value;
        var mess = new Message(input, new Date());
        
        // Adds message to array and renders it
        messages.push(mess);
        console.log(messages.length);
        
        // Resets the text-area
        document.getElementsByClassName("form")[0].reset();
    };
    
    this.renderMessage = function(){
                
        
        
    }


}


MessageBoard.prototype.renderMessage = function(){
    
};



