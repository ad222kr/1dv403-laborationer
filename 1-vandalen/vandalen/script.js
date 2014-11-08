"use strict";

var makePerson = function (persArr) {
    var minAge;
    var maxAge;
    var averageAge;   
    var names = "";
    var sumOfAge = 0;
    var namesArr = [];

    // Sorterar arrayen på ålder
    persArr.sort(function (a, b) {
        return a.age - b.age
    });

    minAge = persArr[0].age;
    maxAge = persArr[persArr.length - 1].age;
    
    // Sorterar arrayen på namn, localeCompare ser till att arrayen sorterar svenska tecken rätt
    persArr.sort(function (a, b) {
        return a.name.localeCompare(b.name, 'sv')
    });

    for (var i = 0; i < persArr.length; i++) {
        namesArr[i] = persArr[i].name;
        sumOfAge += persArr[i].age;}

    names = namesArr.join(", ");  
    averageAge = Math.round(sumOfAge / persArr.length);

    var result = {};
    result.minAge = minAge;
    result.maxAge = maxAge;
    result.averageAge = averageAge;
    result.names = names;
    return result; }

var data = [{ name: "John Häggerud", age: 37 }, { name: "Johan Leitet", age: 36 }, { name: "Mats Loock", age: 46 }];
var result = makePerson(data);


