"use strict"

function splitArrays1(arr) {
    let arr1 = [];
    let arr2 = [];
    let tempArr1 = [];
    let tempArr2 = [];
    for (let i = 0; i < arr.length; i++) {
        const [value1, value2] = arr[i];
        if (value1 === "##" && value2 === "##") {
            if (tempArr1.length > 0) {
                arr1.push([...tempArr1]);
                arr2.push([...tempArr2]);
                tempArr1 = [];
                tempArr2 = [];
            }
        } else {
            tempArr1.push(value1);
            tempArr2.push(value2);
        }
    }
    if (tempArr1.length > 0) {
        arr1.push([...tempArr1]);
        arr2.push([...tempArr2]);
    }
    return [arr1, arr2];
}

function splitArrays2(arr) {
    arr.push(["##", "##"]);
    let tempArr1 = [];
    let tempArr2 = [];
    const [arr1, arr2] = arr.reduce(([resultArr1, resultArr2], [value1, value2]) => {
        if (value1 !== "##" || value2 !== "##") {
            tempArr1.push(value1);
            tempArr2.push(value2);
        } else {
            resultArr1.push(tempArr1);
            resultArr2.push(tempArr2);
            tempArr1 = [];
            tempArr2 = [];
        }
        return [resultArr1, resultArr2];
    }, [[], []]);
    return [arr1, arr2];
}

function splitArrays3(arr) {
    arr.push(["##", "##"]);
    let tempArr1 = [];
    let tempArr2 = [];
    const [arr1, arr2] = arr.reduce(([resultArr1, resultArr2], [value1, value2]) => {
        if (value1 !== "##" || value2 !== "##") {
            tempArr1.push(value1);
            tempArr2.push(value2);
        } else {
            resultArr1.push(Array.from(tempArr1));
            resultArr2.push(Array.from(tempArr2));
            tempArr1 = [];
            tempArr2 = [];
        }
        return [resultArr1, resultArr2];
    }, [[], []]);
    return [arr1, arr2];
}


function splitArrays4(arr) {
    let arr1 = [];
    let arr2 = [];
    let tempArr1 = [];
    let tempArr2 = [];
    for (const [value1, value2] of arr) {
        if (value1 !== "##" || value2 !== "##") {
            tempArr1.push(value1);
            tempArr2.push(value2);
        }
        else {
            arr1.push(tempArr1);
            arr2.push(tempArr2);
            tempArr1 = [];
            tempArr2 = [];
        }
    }
    return [arr1, arr2];
}

const arr = [
    ["e00", "e01"],
    ["e10", "e11"],
    ["e20", "e21"],
    ["##", "##"],
    ["e40", "e41"],
    ["e00", "e01"],
    ["e10", "e11"],
    ["e20", "e21"],
    ["##", "##"],
    ["e40", "e41"],
    ["e00", "e01"],
    ["e10", "e11"],
    ["e20", "e21"],
    ["##", "##"],
    ["e40", "e41"]
];

const [a0, a1] = splitArrays2(arr);
// const [b0, b1] = splitArrays3(arr);
// const [c0, c1] = splitArrays4(arr);

console.log(a0);
// console.log(b0);
// console.log(c0);
console.log(arr);

a0[0][0]='PIPPO';
a0[0].push("LILLO");
console.log(a0);
console.log(arr);

/*
const inputArray = [["A", "B"], ["C", "D"], ["##", "##"], ["E", "F"], ["G", "H"]];

const result1 = splitArrays3(inputArray);
const result2 = splitArrays4(inputArray);

const tempArr1FromFunc3 = result1[0][0];
const tempArr1FromFunc4 = result2[0][0];

console.log(tempArr1FromFunc3); // Output: ['A', 'C']
console.log(tempArr1FromFunc4); // Output: ['A', 'C']

tempArr1FromFunc3.push('X');
console.log(tempArr1FromFunc3); // Output: ['A', 'C', 'X']
console.log(tempArr1FromFunc4); // Output: ['A', 'C']
*/