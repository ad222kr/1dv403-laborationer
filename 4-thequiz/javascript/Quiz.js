"use strict";

var Quiz = {

	div : document.getElementById("quiz"),

	URL : "http://vhost3.lnu.se:20080/question/1", // URL for first question 

	xhr: new XMLHttpRequest(),

	init: function(){ 
		Quiz.getRequest(Quiz.xhr);
		Quiz.buildBasicElements(Quiz.div);
	},


	getRequest: function(xhr){
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200 ){
					Quiz.printQuestion(JSON.parse(xhr.responseText));
					console.log(JSON.parse(xhr.responseText))
				}
				else{
				console.log("Läsfel, status: "+xhr.status);
				}	
			}
			
		};
		
		Quiz.xhr.open("GET", Quiz.URL, true);

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



	},

	printQuestion: function(response){
		var qField = document.querySelector(".questionField");

		qField.innerHTML = response.question;


	},

	

	buildBasicElements: function(div){

		// Create question field
		var qDiv = document.createElement("div");
		var qField = document.createElement("p");
		qField.className = "questionField"	
		div.appendChild(qDiv);
		qDiv.appendChild(qField);
		qField.innerHTML = "TestLOL";

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

		// Eventhandlers
		inputButton.addEventListener("click", function(){
			Quiz.sendRequest(inputText, Quiz.xhr);
			inputText.value = "";
		});
	}

}

window.onload = Quiz.init;