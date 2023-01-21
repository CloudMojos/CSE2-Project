const board = document.querySelector('#board');
const possibleCodes = permutation();

board.addEventListener('submit', e => {
    e.preventDefault();
    const codeArray = getValues();
    mastermind(codeArray)
});

function getValues() {
    const color1 = parseInt(board.querySelector('.col-1').value);
    const color2 = parseInt(board.querySelector('.col-2').value);
    const color3 = parseInt(board.querySelector('.col-3').value);
    const color4 = parseInt(board.querySelector('.col-4').value);
    return [color1, color2, color3, color4]
}

function mastermind(codeArray) {
    // Initial guess
    const initialGuess = [1, 1, 2, 2];
    makeGuess(initialGuess, codeArray);
}

function makeGuess(g, c) {
    // Check how many are ⚫, and ⚪
    let response = [];
    let code = [...c]; // 2, 2, 1, 2
    let guess = [...g];
    console.log(code);
    console.log(guess);
    
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
    console.log(response);
}

function permutation() {
    let possibleCodes = new Set();
    for (let i = 1; i < 7; i++) {
        for (let j = 1; j < 7; j++) {
            for (let k = 1; k < 7; k++) {
                for (let l = 1; l < 7; l++)
                {
                    possibleCodes.add([i, j, k, l]);
                }
            }
        }
    }
    return possibleCodes
}
