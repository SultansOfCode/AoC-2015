const input = require("./input");

const partTwo = true;

const traverse = obj => {
  let sum = 0;

  for(const key of Object.keys(obj)) {
    const value = obj[key];

    if(typeof value === "number") {
      sum += value;
    }
    else if(Array.isArray(value)) {
      sum += traverse(value);
    }
    else if(value === Object(value)) {
      if(partTwo && Object.values(value).includes("red")) {
        continue;
      }

      sum += traverse(value);
    }
  }

  return sum;
};

console.log(traverse(input));