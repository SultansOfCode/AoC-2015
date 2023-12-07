const crypto = require("crypto");

const md5 = input => crypto.createHash("md5").update(input).digest("hex");

const partTwo = true;

const key = "yzbqklnj";
const target = (partTwo ? "000000" : "00000");

let i = 0;

while(true) {
  const input = `${key}${i}`;
  const hash = md5(input);

  if(!hash.startsWith(target)) {
    ++i;

    continue;
  }

  console.log(i);

  break;
}
