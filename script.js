const board = document.querySelector('#board')
const cells = board.querySelectorAll('.cell')

// Player Object using Factory Function
const playerObject = (playerName, icon) => {
    const printName = () => console.log(playerName)
    const name = playerName
    return {
        name,
        printName,
        icon
    }
}

// Game object using IIFE
const Game = (c => {
    const lines =   [[0, 1, 2], [3, 4, 5], [6, 7, 8], 
                    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
                    [0, 4, 8], [2, 4, 6]]
    
    function gameTurn(element, playerTurn) {
        // User clicks, display icon, store move, check winner and draw, swap turn
        placeIcon(element, playerTurn)
        playerTurn = swapTurn(playerTurn)
        winner(playerTurn)
    }

    swapTurn = (playerTurn) => {
        return ([playerTurn[0], playerTurn[1]] = [playerTurn[1], playerTurn[0]])
    }

    placeIcon = (element, playerTurn) => {
        if (element.innerHTML.trim() !== '') { return }
        displayIcon(element, playerTurn)
    }

    displayIcon = (element, playerTurn) => {
        icon = document.createTextNode(playerTurn[0].icon)
        element.appendChild(icon)
    }

    // Check if there's winning line in board
    winner = (playerTurn) => {
        lines.forEach(line => {
            if (line.every(i => c[i].innerHTML == playerTurn[0].icon))
            {
                announceWinner(playerTurn[0])

                return true
            }
            else if (line.every(i => c[i].innerHTML == playerTurn[1].icon)) {
                announceWinner(playerTurn[1])

                return true
            }
        })
        return false
    }

    function announceWinner(player) {
        alert(`${player.name} won!`)
        // setTimeout(() => alert(`${player.name} won!`), 100)
     
        clearBoard()
    }

    function clearBoard() {
        c.forEach(e => {
            e.innerHTML = ''
        })
    }

    // Returns true if draw.
    draw = () => {
        return false
    }

    gameOver = () => {
        console.log("game over")
    }

    function gameRound(player1, player2) {
        let playerTurn = ((array) => {
            // console.log(array)  
            if (Math.random() > 0.5) {
                [array[0], array[1]] = [array[1], array[0]]
            }
    
            return array
        })([player1, player2])  // Randomize first move

        c.forEach(element => {
            element.addEventListener('click', () => {
                gameTurn(element, playerTurn)
            })
        })
    }

    return { gameRound }
})(cells)

Game.gameRound( playerObject('joshuel', '❌'), playerObject('ernest', '⭕'))