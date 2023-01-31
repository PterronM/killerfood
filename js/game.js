class Game {
  constructor() {
    this.background = new Image(); //agregamos imagen de fondo
    this.background.src = "img/background2.jpg";
    
    this.isGameOn = true;
    this.person = new person();
    this.toxico = new toxico();
    this.pocima = new pocima();
    this.nextL = new nextLevel();

    this.comidaArr = [];
    this.toxicoArr = [];
    this.pocimaArr = [];
    this.frame = 1; //propiedad que determina la cantidad de comida que ha pasado por el juego
    this.contador = 0;
    this.aparicionTox = 240;
    this.countNivel = 0;
    this.scoreCheck = 100; //controla que los niveles empiecen a subir cuando pase de 50 puntos
    this.speedToxInic = 2; //valor inicial de la velocidad de los toxicos
  }

  updateNameScore = () => {
    // count = this.contador.innerText;
    let newNameList = document.createElement("li");

    if (this.contador <= 200) {
      newNameList.innerText =
        // playerName +
        " Has obtenido " +
        this.contador +
        " puntos. Demasiado lento";
    } else if (this.contador <= 500) {
      newNameList.innerText =
        "Bueno...vas mejorando, " + this.contador + " puntos";
    } else if (this.contador <= 800) {
      newNameList.innerText =
        "WOW  genial,  " + this.contador + " puntos";
    } else {
      newNameList.innerText =
        this.contador + " puntos , eres un maquina ";
    }

    ulListNamePlayer.appendChild(newNameList);
  };
  subirNivel = () => {
    if (this.contador >= this.scoreCheck) {
      this.scoreCheck += 100 // 1
      this.nextL.x = 20;
      setTimeout(()=>{
        this.nextL.x = -500;
        this.aparicionTox -= 30;
        this.speedToxInic += 0.3;
        this.toxicoArr.forEach((eachTox)=>{
          eachTox.aumentarSpeed(0.3); //velocidad inicial en 2 + 0.3 de speedToxInic = 2.03 si le paso speedTocIni seria un total de 4,06
      })

      },800);
    }
  };
  gameOver = () => {
    this.isGameOn = false;
    canvas.style.display = "none";
    // imgJoker.style.display ="none";
    startScreenGame.style.display = "none";
    gameOverScreen.style.display = "flex";
    this.updateNameScore();
  };
  comidaAparece = () => {
    let randomPosXPlatano = Math.floor(Math.random() * (canvas.width - 45));
    let randomPosXManzana = Math.random() * (canvas.width - 45);

    if (this.frame % 120 === 0) {
      let food1 = new comida(randomPosXPlatano, true);
      this.comidaArr.push(food1);
    }

    if (this.frame % 160 === 0) {
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
      let tox1 = new toxico(randomPosX,this.speedToxInic);//le paso el valor de la velocidad de 2
      this.toxicoArr.push(tox1);
    }
  };
  quitarToxico = () => {
    if (this.toxicoArr.length !== 0 && this.toxicoArr[0].y > canvas.height) {
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
  colissionFrutaPerson = () => {
    this.comidaArr.forEach((eachComida, index) => {
      if (
        eachComida.x < this.person.x + this.person.w &&
        eachComida.x + eachComida.w > this.person.x &&
        eachComida.y < this.person.y + this.person.h &&
        eachComida.h + eachComida.y > this.person.y
      ) {
        this.contador += eachComida.valor;
        this.comidaArr.splice(index, 1);
        count.innerText = this.contador;
      }
    });
  };
  colissionToxicoPerson = () => {
    this.toxicoArr.forEach((eachTox) => {
      if (
        eachTox.x < this.person.x + this.person.w &&
        eachTox.x + eachTox.w > this.person.x &&
        eachTox.y < this.person.y + this.person.h &&
        eachTox.h + eachTox.y > this.person.y
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
        eachPocima.x < this.person.x + this.person.w &&
        eachPocima.x + eachPocima.w > this.person.x &&
        eachPocima.y < this.person.y + this.person.h &&
        eachPocima.h + eachPocima.y > this.person.y
      ) {
        this.contador += eachPocima.valor;
        this.pocimaArr.splice(eachPocima, 1);
        count.innerText = this.contador;
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
    // ctx.clearRect(0,0,canvas.width,canvas.height)

    // 2.movimientos y acciones de los elementos
    this.colissionToxicoPerson();
    this.colissionFrutaPerson();
    this.colisionPocimaPerson();
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
      eachPocima.movePocina();
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
    this.person.drawPerson(this.frame);
    this.quitarFruta();
    this.quitarPocima();
    this.quitarToxico();
    this.nextL.drawNextLevel();
    

    // 4. recursion y control
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
