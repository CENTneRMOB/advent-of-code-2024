import readFile from "../common/reader.js";

const filepath = "../day-5/input.txt";

const string = readFile(filepath);

////part one
const rules = [];
const updates = [];
const rulesByFirst = {};
const rulesBySecond = {};

string
  .split("\n")
  .filter(Boolean)
  .forEach((line) => {
    if (line.length === 5) {
      rules.push(line);
    } else {
      updates.push(line);
    }
  });

rules
  .map((rule) => rule.split("|").map(Number))
  .forEach((item) => {
    const [first, second] = item;

    if (!(first in rulesByFirst)) {
      rulesByFirst[first] = [];
    }
    if (!(second in rulesBySecond)) {
      rulesBySecond[second] = [];
    }

    rulesByFirst[first].push(second);
    rulesBySecond[second].push(first);
  });

const splittedUpdates = updates.map((update) => update.split(",").map(Number));

const isUpdateCorrect = (update) => {
  let tempArr = [...update];
  tempArr.sort((a, b) => {
    const byFirstA = rulesByFirst[a];
    const bySecondB = rulesBySecond[b];

    if (a === b) {
      return 0;
    }

    if (byFirstA.includes(b) && bySecondB.includes(a)) {
      return -1;
    }

    return 1;
  });

  const originalStr = update.join(",");
  const sortedStr = tempArr.join(",");

  return originalStr === sortedStr;
};

const firstPartResult = splittedUpdates
  .filter(isUpdateCorrect)
  .reduce((acc, update) => acc + update[Math.floor(update.length / 2)], 0);

console.log({ firstPartResult }); //7024

////part two
const secondPartResult = splittedUpdates
  .filter((update) => !isUpdateCorrect(update))
  .map((update) => {
    update.sort((a, b) => {
      const byFirstA = rulesByFirst[a];
      const bySecondB = rulesBySecond[b];

      if (a === b) {
        return 0;
      }

      if (byFirstA.includes(b) && bySecondB.includes(a)) {
        return -1;
      }

      return 1;
    });

    return update;
  })
  .reduce((acc, update) => acc + update[Math.floor(update.length / 2)], 0);

console.log({ secondPartResult }); //4151
