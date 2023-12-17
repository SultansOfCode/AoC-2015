const { readlinesUntilEmpty } = require("../utils");

const partTwo = true;

const duration = 2503;

const lines = readlinesUntilEmpty("input.txt").next().value.map(line => line.split(" "));

const reindeers = [];

for(const line of lines) {
  const [name, , , velocityText, , , gasText, , , , , , , restText] = line;
  const velocity = parseInt(velocityText);
  const gas = parseInt(gasText);
  const rest = parseInt(restText);
  const sprint = gas + rest;
  const distancePerSprint = velocity * gas;

  const reindeer = {
    name,
    velocity,
    gas,
    rest,
    sprint,
    distancePerSprint,
    travelled: 0,
    points: 0
  };

  reindeers.push(reindeer);
}


if(partTwo) {
  let fartherDistance = -Infinity;
  let fartherReindeers = [];

  for(let i = 0; i < duration; ++i) {
    for(const reindeer of reindeers) {
      if(i % reindeer.sprint >= reindeer.gas) {
        continue;
      }

      reindeer.travelled += reindeer.velocity;

      if(reindeer.travelled > fartherDistance) {
        fartherDistance = reindeer.travelled;
        fartherReindeers = [reindeer];
      }
      else if(reindeer.travelled === fartherDistance) {
        fartherReindeers.push(reindeer);
      }
    }

    for(const fartherReindeer of fartherReindeers) {
      ++fartherReindeer.points;
    }
  }

  let maximumPoints = -Infinity;

  for(const reindeer of reindeers) {
    if(reindeer.points <= maximumPoints) {
      continue;
    }

    maximumPoints = reindeer.points;
  }

  console.log(maximumPoints);
}
else {
  let farther = -Infinity;

  for(const reindeer of reindeers) {
    const sprints = Math.trunc(duration / reindeer.sprint);
    const remainingTime = duration % reindeer.sprint;
    const remainingSprintTime = Math.min(reindeer.gas, remainingTime);

    const totalDistance = sprints * reindeer.distancePerSprint + remainingSprintTime * reindeer.velocity;

    if(totalDistance > farther) {
      farther = totalDistance;
    }
  }

  console.log(farther);
}
