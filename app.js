

/*
  game rule : paper -> rock -> scissors

*/

const rock = "ROCK"
const paper = "PAPER"
const scissors = "SCISSORS"

const states = [paper,rock,scissors]


/**
 * return randomly rock paper scissors
 */
function computerPlay(){
 return states[randomValue()]
}

//paper -> rock -> scissors
/**
 * @param playerSelection
 * @param computerSelection
 * return an object { win , draw , string that declares the winner }
 */
function playRound(playerSelection,computerSelection){
  let draw = false   
  let win = false    // true if the player win
  if (playerSelection == computerSelection){
      draw = true;
  }
  else if ((playerSelection == rock && computerSelection == scissors) ||
    (playerSelection == paper && computerSelection == rock ) ||
    (playerSelection == scissors && computerSelection == paper)){
        win = true
    }
  
  let result = ""
  if (draw) {
      result = "DRAW"
  }
  else {
      
      result = `you ${win ? "win" : "loose"} ! ${win ? playerSelection : computerSelection} beats ${win ? computerSelection : playerSelection } `
  }
  console.log(result)
  return { result , draw, win}
}


/**
 * @param none
 * play 5 five round and report the winner
 */
function game(){
let playerWin = 0
let countDraw = 0
    for (i = 0 ; i < 5 ; i++){
    const playerSelection = selectionPlayer()
    const computerSelection = computerPlay()
    const {result,draw,win} = playRound(playerSelection , computerSelection)
    if (win) playerWin++
    if (draw) countDraw++
    }
result = ""
computerWin = 5 - playerWin - countDraw 
if (computerWin == playerWin ){
    result = "DRAW"
}
else {
    result = `${ playerWin > computerWin ? "player" : "computer" } win !`
}

console.log(result)
return { result , win : playerWin > computerWin , draw : playerWin == computerWin}
}


/**
 * function helper
 * return a random value between 0 and 2
 */
function randomValue(){
   return Math.round(Math.random() * 2)
}

function selectionPlayer(){
    let result = ""
    while(!states.includes(result)){
        result = prompt("select [rock,paper,scissors]").toUpperCase()
    }
    
    return result
}




game()