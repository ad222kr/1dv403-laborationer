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
        var text = document.createElement("p");
        div.innerHTML = "";
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

        var div = document.getElementById("messages");
        var messageDiv = document.createElement("div");
        var text = document.createElement("p");
        var time = document.createElement("p");
        
        messageDiv.className = "message";
        text.className = "msgtext";
        time.className = "timestamp";
        
        div.appendChild(messageDiv);
        messageDiv.appendChild(text);
        messageDiv.appendChild(time);
        
        text.innerHTML = MessageBoard.messages[messageID].getHTMLtext();
        time.innerHTML = MessageBoard.messages[messageID].getDateText();
        
    },
    
    renderMessages: function(){

        document.getElementById("messages").innerHTML =""; 
        
        for(var i = 0; i < MessageBoard.messages.length; i++){
            MessageBoard.renderMessage(i);
        }
    }
};

window.onload = MessageBoard.init;




