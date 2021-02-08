'use strict';

const player01TotalScore = document.getElementById("player1-final-score");
const player02TotalScore = document.getElementById("player2-final-score");
const initialValue = 0;
const player01CurrentScore = document.getElementById("player-01-current-scroe");
const player02CurrentScore = document.getElementById("player-02-current-scroe");
const activePlayerStatus01 = document.querySelector(".player01-section");
const activePlayerStatus02 = document.querySelector(".player02-section");
const newGameButton = document.querySelector(".btn--new");
const diceImage = document.querySelector(".dice");
const rollDiceButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");

var currentScorePlayer01, totalScorePlayer01 = 0, currentScorePlayer02, totalScorePlayer02 =0;
var score= [0,0];
var endPoint = 100;
var activePlayer, randomValue;
var holdStatus = false;

init();
newGameButton.addEventListener("click", newGame);
rollDiceButton.addEventListener("click", rollGame);
holdButton.addEventListener("click", holdGame);

function init(){
    score = [0,0];
    totalScorePlayer01 = 0;
    totalScorePlayer02 = 0;
    currentScorePlayer01 = 0;
    totalScorePlayer02 = 0;
    activePlayer = null;
    player01CurrentScore.textContent = initialValue;
    player01TotalScore.textContent = initialValue;
    
    player02CurrentScore.textContent = initialValue;
    player02TotalScore.textContent = initialValue;
    
    activePlayerStatus01.classList.add("active-player");
    
    if(activePlayerStatus02.classList.contains("active-player")){
        activePlayerStatus02.classList.remove("active-player");
    }
    diceImage.src = "img/dice-5.png";
}


function newGame(){
    init();
}

function rollGame(){
    randomValue = Math.trunc(Math.random() * 6) + 1;
    console.log(randomValue);
    if(activePlayerStatus01.classList.contains("active-player")){
        activePlayer = 1;
        diceImage.src = `img/dice-${randomValue}.png`;
        currentScorePlayer01 = randomValue;
        player01CurrentScore.textContent = currentScorePlayer01; 
    }
    else{
        activePlayer = 2;
        diceImage.src = `img/dice-${randomValue}.png`;
        currentScorePlayer02 = randomValue;
        player02CurrentScore.textContent = currentScorePlayer02; 
    }
    
    if(activePlayer == 1 && randomValue != 1){
        checkWinner();
        totalScorePlayer01 +=currentScorePlayer01;
        player01TotalScore.textContent = totalScorePlayer01; 
        score[activePlayer-1] = totalScorePlayer01;
        console.log("total Score = "+score);
    }
    
    if(activePlayer == 1 && randomValue == 1){
        activePlayerStatus01.classList.remove("active-player");
        activePlayerStatus02.classList.add("active-player");
        randomValue = Math.trunc(Math.random() * 6) + 1;
        console.log(randomValue);
    }
    
    if(activePlayer == 2 && randomValue != 1){
        checkWinner();
        totalScorePlayer02 +=currentScorePlayer02;
        player02TotalScore.textContent = totalScorePlayer02; 
        score[activePlayer-1] = totalScorePlayer02;
        console.log("total Score = "+score);
        
    }
    
    if(activePlayer == 2 && randomValue == 1){
        activePlayerStatus02.classList.remove("active-player");
        activePlayerStatus01.classList.add("active-player");
        score[activePlayer-1] = totalScorePlayer02;
        console.log("total Score = "+score);
    }
    
    
}

function holdGame(){
    
    if(activePlayerStatus01.classList.contains("active-player") && randomValue!=1){
        activePlayerStatus02.classList.add("active-player");
        activePlayerStatus01.classList.remove("active-player");
        console.log("Block 1:"+ activePlayer);
        
    }
    else if(activePlayerStatus02.classList.contains("active-player") && randomValue!=1){
        activePlayerStatus01.classList.add("active-player");
        activePlayerStatus02.classList.remove("active-player"); 
        console.log("Block 2:"+ activePlayer);
    }
    if(activePlayer == null && randomValue!=1){
        window.alert("You need to turn the dice atleast ONE time on every new turn!!");
    }
    
}

function checkWinner(){
    if(score[0]>= endPoint){
        window.alert("Congratulations! Player 1 is the Winner. Good Luck on next phase.");
        init();
        
    }
    if(score[1]>= endPoint){
        window.alert("Congratulations! Player 2 is the Winner. Good Luck on next phase.");
        init();
    }
}
