const squares = document.querySelectorAll('.square')
const board = document.querySelector('.board')
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
let circleTurn

let xScore = 0
let circleScore = 0

const btnStart = document.querySelector('#btn')
const inputs = document.querySelector('.inputs')
const header = document.querySelector('.header')
const btnRestartGame = document.querySelector('#restartGame')

const player1NameInput = document.querySelector('#player1name')
const player2NameInput = document.querySelector('#player2name')
const xScoreBoard = document.querySelector('.XScoreBoard')
const CircleScoreBoard = document.querySelector('.CircleScoreBoard')

const player1Name = document.querySelector('#player1')
const player2Name = document.querySelector('#player2')

const endGameScreen = document.querySelector('.endGameScreen')
const gameResult = document.querySelector('#gameResult')

const changePlayers = document.querySelector('.changePlayers')
changePlayers.addEventListener('click', () => {
    document.location.reload()
})

function scoreUpdate(){
    return circleTurn? circleScore += 1: xScore += 1
}

btnStart.addEventListener('click', () => {
    if (player1NameInput.value && player2NameInput.value){
        player1Name.innerText = `${player1NameInput.value}`
        player2Name.innerText = `${player2NameInput.value}`
        startGame()
    }
})

btnRestartGame.addEventListener('click', startGame)

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function startGame(){
    player1Name.classList.add('turn')
    player2Name.classList.remove('turn')
    inputs.style.display = 'none'
    header.style.display = 'block'
    board.style.display = 'grid'
    endGameScreen.style.display = 'none'
    circleTurn = false
    squares.forEach(square => {
        square.classList.remove(X_CLASS)
        square.classList.remove(CIRCLE_CLASS)
        square.removeEventListener('click', handleClick)
        square.addEventListener('click', handleClick, {once: true})
    })
    squareHover()
}

function squareHover(){
    if (circleTurn){
        getComputedStyle(document.documentElement).getPropertyValue('--backgroundImage')
        document.documentElement.style.setProperty('--backgroundImage', `url(img/circle.png)`)
    } else {
        getComputedStyle(document.documentElement).getPropertyValue('--backgroundImage')
        document.documentElement.style.setProperty('--backgroundImage', `url(img/x.png)`)
    }
}

function handleClick(ev){
    const square = ev.target
    const currentClass = circleTurn? CIRCLE_CLASS : X_CLASS
    placeMark (square, currentClass)
    if (winCheck(currentClass)){
        scoreUpdate()
        endGame(false)
        xScoreBoard.innerText = xScore
        CircleScoreBoard.innerText = circleScore
        console.log('x'+xScore)
        console.log('circle'+circleScore)
    } else if (drawCheck()){
        endGame(true)
    } else {
        switch(circleTurn){
            case false:
                player2Name.classList.add('turn')
                player1Name.classList.remove('turn')
                break
            case true:
                player2Name.classList.remove('turn')
                player1Name.classList.add('turn')
                break
        }
        swapTurn()
        squareHover()
    }
    
}

function endGame(draw){
    endGameScreen.style.display = 'flex'
    if (draw) {
        gameResult.innerText = 'Empate'
    } else (
        (gameResult.innerText = `${circleTurn? player2NameInput.value : player1NameInput.value} venceu`)
    )
}

function drawCheck(){
    return [...squares].every(square => {
        return square.classList.contains(X_CLASS) || square.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark (square, currentClass){
    square.classList.add(currentClass)
}

function swapTurn (){
    circleTurn = !circleTurn
}

function winCheck (currentClass){
    return winCombinations.some( combination => {
        return combination.every( index => {
            return squares[index].classList.contains(currentClass)
        })
    })
}

