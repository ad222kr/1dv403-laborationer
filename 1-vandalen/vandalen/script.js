"use strict";

var makePerson = function (persArr) {
    var minAge;
    var maxAge;
    var averageAge;   
    var names = "";
    var sumOfAge = [];
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

    namesArr = persArr.map(function (item, index, array) {        
        return item.name;
    });

    sumOfAge = persArr.map(function (item, index, array) {
        return item.age;
    });

    names = namesArr.join(", ");  

    averageAge = Math.round(sumOfAge.reduce(function (prev, cur, index, array) {
        return prev + cur;
    }) / persArr.length);
   

    var result = {};
    result.minAge = minAge;
    result.maxAge = maxAge;
    result.averageAge = averageAge;
    result.names = names;
    return result; }



var data = [{ name: "John Häggerud", age: 37 }, { name: "Johan Leitet", age: 36 }, { name: "Mats Loock", age: 46 }];
var result = makePerson(data);


