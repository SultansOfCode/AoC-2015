const { readlines } = require("../utils");

const partTwo = true;

const processLinePartOne = line => {
  const houses = {
    "0;0": 1
  };

  let x = 0;
  let y = 0;

  for(const char of line) {
    if(char === ">") {
      ++x;
    }
    else if(char === "<") {
      --x;
    }
    else if(char === "^") {
      ++y;
    }
    else if(char === "v") {
      --y;
    }

    const house = `${x};${y}`;

    if(!Object.prototype.hasOwnProperty.call(houses, house)) {
      houses[house] = 0;
    }

    ++houses[house];
  }

  return Object.keys(houses).length;
};

const processLinePartTwo = line => {
  const houses = {
    "0;0": 1
  };

  let xs = [0, 0];
  let ys = [0, 0];

  for(let i = 0; i < line.length; ++i) {
    const index = (i & 1);
    const char = line[i];

    if(char === ">") {
      ++xs[index];
    }
    else if(char === "<") {
      --xs[index];
    }
    else if(char === "^") {
      ++ys[index];
    }
    else if(char === "v") {
      --ys[index];
    }

    const house = `${xs[index]};${ys[index]}`;

    if(!Object.prototype.hasOwnProperty.call(houses, house)) {
      houses[house] = 0;
    }

    ++houses[house];
  }

  return Object.keys(houses).length;
};

let sum = 0;

for(const line of readlines("input.txt")) {
  if(partTwo) {
    sum += processLinePartTwo(line);
  }
  else {
    sum += processLinePartOne(line);
  }
}

console.log(sum);
