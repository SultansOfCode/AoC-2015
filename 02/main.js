const { readlines } = require("../utils");

const partTwo = true;

const processLinePartOne = line => {
  const sizes = line.split("x").map(size => parseInt(size));
  const side1 = sizes[0] * sizes[1];
  const side2 = sizes[0] * sizes[2];
  const side3 = sizes[1] * sizes[2];

  return 2 * side1 + 2 * side2 + 2 * side3 + Math.min(side1, side2, side3);
};

const processLinePartTwo = line => {
  const sizes = line.split("x").map(size => parseInt(size));
  const perimeter1 = 2 * sizes[0] + 2 * sizes[1];
  const perimeter2 = 2 * sizes[0] + 2 * sizes[2];
  const perimeter3 = 2 * sizes[1] + 2 * sizes[2];
  const smallestPerimeter = Math.min(perimeter1, perimeter2, perimeter3);
  const cube = sizes[0] * sizes[1] * sizes[2];

  return smallestPerimeter + cube;
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
