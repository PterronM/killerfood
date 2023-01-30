class person {
  constructor() {
    this.x = 200;
    this.y = canvas.height - 160;
    this.w = 90;
    this.h = 160;
    this.speed = 50;
    this.image = new Image();
    this.image.src = "../img/personaje.png";
    // if(personD === true){
    //         this.image.src = "../img/personaje-rotado.png"
    // }else if(personD === false){
    //         this.image.src = "../img/personaje.png"
    //     }
    }

  // METODOS
  drawPerson = () => {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  };

  moveLeft = () => {
    if (this.x > 0) {
      this.x -= this.speed;
    }
  };
  moveRight = () => {
      if (this.x + this.w <= canvas.width){
        this.x += this.speed;
      } 
        
  };
}
