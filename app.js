

/*
  game rule : paper -> rock -> scissors

*/
const MAX_ROUND = 5

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
  //console.log(result)
  return { result , draw, win}
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




const buttonPlayers = [...document.querySelectorAll(".player__button")]
const computerSelectionElt = document.querySelector(".computer__selection")
const result = document.querySelector(".result")
const initButton = document.querySelector(".start__button")

const resultPlayerElt = document.querySelector(".result__player")
const resultComputerElt = document.querySelector(".result__computer")
const resultDrawElt = document.querySelector(".result__draw")
const resultGameElt = document.querySelector(".result__game")


function Game(){
        let countRound = 5
       

        let scores ={player : 0 , computer : 0 , draw : 0}

        
        
        this.init = function() {
            initButton.addEventListener("click", this.startGame) 
           
            buttonPlayers.map(btn => btn.addEventListener("click",  event => 
              this.rounds( event.target.dataset.id.toUpperCase())))
        }

        this.startGame = function() {
            renderHtml(initButton,"game started") 
            renderHtml(computerSelectionElt,"")
            renderScore(scores)
            initWinnerElt()
            setButtonDisabled()
            waitSelection(10)
            initButton.disabled = true
        }


        this.rounds = function(playerSelection){

                 computerSelection = computerPlay() 
                renderHtml(computerSelectionElt,computerSelection)
               
                const {result,win,draw} = playRound(playerSelection,computerSelection)
                countRound--
                 

                  (win) ? scores.player++: draw ? scores.draw++ : scores.computer++
                 
                if (countRound > 0){
                      setButtonDisabled()
                      waitSelection(10)
                      renderScore(scores)
                }
                else {
                    this.endGame()
                }

              
        }

    

       this.endGame=function(){
           setButtonDisabled()
           initButton.disabled = false
           if (scores.player ==  scores.computer)
            renderWinner("draw")
          else  
           renderWinner(scores.player > scores.computer ? "player" : "computer")
           
           renderHtml(initButton,"start a new game")
           countRound = 5
           scores ={player : 0 , computer : 0 , draw : 0}
        
       }
 
}

 
game = new Game()

game.init()


 
function App() {
    
}


function waitSelection(count){
    if (count < 0){
        renderHtml(initButton,"play")
        setButtonEnable()
        return ;
    }
    setTimeout(() => {
        renderHtml(initButton,count)
        waitSelection(--count)
    } , 100)
}

function setButtonDisabled(){
    buttonPlayers.map( btn => btn.disabled = true)
}

function setButtonEnable(){
    buttonPlayers.map( btn => btn.disabled = false)
}

function renderHtml(element,value){
    element.innerHTML = value
}


function renderScore({player,computer,draw}){
    renderHtml(resultPlayerElt, player)
    renderHtml(resultComputerElt,computer)
    renderHtml(resultDrawElt,draw)
}

function initWinnerElt(){
    resultGameElt.innerHTML=""
}



function renderWinner(value){
     renderHtml(resultGameElt,`winner :${value}`)
}