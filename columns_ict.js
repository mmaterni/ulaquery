
"use strict"


const dic = [
    ['forma1', 'key1', 'lemma1', 'etimo1', 'lang1', 'date1', 'pos1', 'funct1'],
    ['p', 'key2', 'lemma2', 'x', 'lang2', 'date2', 'masc', 'funct2'],
    ['forma3', 'key3', 'lemma3', 'etimo3', 'lang3', 'date3', 'sing', 'funct3'],
    // ...
];

const values = [
    [6, ['masc', 'sing']],
    [0, ['p']],
    [3, ['x', 'y', 'z']]
];

const ls = [];
const setValues = function (i, ...args) {
    const vs = Array.from(args);
    const r = [i, vs];
    ls.push(r)
};



const filterIndices = (rows, values) => {
    const rl = rows.length;
    const indices = [];
    for (let i = 0; i < rl; i++) {
        const row = rows[i];
        let ok = true;
        for (const [j, vs] of values)
            if (!vs.includes(row[j])) {
                ok = false;
                break;
            }
        if (ok) indices.push(i);
    }
    return indices;
}


// let indices = filterIndices(dic, values);
// console.log(indices);

setValues(0, 'a', 'b', 'c');
setValues(6, 'pippo');
console.log(ls);
