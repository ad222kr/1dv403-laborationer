"use strict";

var Quiz = {

    div : document.getElementById("quiz"),

    URL : "http://vhost3.lnu.se:20080/question/1", // URL for first question 

    xhr: new XMLHttpRequest(),

    init: function(){ 
        Quiz.getRequest(Quiz.xhr, Quiz.URL);
        Quiz.buildBasicElements(Quiz.div);
        
    },


    getRequest: function(xhr, url){

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 ){
                if(xhr.status === 200 ){
                	
            	 	Quiz.printQuestion(JSON.parse(xhr.responseText));	
            	 	xhr.onreadystatechange = null;  
                	// FOr some reason the onreadystatechange executes when posting 
					// when sending to server, have to remove it here otherwise the 
					// innerHTML of question field becomes undefined
                	     
                }
                else{

                console.log("Läsfel, status: "+xhr.status);
                }   
            }
            
        };
        
        Quiz.xhr.open("GET", url, true);
        
        Quiz.xhr.send(null);

    },

     sendRequest: function(input, xhr){
    	
		var response = JSON.parse(xhr.responseText);

	    xhr.open("POST", response.nextURL, true);

	    xhr.setRequestHeader("Content-Type", "application/json");

	    var sendObject = {
	        answer: input.value
	    }

	    xhr.send(JSON.stringify(sendObject));
	    
	    var button = document.querySelector(".inputButton");

	    xhr.onreadystatechange = function(){
	        if(xhr.readyState === 4 ){
	            if(xhr.status === 200 ){
	            	document.querySelector(".statustext").innerHTML = "du svarade rätt";
	        	 	Quiz.newQuestion(JSON.parse(xhr.responseText).nextURL);
	        	 	xhr.onreadystatechange = null;  
	            	            }
	            else{
	            	document.querySelector(".statustext").innerHTML = "du svarade fel";
	            console.log("Läsfel, status: "+xhr.status);
	            }   
	        }
	        
	    };
	    
	},

	correctAnswer: function(){


	},

	wrongAnster: function(){


	},

    newQuestion: function(url){
    	
    	var a = document.querySelector(".nextQuestion");
    	var status = document.querySelector(".statustext");
    	
    	a.innerHTML = "Nästa Fråga";
    	
    	console.log(url);
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
            Quiz.sendRequest(inputText, Quiz.xhr);
            inputText.value = "";
        });
    }

}

window.onload = Quiz.init();