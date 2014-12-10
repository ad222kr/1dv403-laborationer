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
        Quiz.addEventListeners();    
    },

    getRequest: function(xhr, url){
        // Gets request from the server, calls printQuestion
        // And sets URL to the nextURL property from JSON object 

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 ){
                if(xhr.status === 200 || xhr.status === 304){
                    Quiz.printQuestion(JSON.parse(xhr.responseText));
                    Quiz.URL = JSON.parse(xhr.responseText).nextURL;
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

        Quiz.count++;
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 ){
                if(xhr.status != 400 ){                       
                    Quiz.correctAnswer(JSON.parse(xhr.responseText));                                    
                }
                else{
                    Quiz.wrongAnswer();
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
        var qField = document.querySelector(".questionField");
        var qHeader = document.querySelector(".questionHeader");
        qHeader.innerHTML = "Fråga nummer: " + response.id;
        qField.innerHTML = response.question;
    },
    correctAnswer: function(response){
        // Called when answer is correct. Pushes the try-counter to the array
        // and resets it.

        document.querySelector(".statustext").innerHTML = "du svarade rätt";
        Quiz.tries.push(Quiz.count);
        Quiz.count = 0;
        if(response.nextURL !== undefined){
            Quiz.nextQuestion(JSON.parse(Quiz.xhr.responseText).nextURL);    
        }
        else{
            Quiz.victory();
        }        
    },

    wrongAnswer: function(){
        document.querySelector(".statustext").innerHTML = "du svarade fel, försök igen";
        document.querySelector(".nextA").innerHTML = "";
    },

    victory: function(){
        // Removes all elements and prints out the result (number of truies
        // per question and a little grats-message)

        var div = document.getElementById("quiz");
        var header = document.createElement("h2");
        var p;     
        
        // http://stackoverflow.com/a/3955238
        while(div.firstChild){
            div.removeChild(div.firstChild);
        };
        
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

    buildBasicElements: function(div){

        // Create question field
        var qDiv = document.createElement("div");
        qDiv.className = "question";
        var qHeader = document.createElement("h3");
        qHeader.className = "questionHeader";
        var qField = document.createElement("p");
        qField.className = "questionField"  
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
        
    },

    addEventListeners: function(){
        var inputButton = document.querySelector(".inputButton");
        var inputText = document.querySelector(".inputText");
        
        inputButton.addEventListener("click", function (){
            if (inputText.value != ""){
                Quiz.sendRequest(inputText, Quiz.URL, Quiz.xhr);
                inputText.value = "";   
            }
        });

        inputText.addEventListener("keypress", function (e){
            if (!e){ e = window.event; }
            if (e.keyCode === 13 && inputText.value != ""){
                e.preventDefault();
                Quiz.sendRequest(inputText, Quiz.URL, Quiz.xhr);
                inputText.value = "";
            }
        });
    },
}
window.onload = Quiz.init;