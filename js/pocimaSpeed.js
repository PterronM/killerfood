class pocimaSpeed {
    constructor(posX) {
      this.x = posX;
      this.y = -30;
      this.w = 50;
      this.h = 70;
      this.speed = 4;
      this.image = new Image();
      this.image.src ="./img/speed.png"
    }
  
    // metodos
    drawPocimaSpeed = () => {
      ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    };
  
    movePocimaSpeed = () => {
      this.y += this.speed;
    };
       
    }