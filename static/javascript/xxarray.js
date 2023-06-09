/**
 * jshint esversion: 11
 *
 * @format
 */

Array.prototype.leftIndextOf = function (element, from = this.length - 1) {
  for (let i = from; i >= 0; i--) if (this[i] === element) return i;
  return -1;
};

// const index = array.findLeftIndex((element) => element === 30);
Array.prototype.findLeftIndex = function (predicate, from = this.length - 1) {
  for (let i = from; i >= 0; i--) if (predicate(this[i], i, this)) return i;
  return -1;
};

// {i:key,..}
Array.prototype.getIndexMap = function (columnIndex) {
  const indexMap = {};
  for (let i = 0; i < this.length; i++) {
    const row = this[i];
    const key = row[columnIndex];
    indexMap[key] = i;
  }
  return indexMap;
};
