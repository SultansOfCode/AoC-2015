const partTwo = true;

let input = "1321131112";

const lookAndSay = number => {
  let result = "";
  let i = 0;

  while(i < number.length) {
    const digit = number[i];

    let count = 0;

    while(number[i] === digit) {
      ++count;
      ++i;
    }

    result += count.toString() + digit;
  }

  return result;
};

for(let i = 0; i < (partTwo ? 50 : 40); ++i) {
  input = lookAndSay(input);
}

console.log(input.length);
