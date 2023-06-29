
"use strict"

const numbers = [1, 2, 3, 4, 5];
// const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// console.log(sum); 


const sumCallback = (accumulator, currentValue) => accumulator + currentValue;
const sum = numbers.reduce(sumCallback, 0);
console.log(sum); // Output: 15


/*
const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.reduce((accumulator, currentValue) => {
  accumulator.push(currentValue * 2);
  return accumulator;
}, []);

console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10]
*/
/*
const products = [
    { name: 'iPhone', category: 'electronics' },
    { name: 'Samsung TV', category: 'electronics' },
    { name: 'Nike shoes', category: 'fashion' },
    { name: 'Sony headphones', category: 'electronics' },
    { name: 'Adidas jacket', category: 'fashion' },
  ];
  
  const groupedProducts = products.reduce((accumulator, currentValue) => {
    if (!accumulator[currentValue.category]) {
      accumulator[currentValue.category] = [];
    }
    accumulator[currentValue.category].push(currentValue);
    return accumulator;
  }, {});
  
  console.log(groupedProducts);
*/
  /* Output:
  {
    electronics: [
      { name: 'iPhone', category: 'electronics' },
      { name: 'Samsung TV', category: 'electronics' },
      { name: 'Sony headphones', category: 'electronics' }
    ],
    fashion: [
      { name: 'Nike shoes', category: 'fashion' },
      { name: 'Adidas jacket', category: 'fashion' }
    ]
  }
  */
  