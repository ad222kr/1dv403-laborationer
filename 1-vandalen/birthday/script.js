"use strict";

window.onload = function(){
    var birthday = function (date) {
        var birthDate = new Date(date);
        var today = new Date();
        var mSecondsInDay = 86400000; // 1000 * 60 * 60 * 24 = antal millisekunder på en dag

        if (!isNaN(Date.parse(date))) {
            // Sätter födelsedagens år till nuvarande samt dagens timme till 1
            // för att birthDate och today ska kunna jämföras korrekt
            birthDate.setFullYear(today.getFullYear());
            today.setHours(1, 0, 0, 0);
                   
            if (birthDate >= today) {
                // Räknar ut antal dagar kvar till födelsedag
                var leftUntilBirthday = -(Math.floor((today - birthDate) / mSecondsInDay));
                return leftUntilBirthday;
            } else {
                throw new Error("Du har redan fyllt år!");
            }
        } else {
            throw new Error("Fel format på datumet");
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
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};