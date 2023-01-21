const board = document.querySelector('#board');
let S = toyPermutation();

board.addEventListener('submit', e => {
    e.preventDefault();
    // const secretCode = getValues();
    const secretCode = [4, 2, 1];
    // console.log(S);
    mastermind(secretCode);
});

function getValues() {
    const color1 = parseInt(board.querySelector('.col-1').value);
    const color2 = parseInt(board.querySelector('.col-2').value);
    const color3 = parseInt(board.querySelector('.col-3').value);
    const color4 = parseInt(board.querySelector('.col-4').value);
    return [color1, color2, color3, color4]
}

function mastermind(secretCode) {
    let steps = 0;
    let guess = findGuess(steps);
    let response = [];
    // Initial guess
    guess = findGuess(steps);
    response = makeGuess(guess, secretCode);
    S = checkWin(guess, response);
    createTable(); // Minmax
    steps++;
}

function findGuess(steps) {
    if (steps == 0) {
        return initialGuess = [1, 2, 3];
    } else {
        return 
    }
}

function createTable() {
    let scores = {};
    let scoreChecker = S.shift();
    console.log('Score Checker: ' + scoreChecker);
    S.forEach(code => {
        response = makeGuess(code, scoreChecker);
        if (response in scores) {
            scores[response]++;
        } else {
            scores[response] = 1;
        }
    })
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
            response.push('⚫');
            guess[i] = 0;
            code[i] = -1;
        }
    }
    // Remove guesses that were already found to not duplicate
    guess = guess.filter(e => e != 0 );

    // Add not exact but contain
    for (let i = 0; i < guess.length; i++) {
        for (let j = 0; j < code.length; j++) {
            guess[i];
            code[j];
            if (guess[i] === code[j]) {
                response.push('⚪');
                code[j] = -1;
                break;
            }
        }
    }
    return response;
}

function checkWin(guess, response) {
    if (response.every(e => e === '⚫') && response.length == 2) {
        console.log("You've guessed the code!")
    }

    else {
        // Remove from S all the codes that are not consistent
        return trimPossibleCodes(guess, S, response);
        // Check the scores of each S to make guess, count the scores to make for the next guess.

    }
    // console.log(response);
}



function trimPossibleCodes(guess, S, response) {
    return S.filter((code) => response.toString() == makeGuess(code, guess).toString())
}

function toyPermutation() {
    let possibleCodes = []
    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 5; j++) {
            for (let k = 1; k < 5; k++) {
                possibleCodes.push([i, j, k]);
            }
        }
    }
    return possibleCodes;
}

function permutation() {
    let possibleCodes = [];
    for (let i = 1; i < 7; i++) {
        for (let j = 1; j < 7; j++) {
            for (let k = 1; k < 7; k++) {
                for (let l = 1; l < 7; l++)
                {
                    possibleCodes.push([i, j, k, l]);
                }
            }
        }
    }
    return possibleCodes;
}
