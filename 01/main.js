const { readFileSync } = require("fs");

const partTwo = true;

const input = readFileSync("input.txt").toString("ascii");

let floor = 0;

if(partTwo) {
  for(let i = 0; i < input.length; ++i) {
    const char = input[i];

    if(char === "(") {
      ++floor;
    }
    else if(char === ")") {
      --floor;
    }

    if(floor < 0) {
      console.log(i + 1);

      break;
    }
  }
}
else {
  for(const char of input) {
    if(char === "(") {
      ++floor;
    }
    else if(char === ")") {
      --floor;
    }
  }

  console.log(floor);
}
