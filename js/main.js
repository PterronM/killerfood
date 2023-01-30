const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");
const startBtnDom = document.querySelector("#start-game");
const startScreenDom = document.querySelector("#start-screen");
const startScreenGame = document.querySelector("#container-game");
const pauseBtnDOM = document.querySelector("#img-pause");
const count = document.querySelector("#puntuacion span");
const btnReset = document.querySelector("#restart-btn");
const gameOverScreen = document.querySelector("#gameover-screen");
// const imgJoker = document.querySelector("#joker");
let game;

const startGame = () => {
  // 1.cambiar a canvas del juego
  startScreenDom.style.display = "none";
  canvas.style.display = "flex";
  startScreenGame.style.display = "flex";

  // 2.crear un objeto de la clase game (crear el juego)
  game = new Game();
  console.log(game);

  // 3.iniciar el juego (game loop)
  game.gameLoop();
};
const resetGame = () => {
  startScreenDom.style.display = "flex";
  startScreenGame.style.display = "none";
  gameOverScreen.style.display = "none";
  count.innerText = 0
};
const movePerson = (event) => {
  if (event.code === "ArrowLeft") {
    game.person.moveLeft();

  } else if (event.code === "ArrowRight") {
    game.person.moveRight();
  }
};

//--------------------ADD EVENT LISTENERS--------------------------------
startBtnDom.addEventListener("click", startGame);
window.addEventListener("keydown", movePerson);
btnReset.addEventListener("click", resetGame);
pauseBtnDOM.addEventListener("click",()=>{
  if(game.isGameOn === true){
    game.isGameOn = false
  }else{
    game.isGameOn = true
    game.gameLoop()
  }
})
