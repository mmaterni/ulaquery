"use strict"
"use strict"


const arr_input = [
  "coment|coment",
  "li|li",
  "roi|roi",
  "pelleus|pelleus",
  "##|##",
  "prist|prist",
  "haine|haine",
  "et|et",
  "fellonie|fellonie1",
  "contre|contre",
  "##|##",
  "son|son1",
  "nevo|nevo",
  "jason|jason1",
  "et|et",
  "coment|coment",
  "##|##",
  "il|il",
  "pensa|pensa",
  "de|de",
  "lui|lui",
  "hocire|hocire1",
  "##|##"
];

// const arr_out = [
//   ["coment", "li", "roi", "pelleus"],
//   ["prist", "haine", "et", "fellonie1", "contre"],
//   ["son1", "nevo", "jason1", "et", "coment"],
//   ["il", "pensa", "de", "lui", "hocire1"]
// ];


function transformArray(arr) {
  let row = [];
  const rows = arr.reduce((resultArr1, item) => {
    const value1 = item.split('|')[1];
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

function transformArray2(arr) {
  let row = [];
  const rows = [];
  for (let i = 0; i < arr.length; i++) {
    const value1 = arr[i].split('|')[1];
    if (value1 !== "##") {
      row.push(value1);
    } else {
      rows.push(row);
      row = [];
    }
  }
  return rows;
}

function transformArray3(arr) {
  let row = [];
  const rows = [];
  for (const item of arr) {
    const value1 = item.split('|')[1];
    if (value1 !== "##") {
      row.push(value1);
    } else {
      rows.push(row);
      row = [];
    }
  }
  return rows;
}

let arr_out = transformArray(arr_input);
console.log(arr_out);

arr_out = transformArray3(arr_input);
console.log(arr_out);
