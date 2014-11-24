"use strict";
function MessageBoard(boardID){
    var that = this;
    // getting reference to the board
    var div = document.getElementById(boardID);
    
    
    
    
    this.messages = [];
    
    this.init = function(){
        // Init function that initiates the board, creating a button and a textfield
        // Creating div to hold the messages
        var messagesDiv = document.createElement("div");
        messagesDiv.className = "messages";
        div.appendChild(messagesDiv);
        
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
        textarea.addEventListener("keypress", function(e) {
            if (!e) {e = window.event;}
            if (e.keyCode == 13 && !e.shiftKey){
                e.preventDefault();
                that.createMessage();
            }
            
        });
    };
    
    this.createMessage = function(){
        // Reference to the textarea
        var input = document.querySelector("#"+boardID+" textarea");
        
        var mess = new Message(input.value, new Date());
        
        // Adds message to array and renders it
        that.messages.push(mess); // when using .this with "click" this points to input.button, why?
        that.renderMessage(that.messages.length - 1);
        console.log(that.messages.length);
        // Resets the text-field on click/enter
        input.value= "";

        
    };
    
    this.renderMessage = function(messageID){
        var messagesDiv = document.querySelector("#" +boardID+" .messages");
        
        // Creating div for the message object
        var messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messagesDiv.insertBefore(messageDiv, messagesDiv.firstChild);
        
        // Creating a div to hold the buttons for timestamp/delete
        var buttonDiv = document.createElement("div");
        buttonDiv.className = "buttons";
        messageDiv.appendChild(buttonDiv);
        
        // Creating the delete-button
        var aClose = document.createElement("a");
        var imgClose = document.createElement("img");
        imgClose.className = "delete";
        aClose.setAttribute("href", "#");
        imgClose.setAttribute("src", "img/Remove-icon.png");
        aClose.appendChild(imgClose);
        buttonDiv.appendChild(aClose);
        
        // Creating the timestamp-button
        var aTime = document.createElement("a");
        var imgTime = document.createElement("img");
        imgTime.className = "time";
        aTime.setAttribute("href", "#");
        imgTime.setAttribute("src", "img/clock.png");
        aTime.appendChild(imgTime);
        buttonDiv.appendChild(aTime);
        
        // Creating elements and rendering the message
        var text = document.createElement("p");
        text.className = "msgtext";
        messageDiv.appendChild(text);
        
        // Creating elements and rendering the timestamp
        var time = document.createElement("p");
        time.className = "timestamp";
        messageDiv.appendChild(time);
        
        // Rendering the message and time
        text.innerHTML = this.messages[messageID].getHTMLtext();
        time.innerHTML = this.messages[messageID].getDateText();
        
        // Eventhandlers for the buttons
        imgClose.alt="close";
        imgClose.addEventListener("click", function(e) {
            that.deleteMessage(messageID);
            //that.messageCount();

        });
        imgTime.alt="Time";
        imgTime.addEventListener("click", function(e) {
            //that.showTimeStamp(messageID);
            alert("TIMESTAMP");
            
        });
        
        this.renderMessages = function(){
            document.querySelector("#" + boardID+ " .messages").innerHTML="";
            
            for(var i = 0; i < that.messages.length; i++){
                that.renderMessage(i);
            }
        };
        
        this.deleteMessage = function(messageID){
            var result = window.confirm("Vill du verkligen ta bort meddelandet?");
            if(result){
                that.messages.splice(messageID, 1);
                that.renderMessages();
                
            }
            
            
        };
       
        
    };


}



