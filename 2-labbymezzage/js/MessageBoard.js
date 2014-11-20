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
        document.getElementById("form").reset();
        MessageBoard.renderMessage(mess);
        return false;
        
    },
    
    renderMessage: function(messageID){
        var div = document.getElementById("messages");
        var text = document.createElement("p");
        console.log(messageID);
        text.innerHTML = messageID.getHTMLtext();
        div.appendChild(text);
    }
};

window.onload = MessageBoard.init;




