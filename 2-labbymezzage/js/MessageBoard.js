"use strict";
function MessageBoard(boardID){
    var that = this;
    var div = document.getElementById(boardID);
    this.messages = [];
    
    this.init = function(){
        // Init function that initiates the board, creating a button and a textfield
        var that = this;

        
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
        input.value= "";

        
    };
    
    this.renderMessage = function(messageID){
        // Creating elements for message, text, time and delete/timestamp buttons
        var that = this;
        
        var messageDiv = document.createElement("div");
        var buttonDiv = document.createElement("div");
        var text = document.createElement("p");
        var time = document.createElement("p");
        var aClose = document.createElement("a");
        var aTime = document.createElement("a");
        var imgClose = document.createElement("img");
        var imgTime = document.createElement("img");
        
        // Setting classnames and attributes
        buttonDiv.className = "buttons";
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
        div.insertBefore(messageDiv, div.firstChild);
        aClose.appendChild(imgClose);
        aTime.appendChild(imgTime);
        buttonDiv.appendChild(aClose);
        buttonDiv.appendChild(aTime);
        messageDiv.appendChild(buttonDiv);
        messageDiv.appendChild(text);
        messageDiv.appendChild(time);
        
        // Rendering the message and time
        text.innerHTML = this.messages[messageID].getHTMLtext();
        time.innerHTML = this.messages[messageID].getDateText();
       
        
    };


}



