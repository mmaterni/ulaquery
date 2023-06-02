"use strict"

const table = [
  ['FORMA', 'KEY', 'LEMMA', 'ETIMO', 'LANG', 'DATE', 'POS', 'FUNCT'],
  ['aasier', 'aasier', 'aaisier', 'ADJACENS', '', '', 'verb', ''],
  ['ab', 'abandona', 'abandoner', '*BAN', '', '', 'verb', ''],
  ['abandonance', 'abandonance', 'abondance', 'ABUNDANTIA', '', '', 'noun', ''],
  ['abandonee', 'abandonee', 'abandoner', '*BAN', '', '', 'verb', 'compTens'],
  ['abandoneement', 'abandoneement', 'abandoneement', '*BAN', '', '', 'adverb', ''],
  ['abandonner', 'abandonner', 'abandoner', '*BAN', '', '', 'verb', ''],
  ['abatent', 'abatent1', 'abatre', 'ABATTUERE', '', '', 'verb', ''],
  ['abitee', 'abitee', 'abiter', 'HABITARE', '', '', 'verb', 'compPass'],
  ['abondance', 'abondance', 'abondance', 'ABUNDANTIA', '', '', 'noun', ''],
  ['achater', 'achater', 'achater', '*ACCAPTARE', '', '', 'verb', ''],
  ['achever', 'achever', 'achever', 'CAPUT', '', '', 'verb', ''],
  ['acier', 'acier1', 'acier', 'ACIARIUM', '', '', 'noun', ''],
  ['acoilli', 'acoilli', 'acoillir', '*ACCOLLIGERE', '', '', 'verb', ''],
  ['acollee', 'acollee', 'acoler', 'COLLUM', '', '', 'verb', 'compTens'],
  ['aconpaignier', 'aconpaignier', 'acompagnier', 'COMPANIO', '', '', 'verb', '']
];

function checkCell(cellValue, value) {
  if (value === '')
    return true;
  const parts = value.split('|');
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part === '*')
      return true;
    const regex = new RegExp(`^${part.replace(/\*/g, '.*')}$`);
    if (regex.test(cellValue))
      return true;
  }
  return false;
}

function checkRow(row, conditions) {
  let ok = true;
  for (let i = 0; i < conditions.length; i++) {
    const [column, value] = conditions[i];
    const cellValue = row[column];
    if (!checkCell(cellValue, value)) {
      ok = false;
      break;
    }
  }
  return ok;
}

function queryTab(tab, conditions) {
  let indexs = [];
  for (let i = 0; i < tab.length; i++) {
    const row = tab[i];
    if (checkRow(row, conditions, null))
      indexs.push(i)
  }
  return indexs;
}

const conditions = [[0, 'acon*'], [6, 'verb']];

const arr = queryTab(table, conditions)

for (let x of arr)
  console.log(x)


function run() {
  const arr = queryTab(table, conditions)
  for (let x of arr)
    console.log(x)

}


