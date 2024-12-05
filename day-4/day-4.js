import readFile from "../common/reader.js";

const filepath = "../day-4/input.txt";

const string = readFile(filepath);

////part one
const lines = string.split("\n").map((line) => line.split(""));

const checkForRest = (coordsM, diffs) => {
  const [mX, mY] = coordsM;
  const [dX, dY] = diffs;

  let currX = mX + dX;
  let currY = mY + dY;

  for (let i = 0; i < 2; i += 1) {
    if (currX < 0 || currY < 0 || currX > 139 || currY > 139) {
      return 0;
    }

    const isNext = lines[currY][currX] === (i === 0 ? "A" : "S");
    if (!isNext) {
      return 0;
    }

    if (isNext && i === 0) {
      currX += dX;
      currY += dY;
      continue;
    }

    if (isNext && i === 1) {
      return 1;
    }
  }
};

const getWordsCount = (coordsX) => {
  const [initX, initY] = coordsX;

  let sum = 0;

  for (let X = initX - 1; X <= initX + 1; X += 1) {
    if (X < 0 || X > 139) {
      continue;
    }
    for (let Y = initY - 1; Y <= initY + 1; Y += 1) {
      if (Y < 0 || Y > 139 || (X === initX && Y === initY)) {
        continue;
      }
      const char = lines[Y][X];

      if (char !== "M") {
        continue;
      }

      // have direction now, go on
      const diffX = X - initX;
      const diffY = Y - initY;

      sum += checkForRest([X, Y], [diffX, diffY]);
    }
  }

  return sum;
};

const firstPartResult = lines.reduce((acc, line, ind) => {
  const Y = ind;
  let sum = 0;

  for (let X = 0; X < line.length; X += 1) {
    if (line[X] !== "X") {
      continue;
    }

    sum += getWordsCount([X, Y]);
  }

  return acc + sum;
}, 0);

console.log({ firstPartResult }); //2434

////part two
const isMAS = (coordsM, diffs) => {
  const [mX, mY] = coordsM;
  const [dX, dY] = diffs;

  const oppositeDX = dX * -1;
  const oppositeDY = dY * -1;

  const sX = mX + oppositeDX;
  const sY = mY + oppositeDY;

  return lines[sY][sX] === "S";
};

const isXMAS = (coordsA) => {
  const [initX, initY] = coordsA;
  if (initY < 1 || initY > 138 || initX < 1 || initX > 138) {
    return false;
  }

  let masCount = 0;

  for (let X = initX - 1; X <= initX + 1; X += 2) {
    if (X < 0 || X > 139) {
      continue;
    }

    for (let Y = initY - 1; Y <= initY + 1; Y += 2) {
      if (Y < 0 || Y > 139 || (X === initX && Y === initY)) {
        continue;
      }
      const char = lines[Y][X];

      if (char !== "M") {
        continue;
      }

      const diffX = X - initX;
      const diffY = Y - initY;

      const isMas = isMAS([initX, initY], [diffX, diffY]);

      if (isMas) {
        masCount += 1;
      }
    }
  }

  return masCount === 2;
};

const secondPartResult = lines.reduce((acc, line, ind) => {
  const Y = ind;
  let sum = 0;

  for (let X = 0; X < line.length; X += 1) {
    if (line[X] !== "A") {
      continue;
    }

    const isXMas = isXMAS([X, Y]);
    if (isXMas) {
      sum += 1;
    }
  }

  return acc + sum;
}, 0);

console.log({ secondPartResult }); //1835
