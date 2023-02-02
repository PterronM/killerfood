class Game {
  constructor() {
    this.background = new Image(); //agregamos imagen de fondo
    this.background.src = "./img/background2.jpg";

    this.isGameOn = true;
    this.person = new person();
    this.toxico = new toxico();
    this.pocima = new pocima();
    this.nextL = new nextLevel();

    this.comidaArr = [];
    this.toxicoArr = [];
    this.pocimaArr = [];
    this.pocimaSpeedArr = [];
    this.frame = 300; //propiedad que determina la cantidad de comida que ha pasado por el juego
    this.contador = 0;
    this.aparicionTox = 240;
    this.aparicionPocSpeed = 260;
    this.speedDown = 30;
    // this.countNivel = 0;
    this.scoreCheck = 100; //controla que los niveles empiecen a subir cuando pase de 100 puntos
    this.speedToxInic = 2; //valor inicial de la velocidad de los toxicos

    this.audioJoker = new Audio();
    this.audioJoker.src = "./audio/ringtones-joker.mp3";
    this.audioJoker.volume = 0.05;

    this.audioComida = new Audio();
    this.audioComida.src = "./audio/apple-ok.mp3";
    this.audioComida.volume = 0.05;
  }

  scoreFinal = () => {
    let newNameList = document.createElement("p");

    if (this.contador <= 300) {
      newNameList.innerText = this.contador + " puntos. Demasiado lento"; // playerName + "Has obtenido " +
    } else if (this.contador <= 600) {
      newNameList.innerText =
        "Bueno...vas mejorando, " + this.contador + " puntos";
    } else if (this.contador <= 800) {
      newNameList.innerText = "WOW  genial,  " + this.contador + " puntos";
    } else {
      newNameList.innerText = this.contador + " puntos , eres una maquina ";
    }

    mensajeScoreGameOver.appendChild(newNameList);
  };
  subirNivel = () => {
    if (this.contador >= this.scoreCheck) {
      this.scoreCheck += 100;
      this.nextL.x = 20;
      setTimeout(() => {
        this.nextL.x = -500;
        this.aparicionPocSpeed -= 15;
        this.aparicionTox -= 20;
        this.speedToxInic += 0.3;
        this.toxicoArr.forEach((eachTox) => {
          eachTox.aumentarSpeed(0.3); //velocidad inicial en 2 + 0.3 de speedToxInic = 2.03 si le paso speedTocIni seria un total de 4,06
        });
      }, 800);
    }
  };

  scoreMax = () => {
    recordDom.innerText = localStorage.getItem("puntuacionMax");

    if (this.contador > Number(recordDom.innerText)) {
      recordDom.innerText = this.contador;
      localStorage.setItem("puntuacionMax", recordDom.innerText);
    }
  };
  gameOver = () => {
    this.isGameOn = false;

    this.audioJoker.play();

    canvas.style.display = "none";
    startScreenGame.style.display = "none";
    gameOverScreen.style.display = "flex";
    recordDom.innerText = `Máxima puntuación: ${recordDom.innerText}`;
    this.scoreFinal();

    audio.pause();
  };

  comidaAparece = () => {
    let randomPosXPlatano = Math.floor(Math.random() * (canvas.width - 45));
    let randomPosXManzana = Math.floor(Math.random() * (canvas.width - 45));

    if (this.frame % 160 === 0) {
      let food1 = new comida(randomPosXPlatano, true);
      this.comidaArr.push(food1);
    }

    if (this.frame % 190 === 0) {
      let food2 = new comida(randomPosXManzana, false);
      this.comidaArr.push(food2);
    }
  };
  quitarFruta = () => {
    if (this.comidaArr.length !== 0 && this.comidaArr[0].y > canvas.height) {
      this.comidaArr.shift();
    }
  };
  toxicoAparece = () => {
    let randomPosX = Math.floor(Math.random() * (canvas.width - 45));

    if (this.frame % this.aparicionTox === 0) {
      let tox1 = new toxico(randomPosX, this.speedToxInic); //le paso el valor de la velocidad de 2
      this.toxicoArr.push(tox1);
    }
  };
  quitarToxico = () => {
    if (
      this.toxicoArr.length !== 0 &&
      this.toxicoArr[0].y > canvas.height - 10
    ) {
      this.toxicoArr.shift();
    }
  };
  pocimaAparece = () => {
    let randomPosX = Math.floor(Math.random() * (canvas.width - 45));

    if (this.frame % 240 === 0) {
      let poc1 = new pocima(randomPosX);
      this.pocimaArr.push(poc1);
    }
  };
  quitarPocima = () => {
    if (this.pocimaArr.length !== 0 && this.pocimaArr[0].y > canvas.height) {
      this.pocimaArr.shift();
    }
  };
  pocimaSpeedAparece = () => {
    let randomPosX = Math.floor(Math.random() * (canvas.width - 45));

    if (this.frame % this.aparicionPocSpeed === 0) {
      let pocSpeed1 = new pocimaSpeed(randomPosX);
      this.pocimaSpeedArr.push(pocSpeed1);
    }
  };
  quitarPocimaSpeed = () => {
    if (
      this.pocimaSpeedArr.length !== 0 &&
      this.pocimaSpeedArr[0].y > canvas.height) {
      this.pocimaSpeedArr.shift();
    }
  };
  colissionFrutaPerson = () => {
    this.comidaArr.forEach((eachComida, index) => {
      if (
        eachComida.x < this.person.x + (this.person.w - 10) &&
        eachComida.x + eachComida.w > this.person.x + 10 &&
        eachComida.y < this.person.y + this.person.h &&
        eachComida.h + eachComida.y > this.person.y + 10
      ) {
        this.contador += eachComida.valor;
        this.comidaArr.splice(index, 1);
        count.innerText = this.contador;
        this.audioComida.play().then(() => {
          return true;
        });
      }
    });
  };
  colissionToxicoPerson = () => {
    this.toxicoArr.forEach((eachTox) => {
      if (
        eachTox.x < this.person.x + (this.person.w - 10) && //colision de derechas
        eachTox.x + eachTox.w > this.person.x + 10 && //colision de izquierdas
        eachTox.y < this.person.y + this.person.h && // solicion de abajo arriba (no es necesario para este juego)
        eachTox.h + eachTox.y > this.person.y + 10 //colision desde arriba
      ) {
        this.isGameOn = false;
        setTimeout(() => {
          this.gameOver();
        }, 1000);
      }
    });
  };
  colisionPocimaPerson = () => {
    this.pocimaArr.forEach((eachPocima) => {
      // console.log(eachTox)
      if (
        eachPocima.x < this.person.x + (this.person.w - 10) &&
        eachPocima.x + eachPocima.w > this.person.x + 10 &&
        eachPocima.y < this.person.y + this.person.h &&
        eachPocima.h + eachPocima.y > this.person.y + 10
      ) {
        this.contador += eachPocima.valor;
        this.pocimaArr.splice(eachPocima, 1);
        count.innerText = this.contador;
      }
    });
  };
  colisionPocimaSpeedPerson = () => {
    this.pocimaSpeedArr.forEach((eachPocimaSpeed) => {
      // console.log(eachTox)
      if (
        eachPocimaSpeed.x < this.person.x + (this.person.w - 10) &&
        eachPocimaSpeed.x + eachPocimaSpeed.w > this.person.x + 10 &&
        eachPocimaSpeed.y < this.person.y + this.person.h &&
        eachPocimaSpeed.h + eachPocimaSpeed.y > this.person.y + 10
      ) {
        this.person.speed -= this.speedDown; //disminuyo su velocidad
        let counter = 0;
        let idInterval = setInterval(() => {
          counter++;
          this.person.speed = 50; // a los 2 segundos vuelve a su velocidad normal
          if (counter === 1) {
            clearInterval(idInterval);
          }
        }, 2000);
        this.pocimaSpeedArr.splice(eachPocimaSpeed, 1);
      }
    });
  };
  drawBackground = () => {
    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
  };

  clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.Width, canvas.height);
  };

  gameLoop = () => {
    this.frame++;

    // 1.limpiar canvas
    this.clearCanvas();

    // 2.movimientos y acciones de los elementos
    this.colissionToxicoPerson();
    this.colissionFrutaPerson();
    this.colisionPocimaPerson();
    this.colisionPocimaSpeedPerson();
    this.person.moveRight();
    this.person.moveLeft();

    this.comidaAparece();
    this.comidaArr.forEach((eachComida) => {
      eachComida.moveComida();
    });
    this.toxicoAparece();
    this.toxicoArr.forEach((eachTox) => {
      eachTox.moveToxico();
    });
    this.pocimaAparece();
    this.pocimaArr.forEach((eachPocima) => {
      eachPocima.movePocima();
    });
    this.pocimaSpeedAparece();
    this.pocimaSpeedArr.forEach((eachPocimaSpeed) => {
      eachPocimaSpeed.movePocimaSpeed();
    });
    this.subirNivel();

    // 3.dibujar los elementos
    this.drawBackground();
    this.comidaArr.forEach((eachComida) => {
      eachComida.drawComida();
    });
    this.toxicoArr.forEach((eachTox) => {
      eachTox.drawToxico();
    });
    this.pocimaArr.forEach((eachPocima) => {
      eachPocima.drawPocima();
    });
    this.pocimaSpeedArr.forEach((eachPocimaSpeed) => {
      eachPocimaSpeed.drawPocimaSpeed();
    });
    this.person.drawPerson(this.frame);
    this.quitarFruta();
    this.quitarPocima();
    this.quitarToxico();
    this.quitarPocimaSpeed();
    this.nextL.drawNextLevel();
    this.scoreMax();

    // 4. recursion y control
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
