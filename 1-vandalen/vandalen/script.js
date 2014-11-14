"use strict";

var makePerson = function (persArr) {
    // Går igenom arrayen och kollar så att elemten är objekt och att objektens egenskaper har rätt värden
    
    for (var i = 0; i < persArr.length; i++) {
        
        if (typeof (persArr[i]) !== "object") {
        
            throw new Error("Position " + (i + 1) + " i arrayen är ej ett objekt");
        }
        if (typeof (persArr[i].name) !== "string") {
        
            throw new Error ("Namnet är inte en sträng!")
        }
        if (isNaN(persArr[i].age) && isNaN(Date.parse(persArr[i].born))) {
        
            throw new Error("Åldern är ej ett heltal");
        }
    }


    // Sorterar arrayen på ålder och tilldelar min och maxage
    persArr.sort(function (a, b) { return a.age - b.age });
    var minAge = persArr[0].age;
    var maxAge = persArr[persArr.length - 1].age;

    // Lägger ihop elementen i arrayen och räknar ut medelvärde samt avrundar
    var averageAge = Math.round(persArr.map(function (person) { return person.age; }).reduce(function (prev, cur) { return prev + cur; }) / persArr.length);

    // Sorterar arrayen på namn (localeCompare ser till att svenska tecken sorteras rätt), plockar ur namnen ur objekten och slår ihop till en sträng
    persArr.sort(function (a, b) { return a.name.localeCompare(b.name, 'sv') });
    var names = persArr.map(function (person) { return person.name; }).join(", ");
    
    var result = {
        minAge: minAge,
        maxAge: maxAge,
        averageAge: averageAge,
        names: names
    };
    return result;
    }





