"use strict";

var Quiz = {

	div : document.getElementById("quiz"),

	URL : "http://vhost3.lnu.se:20080/question/1", // URL for first question 

	xhr: new XMLHttpRequest();,

	init: function(){
 		Quiz.xhr = 
		console.log(Quiz.div);

		Quiz.buildApp(Quiz.div);
		Quiz.getRequest(); 
	},

	getRequest: function(){

		Quiz.xhr.onreadystatechange = function(){
				alert("asdf");
			if(Quiz.xhr.readyState === 4){
				if(Quiz.xhr.status == 200 || xhr.status == 304){
					console.log(Quiz.xhr.responseText);
					alert();
				}
			}
			else{
				console.log("Läsfel, status: "+Quiz.xhr.status);
			}	
		};

		Quiz.xhr.open("GET", Quiz.URL, true);

		Quiz.xhr.send(null);

	},

	sendRequest: function(){


	},

	buildApp: function(div){

		// Create question field
		var qDiv = document.createElement("div");
		var qField = document.createElement("p");
		qDiv.className = "questionField"	
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
	}

}

window.onload = Quiz.init;