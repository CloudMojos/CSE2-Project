const form = document.querySelector("#code");
const board = document.querySelector("#board");

form.addEventListener("submit", (e) => {
  //   clearOutPut();
  e.preventDefault();

  (() => {
    rows = board.querySelectorAll(".row");
    rows.forEach((row) => {
      children = row.children;
      // children.forEach(child => {
      //     console.log(child);
      // })
      console.log(children);
    });
  })();

  const secretCode = getValues();

  // console.log(S);
  mastermind(secretCode);
});

function clearOutPut() {}

function getValues() {
  const color1 = parseInt(form.querySelector(".col-1").value);
  const color2 = parseInt(form.querySelector(".col-2").value);
  const color3 = parseInt(form.querySelector(".col-3").value);
  const color4 = parseInt(form.querySelector(".col-4").value);
  return [color1, color2, color3, color4];
}

function displayResponse(r, steps) {
  let rowId = "#row-" + steps;
  let row = document.querySelector(rowId);
  let grid = row.querySelector(".response-grid");
  let response = grid.querySelectorAll(".response");
  response.forEach((div, i) => {
    if (r[i]) {
      c = document.createTextNode(r[i]);
    } else {
      c = document.createTextNode("");
    }
    div.appendChild(c);
  });
}

function displayGuess(guess, steps) {
  let rowId = "#row-" + steps;
  let row = document.querySelector(rowId);
  let cols = row.querySelectorAll(".col");
  cols.forEach((div, i) => {
    let c = "";
    if (guess[i] == 1) {
      c += "🔴";
    } else if (guess[i] == 2) {
      c += "🟠";
    } else if (guess[i] == 3) {
      c += "🟡";
    } else if (guess[i] == 4) {
      c += "🟢";
    } else if (guess[i] == 5) {
      c += "🔵";
    } else if (guess[i] == 6) {
      c += "🟣";
    } else {
      c += "";
    }
    div.appendChild(document.createTextNode(c));
  });
}

function mastermind(secretCode) {
  let S = permutation();
  let steps = 0;
  let response = [];
  let table = {};

  while (steps < 10) {
    guess = findGuess(steps, table); // Make the guess
    displayGuess(guess, steps);
    response = makeGuess(guess, secretCode); // Get the response
    displayResponse(response, steps);
    // Break out of the loop if it's a win or else trim S
    if (!checkWin(guess, response)) {
      // Remove from S all the codes that are not consistent
      S = trimPossibleCodes(guess, S, response);
    } else {
      break;
    }
    // Check the scores of each S to make guess, count the scores to make for the next guess.
    table = createTable(S); // Apply minmax to create table
    console.table(table);
    steps++;
  }
}

function findGuess(steps, table) {
  let guess = [1, 1, 2, 2]; // Initial guess
  if (steps == 0) {
    console.log("The Guess:" + guess);
    return guess;
  } else {
    // from table, find the maximum, if there is a tie, pick the first index.
    let scoreArray = Object.values(table);
    let maxScore = Math.max(...scoreArray);
    // console.log(maxScore);
    for (let p in table) {
      // return the first seen max
      if (table[p] == maxScore) {
        guess = p.split(",").map(Number);
        break;
      }
    }
    console.log("The Guess:" + guess);
    return guess;
  }
}

function createTable(S) {
  let scores = {};
  let guessTable = {};
  // In an element of S, count the number of times of how many a response is in it.
  for (let i = 0; i < S.length; i++) {
    // console.log('Score Checker: ' + S[i]);
    for (let j = 0; j < S.length; j++) {
      let score = makeGuess(S[j], S[i]);
      if (S[j] === S[i]) {
        continue;
      }
      if (score in scores) {
        scores[score]++;
      } else {
        scores[score] = 1;
      }
    }

    let array = Object.values(scores);
    let max = Math.max(...array);
    let finalScore = S.length - max;
    guessTable[S[i]] = finalScore;

    scores = {};
  }
  return guessTable;
}

function checkScores() {
  let scores = {};
  let scoreChecker = S.shift();
  console.log("Score Checker: " + scoreChecker);
  S.forEach((code) => {
    response = makeGuess(code, scoreChecker);
    if (response in scores) {
      scores[response]++;
    } else {
      scores[response] = 1;
    }
  });
  console.log(scores);
  // find the highest in scores, then return the score
  let array = Object.values(scores);
  let max = Math.max(...array);
  return max;
}

function makeGuess(g, c) {
  // Check how many are ⚫, and ⚪
  let response = [];
  let code = [...c]; // 2, 2, 1, 2
  let guess = [...g];

  // Add exact
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === code[i]) {
      response.push("⚫");
      guess[i] = 0;
      code[i] = -1;
    }
  }
  // Remove guesses that were already found to not duplicate
  guess = guess.filter((e) => e != 0);

  // Add not exact but contain
  for (let i = 0; i < guess.length; i++) {
    for (let j = 0; j < code.length; j++) {
      guess[i];
      code[j];
      if (guess[i] === code[j]) {
        response.push("⚪");
        code[j] = -1;
        break;
      }
    }
  }
  return response;
}

function checkWin(guess, response) {
  if (response.every((e) => e === "⚫") && response.length == 4) {
    console.log("You've guessed the code!");
    console.log("The code is: " + guess);
    return true;
  } else {
    return false;
  }
  // console.log(response);
}

function trimPossibleCodes(guess, S, response) {
  return S.filter(
    (code) => response.toString() == makeGuess(code, guess).toString()
  );
}

// function toyPermutation() {
//     let possibleCodes = []
//     for (let i = 1; i < 5; i++) {
//         for (let j = 1; j < 5; j++) {
//             for (let k = 1; k < 5; k++) {
//                 possibleCodes.push([i, j, k]);
//             }
//         }
//     }
//     return possibleCodes;
// }

function permutation() {
  let possibleCodes = [];
  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 7; j++) {
      for (let k = 1; k < 7; k++) {
        for (let l = 1; l < 7; l++) {
          possibleCodes.push([i, j, k, l]);
        }
      }
    }
  }
  return possibleCodes;
}
