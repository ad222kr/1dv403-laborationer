"use strict";
var MessageBoard = {
    
    messages: [],
    
    init: function(){
        //Referens till submit-knappen
        var button = document.getElementById("button");
        
        // Referens till metoden så den körs när man klickar på knappn
        button.onclick = MessageBoard.createMessage;
        
    },

    createMessage: function(){
        var input = document.getElementById("textarea").value;
        var mess = new Message(input, new Date());
        
        MessageBoard.messages.push(mess);
        
        MessageBoard.messages.forEach(function(message){
            console.log(message.getText());    
        });
    }
};

window.onload = MessageBoard.init;




