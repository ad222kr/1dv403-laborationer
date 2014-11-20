"use strict";
var MessageBoard = {
    
    
    messages: [],
    
    init: function(){
        
        var button = document.getElementById("button");
    
        

        button.addEventListener("click", MessageBoard.createMessage, false);
        button.addEventListener("click", MessageBoard.messageCount, false);
        
    },
    
    messageCount: function(){
        
        var count = MessageBoard.messages.length;
        var div = document.getElementById("numberofmess");
        div.innerHTML = "";
        var text = document.createElement("p");
        text.innerHTML = "Antal meddelanden: " + count;
        div.appendChild(text);
        
    },
    
    createMessage: function(){
        
        var input = document.getElementById("textarea").value;
        var mess = new Message(input, new Date());
        
        MessageBoard.messages.push(mess);
        MessageBoard.renderMessage(MessageBoard.messages.length - 1);
        
        document.getElementById("form").reset();
        return false;
    },
    
    renderMessage: function(messageID){
        // Sätter ref till #messages, skapar p-tag och sätter klass till .message
        var div = document.getElementById("messages");
        var text = document.createElement("p");
        text.className = "message";
        
        
        //Skickar in meddelandet till dokumentet
        text.innerHTML = MessageBoard.messages[messageID].getHTMLtext();
        console.log(MessageBoard.messages[messageID].tja());
        div.appendChild(text);
    },
    
    renderMessages: function(){
        // Resettar och skriver ut alla meddelanden
        document.getElementById("messages").innerHTML ="";   
        for(var i = 0; i < MessageBoard.messages.length; i++){
            MessageBoard.renderMessage(i);
        }
    }
};

window.onload = MessageBoard.init;




