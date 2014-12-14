"use strict";

var Quiz = {
    // TODO: A function to remove eventlisteners. Cant have them as
    // anonymous functions. Want to remove them to prevent user from
    // se

    div : document.getElementById("quiz"),

    URL : "http://vhost3.lnu.se:20080/question/1",

    xhr: new XMLHttpRequest(),

    tries: [], // Holds the counts for each question

    count: 0, // Counter for try

    init: function(){
        // Initiates the quiz and gets the first question

        Quiz.buildBasicElements(Quiz.div); 
        Quiz.getRequest(Quiz.xhr, Quiz.URL);       
    },

    getRequest: function(xhr, url){
        // Gets request from the server, calls printQuestion
        // And sets URL to the nextURL property from JSON object 
        var response;

        Quiz.addEventListeners();   
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 ){
                if(xhr.status === 200 || xhr.status === 304){
                    response = JSON.parse(xhr.responseText);
                    Quiz.printQuestion(response);
                    Quiz.URL = response.nextURL;
                }
                else{
                    console.log("Läsfel, status: "+xhr.status);
                }   
            }           
        };        
        Quiz.xhr.open("GET", url, true);        
        Quiz.xhr.send(null);
    },

    sendRequest: function(input, url, xhr){     
        // Sends request to server, calls correct or wrongAnswer depending on if
        // the input is correct. Increases counter for number of tries
        var response;
        Quiz.count++;

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 ){
                if(xhr.status === 200 ){                    
                    Quiz.correctAnswer(JSON.parse(xhr.responseText));                              
                }
                else if (xhr.status === 400){
                    Quiz.wrongAnswer();
                }
                else{
                    console.log("Läsfel, status: "+xhr.status);
                }   
            }               
        };

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        var sendObject = { answer: input.value }        
        xhr.send(JSON.stringify(sendObject)); 
    },

    nextQuestion: function(url){
        // Displays a link to get to the next question and adds
        // an eventlistener to it for getRequest.

        var a = document.querySelector(".nextA");
        var status = document.querySelector(".statustext");       

        a.innerHTML = "Nästa Fråga"; 
        a.addEventListener("click", function(){
            Quiz.getRequest(Quiz.xhr, url);
            a.innerHTML = "";
            status.innerHTML = "";            
        });      
    },

    printQuestion: function(response){
        document.querySelector(".questionHeader").innerHTML = "Fråga nummer: " + response.id;
        document.querySelector(".questionField").innerHTML = response.question;
    },
    correctAnswer: function(response){
        // Called when answer is correct. Pushes the try-counter to the array
        // and resets it. Also checks if nextURL is defined
        Quiz.removeEventListeners();
        document.querySelector(".statustext").innerHTML = "du svarade rätt";
        Quiz.tries.push(Quiz.count);
        Quiz.count = 0;
        if(response.nextURL !== undefined){
            Quiz.nextQuestion(response.nextURL);    
        }
        else{
            Quiz.victory(Quiz.div);
        }        
    },

    wrongAnswer: function(){
        document.querySelector(".statustext").innerHTML = "du svarade fel, försök igen";
        document.querySelector(".nextA").innerHTML = "";
        document.querySelector(".inputText").value = "";
    },

    victory: function(div){
        // Removes all elements and prints out the result (number of truies
        // per question and a little grats-message)

        var header = document.createElement("h2");
        var p;     
        
        Quiz.removeElements(Quiz.div);
              
        header.className = "counterHeading";
        header.innerHTML = "Grattis! Du vann";
        div.appendChild(header);

        Quiz.tries.forEach(function(e, index){
            p = document.createElement("p");
            p.className = "counter";
            p.innerHTML = "Fråga " + (index + 1) + ": " + e + " försök.";
            div.appendChild(p);        
        }); 
    },

    removeElements: function(div){
        // http://stackoverflow.com/a/3955238
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
    },

    addEventListeners: function(){
        var elements = Quiz.getInputElements();
        elements.inputButton.addEventListener("click", Quiz.eventFunction, false);
        elements.inputText.addEventListener("keypress", Quiz.eventFunction, false);
        elements.inputText.value = "";
    },

    removeEventListeners: function(){
        var elements = Quiz.getInputElements();
        elements.inputButton.removeEventListener("click", Quiz.eventFunction);
        elements.inputText.removeEventListener("keypress", Quiz.eventFunction);
    },

    eventFunction: function(){
        var inputText = document.querySelector(".inputText");
        if (!e){ var e = window.event; }
        if(inputText.value !== "" && (e.type === "click" || e.keyCode === 13)) {            
                Quiz.sendRequest(inputText, Quiz.URL, Quiz.xhr);
                                
        }
    },

    getInputElements: function(){
        // Obsolete?
        return {
            inputText : document.querySelector(".inputText"),
            inputButton : document.querySelector(".inputButton")
        }
    },

    buildBasicElements: function(div){

        // Create question field
        var qDiv = document.createElement("div");
        qDiv.className = "question";
        var qHeader = document.createElement("h3");
        qHeader.className = "questionHeader";
        var qField = document.createElement("p");
        qField.className = "questionField";
        div.appendChild(qDiv);
        qDiv.appendChild(qHeader);
        qDiv.appendChild(qField);

        // Create input field
        var inputDiv = document.createElement("div");
        var inputText = document.createElement("input");
        inputDiv.className = "inputField";
        inputText.className = "inputText";
        inputText.type = "text";
        div.appendChild(inputDiv);
        inputDiv.appendChild(inputText);

        // Create input button
        var inputButton = document.createElement("input");
        inputButton.className = "inputButton";
        inputButton.type = "button";
        inputButton.value = "send";
        inputDiv.appendChild(inputButton);

        // Create statusfield
        var statusDiv = document.createElement("div");
        statusDiv.className = "statusfield";
        div.appendChild(statusDiv);
        var statusMessage = document.createElement("p");
        statusDiv.className = "statustext";
        statusDiv.appendChild(statusMessage);

        // Create a-tag for the nextQuestion-function
        var aDiv = document.createElement("div");
        var a = document.createElement("a");
        div.appendChild(aDiv);
        aDiv.appendChild(a);
        aDiv.className = "nextQuestion";
        a.href = "#";
        a.className = "nextA";        
    }
}
window.onload = Quiz.init;