import readFile from "../common/reader.js";

const filepath = "../day-6/input.txt";

const string = readFile(filepath);

////part one
const directions = [">", "<", "v", "^"];

const map = string.split("\n").map((line) => line.split(""));

let startPosition;

map.forEach((line, ind) => {
  line.forEach((point, index) => {
    if (directions.includes(point)) {
      startPosition = [index, ind];
    }
  });
});

const nextPointByDirection = {
  n: ([X, Y]) => [X, Y - 1],
  s: ([X, Y]) => [X, Y + 1],
  e: ([X, Y]) => [X + 1, Y],
  w: ([X, Y]) => [X - 1, Y],
};

const changeDirection = {
  n: "e",
  e: "s",
  s: "w",
  w: "n",
};

const isOutOfMap = (X, Y) => X > 129 || Y > 129 || X < 0 || Y < 0;

const moveOn = (start, map, startDir) => {
  const [X, Y] = start;
  let direction = startDir;
  let count = 0;
  let currX = X;
  let currY = Y;

  while (true) {
    if (isOutOfMap(currX, currY)) {
      break;
    }
    const currPoint = map[currY][currX];
    const [nextX, nextY] = nextPointByDirection[direction]([currX, currY]);
    const nextPoint = map[nextY][nextX];

    if (nextPoint === "#") {
      direction = changeDirection[direction];
      continue;
    }

    if (currPoint === ".") {
      map[currY][currX] = "x";
      count += 1;
    }

    currX = nextX;
    currY = nextY;
    continue;
  }

  return count + 1; //add outside step
};

console.log({ firstPartResult: moveOn(startPosition, map, "n") }); //4374

////part two
const mapTwo = string.split("\n").map((line) => line.split(""));
const obstructions = new Map();

mapTwo.forEach((line, ind) => {
  line.forEach((point, index) => {
    if (point === "#") {
      obstructions.set(`${index}-${ind}`, []); //array with directions
    }
  });
});

const addLoops = (tempMap, newObstructions, tempStartPoint, startDir) => {
  const [X, Y] = tempStartPoint;
  let direction = startDir;
  let currX = X;
  let currY = Y;

  while (true) {
    const [nextX, nextY] = nextPointByDirection[direction]([currX, currY]);

    if (isOutOfMap(nextX, nextY)) {
      return 0;
    }
    const nextPoint = tempMap[nextY][nextX];
    const obstructionKey = `${nextX}-${nextY}`;
    if (!newObstructions.has(obstructionKey)) {
      newObstructions.set(obstructionKey, []);
    }

    if (nextPoint === "#") {
      if (newObstructions.get(obstructionKey).includes(direction)) {
        return 1;
      } else {
        newObstructions.get(obstructionKey).push(direction);
        direction = changeDirection[direction];
        continue;
      }
    } else {
      currX = nextX;
      currY = nextY;
      tempMap[currY][currX] = "x";
    }
  }
};

const moveOnTwo = (start, startDir) => {
  const [X, Y] = start;
  let direction = startDir;
  let count = 0;
  let currX = X;
  let currY = Y;

  while (true) {
    const [nextX, nextY] = nextPointByDirection[direction]([currX, currY]);
    if (isOutOfMap(nextX, nextY)) {
      break;
    }
    const nextPoint = mapTwo[nextY][nextX];

    if (nextPoint === "#") {
      const obstructionKey = `${nextX}-${nextY}`;
      if (!obstructions.get(obstructionKey).includes(direction)) {
        obstructions.get(obstructionKey).push(direction);
      }
      direction = changeDirection[direction];
      continue;
    } else {
      if (nextPoint !== "x") {
        const tempMap = JSON.parse(JSON.stringify(map));
        tempMap[nextY][nextX] = "#";

        const newObstructions = new Map();
        obstructions.forEach((value, key) => {
          newObstructions.set(key, [...value]);
        });

        count += addLoops(tempMap, newObstructions, [currX, currY], direction);
      }
    }

    mapTwo[currY][currX] = "x";
    currX = nextX;
    currY = nextY;
  }

  return count;
};

console.log({ secondPartResult: moveOnTwo(startPosition, "n") }); //1705
