const { readlines } = require("../utils");

const partTwo = true;

const processLinePartOne = line => {
  const codeLength = line.length;

  line = line.replace(/\\(\\|\"|x[A-Fa-f0-9]{2})/g, ".");

  const memoryLength = line.length - 2;

  return [codeLength, memoryLength];
};

const processLinePartTwo = line => {
  const codeLength = line.length;

  line = line.replace(/\\/g, "\\\\");
  line = line.replace(/"/g, "\\\"");

  const encodedLength = line.length + 2;

  return [codeLength, encodedLength];
};

let sumOriginal = 0;
let sumModified = 0;

for(const line of readlines("input.txt")) {
  if(partTwo) {
    const [inCode, inEncoded] = processLinePartTwo(line);

    sumOriginal += inCode;
    sumModified += inEncoded;
  }
  else {
    const [inCode, inMemory] = processLinePartOne(line);

    sumOriginal += inCode;
    sumModified += inMemory;
  }
}

console.log(Math.abs(sumModified - sumOriginal));
