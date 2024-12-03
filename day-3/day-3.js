import readFile from "../common/reader.js";

const filepath = "../day-3/input.txt";

const string = readFile(filepath);

////part one
const regex = /mul\(\d{1,},\d{1,}\)/gm;

const matches = string.match(regex);

const firstPartResult = matches
  .map((mul) => {
    const regex = /\d{1,}/gm;

    const [first, second] = mul.match(regex);

    return Number(first) * Number(second);
  })
  .reduce((acc, mul) => acc + mul, 0);

console.log({ firstPartResult }); //188116424

////part two
const regexTwo = /mul\(\d{1,},\d{1,}\)|do\(\)|don't\(\)/gm;

const matchesTwo = string.match(regexTwo);

const dict = {
  do: [],
  dont: [],
};

let target = "do";

for (const item of matchesTwo) {
  if (item === "do()") {
    target = "do";
    continue;
  }

  if (item === "don't()") {
    target = "dont";
    continue;
  }

  dict[target].push(item);
}

const secondPartResult = dict.do
  .map((mul) => {
    const regex = /\d{1,}/gm;

    const [first, second] = mul.match(regex);

    return Number(first) * Number(second);
  })
  .reduce((acc, mul) => acc + mul, 0);

console.log({ secondPartResult }); //104245808

