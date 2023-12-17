const { readlinesUntilEmpty } = require("../utils");

const partTwo = true;

const lines = readlinesUntilEmpty("input.txt").next().value.map(line => line.replace(/\./g, "").split(" "));

const map = {};

for(const line of lines) {
  const [person1, , gainOrLose, ammountText, , , , , , , person2] = line;
  const multiplier = (gainOrLose === "gain" ? 1 : -1);
  const ammount = parseInt(ammountText) * multiplier;

  if(!Object.prototype.hasOwnProperty.call(map, person1)) {
    map[person1] = {};
  }

  map[person1][person2] = ammount;
}

const people = Object.keys(map);

if(partTwo) {
  map["Me"] = {};

  for(const person of people) {
    map[person]["Me"] = 0;
    map["Me"][person] = 0;
  }

  people.push("Me");
}

function* permutator(inputArr) {
  const permutations = [];

  const permute = (arr, m = []) => {
    if(arr.length === 0) {
      permutations.push(m);
    }
    else {
      for(let i = 0; i < arr.length; ++i) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);

        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  for(const permutation of permutations) {
    yield permutation;
  }
}

let mostHappy = -Infinity;

for(const permutation of permutator(people)) {
  permutation.push(permutation[0]);

  let sum = 0;

  for(let i = 0; i < permutation.length - 1; ++i) {
    const person1 = permutation[i];
    const person2 = permutation[i + 1];

    sum += map[person1][person2];
    sum += map[person2][person1];
  }

  if(sum > mostHappy) {
    mostHappy = sum;
  }
}

console.log(mostHappy);
