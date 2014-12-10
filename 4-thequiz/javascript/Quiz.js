"use strict";

var Quiz = {
    // TODO: Prevent user from clicking send if question already answered, remove eventlisteners maybe?
    // Refactor shit for readability, code is messy as f right now

    div : document.getElementById("quiz"),

    URL : "http://vhost3.lnu.se:20080/question/1", // URL for first question

    xhr: new XMLHttpRequest(),

    tries: [], // Holds the counts for each question

    count: 0, // Counter for try

    init: function(){ 
        
        Quiz.buildBasicElements(Quiz.div); 
        Quiz.getRequest(Quiz.xhr, Quiz.URL);
        Quiz.addEventListeners(); 
        Quiz.removeEventListeners();    
    },

    getRequest: function(xhr, url){
        // Get request from server, prints the question
        // And sets Quiz.URL to url for getting the answer      
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
        // Sent to server, if status 400 URL now still stays the same (for answer)
        // so user can try again until they get the right answer
        
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
        // Post the stringified object to server
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        var sendObject = { answer: input.value }        
        xhr.send(JSON.stringify(sendObject)); 
    },

    nextQuestion: function(url){
        // Shows link for getting to next question when user inputs correct answer
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
        // Prints the question (lol)
        var qField = document.querySelector(".questionField");
        var qHeader = document.querySelector(".questionHeader");
        qHeader.innerHTML = "Fråga nummer: " + response.id;
        qField.innerHTML = response.question;
    },
    correctAnswer: function(response){
        // Prints out text that the answer is correct, pushes the count to array
        // and resets it. Calls nextQuestion and removes eventlisteners
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
        
        // Solution found at http://stackoverflow.com/a/3955238
        // Removes everything and prints out congratz and
        // number of tries per question
        var div = document.getElementById("quiz");
        while(div.firstChild){
            div.removeChild(div.firstChild);
        };

        div.innerHTML = "<h2>Grattis! Du vann! </h2>"
        Quiz.tries.forEach(function(e, index){
            div.appendChild(document.createElement("p")).innerHTML = "Fråga " + (index + 1) + ": " + e + " försök.";         
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

        // div for statusfield
        var statusDiv = document.createElement("div");
        statusDiv.className = "statusfield";
        div.appendChild(statusDiv);
        var statusMessage = document.createElement("p");
        statusDiv.className = "statustext";
        statusDiv.appendChild(statusMessage);

        // a-tag for next question link
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

    removeEventListeners: function(){
        var inputButton = document.querySelector(".inputButton");
        var inputText = document.querySelector(".inputText");

        // TODO: Figure out how to remove eventlisteners with anonymous functions
        // Possible?


    },

}

window.onload = Quiz.init;