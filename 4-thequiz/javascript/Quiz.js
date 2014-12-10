"use strict";

var Quiz = {
    // TODO: Prevent user from clicking send if question already answered, remove eventlisteners maybe?
    // Refactor shit for readability, code is messy as f right now

    div : document.getElementById("quiz"),

    URL : "http://vhost3.lnu.se:20080/question/1",

    xhr: new XMLHttpRequest(),

    tries: [],

    count: 0,

    init: function(){ 
        Quiz.getRequest(Quiz.xhr, Quiz.URL);
        Quiz.buildBasicElements();        
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
                    if(JSON.parse(xhr.responseText).nextURL === undefined){
                        Quiz.correctAnswer();
                        Quiz.victory();
                    }
                    else{
                        Quiz.correctAnswer(); 
                    }                                     
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

    newQuestion: function(url){
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
    correctAnswer: function(){
        document.querySelector(".statustext").innerHTML = "du svarade rätt";
        Quiz.tries.push(Quiz.count);
        Quiz.count = 0;
        Quiz.newQuestion(JSON.parse(Quiz.xhr.responseText).nextURL);
    },

    wrongAnswer: function(){
        document.querySelector(".statustext").innerHTML = "du svarade fel, försök igen";
        document.querySelector(".nextA").innerHTML = "";
    },

    victory: function(){
        
        // Solution found at http://stackoverflow.com/a/3955238
        var div = document.getElementById("quiz");
        while(div.firstChild){
            div.removeChild(div.firstChild);
        };

        div.innerHTML = "<h2>Grattis! Du vann! </h2>"

        /*for (var i = 1; i <= Quiz.tries.length; i++){
            div.appendChild(document.createElement("p")).innerHTML = "Fråga " + i + ": " + Quiz.tries[i - 1] + " försök.";

        };*/

        Quiz.tries.forEach(function(e, index){
            div.appendChild(document.createElement("p")).innerHTML = "Fråga " + (index + 1) + ": " + e + " försök.";         
        }); 
        //div.appendChild(document.createElement("p")).innerHTML = "Det tog dit " + Quiz.tries + " gissningar!";
    },



    buildBasicElements: function(){

        var div = document.getElementById("quiz");
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

        // Eventhandlers
        inputButton.addEventListener("click", function(){
            if (inputText.value != ""){
                Quiz.sendRequest(inputText, Quiz.URL, Quiz.xhr);
                inputText.value = "";   
            }
        });

        inputText.addEventListener("keypress", function(e){
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