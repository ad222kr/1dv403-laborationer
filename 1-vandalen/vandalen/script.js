"use strict";

var makePerson = function (persArr) {

    persArr.sort(function (a, b) { return a.age - b.age });
    var minAge = persArr[0].age;
    var maxAge = persArr[persArr.length - 1].age;
    var averageAge = Math.round(persArr.map(function (person) { return person.age; }).reduce(function (prev, cur) { return prev + cur; }) / persArr.length);

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


// Osäker om man får använda for-loop här...
// Går igenom arrayen och kollar om den innehåller objekt
for (var i = 0; i < data.length; i++) {

    if (typeof (data[i]) !== "object") {

        throw new Error ("Position " + (i + 1) + " i arrayen är ej ett objekt");
    }
}

// Går igenom varje objekt och kollar så att namn = sträng och ålder = number
for (var i = 0; i < data.length; i++){
    if (typeof (data[i].name) !== "string") {

        throw new Error ("Namnet är inte en sträng!")
    }
    else if (typeof (data[i].age) !== "number") {

        throw new Error("Åldern är ej ett heltal");
    }
}

var result = makePerson(data);
console.log(result);





