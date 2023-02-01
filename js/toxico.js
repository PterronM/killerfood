class toxico {
  constructor(posX, velToxInicial) {
    this.x = posX;
    this.y = -10;
    this.w = 50;
    this.h = 70;
    this.speed = velToxInicial;
    this.image = new Image();
    this.image.src = "./img/muerte.png";
  }

  // metodos
  drawToxico = () => {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  };

  moveToxico = () => {
    this.y += this.speed;
  };

  aumentarSpeed = (tiempo)=>{
    this.speed+= tiempo
  }

}
