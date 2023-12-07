const { readlines } = require("../utils");

const partTwo = true;

const rulesPartOne = [
  [/.*?[aeiou].*?[aeiou].*?[aeiou]/g, true],
  [/(.)\1/g, true],
  [/ab|cd|pq|xy/g, false]
];

const rulesPartTwo = [
  [/(..).*?\1/g, true],
  [/(.).\1/g, true]
];

const rules = (partTwo ? rulesPartTwo : rulesPartOne);

const processLine = line => {
  for(const [rule, expected] of rules) {
    rule.lastIndex = 0;

    if(rule.test(line) === expected) {
      continue;
    }

    return 0;
  }

  return 1;
};

let sum = 0;

for(const line of readlines("input.txt")) {
  sum += processLine(line);
}

console.log(sum);
