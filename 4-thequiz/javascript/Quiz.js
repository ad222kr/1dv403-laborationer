"use strict";

function Quiz(quizID){
	var that = this;

	// Reference to quiz-div
	var div = document.querySelector("#" + quizID);
	var xhr = new XMLHttpRequest();
	

	this.init = function(){
		// Initates the quiz
		console.log();

	}

	this.createElements = function(){
		// Div for questions
		var questionArea = document.createElement(div);
		questionDiv.className = "questionArea"
	}

	this.getRequest = function(){
		// Function for getting request from server
	}

	this.sendRequest = function(){
		// Function for sending request
	}

	// Start quiz
	this.init();
}