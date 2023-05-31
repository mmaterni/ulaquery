
/*
function leftIndexOf(array, startIndex, element) {
    let index = startIndex;
    while (index > -1 && array[index] !== element)
        index--;
    return index;
}

const ar = ['a', 'b', 'c', 'd', 'e', 'f'];
const p = leftIndexOf(ar, 4, 'a');
console.log(p);
console.log(ar[p]);
*/
/*
Array.prototype.binarySearch = function(value) {
    let start = 0;
    let end = this.length - 1;
  
    while (start <= end) {
      const middle = Math.floor((start + end) / 2);
  
      if (this[middle] === value) {
        return middle;
      } else if (this[middle] < value) {
        start = middle + 1;
      } else {
        end = middle - 1;
      }
    }
    return -1;
  };
  
  const array = [1, 3, 5, 7, 9];
  const value = 5;
  const index = array.binarySearch(value);
  console.log(index); // Output: 2
  */
 
  