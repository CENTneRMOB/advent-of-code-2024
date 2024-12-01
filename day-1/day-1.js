import readFile from "../common/reader.js";

const filepath = "../day-1/input.txt";

const string = readFile(filepath);

const firstList = [];
const secondList = [];

const splitted = string.split("\n").forEach((pair) => {
  const [first, second] = pair.split("   ");
  firstList.push(Number(first));
  secondList.push(Number(second));
});

const sortedFirst = firstList.sort((a, b) => a - b);
const sortedSecond = secondList.sort((a, b) => a - b);

const firstResult = sortedFirst.reduce(
  (acc, item, index) => acc + Math.abs(item - sortedSecond[index]),
  0
);

console.log({ firstResult });

/////part two

const secondListMap = new Map();

sortedSecond.forEach((item) => {
  const isExist = secondListMap.has(item);

  if (isExist) {
    const currentValue = secondListMap.get(item);
    secondListMap.set(item, currentValue + 1);
  } else {
    secondListMap.set(item, 1);
  }
});

const secondResult = sortedFirst.reduce((acc, item) => {
  const isExist = secondListMap.has(item);

  if (isExist) {
    const existingValue = secondListMap.get(item);
    return acc + item * existingValue;
  }

  return acc + 0;
}, 0);

console.log({ secondResult });
