"use strict";

var Quiz = {

    div : document.getElementById("quiz"),

    URL : "http://vhost3.lnu.se:20080/question/1",

    xhr: new XMLHttpRequest(),

    init: function(){ 
        Quiz.getRequest(Quiz.xhr, Quiz.URL);
        Quiz.buildBasicElements(Quiz.div);        
    },

    getRequest: function(xhr, url){
    	// Get request from server, prints the question
    	// And sets URL for the next question

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 ){
                if(xhr.status === 200 || xhr.status === 304){
                	
            	 	Quiz.printQuestion(JSON.parse(xhr.responseText));
            	 	Quiz.URL = 	JSON.parse(xhr.responseText).nextURL;
            	 	console.log(Quiz.URL);
    
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

		xhr.onreadystatechange = function(){
	        if(xhr.readyState === 4 ){
	            if(xhr.status != 400 ){
	            	document.querySelector(".statustext").innerHTML = "du svarade rätt";
	            	console.log(JSON.parse(xhr.responseText).nextURL);
	        	 	Quiz.newQuestion(JSON.parse(Quiz.xhr.responseText).nextURL);
	        	 	xhr.onreadystatechange = null;  
	            }
	            else{
	            	
	            	console.log("Läsfel, status: "+xhr.status);
	            }   
	        }	        
	    };
		
	    xhr.open("POST", url, true); // Using 
	    xhr.setRequestHeader("Content-Type", "application/json");
	    var sendObject = {
	        answer: input.value
	    }
	    xhr.send(JSON.stringify(sendObject));    
	},

    newQuestion: function(url){
    	
    	var a = document.querySelector(".nextQuestion");
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
    correctAnswer: function(){
    	// TODO: refactor correct answer to this func

	},

	wrongAnster: function(){
		// TODO: refactor wrong answer to this func

	},

    buildBasicElements: function(div){

    	// Refactor this into smaller funcs?

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
    	var a = document.createElement("a");
    	div.appendChild(a);
    	a.className = "nextQuestion";
    	a.href = "#";

        // Eventhandlers
        inputButton.addEventListener("click", function(){
        	if (inputText.value != ""){
        		Quiz.sendRequest(inputText, Quiz.URL, Quiz.xhr);
            	inputText.value = "";	
        	}
            
        });
    }

}

window.onload = Quiz.init();