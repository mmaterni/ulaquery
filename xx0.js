
"use strict"


function removeLastDigitI(str) {
  return !isNaN(str[str.length - 1]) ? str.slice(0, -1) : str;
}

const name1="t5.g.ula.csv";
const name2 = name1.split('.').slice(0,2).join('.')
console.log(name1,name2);

console.log(removeLastDigitI('pippo'));
console.log(removeLastDigitI('pippo1'));
console.log(removeLastDigitI('pippo21'));
console.log(removeLastDigitI('p2ippo1'));
console.log(removeLastDigitI('p2ippo'));
