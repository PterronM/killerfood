class pocima {
    constructor(posX) {
      this.x = posX;
      this.y = -30;
      this.w = 50;
      this.h = 70;
      this.valor = 20;
      this.speed = 3;
      this.image = new Image();
      this.image.src ="./img/X2.png"
    }
  
    // metodos
    drawPocima = () => {
      ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    };
  
    movePocima = () => {
      this.y += this.speed;
    };
       
    }