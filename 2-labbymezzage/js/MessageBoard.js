"use strict";
var MessageBoard = {
    
    
    messages: [],
    
    init: function(){
        // Reference to button
        var button = document.getElementById("button");
        
        // Add eventhandlers
        button.addEventListener("click", MessageBoard.createMessage, false);
        button.addEventListener("click", MessageBoard.messageCount, false);
;
    },
    
    messageCount: function(){
        // Generates messagecounter
        var count = MessageBoard.messages.length;
        var div = document.getElementById("numberofmess");
        var text = document.createElement("p");
        
        div.innerHTML = "";
        text.innerHTML = "Antal meddelanden: " + count;
        div.appendChild(text);
        
    },
    
    createMessage: function(){
        // Creates messageobject from textareas value and date right now
        var input = document.getElementById("textarea").value;
        var mess = new Message(input, new Date());
        
        // Adds message to array and renders it
        MessageBoard.messages.push(mess);
        MessageBoard.renderMessage(MessageBoard.messages.length - 1);
        
        // Resets textarea
        document.getElementById("form").reset();
        return false;
    },
    
    renderMessage: function(messageID){
        // Reference to div that holds all messages
        var div = document.getElementById("messages");
        
        // Creating elements for message, text, time and delete/timestamp buttons
        var messageDiv = document.createElement("div");
        var text = document.createElement("p");
        var time = document.createElement("p");
        var a = document.createElement("a");
        var imgClose = document.createElement("img");
        
        
        // Setting classnames and attributes
        messageDiv.className = "message";
        text.className = "msgtext";
        time.className = "timestamp";
        imgClose.className = "delete";
        a.setAttribute("href", "#");
        imgClose.setAttribute("src", "img/Remove-icon.png");
        
        
        // Pushing elements to DOM
        div.appendChild(messageDiv);
        a.appendChild(imgClose);
        messageDiv.appendChild(a);
        messageDiv.appendChild(text);
        messageDiv.appendChild(time);
        
        // Rendering the message and time
        text.innerHTML = MessageBoard.messages[messageID].getHTMLtext();
        time.innerHTML = MessageBoard.messages[messageID].getDateText();
        
        // Eventhandler for deleting a message on mouseclick
        imgClose.alt="Close";
        imgClose.onclick = function () {
            MessageBoard.deleteMessage(messageID);
            MessageBoard.messageCount();
        };
    },
    
    renderMessages: function(){

        document.getElementById("messages").innerHTML =""; 
        
        for(var i = 0; i < MessageBoard.messages.length; i++){
            MessageBoard.renderMessage(i);
        }
    },
    
    deleteMessage: function(messageID){
        MessageBoard.messages.splice(messageID, 1);
        MessageBoard.renderMessages();
    }
};

window.onload = MessageBoard.init;




