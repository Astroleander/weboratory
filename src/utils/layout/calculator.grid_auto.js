/**
 * 
 * @param {Array} array contains all elements 
 * @param {Integer} item_size
 * @param {Number} margin
 */
export default function (array, item_size = 10, margin = 10) {
  // default column size
  let column = 6;
  for (let i = 6; i > 3; i--) {
    array.length % i === 0? column = i : 0;
  }

  let row = Math.floor(array.length / column);

  let width = column * item_size + (column - 1) * margin;
  let height = row * item_size + (row - 1) * margin;
  
  let coordinates = new Array(array.length).fill().map((e, idx) => e = {
    obj: array[idx],
    column: idx % column,
    row: Math.floor(idx / column),
    x: (idx % column) * (item_size + margin) + item_size / 2 - width / 2, 
    y: Math.floor(idx / column) * (item_size + margin) + item_size / 2 - height / 2,
    rotation: array[idx].rotation ? true : false
  })
  return {
    size: [width, height],
    coordinates
  };
}