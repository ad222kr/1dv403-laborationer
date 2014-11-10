"use strict";

var makePerson = function (persArr) {

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
    return result; }

var data = [{ name: "John Häggerud", age: 37 }, { name: "Johan Leitet", age: 36 }, { name: "Mats Loock", age: 46 }];


// Går igenom arrayen och kollar så att elemten är objekt och att objektens egenskaper har rätt värden
for (var i = 0; i < data.length; i++) {

    if (typeof (data[i]) !== "object") {

        throw new Error("Position " + (i + 1) + " i arrayen är ej ett objekt");
    }
    if (typeof (data[i].name) !== "string") {

        throw new Error ("Namnet är inte en sträng!")
    }
    if (typeof (data[i].age) !== "number") {

        throw new Error("Åldern är ej ett heltal");
    }
}

var result = makePerson(data);
console.log(result);





