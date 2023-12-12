const partTwo = true;

const input = "vzbxkghb";

const str2num = str => {
  const digits = str.split("").reverse().join("");

  let num = 0;

  for(let i = 0; i < digits.length; ++i) {
    num += Math.pow(26, i) * (digits.charCodeAt(i) - 97);
  }

  return num;
};

const num2str = num => {
  let str = "";

  while(num > 0) {
    str = String.fromCharCode((num % 26) + 97) + str;

    num = Math.trunc(num / 26);
  }

  return str.padStart(8, "a");
};

const firstRule = str => {
  const sequences = [
    "abc", "bcd", "cde", "def", "efg", "fgh", "ghi", "hij", "ijk", "jkl", "klm", "lmn", "mno",
    "nop", "opq", "pqr", "qrs", "rst", "stu", "tuv", "uvw", "vwx", "wxy", "xyz", //"yza", "zab"
  ];

  for(let i = 0; i <= str.length - 3; ++i) {
    const part = str.substring(i, i + 3);

    if(sequences.includes(part)) {
      return true;
    }
  }

  return false;
};

const secondRule = str => {
  return !/[ilo]/g.test(str);
};

const thirdRule = str => {
  const rule = /([a-z])\1/g;

  if(!rule.test(str)) {
    return false;
  }
  
  if(!rule.test(str)) {
    return false;
  }

  return true;
};

const isValid = num => {
  const str = num2str(num);

  if(!firstRule(str)) {
    return false;
  }

  if(!secondRule(str)) {
    return false;
  }

  if(!thirdRule(str)) {
    return false;
  }

  return true;
};

let password = str2num(input);

const findNext = str => {
  let num = str2num(str) + 1;

  while(!isValid(num)) {
    ++num;
  }

  return num2str(num);
}

let nextPassword = findNext(input);

if(partTwo) {
  nextPassword = findNext(nextPassword);
}

console.log(nextPassword);
console.log(str2num("zaa"))