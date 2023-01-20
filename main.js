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
    initialGuess = [1, 1, 2, 2]
    makeGuess(initialGuess, codeArray);
    //
}

function makeGuess(g, c) {
    // Check how many are ⚫
    let black = 0; // black == exact position
    let inCode = []; // white == in code, not exact pos
    for (let i = 0; i < 4; i++)
    {
        if (g[i] == c[i]) { 
            black++;
            inCode.push(g[i]);
        }
    }
    // Check how many are ⚪
    let white = 0;
    
    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 4; j++) {
            if (inCode.includes(g[i])) {
                break; // break if it's already in code
            }
            else if (c.includes(g[i])) {
                inCode.push(g[i]);
            }
        }
    }
    console.log(inCode);
    return black;
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
