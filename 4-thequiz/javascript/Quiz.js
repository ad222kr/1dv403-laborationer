"use strict";

var Quiz = {

	div : document.getElementById("quiz"),

	URL : "http://vhost3.lnu.se:20080/question/1", // URL for first question 

	xhr: new XMLHttpRequest(),

	init: function(){ 
		console.log(Quiz.div);
		Quiz.getRequest();
		Quiz.buildApp(Quiz.div);
	},

	getRequest: function(){
		
		

		Quiz.xhr.open("GET", Quiz.URL, true);

		Quiz.xhr.send(null);		

	},

	onStateChange: function(xhr){
		var response;
		Quiz.xhr.onreadystatechange = function(){
			if(Quiz.xhr.readyState === 4){
				if(Quiz.xhr.status == 200){
					response = JSON.parse(Quiz.xhr.responseText);
					Quiz.printQuestion(response);

				}
				else{
				console.log("Läsfel, status: "+Quiz.xhr.status);
				}	
			}
			
		};	


	}

	printQuestion: function(response){
		var qField = document.querySelector(".questionField");
		console.log(qField);
		console.log(response);

		qField.innerHTML = response.question;


	},

	sendRequest: function(){


	},

	buildApp: function(div){

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
			
		});
	}

}

window.onload = Quiz.init;