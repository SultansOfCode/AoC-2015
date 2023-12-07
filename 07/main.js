const { readlines } = require("../utils");

const partTwo = true;

const commandsRules = [
  ["move", /^(\w+) -> ([a-z]+)$/g],
  ["and", /^(\w+) AND (\w+) -> ([a-z]+)$/g],
  ["or", /^(\w+) OR (\w+) -> ([a-z]+)$/g],
  ["not", /^NOT (\w+) -> ([a-z]+)$/g],
  ["lshift", /^(\w+) LSHIFT (\w+) -> ([a-z]+)$/g],
  ["rshift", /^(\w+) RSHIFT (\w+) -> ([a-z]+)$/g]
];

let statements = [];
let wires = {};

const getValue = operator => {
  let value = parseInt(operator);

  if(!isNaN(value)) {
    return value;
  }

  if(!Object.prototype.hasOwnProperty.call(wires, operator)) {
    return void 0;
  }

  return wires[operator];
};

const allStatementsExecuted = () => {
  for(const statement of statements) {
    if(statement.executed) {
      continue;
    }

    return false;
  }

  return true;
};

const processStatement = statement => {
  const command = statement.command;
  const operators = statement.operators;
  const destination = statement.destination;

  const values = [];

  for(const operator of operators) {
    const value = getValue(operator);

    if(value === void 0) {
      return;
    }

    values.push(value);
  }

  let result;

  if(command === "move") {
    result = values[0];    
  }
  else if(command === "and") {
    result = values[0] & values[1];
  }
  else if(command === "or") {
    result = values[0] | values[1];
  }
  else if(command === "not") {
    result = ~values[0];
  }
  else if(command === "lshift") {
    result = values[0] << values[1];
  }
  else if(command === "rshift") {
    result = values[0] >> values[1]
  }

  if(!Object.prototype.hasOwnProperty.call(wires, destination)) {
    wires[destination] = result & 0xffff;
  }

  statement.executed = true;
};

const processStatements = () => {
  for(const statement of statements) {
    if(statement.executed) {
      continue;
    }

    processStatement(statement);
  }
};

const addStatement = (command, match) => {
  const operators = [];
  let destination;

  if(["move", "not"].includes(command)) {
    operators.push(match[1]);

    destination = match[2];
  }
  else if(["and", "or", "lshift", "rshift"].includes(command)) {
    operators.push(match[1]);
    operators.push(match[2]);

    destination = match[3];
  }

  const statement = {
    command,
    operators,
    destination,
    executed: false
  };

  statements.push(statement);
};

const processLine = line => {
  for(const [commandName, commandRule] of commandsRules) {
    commandRule.lastIndex = 0;

    const match = commandRule.exec(line);

    if(!match) {
      continue;
    }

    addStatement(commandName, match);
  }
};

const processChallenge = () => {
  for(const line of readlines("input.txt")) {
    processLine(line);
  }

  while(!allStatementsExecuted()) {
    processStatements();
  }
}

processChallenge();

if(partTwo) {
  statements = [];
  wires = {
    b: wires.a
  };

  processChallenge();
}

console.log(wires.a);
