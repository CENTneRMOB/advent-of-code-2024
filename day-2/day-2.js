import readFile from "../common/reader.js";

const filepath = "../day-2/input.txt";

const string = readFile(filepath);

////part one
const checkForContinues = (arr) => {
  let process;

  for (let i = 0; i < arr.length - 1; i += 1) {
    const diff = arr[i] - arr[i + 1] > 0 ? "inc" : "dec";
    if (!process) {
      process = diff;
    } else if (diff !== process) return;
  }

  return arr;
};

const checkForDiff = (arr) => {
  const goodDiffs = [1, 2, 3];

  for (let i = arr.length - 1; i > 0; i -= 1) {
    const diff = Math.abs(arr[i] - arr[i - 1]);
    if (!goodDiffs.includes(diff)) return;
  }

  return arr;
};

const firstReports = string
  .split("\n")
  .map((report) => report.split(" ").map(Number))
  .map(checkForDiff)
  .filter(Boolean)
  .map(checkForContinues)
  .filter(Boolean);

console.log({ firstPartResult: firstReports.length }); //246

////part two
const bothChecks = (arr) => {
  const processChecked = checkForContinues(arr);
  const diffChecked = checkForDiff(arr);

  if (processChecked && diffChecked) {
    return arr;
  }

  return;
};

const iterateAndCheck = (arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    const sliced = arr.filter((level, index) => index !== i);

    const checked = bothChecks(sliced);

    if (checked) return arr;
  }

  return;
};

const secondReports = string
  .split("\n")
  .map((report) => report.split(" ").map(Number))
  .map((report) => {
    const checked = bothChecks(report);

    if (checked) return report;

    const iterated = iterateAndCheck(report);

    return iterated ? report : undefined;
  })
  .filter(Boolean);

console.log({ secondPartResult: secondReports.length }); //318
