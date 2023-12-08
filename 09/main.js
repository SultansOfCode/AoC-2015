const { readlines } = require("../utils");

const partTwo = true;

const processLinePartOne = line => {
  const codeLength = line.length;

  line = line.replace(/\\(\\|\"|x[A-Fa-f0-9]{2})/g, ".");

  const memoryLength = line.length - 2;

  return [codeLength, memoryLength];
};

const cities = [];
const distances = {};

const findDistances = (start, left, total) => {
  if(left.length === 0) {
    return [total];
  }

  const travelDistances = [];

  for(const cityLeft of left) {
    const distance = (start.length === 0 ? 0 : distances[start[start.length - 1]][cityLeft]);
    const travelDistance = findDistances([...start, cityLeft], left.filter(city => city !== cityLeft), total + distance);

    travelDistances.push(...travelDistance);
  }

  return Array.from(new Set(travelDistances));
};

const findMaximum = () => {
  return Math.max(...findDistances([], cities, 0));
};

const findMinimum = () => {
  return Math.min(...findDistances([], cities, 0));
};

for(const line of readlines("input.txt")) {
  const [citiesToken, distanceToken] = line.split(" = ");
  const [cityA, cityB] = citiesToken.split(" to ");
  const distance = parseInt(distanceToken);

  if(!cities.includes(cityA)) {
    cities.push(cityA);
  }

  if(!cities.includes(cityB)) {
    cities.push(cityB);
  }

  if(!Object.prototype.hasOwnProperty.call(distances, cityA)) {
    distances[cityA] = {};
  }

  if(!Object.prototype.hasOwnProperty.call(distances, cityB)) {
    distances[cityB] = {};
  }

  distances[cityA][cityB] = distance;
  distances[cityB][cityA] = distance;
}

if(partTwo) {
  console.log(findMaximum());
}
else {
  console.log(findMinimum());
}
