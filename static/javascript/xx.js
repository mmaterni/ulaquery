
const rows=[0,1,2,3,4,5,6,7,88,9,0,1,2,3,4,5,6,7,8,99,0,1,2,3,4,5,6,6];
// console.log(rows);
for(x of rows) console.log(x);
console.log('........')
rows.splice(20);
for(x of rows) console.log(x);
// console.log(rows);

rows.splice(0,1);
// console.log(rows);
