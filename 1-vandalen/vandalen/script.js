"use strict";

var makePerson = function (persArr) {
    var minAge;
    var maxAge;
    var averageAge;
    var names = "";
    var sumOfAge = 0;

    // Sortera arrayen på ålder
    persArr.sort(function (a, b) {
        return a.age-b.age});

    // Tilldela minAge och maxAge
    minAge = persArr[0].age;
    maxAge = persArr[persArr.length - 1].age;
    
    // Sortera arrayen på namn
    persArr.sort(function (a, b) {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 9;
        }
    });
    console.log(persArr);

    // Tilldela names värden
    for (var i = 0; i < persArr.length; i++) {
        names += persArr[i].name + ", ";
        sumOfAge += persArr[i].age;
    }

    //averageAge = (persArr[0].age + persArr[1].age + persArr[2].age) / 3;
    
    averageAge = Math.round(sumOfAge / persArr.length);
    console.log(names);
    console.log(minAge);
    console.log(maxAge);
    console.log(averageAge);



    var result = {};
    result.minAge = minAge;
    result.maxAge = maxAge;
    result.averageAge = averageAge;
    result.names = names;
    
    return result; }



var data = [{ name: "John Häggerud", age: 37 }, { name: "Johan Leitet", age: 36 }, { name: "Mats Loock", age: 46 }];

var result = makePerson(data);


