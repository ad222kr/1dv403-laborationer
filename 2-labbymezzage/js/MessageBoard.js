"use strict";
var MessageBoard = {
    
    
    messages: [],
    
    init: function(){
        // Reference to button
        var button = document.getElementById("button");
        
        // Add eventhandlers
        button.addEventListener("click", MessageBoard.createMessage, false);
        button.addEventListener("click", MessageBoard.messageCount, false);

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
        var buttonDiv = document.createElement("div");
        var text = document.createElement("p");
        var time = document.createElement("p");
        var aClose = document.createElement("a");
        var aTime = document.createElement("a");
        var imgClose = document.createElement("img");
        var imgTime = document.createElement("img");
        
        
        // Setting classnames and attributes
        buttonDiv.className = "buttons"
        messageDiv.className = "message";
        text.className = "msgtext";
        time.className = "timestamp";
        imgClose.className = "delete";
        imgTime.className = "time";
        aClose.setAttribute("href", "#");
        aTime.setAttribute("href", "#");
        imgClose.setAttribute("src", "img/Remove-icon.png");
        imgTime.setAttribute("src", "img/clock.png");
        
        
        // Pushing elements to DOM
        div.appendChild(messageDiv);
        aClose.appendChild(imgClose);
        aTime.appendChild(imgTime);
        buttonDiv.appendChild(time);
        buttonDiv.appendChild(aClose);
        buttonDiv.appendChild(aTime);
        messageDiv.appendChild(buttonDiv);
        messageDiv.appendChild(text);
        
        
        // Rendering the message and time
        text.innerHTML = MessageBoard.messages[messageID].getHTMLtext();
        time.innerHTML = MessageBoard.messages[messageID].getDateText();
        
        // Eventhandler for deleting a message on mouseclick
        imgClose.alt="Close";
        imgClose.onclick = function () {
            MessageBoard.deleteMessage(messageID);
            MessageBoard.messageCount();
        };
        imgTime.alt="Time";
        imgTime.onclick = function () {
            MessageBoard.showTimeStamp(messageID);   
        };
    },
    
    renderMessages: function(){
        // Resets messages element and renders all messages
        document.getElementById("messages").innerHTML =""; 
        
        for(var i = 0; i < MessageBoard.messages.length; i++){
            MessageBoard.renderMessage(i);
        }
    },
    
    deleteMessage: function(messageID){
        // Deletes one message, then renders all messag
        MessageBoard.messages.splice(messageID, 1);
        MessageBoard.renderMessages();
    },
    
    showTimeStamp: function(messageID){
        alert(MessageBoard.messages[messageID].toString());    
    }
};

window.onload = MessageBoard.init;




