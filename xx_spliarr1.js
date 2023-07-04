"use strict"

function splitArrays3(arr) {
    arr.push("##");
    let row = [];
    const rows = arr.reduce((resultArr1, value1) => {
        if (value1 !== "##") {
            row.push(value1);
        } else {
            resultArr1.push(row);
            row = [];
        }
        return resultArr1;
    }, []);
    return rows;
}



const arr = [
    "e00",
    "e10",
    "e20",
    "##",
    "e40",
    "e00",
    "e10",
    "e20",
    "##",
    "e40",
    "e00",
    "e10",
    "e20",
    "##",
    "e40"
];

const a0 = splitArrays3(arr);
console.log(a0);
