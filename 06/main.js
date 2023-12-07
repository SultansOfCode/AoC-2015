const { readlines } = require("../utils");

const partTwo = true;

const lights = [];

for(let i = 0; i < 1000; ++i) {
  const row = [];

  for(let j = 0; j < 1000; ++j) {
    row.push(0);
  }

  lights.push(row);
}

const processLinePartOne = line => {
  const firstSplit = line.split("through");
  const end = firstSplit[1].trim().split(",").map(value => parseInt(value));
  const secondSplit = firstSplit[0].trim().split(" ");
  const start = secondSplit.pop().trim().split(",").map(value => parseInt(value));
  const command = secondSplit.join(" ");

  if(command === "turn on") {
    for(let i = start[0]; i <= end[0]; ++i) {
      for(let j = start[1]; j <= end[1]; ++j) {
        lights[i][j] = 1;
      }
    }
  }
  else if(command === "turn off") {
    for(let i = start[0]; i <= end[0]; ++i) {
      for(let j = start[1]; j <= end[1]; ++j) {
        lights[i][j] = 0;
      }
    }
  }
  else if(command === "toggle") {
    for(let i = start[0]; i <= end[0]; ++i) {
      for(let j = start[1]; j <= end[1]; ++j) {
        lights[i][j] ^= 1;
      }
    }
  }
};

const processLinePartTwo = line => {
  const firstSplit = line.split("through");
  const end = firstSplit[1].trim().split(",").map(value => parseInt(value));
  const secondSplit = firstSplit[0].trim().split(" ");
  const start = secondSplit.pop().trim().split(",").map(value => parseInt(value));
  const command = secondSplit.join(" ");

  if(command === "turn on") {
    for(let i = start[0]; i <= end[0]; ++i) {
      for(let j = start[1]; j <= end[1]; ++j) {
        ++lights[i][j];
      }
    }
  }
  else if(command === "turn off") {
    for(let i = start[0]; i <= end[0]; ++i) {
      for(let j = start[1]; j <= end[1]; ++j) {
        lights[i][j] = Math.max(0, lights[i][j] - 1);
      }
    }
  }
  else if(command === "toggle") {
    for(let i = start[0]; i <= end[0]; ++i) {
      for(let j = start[1]; j <= end[1]; ++j) {
        lights[i][j] += 2;
      }
    }
  }
};

if(partTwo) {
  for(const line of readlines("input.txt")) {
    processLinePartTwo(line);
  }

  let sum = 0;

  for(const row of lights) {
    for(const column of row) {
      sum += column;
    }
  }

  console.log(sum);
}
else {
  for(const line of readlines("input.txt")) {
    processLinePartOne(line);
  }

  let on = 0;

  for(const row of lights) {
    for(const column of row) {
      if(column === 0) {
        continue;
      }

      ++on;
    }
  }

  console.log(on);
}
