class Game {
  constructor() {
    this.background = new Image(); //agregamos imagen de fondo
    this.background.src = "img/background2.jpg";
    this.isGameOn = true;
    this.person = new person();
    this.comida = new comida();
    this.toxico = new toxico();
    this.pocima = new pocima();
    this.comidaArr = [];
    this.toxicoArr = [];
    this.pocimaArr = [];
    this.frame = 1; //propiedad que determina la cantidad de comida que han pasado por el juego
    this.contador = 0;
  }

  gameOver = () => {
    this.isGameOn = false;
    canvas.style.display = "none";
    startScreenGame.style.display = "none";
    gameOverScreen.style.display = "flex";
  };
  comidaAparece = () => {
    let randomPosX = Math.random() * (canvas.width - 45);

    if (this.frame % 140 === 0) {
      let food1 = new comida(randomPosX, true);
      this.comidaArr.push(food1);
    }

    if (this.frame % 140 === 0) {
      let food2 = new comida(randomPosX, false);
      this.comidaArr.push(food2);
    }
  };
  toxicoAparece = () => {
    let randomPosX = Math.random() * (canvas.width -45);

    if (this.frame % 930 === 0) {
      let tox1 = new toxico(randomPosX);
      this.toxicoArr.push(tox1);
    }
  };
  pocimaAparece = () => {
    let randomPosX = Math.random() * (canvas.width-45);

    if (this.frame % 240 === 0) {
      let poc1 = new pocima(randomPosX);
      this.pocimaArr.push(poc1);
    }
  };
  colissionFrutaPerson = () => {
    this.comidaArr.forEach((eachComida) => {
      if (
        eachComida.x < this.person.x + this.person.w &&
        eachComida.x + eachComida.w > this.person.x &&
        eachComida.y < this.person.y + this.person.h &&
        eachComida.h + eachComida.y > this.person.y
      ) {
        this.contador += this.comida.valor
        this.comidaArr.splice(eachComida,1);
        count.innerText = this.contador
        console.log(eachComida)
       
      }else{
        
      }
    });
  };
  colissionToxicoPerson = () => {
    this.toxicoArr.forEach((eachTox) => {
      // console.log(eachTox)
      if (
        eachTox.x <= this.person.x + this.person.w &&
        eachTox.x + eachTox.w >= this.person.x &&
        eachTox.y <= this.person.y + this.person.h &&
        eachTox.h + eachTox.y >= this.person.y
      ) {
        this.gameOver();
      }
    });
  };
  colisionPocimaPerson = ()=>{
    this.pocimaArr.forEach((eachPocima) => {
      // console.log(eachTox)
      if (
        eachPocima.x <= this.person.x + this.person.w &&
        eachPocima.x + eachPocima.w >= this.person.x &&
        eachPocima.y <= this.person.y + this.person.h &&
        eachPocima.h + eachPocima.y >= this.person.y
      ) {
        this.contador +=  this.pocima.valor 
        this.pocimaArr.shift(eachPocima)
        count.innerText = this.contador
        
      }
    });
  }
 
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
    this.pocimaArr.forEach((eachPocima)=>{
      eachPocima.movePocina();
    })
    

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
    this.person.drawPerson();

    // 4. recursion y control
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
