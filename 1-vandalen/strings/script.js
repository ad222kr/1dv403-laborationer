"use strict";

window.onload = function () {

    var convertedString = "";
	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
        // Matar man in massa mellanslag så trimmas dessa bort. Kollar efter det mot längden om strängen är tom
	    if (str.trim().length > 0) {

	        for (var i = 0; i < str.length; i++) {

	            if ((str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) || (str.charCodeAt(i) >= 132 && str.charCodeAt(i) <= 153)) {

	                convertedString += str.charAt(i).toLowerCase();
	            }
	            else {

	                convertedString += str.charAt(i).toUpperCase();
	            }
	        }
	        convertedString = convertedString.replace(/A|a/g, "#");
	        return convertedString;
	    }
	    else {

	        throw new Error("Strängen är tom");      
	    }

	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};