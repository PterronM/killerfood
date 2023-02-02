const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");
const startBtnDom = document.querySelector("#start-game");
const startScreenDom = document.querySelector("#start-screen");
const startScreenGame = document.querySelector("#container-game");
const pauseBtnDOM = document.querySelector("#img-pause");
const muteBtnDom = document.querySelector("#img-mute")
let count = document.querySelector("#puntuacion span");
const btnReset = document.querySelector("#restart-btn");
const gameOverScreen = document.querySelector("#gameover-screen");
const mensajeScoreGameOver = document.querySelector("#namePlayer-list");
const recordDom = document.querySelector("#record span")
// let playerName = " ";
let audioMute = true;
let game;
let audio = new Audio();
audio.src = "./audio/stranger-things-ok.mp3";
audio.volume = 0.05;

let puntos = 0


// const addName = document.querySelector("#name-input");
// const btnAddName = document.querySelector("#btn-add")


// const addNamePlayer = () => {
//   playerName = addName.value;
//   //crear un nuevo elemento en la lista
//   let newNameList = document.createElement("li");
//   //crear el innerText del nuevo elemento li
//   // newNameList.innerText = "Welcome " + playerName + "! Are you ready??";
//   //agregar el elemento li a la ul que ya tenemos
//   ListNamePlayer.appendChild(newNameList);
//   //limpiar el input
//   addName.value = " ";
//   ListNamePlayer.innerText = "";
// };

const startGame = () => {
  audio.play().then(() => {
    return true;
  });
  audio.loop = true;
  // 1.cambiar a canvas del juego
  
  startScreenDom.style.display = "none";
  canvas.style.display = "flex";
  startScreenGame.style.display = "flex";
  mensajeScoreGameOver.innerText = "";

  // 2.crear un objeto de la clase game (crear el juego)
  game = new Game();

  // 3.iniciar el juego (game loop)
  game.gameLoop();
};

const resetGame = () => {
  startScreenDom.style.display = "flex";
  startScreenGame.style.display = "none";
  gameOverScreen.style.display = "none";
  count.innerText = 0;
  game.audioJoker.pause()
};

const movePerson = (event) => {
  if (event.code === "ArrowLeft") {
    game.person.moveLeft();
  } else if (event.code === "ArrowRight") {
    game.person.moveRight();
  }
};

const pause = () => {
  if (game.isGameOn === true) {
    game.isGameOn = false;
    audio.pause();
  } else {
    game.isGameOn = true;
    game.gameLoop();
    audio.play();
  }
};


const mute = ()=>{
if(audioMute === true){
  audio.pause()
  game.audioComida.pause()
  audioMute = false;
}else{
  audio.play()
  game.audioComida.play()
  audioMute = true;
}
}



if(localStorage.getItem("puntuacionMax") === undefined){
  localStorage.setItem("puntuacionMax",0);
}




//--------------------ADD EVENT LISTENERS--------------------------------
startBtnDom.addEventListener("click", startGame);
window.addEventListener("keydown", movePerson);
btnReset.addEventListener("click", resetGame);
pauseBtnDOM.addEventListener("click", pause);
window.addEventListener("keydown", (event) => {
  if (event.code === "KeyP") {
    pause();
  }
});
muteBtnDom.addEventListener("click",mute);


