const targetRow = 3010;
const targetColumn = 3019;

let rows = 1;
let row = 1;
let column = 1;
let code = 20151125;

while(true) {
  if(row > 1 || column > 1) {
    code = (code * 252533) % 33554393;
  }

  if(row === targetRow && column === targetColumn) {
    break;
  }

  --row;
  ++column;

  if(row === 0) {
    ++rows;

    row = rows;
    column = 1;
  }
}

console.log(code);
