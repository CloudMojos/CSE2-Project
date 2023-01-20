const board = document.querySelector('#board');
const possibleCodes = permutation();

board.addEventListener('submit', e => {
    e.preventDefault();
    const codeArray = getValues();
    console.log(codeArray);
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
    const initialGuess = [1, 1, 2, 2]
    console.log(`Guess: ${initialGuess}`);
    makeGuess(initialGuess, codeArray);
}

function makeGuess(g, c) {
    // Check how many are ⚫, and ⚪
    let black = 0; // black == exact position
    let white = 0;  // white == in code, not exact pos
    let code = [...c];
    
    // Checks for the exact
    for (let i = 0; i < 4; i++){
        if (g[i] == c[i]) {
            black++;
            code.splice(i, 1);
            continue;
        }
       // Checks for the contain
        code = code.filter(e => {
            if (g[i] != e) {
                return true;
            }
            white++;
            return false;
        })
        console.log(code);
    }
    console.log(`black ${black}, white ${white}, code ${code}`);
}

function permutation() {
    let possibleCodes = []
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
    return possibleCodes
}
