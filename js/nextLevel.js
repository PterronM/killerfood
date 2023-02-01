class nextLevel {
  constructor() {
    this.x = -500;
    this.y = 100;
    this.w = 450;
    this.h = 450;
    this.image = new Image();
    this.image.src = "./img/mancha.png";
  }

  // metodos
  drawNextLevel = () => {
    ctx.drawImage(this.image, this.x,this.y,this.w,this.h);
  };

}
