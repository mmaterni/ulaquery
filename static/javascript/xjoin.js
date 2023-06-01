/* jshint esversion: 8 */

/*
var token_array = [
    ['FORMA', 'KEYS', 'SIGL'],
    ['coment', 'coment', 'g'],
];
var form_array = [
    ['FORMA', 'KEYS', 'LEMMA', 'ETIMO', 'LANG', 'DATE', 'POS', 'FUNCT', 'GENDER', 'NUMBER', 'CASE', 'DEGREE', 'DETERTYPE', 'MWES', 'PRONTYPE', 'PERSON', 'VERBFORM', 'MOOD', 'TENSE', 'VOICE', 'PROPERTY', 'ADPTYPE', 'ADVTYPE', 'ADVTYPE2', 'NUMTYPE', 'PARTTYPE', '', 'G', 'P', 'V', 'LOC.1', 'LOC.2', 'LOC.3', 'LOC.4', 'DATE.0', 'DATE.1', 'DATE.2'],
    ['aasier', 'aasier', 'aaisier', 'ADJACENS', '', '', 'verb', '', '', '', '', '', '', '', '', '', 'Ind', 'Inf', 'Pres', 'Act', 'Trans', '', '', '', '', '', '', 'g', 'p', 'v', 'grenoble', '', 'paris', 'venezia', 'XII', 'XIII', 'XIV'],
];
*/

const punctuationPattern = /^[!"$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;

var token_array = [];
var form_array = [];
var token_form_array = [];

// Funzione per leggere il file CSV e restituire un array
async function readCSV(url) {
    const response = await fetch(url);
    const csvData = await response.text();
    const rows = csvData.split('\n');
    const data_array = [];
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i].trim();
        if (row !== '') {
            const columns = row.split('|');
            data_array.push(columns);
        }
    }
    return data_array;
}


async function readTokenForm() {
    try {
        const tokenURL = '/ula_data/data_export/tr1.g.ula.csv';
        token_array = await readCSV(tokenURL);
    } catch (error) {
        console.error(error);
    }
    try {
        const formURL = '/ula_data/data_export/dictionary.ula.csv';
        form_array = await readCSV(formURL);
    } catch (error) {
        console.error(error);
    }
}


async function performJoin() {
    await readTokenForm();
    // Creazione di un oggetto mappa per il form_array utilizzando la colonna "KEYS" come chiave
    const formMap = {};
    for (let i = 1; i < form_array.length; i++) {
        const key = form_array[i][1]; // Colonna "KEYS"
        // formMap[key] = form_array[i];
        formMap[key] = i;
    }

    // Join tra token_array e form_array utilizzando la colonna "KEYS" come chiave di join
    for (let i = 1; i < token_array.length; i++) {
        const token_row = token_array[i];
        const key = token_row[1]; /
        if (punctuationPattern.test(key)) {
            continue
        }
        const index = formMap[key];
        const form_row = form_array[index];
        // const form_row = formMap[key];
        if (!form_row) {
            console.log(token_row)
        }
        const mergedRow = token_row.concat(form_row);
        token_form_array.push(mergedRow);
    }

    // Stampare il risultato
    const ok = confirm("ok")
    if (ok)
        console.log(token_form_array);
}




function getMatchingIndices(key) {
    const matchingIndices = [];
    for (let i = 1; i < token_array.length; i++) {
        if (token_array[i][1] === key) {
            matchingIndices.push(i);
        }
    }
    return matchingIndices;
}


async function findToken() {
    await readTokenForm();
    const rows = token_array.slice(10, 20);
    const keys = rows.map(row => row[1]);
    for (let key of keys) {
        const indices = getMatchingIndices(key);
        console.log(key)
        console.log(indices);
    }
}




/////////////////////

function run() {
    // performJoin()
    findToken()
}

